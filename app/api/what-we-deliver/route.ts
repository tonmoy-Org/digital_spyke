import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ServiceCard {
  id: string;
  number: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  icon: string;
  tags: string[];
  accentGradient?: string;
}

export interface WhatWeDeliverData {
  badgeText: string;
  badgeFontSize?: string;
  badgeIcon?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  services: ServiceCard[];
}

export const DEFAULT_WHAT_WE_DELIVER_DATA: WhatWeDeliverData = {
  badgeText: 'What We Deliver',
  badgeFontSize: '0.75rem',
  badgeIcon: 'Sparkles',
  headingPrefix: 'High-Impact Solutions for ',
  headingHighlight: 'Global Scale',
  headingFontSize: '3rem',
  description:
    'From technical development to digital reach and operations, our end-to-end expertise fuels sustainable growth.',
  descriptionFontSize: '1.125rem',
  services: [
    {
      id: 'service-1',
      number: '01',
      title: 'Software Development',
      titleFontSize: '1.5rem',
      description:
        'From intuitive interfaces to advanced integrations, we build software that helps you launch and grow without the tech headaches. Create powerful solutions designed for performance and scale.',
      descriptionFontSize: '0.875rem',
      icon: 'Code2',
      tags: [
        'Website Design & Development',
        'UI/UX Design',
        'Apps Development',
        'ERP Development',
      ],
      accentGradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'service-2',
      number: '02',
      title: 'Digital Marketing',
      titleFontSize: '1.5rem',
      description:
        'A full suite of digital marketing solutions, from social media management and ad campaigns to SEO and content creation. Engage the right audience, build lasting visibility, and achieve measurable results.',
      descriptionFontSize: '0.875rem',
      icon: 'TrendingUp',
      tags: [
        'Social Media Management',
        'Search Engine Optimization',
        'Ad Management',
        'Content Creation & Curation',
      ],
      accentGradient: 'from-emerald-400 to-cyan-500',
    },
    {
      id: 'service-3',
      number: '03',
      title: 'Resource Augmentation',
      titleFontSize: '1.5rem',
      description:
        'Streamline your business operations smoothly as we handle customer support, back-office processes, and other tasks, allowing your team to focus on growth, efficiency, and better service outcomes.',
      descriptionFontSize: '0.875rem',
      icon: 'Users2',
      tags: ['Virtual Assistant', 'Appointment Setter', 'Lead Generation'],
      accentGradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'service-4',
      number: '04',
      title: 'E-commerce Store Management',
      titleFontSize: '1.5rem',
      description:
        'Launch your online business with Amazon FBA, FBM, dropshipping, and other top e-commerce platforms. Gain visibility on marketplaces and open your storefront to shoppers worldwide.',
      descriptionFontSize: '0.875rem',
      icon: 'ShoppingBag',
      tags: [
        'Amazon (FBA, FBM, Dropshipping)',
        'Shopify',
        'Walmart',
        'Etsy',
      ],
      accentGradient: 'from-purple-500 to-pink-500',
    },
  ],
};

// In-memory fallback if MongoDB is disconnected or temporarily unavailable
let memoryData = JSON.parse(JSON.stringify(DEFAULT_WHAT_WE_DELIVER_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('what_we_deliver');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: WhatWeDeliverData = {
        badgeText: doc.badgeText || DEFAULT_WHAT_WE_DELIVER_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_WHAT_WE_DELIVER_DATA.badgeFontSize,
        badgeIcon: doc.badgeIcon || DEFAULT_WHAT_WE_DELIVER_DATA.badgeIcon,
        headingPrefix: doc.headingPrefix ?? DEFAULT_WHAT_WE_DELIVER_DATA.headingPrefix,
        headingHighlight: doc.headingHighlight || DEFAULT_WHAT_WE_DELIVER_DATA.headingHighlight,
        headingFontSize: doc.headingFontSize || DEFAULT_WHAT_WE_DELIVER_DATA.headingFontSize,
        description: doc.description || DEFAULT_WHAT_WE_DELIVER_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_WHAT_WE_DELIVER_DATA.descriptionFontSize,
        services:
          Array.isArray(doc.services) && doc.services.length > 0
            ? doc.services
            : DEFAULT_WHAT_WE_DELIVER_DATA.services,
      };

      memoryData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[WhatWeDeliver API] MongoDB disconnected or unavailable, using in-memory state.');
  }

  return NextResponse.json(
    { success: true, data: memoryData },
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
      headingPrefix,
      headingHighlight,
      headingFontSize,
      description,
      descriptionFontSize,
      services,
    } = body;

    const updatedData: WhatWeDeliverData = {
      badgeText: typeof badgeText === 'string' ? badgeText : memoryData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : memoryData.badgeFontSize,
      badgeIcon: typeof badgeIcon === 'string' ? badgeIcon : memoryData.badgeIcon,
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryData.headingPrefix,
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryData.headingHighlight,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : memoryData.headingFontSize,
      description: typeof description === 'string' ? description : memoryData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : memoryData.descriptionFontSize,
      services: Array.isArray(services) && services.length > 0 ? services : memoryData.services,
    };

    memoryData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('what_we_deliver');
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
      console.warn('[WhatWeDeliver API] MongoDB update skipped (fallback to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'What We Deliver settings updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    console.error('[WhatWeDeliver API] Error updating settings:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
