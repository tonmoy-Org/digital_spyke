import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface MethodStep {
  id: string;
  stepTag: string;
  category: string;
  categoryColor: string;
  icon: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  checklist: string[];
}

export interface SkillersZoneMethodData {
  badgeText: string;
  badgeFontSize?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  steps: MethodStep[];
}

export const DEFAULT_METHOD_DATA: SkillersZoneMethodData = {
  badgeText: 'THE SKILLERSZONE METHOD',
  badgeFontSize: '0.75rem',
  headingPrefix: 'Simple, transparent steps ',
  headingHighlight: 'that scale with your needs',
  headingFontSize: '3.75rem',
  description:
    'Our systematic approach provides complete clarity, consistent execution, and guaranteed milestones at every stage of growth.',
  descriptionFontSize: '1.125rem',
  steps: [
    {
      id: 'step-1',
      stepTag: 'STEP 1',
      category: 'Discovery & Alignment',
      categoryColor: 'cyan',
      icon: 'Compass',
      title: 'Strategy & Roadmap',
      titleFontSize: '1.5rem',
      description:
        'We start by understanding your business goals, target audience, and challenges. This insight allows us to create a personalized strategy that forms the roadmap for your success.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Target Market & Competitor Audit',
        'Technical Architecture Blueprint',
        'Milestone Timeline & KPI Definition',
        'Resource & Budget Optimization',
      ],
    },
    {
      id: 'step-2',
      stepTag: 'STEP 2',
      category: 'Sprint Deployment',
      categoryColor: 'blue',
      icon: 'Cpu',
      title: 'Execution & Monitoring',
      titleFontSize: '1.5rem',
      description:
        'From planning to execution, we provide complete support, ensuring every aspect of your operations is streamlined for efficiency, scalability, and measurable results.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Agile Sprint Delivery',
        'Continuous QA & Integration',
        '24/7 Operations Monitoring',
        'Scalable Cloud Infrastructure',
      ],
    },
    {
      id: 'step-3',
      stepTag: 'STEP 3',
      category: 'Full Visibility',
      categoryColor: 'purple',
      icon: 'LayoutDashboard',
      title: 'Client Dashboard',
      titleFontSize: '1.5rem',
      description:
        'Your personalized dashboard with full visibility and control. Access the software on a test basis, track performance, and experience how it streamlines operations before going live.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Real-time Milestone Tracking',
        'Live Staging Sandbox Preview',
        'Direct Team Communication Hub',
        'Performance & SLA Metrics',
      ],
    },
    {
      id: 'step-4',
      stepTag: 'STEP 4',
      category: 'Honest Accountability',
      categoryColor: 'sky',
      icon: 'FileCheck2',
      title: 'Transparency, Credibility & Reporting',
      titleFontSize: '1.5rem',
      description:
        'Our data-driven reports ensure full transparency, reinforce credibility, and keep you informed at every stage.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Weekly Detailed Analytics Reports',
        'Conversion & Traffic Breakdowns',
        'Transparent Resource Logging',
        'Clear ROI Impact Tracking',
      ],
    },
    {
      id: 'step-5',
      stepTag: 'STEP 5',
      category: 'Continuous Evolution',
      categoryColor: 'emerald',
      icon: 'LineChart',
      title: 'Growth Analysis & Feedback',
      titleFontSize: '1.5rem',
      description:
        'We continuously monitor performance, refine strategies, track your growth and provide ongoing feedback helping your business adapt, scale, and thrive in a competitive market.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Continuous Strategy Iteration',
        'Market Expansion Advisory',
        'Long-term Scaling Support',
        'Dedicated Growth Partnership',
      ],
    },
  ],
};

let memoryData = JSON.parse(JSON.stringify(DEFAULT_METHOD_DATA));

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('skillerszone_method');
    const doc = await collection.findOne({ _id: 'main' as any });

    if (doc) {
      const data: SkillersZoneMethodData = {
        badgeText: doc.badgeText || DEFAULT_METHOD_DATA.badgeText,
        badgeFontSize: doc.badgeFontSize || DEFAULT_METHOD_DATA.badgeFontSize,
        headingPrefix: doc.headingPrefix ?? DEFAULT_METHOD_DATA.headingPrefix,
        headingHighlight: doc.headingHighlight || DEFAULT_METHOD_DATA.headingHighlight,
        headingFontSize: doc.headingFontSize || DEFAULT_METHOD_DATA.headingFontSize,
        description: doc.description || DEFAULT_METHOD_DATA.description,
        descriptionFontSize: doc.descriptionFontSize || DEFAULT_METHOD_DATA.descriptionFontSize,
        steps:
          Array.isArray(doc.steps) && doc.steps.length > 0
            ? doc.steps
            : DEFAULT_METHOD_DATA.steps,
      };

      memoryData = JSON.parse(JSON.stringify(data));

      return NextResponse.json(
        { success: true, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }
  } catch (error) {
    console.warn('[SkillersZoneMethod API] MongoDB disconnected or unavailable, using in-memory state.');
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
      headingPrefix,
      headingHighlight,
      headingFontSize,
      description,
      descriptionFontSize,
      steps,
    } = body;

    const updatedData: SkillersZoneMethodData = {
      badgeText: typeof badgeText === 'string' ? badgeText : memoryData.badgeText,
      badgeFontSize: typeof badgeFontSize === 'string' ? badgeFontSize : memoryData.badgeFontSize,
      headingPrefix: typeof headingPrefix === 'string' ? headingPrefix : memoryData.headingPrefix,
      headingHighlight: typeof headingHighlight === 'string' ? headingHighlight : memoryData.headingHighlight,
      headingFontSize: typeof headingFontSize === 'string' ? headingFontSize : memoryData.headingFontSize,
      description: typeof description === 'string' ? description : memoryData.description,
      descriptionFontSize: typeof descriptionFontSize === 'string' ? descriptionFontSize : memoryData.descriptionFontSize,
      steps: Array.isArray(steps) && steps.length > 0 ? steps : memoryData.steps,
    };

    memoryData = JSON.parse(JSON.stringify(updatedData));

    try {
      const db = await getDatabase();
      const collection = db.collection('skillerszone_method');
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
      console.warn('[SkillersZoneMethod API] MongoDB update skipped (fallback to memory):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'The SkillersZone Method settings updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    console.error('[SkillersZoneMethod API] Error updating settings:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
