import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { comparePassword, hashPassword, signToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password, rememberMe } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const expiresIn = rememberMe ? '30d' : '7d';
    const maxAgeSeconds = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;

    let db;
    try {
      db = await getDatabase();
    } catch {
      console.warn('MongoDB connection note: database service not detected at 127.0.0.1:27017, switching to Demo Mode.');

      // Fallback check for demo login if MongoDB server is offline
      if (cleanEmail === 'admin@digitalspyke.com' && password === 'admin123') {
        const token = signToken(
          {
            userId: 'demo-admin-id',
            email: cleanEmail,
            name: 'Admin Digital Spyke (Demo)',
            role: 'admin',
          },
          expiresIn
        );

        const res = NextResponse.json({
          success: true,
          message: 'Login successful (Demo Mode)',
          user: {
            id: 'demo-admin-id',
            email: cleanEmail,
            name: 'Admin Digital Spyke (Demo)',
            role: 'admin',
          },
        });

        res.cookies.set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: maxAgeSeconds,
          path: '/',
        });

        return res;
      }

      return NextResponse.json(
        { success: false, message: 'Failed to connect to MongoDB database.' },
        { status: 500 }
      );
    }

    const usersCollection = db.collection('users');
    let user = await usersCollection.findOne({ email: cleanEmail });

    // Auto seed default admin if user is default admin credential and not found in DB
    if (!user && cleanEmail === 'admin@digitalspyke.com' && password === 'admin123') {
      const hashedPassword = await hashPassword('admin123');
      const insertRes = await usersCollection.insertOne({
        name: 'Admin Digital Spyke',
        email: cleanEmail,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = {
        _id: insertRes.insertedId,
        name: 'Admin Digital Spyke',
        email: cleanEmail,
        password: hashedPassword,
        role: 'admin',
      };
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name || 'Admin User',
      role: user.role || 'admin',
    };

    const token = signToken(tokenPayload, expiresIn);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: tokenPayload.userId,
        email: tokenPayload.email,
        name: tokenPayload.name,
        role: tokenPayload.role,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAgeSeconds,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
