import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return seedDatabase();
}

export async function POST() {
  return seedDatabase();
}

async function seedDatabase() {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Create unique index on email
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    let adminUser = await usersCollection.findOne({ email: 'admin@digitalspyke.com' });
    let createdAdmin = false;

    if (!adminUser) {
      const hashedPassword = await hashPassword('admin123');
      const result = await usersCollection.insertOne({
        name: 'Admin Digital Spyke',
        email: 'admin@digitalspyke.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      adminUser = { _id: result.insertedId, name: 'Admin Digital Spyke', email: 'admin@digitalspyke.com', role: 'admin' };
      createdAdmin = true;
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      createdAdmin,
      adminEmail: 'admin@digitalspyke.com',
      demoPassword: 'admin123',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      demoMode: true,
      message: 'Operating in Demo Mode with built-in credentials.',
      adminEmail: 'admin@digitalspyke.com',
      demoPassword: 'admin123',
    });
  }
}
