import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);

  if (!user) {
    return NextResponse.json(
      { success: false, authenticated: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
