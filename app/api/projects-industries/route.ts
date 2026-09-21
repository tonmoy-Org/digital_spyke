import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import {
  DEFAULT_PROJECTS_DATA,
  ProjectsSectionData,
  ProjectPoint,
  ProjectImageItem,
} from '@/types/projects-industries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'projects_industries.json');

// Helper to read from local disk file
async function readDiskData(): Promise<ProjectsSectionData | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.images)) {
      return parsed;
    }
  } catch {
    // File doesn't exist or is invalid
  }
  return null;
}

// Helper to write to local disk file
async function writeDiskData(data: ProjectsSectionData): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[ProjectsIndustries API] Disk write failed:', err);
  }
}

// In-memory fallback
let memoryProjectsData: ProjectsSectionData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS_DATA));

export async function GET() {
  // 1. Try MongoDB
  try {
    const db = await getDatabase();
    const collection = db.collection('projects_industries');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: ProjectsSectionData = {
        headingHtml: doc.headingHtml || DEFAULT_PROJECTS_DATA.headingHtml,
        headingFontSize: doc.headingFontSize || DEFAULT_PROJECTS_DATA.headingFontSize,
        descriptionHtml: doc.descriptionHtml || DEFAULT_PROJECTS_DATA.descriptionHtml,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_PROJECTS_DATA.descriptionFontSize,
        speedRow1: typeof doc.speedRow1 === 'number' ? doc.speedRow1 : DEFAULT_PROJECTS_DATA.speedRow1,
        speedRow2: typeof doc.speedRow2 === 'number' ? doc.speedRow2 : DEFAULT_PROJECTS_DATA.speedRow2,
        pauseOnHover: doc.pauseOnHover !== undefined ? Boolean(doc.pauseOnHover) : DEFAULT_PROJECTS_DATA.pauseOnHover,
        points: Array.isArray(doc.points) && doc.points.length > 0 ? doc.points : DEFAULT_PROJECTS_DATA.points,
        images: Array.isArray(doc.images) && doc.images.length > 0 ? doc.images : DEFAULT_PROJECTS_DATA.images,
      };

      memoryProjectsData = JSON.parse(JSON.stringify(data));
      // Keep disk file synced
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
    memoryProjectsData = JSON.parse(JSON.stringify(diskData));
    return NextResponse.json(
      { success: true, data: diskData },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
  }

  // 3. Fallback to default
  return NextResponse.json(
    { success: true, data: memoryProjectsData },
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
    const {
      headingHtml,
      headingFontSize,
      descriptionHtml,
      descriptionFontSize,
      speedRow1,
      speedRow2,
      pauseOnHover,
      points,
      images,
    } = body;

    const sanitizedPoints: ProjectPoint[] = Array.isArray(points)
      ? points.map((p: any, idx: number) => ({
          id: p.id || `point-${idx + 1}-${Date.now()}`,
          number: typeof p.number === 'string' ? p.number : `${idx + 1}`.padStart(2, '0'),
          iconType: ['lucide', 'upload', 'svg', 'preset'].includes(p.iconType) ? p.iconType : 'lucide',
          iconValue: typeof p.iconValue === 'string' ? p.iconValue : 'Zap',
          text: typeof p.text === 'string' ? p.text : '',
          fontSize: typeof p.fontSize === 'string' ? p.fontSize : '1rem',
        }))
      : memoryProjectsData.points;

    const sanitizedImages: ProjectImageItem[] = Array.isArray(images)
      ? images.map((img: any, idx: number) => ({
          id: img.id || `img-${idx + 1}-${Date.now()}`,
          src: typeof img.src === 'string' ? img.src : '',
          alt: typeof img.alt === 'string' ? img.alt : `Portfolio project ${idx + 1}`,
          row: img.row === 2 ? 2 : 1,
          url: typeof img.url === 'string' ? img.url : '',
        }))
      : memoryProjectsData.images;

    const updatedData: ProjectsSectionData = {
      headingHtml: typeof headingHtml === 'string' ? headingHtml : memoryProjectsData.headingHtml,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : memoryProjectsData.headingFontSize,
      descriptionHtml: typeof descriptionHtml === 'string' ? descriptionHtml : memoryProjectsData.descriptionHtml,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : memoryProjectsData.descriptionFontSize,
      speedRow1: typeof speedRow1 === 'number' ? speedRow1 : memoryProjectsData.speedRow1,
      speedRow2: typeof speedRow2 === 'number' ? speedRow2 : memoryProjectsData.speedRow2,
      pauseOnHover: pauseOnHover !== undefined ? Boolean(pauseOnHover) : memoryProjectsData.pauseOnHover,
      points: sanitizedPoints,
      images: sanitizedImages,
    };

    memoryProjectsData = JSON.parse(JSON.stringify(updatedData));

    // Always persist to disk file immediately
    await writeDiskData(updatedData);

    // Also persist to MongoDB if available
    try {
      const db = await getDatabase();
      const collection = db.collection('projects_industries');
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
      message: 'Projects & Industries updated successfully',
    });
  } catch (error: any) {
    console.error('[ProjectsIndustries API] POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update section' },
      { status: 500 }
    );
  }
}
