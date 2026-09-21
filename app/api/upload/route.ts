import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimeTypes = [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
    ];

    if (!validMimeTypes.includes(file.type) && !file.name.endsWith('.svg')) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Please upload SVG, PNG, WebP, or JPG.' },
        { status: 400 }
      );
    }

    // Limit file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe unique filename
    const ext = path.extname(file.name) || (file.type === 'image/svg+xml' ? '.svg' : '.png');
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'concerns');

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/concerns/${fileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName: file.name,
        size: file.size,
      });
    } catch (fsError: any) {
      console.warn('[Upload API] Filesystem write error, falling back to data URL:', fsError);
      // Fallback to data URL base64 so upload never fails even in read-only environments
      const base64Data = buffer.toString('base64');
      const mimeType = file.type || 'image/png';
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName: file.name,
        size: file.size,
        isDataUrl: true,
      });
    }
  } catch (error: any) {
    console.error('[Upload API] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
