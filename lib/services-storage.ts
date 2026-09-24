import { getDatabase } from '@/lib/mongodb';
import { FullServicePageConfig, DEFAULT_PRIMARY_SERVICE } from '@/types/services';
import fs from 'fs/promises';
import path from 'path';

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_STORAGE_FILE = path.join(LOCAL_STORAGE_DIR, 'services.json');

// In-memory cache
let inMemoryServices: FullServicePageConfig[] = [JSON.parse(JSON.stringify(DEFAULT_PRIMARY_SERVICE))];
let hasLoadedFromFile = false;

async function loadFromLocalFile(): Promise<FullServicePageConfig[] | null> {
  try {
    const data = await fs.readFile(LOCAL_STORAGE_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File doesn't exist yet
  }
  return null;
}

async function saveToLocalFile(services: FullServicePageConfig[]) {
  try {
    await fs.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(services, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Services Storage] Could not save to local file:', err);
  }
}

export async function getAllServices(): Promise<FullServicePageConfig[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection('services_pages');
    const docs = await collection.find({}).sort({ order: 1 }).toArray();

    if (docs && docs.length > 0) {
      const cleanList = docs.map((doc: any) => {
        const { _id, ...rest } = doc;
        return rest as FullServicePageConfig;
      });
      inMemoryServices = cleanList;
      return cleanList;
    } else {
      // First time initialization in MongoDB
      await collection.insertOne({ ...DEFAULT_PRIMARY_SERVICE, _id: DEFAULT_PRIMARY_SERVICE.id as any });
      return [DEFAULT_PRIMARY_SERVICE];
    }
  } catch (error) {
    console.warn('[Services Storage] MongoDB unavailable, using file/memory store:', error);
  }

  if (!hasLoadedFromFile) {
    const fileServices = await loadFromLocalFile();
    if (fileServices) {
      inMemoryServices = fileServices;
    }
    hasLoadedFromFile = true;
  }

  return inMemoryServices.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getServiceBySlug(slug: string): Promise<FullServicePageConfig | null> {
  const services = await getAllServices();
  const normalizedSlug = slug.toLowerCase().trim();

  let match = services.find((s) => s.slug.toLowerCase() === normalizedSlug);
  if (!match && (normalizedSlug === 'primary' || normalizedSlug === 'default' || normalizedSlug === 'services')) {
    match = services.find((s) => s.isPrimary) || services[0];
  }
  return match || null;
}

export async function getServiceById(id: string): Promise<FullServicePageConfig | null> {
  const services = await getAllServices();
  return services.find((s) => s.id === id) || null;
}

export async function getPrimaryService(): Promise<FullServicePageConfig> {
  const services = await getAllServices();
  const primary = services.find((s) => s.isPrimary && s.isActive) || services.find((s) => s.isPrimary) || services[0] || DEFAULT_PRIMARY_SERVICE;
  return primary;
}

export async function saveService(serviceData: FullServicePageConfig): Promise<FullServicePageConfig> {
  const now = new Date().toISOString();
  const updatedService: FullServicePageConfig = {
    ...serviceData,
    updatedAt: now,
  };

  // If this service is primary, demote other primary flags
  if (updatedService.isPrimary) {
    try {
      const db = await getDatabase();
      await db.collection('services_pages').updateMany(
        { id: { $ne: updatedService.id } },
        { $set: { isPrimary: false } }
      );
    } catch {
      // Fallback
    }
    inMemoryServices = inMemoryServices.map((s) => (s.id !== updatedService.id ? { ...s, isPrimary: false } : s));
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('services_pages');
    await collection.updateOne(
      { id: updatedService.id },
      { $set: updatedService },
      { upsert: true }
    );
  } catch (error) {
    console.warn('[Services Storage] MongoDB write failed, saving to file/memory:', error);
  }

  // Update in-memory & file
  const existingIdx = inMemoryServices.findIndex((s) => s.id === updatedService.id);
  if (existingIdx >= 0) {
    inMemoryServices[existingIdx] = updatedService;
  } else {
    inMemoryServices.push(updatedService);
  }
  await saveToLocalFile(inMemoryServices);

  return updatedService;
}

export async function createService(newService: Partial<FullServicePageConfig>): Promise<FullServicePageConfig> {
  const all = await getAllServices();

  const baseTitle = newService.navTitle || newService.pageTitle || 'New Service';
  let slug = newService.slug?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
    baseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (!slug || slug === '-') {
    slug = `service-${Date.now()}`;
  }

  // Ensure unique slug
  let uniqueSlug = slug;
  let counter = 1;
  while (all.some((s) => s.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  const id = `service-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const order = all.length + 1;

  // Use primary service as template base
  const templateBase = JSON.parse(JSON.stringify(DEFAULT_PRIMARY_SERVICE));
  delete templateBase._id;

  const fullService: FullServicePageConfig = {
    ...templateBase,
    ...newService,
    id,
    slug: uniqueSlug,
    navTitle: newService.navTitle || baseTitle,
    pageTitle: newService.pageTitle || `${baseTitle} | Digital Spyke`,
    isPrimary: false,
    isActive: true,
    order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    headerSection: {
      ...templateBase.headerSection,
      ...(newService.headerSection || {}),
    },
    heroSection: {
      ...templateBase.heroSection,
      ...(newService.heroSection || {}),
      headline: newService.heroSection?.headline || `Enterprise ${baseTitle}`,
      headlineHtml: newService.heroSection?.headlineHtml || `Enterprise <span class="text-[#3BA2F9]">${baseTitle}</span>`,
    },
    subServicesSection: {
      ...templateBase.subServicesSection,
      ...(newService.subServicesSection || {}),
      tag: newService.subServicesSection?.tag || `OUR ${baseTitle.toUpperCase()} CAPABILITIES`,
    },
    workProcessSection: {
      ...templateBase.workProcessSection,
      ...(newService.workProcessSection || {}),
    },
    whyChooseUsSection: {
      ...templateBase.whyChooseUsSection,
      ...(newService.whyChooseUsSection || {}),
    },
    portfolioSection: {
      ...templateBase.portfolioSection,
      ...(newService.portfolioSection || {}),
    },
    faqSection: {
      ...templateBase.faqSection,
      ...(newService.faqSection || {}),
    },
    testimonialsSection: {
      ...templateBase.testimonialsSection,
      ...(newService.testimonialsSection || {}),
    },
    leadGenSection: {
      ...templateBase.leadGenSection,
      ...(newService.leadGenSection || {}),
    },
  };

  return await saveService(fullService);
}

export async function deleteService(id: string): Promise<{ success: boolean; message?: string }> {
  const all = await getAllServices();
  const target = all.find((s) => s.id === id);

  if (!target) {
    return { success: false, message: 'Service not found.' };
  }

  if (target.isPrimary) {
    return { success: false, message: 'The primary service cannot be deleted.' };
  }

  try {
    const db = await getDatabase();
    await db.collection('services_pages').deleteOne({ id });
  } catch (error) {
    console.warn('[Services Storage] MongoDB delete failed, updating memory/file:', error);
  }

  inMemoryServices = inMemoryServices.filter((s) => s.id !== id);
  await saveToLocalFile(inMemoryServices);

  return { success: true };
}
