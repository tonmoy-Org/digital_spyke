import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ProcessCard {
  id: string;
  step: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  icon: string;
  tags: string[];
  bgImage?: string;
}

export interface ProcessSectionData {
  badgeText: string;
  badgeFontSize?: string;
  headingPrefix: string;
  headingFontSize?: string;
  headingHighlight: string;
  description: string;
  descriptionFontSize?: string;
  ctaText: string;
  ctaLink: string;
  cards: ProcessCard[];
}

export const DEFAULT_PROCESS_DATA: ProcessSectionData = {
  badgeText: 'OUR PROVEN PROCESS',
  badgeFontSize: '0.75rem',
  headingPrefix: 'We Simplify The ',
  headingFontSize: '3.75rem',
  headingHighlight: 'Journey',
  description:
    'From initial ideation to live global deployment, we execute every phase with precision, transparent communication, and Agile velocity.',
  descriptionFontSize: '1rem',
  ctaText: 'Work With Us!',
  ctaLink: '/contact',
  cards: [
    {
      id: 'step-1',
      step: '01',
      title: 'Planning',
      description:
        'At the start of each project, we work with our clients to build a solid project plan. The initial scope document can come from the client or through a combined process of phone calls and in-person meetings.',
      icon: 'EventNote',
      tags: ['Project Scope', 'Milestone Planning', 'Roadmap'],
      bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
    },
    {
      id: 'step-2',
      step: '02',
      title: 'Wireframing',
      description:
        'Once the project plan and scope have been finalized, our wireframing team determines the placement of all objects on each page of the application. Whether it is a consumer mobile app or a backend business application, this stage ensures final agreement on what will be placed on each page for the user to access.',
      icon: 'GridView',
      tags: ['UX Architecture', 'Interactive Wireframes', 'Layout'],
      bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
    },
    {
      id: 'step-3',
      step: '03',
      title: 'Design',
      description:
        'After finalizing wireframes, our design team creates the final appearance and functionality of the application. This is an exciting stage where the entire application comes to life. We provide clickable versions to fully experience user interactions before development begins.',
      icon: 'Brush',
      tags: ['UI Design', 'Design Systems', 'Interactive Prototypes'],
      bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
    },
    {
      id: 'step-4',
      step: '04',
      title: 'Development',
      description:
        'With finalized wireframes and designs, we begin coding the application. As an Agile development team, we break down the project into feature sets called Sprints. This approach allows customers to review progress regularly and provide feedback at the end of each Sprint, ensuring continuous involvement.',
      icon: 'Code',
      tags: ['Full-Stack Code', 'Agile Sprints', 'Clean Architecture'],
      bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
    },
    {
      id: 'step-5',
      step: '05',
      title: 'Testing',
      description:
        "The testing process ensures that the application is functional, reliable, and user-friendly. It involves multiple stages, using various techniques and tools to identify and fix defects, bugs, and usability issues before release. This step improves the user experience and guarantees the product's success.",
      icon: 'BugReport',
      tags: ['Quality Assurance', 'Security & Speed', 'Cross-Device QA'],
      bgImage: 'https://framerusercontent.com/images/KfsUX7SjXWF8GYOil2kfkZ9e1PA.png',
    },
    {
      id: 'step-6',
      step: '06',
      title: 'Deployment',
      description:
        'After the application passes internal QA, project management, and client approval, it is ready for deployment. Hosting options vary from client-owned servers to web or cloud hosting. We guide clients through these options and handle the final deployment stages.',
      icon: 'CloudUpload',
      tags: ['Cloud Infrastructure', 'CI/CD Pipeline', 'Live Launch'],
      bgImage: 'https://framerusercontent.com/images/3fTl0jOeNCf5k69Fvi5Sj616o.svg',
    },
  ],
};

// In-memory fallback if MongoDB connection is temporarily unavailable
let memoryProcessData = JSON.parse(JSON.stringify(DEFAULT_PROCESS_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('process_steps');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: ProcessSectionData = {
        badgeText: doc.badgeText || DEFAULT_PROCESS_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_PROCESS_DATA.badgeFontSize,
        headingPrefix: doc.headingPrefix ?? DEFAULT_PROCESS_DATA.headingPrefix,
        headingFontSize: doc.headingFontSize || DEFAULT_PROCESS_DATA.headingFontSize,
        headingHighlight: doc.headingHighlight || DEFAULT_PROCESS_DATA.headingHighlight,
        description: doc.description || DEFAULT_PROCESS_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_PROCESS_DATA.descriptionFontSize,
        ctaText: doc.ctaText || DEFAULT_PROCESS_DATA.ctaText,
        ctaLink: doc.ctaLink || DEFAULT_PROCESS_DATA.ctaLink,
        cards: Array.isArray(doc.cards) && doc.cards.length > 0 ? doc.cards : DEFAULT_PROCESS_DATA.cards,
      };

      memoryProcessData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[ProcessSteps API] MongoDB disconnected or unavailable, using in-memory state.');
  }

  return NextResponse.json(
    { success: true, data: memoryProcessData },
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
      headingFontSize,
      headingHighlight,
      description,
      descriptionFontSize,
      ctaText,
      ctaLink,
      cards,
    } = body;

    const updatedData: ProcessSectionData = {
      badgeText: typeof badgeText === 'string' ? badgeText : memoryProcessData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : (memoryProcessData.badgeFontSize || DEFAULT_PROCESS_DATA.badgeFontSize),
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryProcessData.headingPrefix,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : (memoryProcessData.headingFontSize || DEFAULT_PROCESS_DATA.headingFontSize),
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryProcessData.headingHighlight,
      description: typeof description === 'string' ? description : memoryProcessData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : (memoryProcessData.descriptionFontSize || DEFAULT_PROCESS_DATA.descriptionFontSize),
      ctaText: typeof ctaText === 'string' ? ctaText : memoryProcessData.ctaText,
      ctaLink: typeof ctaLink === 'string' ? ctaLink : memoryProcessData.ctaLink,
      cards: Array.isArray(cards) && cards.length > 0 ? cards : memoryProcessData.cards,
    };

    memoryProcessData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('process_steps');
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
      console.warn('[ProcessSteps API] MongoDB update skipped (fallback to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Process Steps updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    console.error('[ProcessSteps API] Error updating process steps:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
