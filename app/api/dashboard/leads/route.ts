import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const leadsCollection = db.collection('leads');
    const leads = await leadsCollection.find({}).sort({ createdAt: -1 }).toArray();

    const formattedLeads = leads.map((lead) => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone || 'N/A',
      service: lead.service || 'General Inquiry',
      budget: lead.budget || 'Unspecified',
      message: lead.message || '',
      status: lead.status || 'New',
      createdAt: lead.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, leads: formattedLeads });
  } catch (error: any) {
    console.warn('Leads API: Returning empty leads list.');
    return NextResponse.json({ success: true, leads: [] });
  }
}

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const leadsCollection = db.collection('leads');

    const newLead = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      service: service || 'Web Development',
      budget: budget || '$2,500 - $5,000',
      message: message || '',
      status: status || 'New',
      createdAt: new Date(),
    };

    const result = await leadsCollection.insertOne(newLead);

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      lead: { id: result.insertedId.toString(), ...newLead },
    });
  } catch (error: any) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Lead ID and new status are required.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const leadsCollection = db.collection('leads');

    let filter: any;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { _id: id };
    }

    const result = await leadsCollection.updateOne(
      filter,
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead status updated successfully.' });
  } catch (error: any) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update lead status' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID parameter required.' }, { status: 400 });
    }

    const db = await getDatabase();
    const leadsCollection = db.collection('leads');

    let filter: any;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { _id: id };
    }

    const result = await leadsCollection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully.' });
  } catch (error: any) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
