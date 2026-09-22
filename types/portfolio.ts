export interface PortfolioProduct {
  id: string;
  title: string;
  titleFontSize?: string;
  link: string;
  thumbnail: string;
}

export interface PortfolioSectionData {
  badgeText: string;
  badgeFontSize?: string;
  badgeIcon?: string;
  badgeIconColor?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingFontSize?: string;
  headingHtml?: string;
  description: string;
  descriptionFontSize?: string;
  descriptionHtml?: string;
  products: PortfolioProduct[];
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioSectionData = {
  badgeText: 'PORTFOLIO',
  badgeFontSize: '0.875rem',
  badgeIcon: 'Dot',
  badgeIconColor: '#38bdf8',
  headingPrefix: 'Our journey of ',
  headingHighlight: 'success stories',
  headingFontSize: '4.5rem',
  headingHtml:
    'Our journey of <br /><span class="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">success stories</span>',
  description:
    'We build beautiful products with the latest technologies and frameworks. Explore our featured work showcasing cutting-edge development, seamless user experience, and measurable brand growth.',
  descriptionFontSize: '1.125rem',
  descriptionHtml:
    'We build beautiful products with the latest technologies and frameworks. Explore our featured work showcasing cutting-edge development, seamless user experience, and measurable brand growth.',
  products: [
    {
      id: 'prod-1',
      title: 'Moonbeam',
      titleFontSize: '1.125rem',
      link: 'https://gomoonbeam.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png',
    },
    {
      id: 'prod-2',
      title: 'Cursor',
      titleFontSize: '1.125rem',
      link: 'https://cursor.so',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/cursor.png',
    },
    {
      id: 'prod-3',
      title: 'Rogue',
      titleFontSize: '1.125rem',
      link: 'https://userogue.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/rogue.png',
    },
    {
      id: 'prod-4',
      title: 'Editorially',
      titleFontSize: '1.125rem',
      link: 'https://editorially.org',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/editorially.png',
    },
    {
      id: 'prod-5',
      title: 'Editrix AI',
      titleFontSize: '1.125rem',
      link: 'https://editrix.ai',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/editrix.png',
    },
    {
      id: 'prod-6',
      title: 'Pixel Perfect',
      titleFontSize: '1.125rem',
      link: 'https://app.pixelperfect.quest',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png',
    },
    {
      id: 'prod-7',
      title: 'Algochurn',
      titleFontSize: '1.125rem',
      link: 'https://algochurn.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/algochurn.png',
    },
    {
      id: 'prod-8',
      title: 'Aceternity UI',
      titleFontSize: '1.125rem',
      link: 'https://ui.aceternity.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png',
    },
    {
      id: 'prod-9',
      title: 'Tailwind Master Kit',
      titleFontSize: '1.125rem',
      link: 'https://tailwindmasterkit.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png',
    },
    {
      id: 'prod-10',
      title: 'SmartBridge',
      titleFontSize: '1.125rem',
      link: 'https://smartbridgetech.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png',
    },
    {
      id: 'prod-11',
      title: 'Renderwork Studio',
      titleFontSize: '1.125rem',
      link: 'https://renderwork.studio',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/renderwork.png',
    },
    {
      id: 'prod-12',
      title: 'Creme Digital',
      titleFontSize: '1.125rem',
      link: 'https://cremedigital.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png',
    },
    {
      id: 'prod-13',
      title: 'Golden Bells Academy',
      titleFontSize: '1.125rem',
      link: 'https://goldenbellsacademy.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png',
    },
    {
      id: 'prod-14',
      title: 'Invoker Labs',
      titleFontSize: '1.125rem',
      link: 'https://invoker.lol',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/invoker.png',
    },
    {
      id: 'prod-15',
      title: 'E Free Invoice',
      titleFontSize: '1.125rem',
      link: 'https://efreeinvoice.com',
      thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png',
    },
  ],
};
