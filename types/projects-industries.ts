export type PointIconType = 'lucide' | 'upload' | 'svg' | 'preset';

export interface ProjectPoint {
  id: string;
  number: string; // e.g. "01", "02"
  iconType: PointIconType;
  iconValue: string; // Icon name, image URL, or raw SVG
  text: string; // HTML or rich text string
  fontSize?: string; // Font size e.g. "1rem"
}

export interface ProjectImageItem {
  id: string;
  src: string; // Image URL or uploaded path
  alt: string;
  row: 1 | 2; // Row 1 (Forward) or Row 2 (Reversed)
  url?: string; // Optional external/internal project link
}

export interface ProjectsSectionData {
  headingHtml: string; // e.g. 'Experience in <span style="background: linear-gradient(to right, #00FFAB, #6B46FF); -webkit-background-clip: text; color: transparent;">dozens of industries</span>'
  headingFontSize?: string; // e.g. "2.5rem"
  descriptionHtml: string; // e.g. "We’re relentlessly curious, fast learners with leading work samples in everything from sport to SaaS."
  descriptionFontSize?: string; // e.g. "1rem"
  speedRow1: number; // e.g. 30
  speedRow2: number; // e.g. 30
  pauseOnHover?: boolean;
  points: ProjectPoint[];
  images: ProjectImageItem[];
}

export const DEFAULT_PROJECTS_DATA: ProjectsSectionData = {
  headingHtml: 'Experience in <span style="background: linear-gradient(to right, #00FFAB, #6B46FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">dozens of industries</span>',
  headingFontSize: '2.5rem',
  descriptionHtml: 'We’re relentlessly curious, fast learners with leading work samples in everything from sport to SaaS.',
  descriptionFontSize: '1rem',
  speedRow1: 30,
  speedRow2: 30,
  pauseOnHover: true,
  points: [
    {
      id: 'point-1',
      number: '01',
      iconType: 'lucide',
      iconValue: 'Zap',
      text: `We don't just build, we research, strategize, and <span style="background: linear-gradient(to right, #00FFAB, #6B46FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">write</span>.`,
    },
    {
      id: 'point-2',
      number: '02',
      iconType: 'lucide',
      iconValue: 'Navigation',
      text: 'Our clients lead their fields in design sophistication.',
    },
  ],
  images: [
    // Row 1 Images
    {
      id: 'img-1',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a8113c902ed9be24cb3_Website%20Hero%20-%206.jpg',
      alt: 'Portfolio project 1',
      row: 1,
    },
    {
      id: 'img-2',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1aa734161be9e87e9635_Website%20Hero%20-%2011.jpg',
      alt: 'Portfolio project 2',
      row: 1,
    },
    {
      id: 'img-3',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a9d6a929aa988b03f0c_Website%20Hero%20-%209.jpg',
      alt: 'Portfolio project 3',
      row: 1,
    },
    {
      id: 'img-4',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1547c258695b6bd21dab_Website%20Hero%20-%201.jpg',
      alt: 'Portfolio project 4',
      row: 1,
    },
    {
      id: 'img-5',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a713d1b552dcd0f9f04_Website%20Hero%20-%205.jpg',
      alt: 'Portfolio project 5',
      row: 1,
    },
    {
      id: 'img-6',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c61d46fba51230bfa4c_Website%20Hero%20-%2013.jpg',
      alt: 'Portfolio project 6',
      row: 1,
    },
    {
      id: 'img-7',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c6d48f910d5ccb7e5f4_Website%20Hero%20-%2014.jpg',
      alt: 'Portfolio project 7',
      row: 1,
    },

    // Row 2 Images
    {
      id: 'img-8',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8c9f36eea2366ebb18d2_Website%20Hero%20-%2015.jpg',
      alt: 'Portfolio project 8',
      row: 2,
    },
    {
      id: 'img-9',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8ca84778afa4ffa5d957_Website%20Hero%20-%2016.jpg',
      alt: 'Portfolio project 9',
      row: 2,
    },
    {
      id: 'img-10',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cb1461adcdb7b19e595_Website%20Hero%20-%2017.jpg',
      alt: 'Portfolio project 10',
      row: 2,
    },
    {
      id: 'img-11',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cb9aef259f32c2c1817_Website%20Hero%20-%2018.jpg',
      alt: 'Portfolio project 11',
      row: 2,
    },
    {
      id: 'img-12',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/688a8cc232871b19eb0dcad4_Website%20Hero%20-%2019.jpg',
      alt: 'Portfolio project 12',
      row: 2,
    },
    {
      id: 'img-13',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a5358db9538fc8a22f6_Website%20Hero%20-%202.jpg',
      alt: 'Portfolio project 13',
      row: 2,
    },
    {
      id: 'img-14',
      src: 'https://cdn.prod.website-files.com/67a50705034192fdd7cff037/67aa1a938f84c5a9fd7966e1_Website%20Hero%20-%208.jpg',
      alt: 'Portfolio project 14',
      row: 2,
    },
  ],
};
