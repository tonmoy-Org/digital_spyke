import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import {
  TestimonialItem,
  TestimonialsSectionData,
  DEFAULT_TESTIMONIALS_DATA,
} from '@/types/testimonials';

export type { TestimonialItem, TestimonialsSectionData };
export { DEFAULT_TESTIMONIALS_DATA };

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryTestimonialsData = JSON.parse(JSON.stringify(DEFAULT_TESTIMONIALS_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('testimonials_section');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: TestimonialsSectionData = {
        badgeText: doc.badgeText ?? DEFAULT_TESTIMONIALS_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_TESTIMONIALS_DATA.badgeFontSize,
        headingPrefix: doc.headingPrefix ?? DEFAULT_TESTIMONIALS_DATA.headingPrefix,
        headingHighlight: doc.headingHighlight ?? DEFAULT_TESTIMONIALS_DATA.headingHighlight,
        headingSuffix: doc.headingSuffix ?? DEFAULT_TESTIMONIALS_DATA.headingSuffix,
        headingFontSize: doc.headingFontSize || DEFAULT_TESTIMONIALS_DATA.headingFontSize,
        headingHtml: doc.headingHtml || DEFAULT_TESTIMONIALS_DATA.headingHtml,
        description: doc.description ?? DEFAULT_TESTIMONIALS_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_TESTIMONIALS_DATA.descriptionFontSize,
        descriptionHtml: doc.descriptionHtml || DEFAULT_TESTIMONIALS_DATA.descriptionHtml,
        row1Speed: typeof doc.row1Speed === 'number' ? doc.row1Speed : DEFAULT_TESTIMONIALS_DATA.row1Speed,
        row2Speed: typeof doc.row2Speed === 'number' ? doc.row2Speed : DEFAULT_TESTIMONIALS_DATA.row2Speed,
        pauseOnHover: doc.pauseOnHover !== undefined ? doc.pauseOnHover : DEFAULT_TESTIMONIALS_DATA.pauseOnHover,
        testimonials:
          Array.isArray(doc.testimonials) && doc.testimonials.length > 0
            ? doc.testimonials
            : DEFAULT_TESTIMONIALS_DATA.testimonials,
      };

      memoryTestimonialsData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[Testimonials API] MongoDB unavailable, using memory state:', error);
  }

  return NextResponse.json(
    { success: true, data: memoryTestimonialsData },
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
      badgeText,
      badgeFontSize,
      headingPrefix,
      headingHighlight,
      headingSuffix,
      headingFontSize,
      headingHtml,
      description,
      descriptionFontSize,
      descriptionHtml,
      row1Speed,
      row2Speed,
      pauseOnHover,
      testimonials,
    } = body;

    const updatedData: TestimonialsSectionData = {
      badgeText: typeof badgeText === 'string' ? badgeText : memoryTestimonialsData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : (memoryTestimonialsData.badgeFontSize || DEFAULT_TESTIMONIALS_DATA.badgeFontSize),
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryTestimonialsData.headingPrefix,
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryTestimonialsData.headingHighlight,
      headingSuffix: typeof headingSuffix === 'string' ? headingSuffix : memoryTestimonialsData.headingSuffix,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : (memoryTestimonialsData.headingFontSize || DEFAULT_TESTIMONIALS_DATA.headingFontSize),
      headingHtml: typeof headingHtml === 'string' ? headingHtml : memoryTestimonialsData.headingHtml,
      description: typeof description === 'string' ? description : memoryTestimonialsData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : (memoryTestimonialsData.descriptionFontSize || DEFAULT_TESTIMONIALS_DATA.descriptionFontSize),
      descriptionHtml: typeof descriptionHtml === 'string' ? descriptionHtml : memoryTestimonialsData.descriptionHtml,
      row1Speed: typeof row1Speed === 'number' ? row1Speed : memoryTestimonialsData.row1Speed,
      row2Speed: typeof row2Speed === 'number' ? row2Speed : memoryTestimonialsData.row2Speed,
      pauseOnHover: typeof pauseOnHover === 'boolean' ? pauseOnHover : memoryTestimonialsData.pauseOnHover,
      testimonials: Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : memoryTestimonialsData.testimonials,
    };

    memoryTestimonialsData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('testimonials_section');
      await collection.updateOne(
        { _id: 'main' as any },
        {
          $set: {
            ...updatedData,
            updatedAt: new Date(),
            updatedBy: user.email,
          },
        },
        { upsert: true }
      );
    } catch (dbErr: any) {
      console.warn('[Testimonials API] MongoDB update skipped (fallback to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonials updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    console.error('[Testimonials API] Error updating testimonials:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
