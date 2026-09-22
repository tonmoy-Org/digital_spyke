import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import {
  PortfolioProduct,
  PortfolioSectionData,
  DEFAULT_PORTFOLIO_DATA,
} from '@/types/portfolio';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type { PortfolioProduct, PortfolioSectionData };
export { DEFAULT_PORTFOLIO_DATA };

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryPortfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('portfolio_showcase');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: PortfolioSectionData = {
        badgeText: doc.badgeText ?? DEFAULT_PORTFOLIO_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_PORTFOLIO_DATA.badgeFontSize,
        badgeIcon: doc.badgeIcon || DEFAULT_PORTFOLIO_DATA.badgeIcon,
        badgeIconColor: doc.badgeIconColor || DEFAULT_PORTFOLIO_DATA.badgeIconColor,
        headingPrefix: doc.headingPrefix ?? DEFAULT_PORTFOLIO_DATA.headingPrefix,
        headingHighlight: doc.headingHighlight ?? DEFAULT_PORTFOLIO_DATA.headingHighlight,
        headingFontSize: doc.headingFontSize || DEFAULT_PORTFOLIO_DATA.headingFontSize,
        headingHtml: doc.headingHtml || DEFAULT_PORTFOLIO_DATA.headingHtml,
        description: doc.description ?? DEFAULT_PORTFOLIO_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_PORTFOLIO_DATA.descriptionFontSize,
        descriptionHtml: doc.descriptionHtml || DEFAULT_PORTFOLIO_DATA.descriptionHtml,
        products:
          Array.isArray(doc.products) && doc.products.length > 0
            ? doc.products
            : DEFAULT_PORTFOLIO_DATA.products,
      };

      memoryPortfolioData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[Portfolio API] MongoDB unavailable, using memory state:', error);
  }

  return NextResponse.json(
    { success: true, data: memoryPortfolioData },
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
      badgeIcon,
      badgeIconColor,
      headingPrefix,
      headingHighlight,
      headingFontSize,
      headingHtml,
      description,
      descriptionFontSize,
      descriptionHtml,
      products,
    } = body;

    const updatedData: PortfolioSectionData = {
      badgeText: typeof badgeText === 'string' ? badgeText : memoryPortfolioData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : (memoryPortfolioData.badgeFontSize || DEFAULT_PORTFOLIO_DATA.badgeFontSize),
      badgeIcon: typeof badgeIcon === 'string' ? badgeIcon : (memoryPortfolioData.badgeIcon || DEFAULT_PORTFOLIO_DATA.badgeIcon),
      badgeIconColor: typeof badgeIconColor === 'string' ? badgeIconColor : (memoryPortfolioData.badgeIconColor || DEFAULT_PORTFOLIO_DATA.badgeIconColor),
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryPortfolioData.headingPrefix,
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryPortfolioData.headingHighlight,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : (memoryPortfolioData.headingFontSize || DEFAULT_PORTFOLIO_DATA.headingFontSize),
      headingHtml: typeof headingHtml === 'string' ? headingHtml : memoryPortfolioData.headingHtml,
      description: typeof description === 'string' ? description : memoryPortfolioData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : (memoryPortfolioData.descriptionFontSize || DEFAULT_PORTFOLIO_DATA.descriptionFontSize),
      descriptionHtml: typeof descriptionHtml === 'string' ? descriptionHtml : memoryPortfolioData.descriptionHtml,
      products: Array.isArray(products) && products.length > 0 ? products : memoryPortfolioData.products,
    };

    memoryPortfolioData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('portfolio_showcase');
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
      console.warn('[Portfolio API] MongoDB update skipped (fallback to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    console.error('[Portfolio API] Error updating portfolio:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
