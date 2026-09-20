import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const leadsCollection = db.collection('leads');

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalLeads = await leadsCollection.countDocuments();
    const todaysLeads = await leadsCollection.countDocuments({ createdAt: { $gte: startOfToday } });
    const yesterdaysLeads = await leadsCollection.countDocuments({
      createdAt: { $gte: startOfYesterday, $lt: startOfToday },
    });
    const monthlyLeads = await leadsCollection.countDocuments({ createdAt: { $gte: startOfMonth } });

    // Generate last 7 days report
    const last7DaysReport = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1);
      const count = await leadsCollection.countDocuments({
        createdAt: { $gte: dayStart, $lt: dayEnd },
      });
      const dayName = dayStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      last7DaysReport.push({ day: dayName, count });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: totalLeads || 0,
        todaysLeads: todaysLeads || 0,
        yesterdaysLeads: yesterdaysLeads || 0,
        monthlyLeads: monthlyLeads || 0,
        last7DaysReport,
      },
    });
  } catch (error: any) {
    console.warn('Dashboard stats: Returning 0 stats fallback.');

    const now = new Date();
    const empty7Days = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayName = dayStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      empty7Days.push({ day: dayName, count: 0 });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: 0,
        todaysLeads: 0,
        yesterdaysLeads: 0,
        monthlyLeads: 0,
        last7DaysReport: empty7Days,
      },
    });
  }
}
