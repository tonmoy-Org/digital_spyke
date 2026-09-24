import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  saveService,
  createService,
  deleteService,
} from '@/lib/services-storage';
import { FullServicePageConfig } from '@/types/services';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const isNav = searchParams.get('nav') === 'true';

    if (slug) {
      const service = await getServiceBySlug(slug);
      if (!service) {
        return NextResponse.json(
          { success: false, message: 'Service not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, service },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }

    if (id) {
      const service = await getServiceById(id);
      if (!service) {
        return NextResponse.json(
          { success: false, message: 'Service not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, service },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }

    const services = await getAllServices();

    if (isNav) {
      const navLinks = services
        .filter((s) => s.isActive)
        .map((s) => ({
          id: s.id,
          text: s.navTitle,
          href: s.isPrimary ? '/services' : `/services/${s.slug}`,
          slug: s.slug,
          isPrimary: s.isPrimary,
          order: s.order,
        }));
      return NextResponse.json(
        { success: true, navLinks },
        { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
      );
    }

    return NextResponse.json(
      { success: true, services },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
  } catch (error: any) {
    console.error('[Services API GET Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const created = await createService(body);

    return NextResponse.json({
      success: true,
      message: 'Service created successfully!',
      service: created,
    });
  } catch (error: any) {
    console.error('[Services API POST Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as FullServicePageConfig;
    if (!body || !body.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload: missing service ID.' },
        { status: 400 }
      );
    }

    const updated = await saveService(body);

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully!',
      service: updated,
    });
  } catch (error: any) {
    console.error('[Services API PUT Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing service id' },
        { status: 400 }
      );
    }

    const result = await deleteService(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message || 'Could not delete service' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    console.error('[Services API DELETE Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete service' },
      { status: 500 }
    );
  }
}
