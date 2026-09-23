import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { FAQSectionData, DEFAULT_FAQ_DATA, FAQItem } from '@/types/faq';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryFaqData: FAQSectionData = JSON.parse(JSON.stringify(DEFAULT_FAQ_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('faq_section');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: FAQSectionData = {
        showBadge: doc.showBadge !== undefined ? Boolean(doc.showBadge) : DEFAULT_FAQ_DATA.showBadge,
        badgeText: doc.badgeText ?? DEFAULT_FAQ_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_FAQ_DATA.badgeFontSize,
        badgeColor: doc.badgeColor || DEFAULT_FAQ_DATA.badgeColor,
        badgeBgColor: doc.badgeBgColor || DEFAULT_FAQ_DATA.badgeBgColor,
        headingPrefix: doc.headingPrefix ?? DEFAULT_FAQ_DATA.headingPrefix,
        headingHighlight: doc.headingHighlight ?? DEFAULT_FAQ_DATA.headingHighlight,
        headingSuffix: doc.headingSuffix ?? DEFAULT_FAQ_DATA.headingSuffix,
        headingFontSize: doc.headingFontSize || DEFAULT_FAQ_DATA.headingFontSize,
        headingHtml: doc.headingHtml || DEFAULT_FAQ_DATA.headingHtml,
        description: doc.description ?? DEFAULT_FAQ_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_FAQ_DATA.descriptionFontSize,
        descriptionHtml: doc.descriptionHtml || DEFAULT_FAQ_DATA.descriptionHtml,
        showSideImage: doc.showSideImage !== undefined ? Boolean(doc.showSideImage) : DEFAULT_FAQ_DATA.showSideImage,
        sideImageUrl: doc.sideImageUrl ?? DEFAULT_FAQ_DATA.sideImageUrl,
        sideImageAlt: doc.sideImageAlt ?? DEFAULT_FAQ_DATA.sideImageAlt,
        showCategoryFilter: doc.showCategoryFilter !== undefined ? Boolean(doc.showCategoryFilter) : DEFAULT_FAQ_DATA.showCategoryFilter,
        accordionIconType: doc.accordionIconType || DEFAULT_FAQ_DATA.accordionIconType,
        iconColor: doc.iconColor || DEFAULT_FAQ_DATA.iconColor,
        categories: Array.isArray(doc.categories) && doc.categories.length > 0 ? doc.categories : DEFAULT_FAQ_DATA.categories,
        faqs:
          Array.isArray(doc.faqs) && doc.faqs.length > 0
            ? doc.faqs.map((item: any, idx: number) => ({
                id: item.id || `faq-${idx + 1}`,
                question: item.question || '',
                questionHtml: item.questionHtml || item.question || '',
                questionFontSize: item.questionFontSize || '1.125rem',
                questionColor: item.questionColor || '#ffffff',
                answer: item.answer || '',
                answerHtml: item.answerHtml || item.answer || '',
                answerFontSize: item.answerFontSize || '0.9375rem',
                answerColor: item.answerColor || '#9ca3af',
                category: item.category || 'General',
                iconType: item.iconType || 'icon',
                icon: item.icon || 'HelpCircle',
                image: item.image || '',
                iconBgColor: item.iconBgColor || 'rgba(0, 255, 171, 0.15)',
                isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
                order: typeof item.order === 'number' ? item.order : idx + 1,
              }))
            : DEFAULT_FAQ_DATA.faqs,
      };

      memoryFaqData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[FAQ API] MongoDB unavailable, using memory state:', error);
  }

  return NextResponse.json(
    { success: true, data: memoryFaqData },
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
      showBadge,
      badgeText,
      badgeFontSize,
      badgeColor,
      badgeBgColor,
      headingPrefix,
      headingHighlight,
      headingSuffix,
      headingFontSize,
      headingHtml,
      description,
      descriptionFontSize,
      descriptionHtml,
      showSideImage,
      sideImageUrl,
      sideImageAlt,
      showCategoryFilter,
      accordionIconType,
      iconColor,
      categories,
      faqs,
    } = body;

    const sanitizedFaqs: FAQItem[] = Array.isArray(faqs)
      ? faqs.map((item: any, idx: number) => ({
          id: item.id || `faq-${Date.now()}-${idx}`,
          question: typeof item.question === 'string' ? item.question.trim() : '',
          questionHtml: typeof item.questionHtml === 'string' ? item.questionHtml : item.question || '',
          questionFontSize: item.questionFontSize || '1.125rem',
          questionColor: item.questionColor || '#ffffff',
          answer: typeof item.answer === 'string' ? item.answer : '',
          answerHtml: typeof item.answerHtml === 'string' ? item.answerHtml : item.answer || '',
          answerFontSize: item.answerFontSize || '0.9375rem',
          answerColor: item.answerColor || '#9ca3af',
          category: typeof item.category === 'string' && item.category.trim() ? item.category.trim() : 'General',
          iconType: ['icon', 'image', 'none'].includes(item.iconType) ? item.iconType : 'icon',
          icon: typeof item.icon === 'string' ? item.icon : 'HelpCircle',
          image: typeof item.image === 'string' ? item.image : '',
          iconBgColor: typeof item.iconBgColor === 'string' ? item.iconBgColor : 'rgba(0, 255, 171, 0.15)',
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
          order: typeof item.order === 'number' ? item.order : idx + 1,
        }))
      : memoryFaqData.faqs;

    const updatedData: FAQSectionData = {
      showBadge: showBadge !== undefined ? Boolean(showBadge) : memoryFaqData.showBadge,
      badgeText: typeof badgeText === 'string' ? badgeText : memoryFaqData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : memoryFaqData.badgeFontSize,
      badgeColor: typeof badgeColor === 'string' ? badgeColor : memoryFaqData.badgeColor,
      badgeBgColor: typeof badgeBgColor === 'string' ? badgeBgColor : memoryFaqData.badgeBgColor,
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryFaqData.headingPrefix,
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryFaqData.headingHighlight,
      headingSuffix: typeof headingSuffix === 'string' ? headingSuffix : (memoryFaqData.headingSuffix || ''),
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : memoryFaqData.headingFontSize,
      headingHtml: typeof headingHtml === 'string' ? headingHtml : memoryFaqData.headingHtml,
      description: typeof description === 'string' ? description : memoryFaqData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : memoryFaqData.descriptionFontSize,
      descriptionHtml: typeof descriptionHtml === 'string' ? descriptionHtml : memoryFaqData.descriptionHtml,
      showSideImage: showSideImage !== undefined ? Boolean(showSideImage) : memoryFaqData.showSideImage,
      sideImageUrl: typeof sideImageUrl === 'string' ? sideImageUrl : memoryFaqData.sideImageUrl,
      sideImageAlt: typeof sideImageAlt === 'string' ? sideImageAlt : memoryFaqData.sideImageAlt,
      showCategoryFilter: showCategoryFilter !== undefined ? Boolean(showCategoryFilter) : memoryFaqData.showCategoryFilter,
      accordionIconType: ['plus', 'chevron', 'arrow', 'help'].includes(accordionIconType)
        ? accordionIconType
        : memoryFaqData.accordionIconType,
      iconColor: typeof iconColor === 'string' ? iconColor : (memoryFaqData.iconColor || '#22d3ee'),
      categories: Array.isArray(categories) && categories.length > 0 ? categories : memoryFaqData.categories,
      faqs: sanitizedFaqs,
    };

    memoryFaqData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('faq_section');
      await collection.updateOne(
        { _id: 'main' as any },
        { $set: { ...updatedData, updatedAt: new Date() } },
        { upsert: true }
      );
    } catch (dbErr) {
      console.warn('[FAQ API] MongoDB update failed, saved to memory:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ section updated successfully',
      data: updatedData,
    });
  } catch (error: any) {
    console.error('[FAQ API] Error saving FAQ section:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update FAQ section' },
      { status: 500 }
    );
  }
}
