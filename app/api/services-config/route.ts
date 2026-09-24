import { NextRequest, NextResponse } from 'next/server';
import { getPrimaryService, saveService } from '@/lib/services-storage';
import { verifyAuth } from '@/lib/auth';
import { DEFAULT_PRIMARY_SERVICE, FullServicePageConfig } from '@/types/services';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type ServicesConfig = FullServicePageConfig;
export const DEFAULT_SERVICES_CONFIG = DEFAULT_PRIMARY_SERVICE;

export async function GET() {
  try {
    const config = await getPrimaryService();
    return NextResponse.json({
      success: true,
      config,
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' }
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      config: DEFAULT_PRIMARY_SERVICE,
    });
  }
}

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const primary = await getPrimaryService();
    const updated = await saveService({
      ...primary,
      ...body,
      isPrimary: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Primary services configuration updated.',
      config: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update config' },
      { status: 500 }
    );
  }
}
