import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import { DEFAULT_CONCERNS_DATA, ConcernsSectionData, ConcernItem } from '@/types/concerns';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'our_concerns.json');

async function readDiskData(): Promise<ConcernsSectionData | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
  } catch {}
  return null;
}

async function writeDiskData(data: ConcernsSectionData): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[OurConcerns API] Disk write failed:', err);
  }
}

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryConcernsData: ConcernsSectionData = JSON.parse(JSON.stringify(DEFAULT_CONCERNS_DATA));

export async function GET() {
  // 1. Try MongoDB
  try {
    const db = await getDatabase();
    const collection = db.collection('our_concerns');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: ConcernsSectionData = {
        title: doc.title || DEFAULT_CONCERNS_DATA.title,
        titleFontSize: doc.titleFontSize || DEFAULT_CONCERNS_DATA.titleFontSize,
        showTitle: doc.showTitle !== undefined ? Boolean(doc.showTitle) : DEFAULT_CONCERNS_DATA.showTitle,
        speedRow1: typeof doc.speedRow1 === 'number' ? doc.speedRow1 : DEFAULT_CONCERNS_DATA.speedRow1,
        speedRow2: typeof doc.speedRow2 === 'number' ? doc.speedRow2 : DEFAULT_CONCERNS_DATA.speedRow2,
        pauseOnHover: doc.pauseOnHover !== undefined ? Boolean(doc.pauseOnHover) : DEFAULT_CONCERNS_DATA.pauseOnHover,
        items: Array.isArray(doc.items) && doc.items.length > 0 ? doc.items : DEFAULT_CONCERNS_DATA.items,
      };

      memoryConcernsData = JSON.parse(JSON.stringify(data));
      await writeDiskData(data);

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    // MongoDB unavailable, proceed to disk read
  }

  // 2. Try Disk File
  const diskData = await readDiskData();
  if (diskData) {
    memoryConcernsData = JSON.parse(JSON.stringify(diskData));
    return NextResponse.json(
      { success: true, data: diskData },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
  }

  return NextResponse.json(
    { success: true, data: memoryConcernsData },
    { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
  );
}

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, titleFontSize, showTitle, speedRow1, speedRow2, pauseOnHover, items } = body;

    const sanitizedItems: ConcernItem[] = Array.isArray(items)
      ? items.map((item: any, idx: number) => ({
          id: item.id || `concern-${idx + 1}-${Date.now()}`,
          name: typeof item.name === 'string' ? item.name : `Concern ${idx + 1}`,
          title: typeof item.title === 'string' ? item.title : '',
          subtitle: typeof item.subtitle === 'string' ? item.subtitle : '',
          row: item.row === 2 ? 2 : 1,
          iconType: ['upload', 'preset', 'lucide', 'svg', 'image', 'monogram'].includes(item.iconType)
            ? item.iconType
            : 'preset',
          iconValue: typeof item.iconValue === 'string' ? item.iconValue : 'skillers',
          url: typeof item.url === 'string' ? item.url : '',
        }))
      : memoryConcernsData.items;

    const updatedData: ConcernsSectionData = {
      title: typeof title === 'string' ? title : memoryConcernsData.title,
      titleFontSize: typeof titleFontSize === 'string' ? titleFontSize : memoryConcernsData.titleFontSize,
      showTitle: showTitle !== undefined ? Boolean(showTitle) : memoryConcernsData.showTitle,
      speedRow1: typeof speedRow1 === 'number' ? speedRow1 : memoryConcernsData.speedRow1,
      speedRow2: typeof speedRow2 === 'number' ? speedRow2 : memoryConcernsData.speedRow2,
      pauseOnHover: pauseOnHover !== undefined ? Boolean(pauseOnHover) : memoryConcernsData.pauseOnHover,
      items: sanitizedItems,
    };

    memoryConcernsData = JSON.parse(JSON.stringify(updatedData));
    await writeDiskData(updatedData);

    try {
      const db = await getDatabase();
      const collection = db.collection('our_concerns');
      await collection.updateOne(
        { _id: 'main' as any },
        {
          $set: {
            ...updatedData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } catch (dbErr) {
      // Handled by disk persistence
    }

    return NextResponse.json({
      success: true,
      data: updatedData,
      message: 'Our Concerns section updated successfully',
    });
  } catch (error: any) {
    console.error('[OurConcerns API] POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update Our Concerns' },
      { status: 500 }
    );
  }
}
