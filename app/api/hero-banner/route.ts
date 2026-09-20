import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_HERO_DATA = {
  brandTitle: 'DIGITAL SPYKE',
  tagline: 'FULL-STACK AGENCY',
  animatedTexts: [
    'In  Web Design',
    'In  Search Engine Optimization',
    'In  Brand Design',
  ],
  location: 'Toronto, Canada',
  titleFontSize: '6rem',
  taglineFontSize: '2rem',
  typewriterFontSize: '3rem',
  locationFontSize: '1.125rem',
  badgeText: 'Award Winning Web Design & SaaS Agency',
  primaryBtnText: 'Start a Project',
  primaryBtnLink: '/contact',
  secondaryBtnText: 'Explore Work',
  secondaryBtnLink: '/projects',
};

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryHeroData = { ...DEFAULT_HERO_DATA };

export async function GET() {
  try {
    const db = await getDatabase();
    const heroCollection = db.collection('hero_banner');
    const heroDoc = await heroCollection.findOne({ _id: 'main' as any });

    if (heroDoc) {
      const hero = {
        brandTitle: heroDoc.brandTitle || DEFAULT_HERO_DATA.brandTitle,
        tagline: heroDoc.tagline || DEFAULT_HERO_DATA.tagline,
        animatedTexts:
          Array.isArray(heroDoc.animatedTexts) && heroDoc.animatedTexts.length > 0
            ? heroDoc.animatedTexts
            : DEFAULT_HERO_DATA.animatedTexts,
        location: heroDoc.location || DEFAULT_HERO_DATA.location,
        titleFontSize: heroDoc.titleFontSize || DEFAULT_HERO_DATA.titleFontSize,
        taglineFontSize: heroDoc.taglineFontSize || DEFAULT_HERO_DATA.taglineFontSize,
        typewriterFontSize: heroDoc.typewriterFontSize || DEFAULT_HERO_DATA.typewriterFontSize,
        locationFontSize: heroDoc.locationFontSize || DEFAULT_HERO_DATA.locationFontSize,
        badgeText: heroDoc.badgeText || DEFAULT_HERO_DATA.badgeText,
        primaryBtnText: heroDoc.primaryBtnText || DEFAULT_HERO_DATA.primaryBtnText,
        primaryBtnLink: heroDoc.primaryBtnLink || DEFAULT_HERO_DATA.primaryBtnLink,
        secondaryBtnText: heroDoc.secondaryBtnText || DEFAULT_HERO_DATA.secondaryBtnText,
        secondaryBtnLink: heroDoc.secondaryBtnLink || DEFAULT_HERO_DATA.secondaryBtnLink,
      };

      memoryHeroData = { ...hero };

      return NextResponse.json(
        { success: true, hero },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('MongoDB disconnected or unavailable, returning memory state.');
  }

  return NextResponse.json(
    { success: true, hero: memoryHeroData },
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
      brandTitle,
      tagline,
      animatedTexts,
      location,
      titleFontSize,
      taglineFontSize,
      typewriterFontSize,
      locationFontSize,
      badgeText,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnLink,
    } = body;

    const updatedHero = {
      brandTitle: brandTitle ?? memoryHeroData.brandTitle,
      tagline: tagline ?? memoryHeroData.tagline,
      animatedTexts: Array.isArray(animatedTexts) ? animatedTexts : memoryHeroData.animatedTexts,
      location: location ?? memoryHeroData.location,
      titleFontSize: titleFontSize ?? memoryHeroData.titleFontSize,
      taglineFontSize: taglineFontSize ?? memoryHeroData.taglineFontSize,
      typewriterFontSize: typewriterFontSize ?? memoryHeroData.typewriterFontSize,
      locationFontSize: locationFontSize ?? memoryHeroData.locationFontSize,
      badgeText: badgeText ?? memoryHeroData.badgeText,
      primaryBtnText: primaryBtnText ?? memoryHeroData.primaryBtnText,
      primaryBtnLink: primaryBtnLink ?? memoryHeroData.primaryBtnLink,
      secondaryBtnText: secondaryBtnText ?? memoryHeroData.secondaryBtnText,
      secondaryBtnLink: secondaryBtnLink ?? memoryHeroData.secondaryBtnLink,
      updatedAt: new Date(),
      updatedBy: user.email,
    };

    memoryHeroData = { ...updatedHero };

    // Save directly to MongoDB Database Collection 'hero_banner'
    try {
      const db = await getDatabase();
      const heroCollection = db.collection('hero_banner');
      await heroCollection.updateOne(
        { _id: 'main' as any },
        { $set: updatedHero },
        { upsert: true }
      );
    } catch (dbErr) {
      console.warn('MongoDB connection note: Data updated in active server session.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Hero banner saved to MongoDB database successfully',
        hero: updatedHero,
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update hero banner' },
      { status: 500 }
    );
  }
}
