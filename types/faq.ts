export interface FAQItem {
  id: string;
  question: string;
  questionHtml?: string;
  questionFontSize?: string;
  questionColor?: string;
  answer: string;
  answerHtml?: string;
  answerFontSize?: string;
  answerColor?: string;
  category?: string;
  iconType?: 'icon' | 'image' | 'none';
  icon?: string;
  image?: string;
  iconBgColor?: string;
  isActive: boolean;
  order: number;
}

export interface FAQSectionData {
  showBadge?: boolean;
  badgeText?: string;
  badgeFontSize?: string;
  badgeColor?: string;
  badgeBgColor?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix?: string;
  headingFontSize?: string;
  headingHtml?: string;
  description: string;
  descriptionFontSize?: string;
  descriptionHtml?: string;
  showSideImage?: boolean;
  sideImageUrl?: string;
  sideImageAlt?: string;
  showCategoryFilter?: boolean;
  accordionIconType?: 'plus' | 'chevron' | 'arrow' | 'help';
  iconColor?: string;
  categories: string[];
  faqs: FAQItem[];
}

export const DEFAULT_FAQ_DATA: FAQSectionData = {
  showBadge: false,
  badgeText: 'Frequently Asked Questions',
  badgeFontSize: '0.75rem',
  badgeColor: '#00FFAB',
  badgeBgColor: 'rgba(0, 255, 171, 0.1)',
  headingPrefix: 'Frequently asked',
  headingHighlight: 'questions',
  headingSuffix: '',
  headingFontSize: '3.75rem',
  headingHtml: '',
  description: 'Everything you need to know about our services, process, security standards, and support.',
  descriptionFontSize: '1rem',
  descriptionHtml: '',
  showSideImage: false,
  sideImageUrl: '',
  sideImageAlt: 'FAQ Illustration',
  showCategoryFilter: false,
  accordionIconType: 'plus',
  iconColor: '#22d3ee',
  categories: ['All', 'General', 'Services', 'Security', 'Support'],
  faqs: [
    {
      id: 'faq-1',
      question: "Where can I see Digital Spyke's past work?",
      questionHtml: "Where can I see Digital Spyke's past work?",
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: "Simply reach out to us via the contact form on this website or at contact@digitalspyke.com, let us know what type of project you’re imagining, and we will share samples of comparable past projects with you. We've successfully optimized infrastructure for clients like Shipway, reducing costs through AMD processors and AWS migrations, and supported crypto banks with blockchain solutions.",
      answerHtml: "Simply reach out to us via the contact form on this website or at <strong style=\"color: #22d3ee;\">contact@digitalspyke.com</strong>, let us know what type of project you’re imagining, and we will share samples of comparable past projects with you. We've successfully optimized infrastructure for clients like <em>Shipway</em>, reducing costs through AMD processors and AWS migrations, and supported crypto banks with blockchain solutions.",
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'General',
      iconType: 'icon',
      icon: 'HelpCircle',
      iconBgColor: 'rgba(0, 255, 171, 0.15)',
      isActive: true,
      order: 1,
    },
    {
      id: 'faq-2',
      question: 'What size companies does Digital Spyke work with?',
      questionHtml: 'What size companies does Digital Spyke work with?',
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: 'We have worked with sole proprietors, multibillion dollar corporations, universities, charities, and every kind of client in between. We are happy to receive inquiries from potential clients of any size. With over 20,000 customers, including small businesses and enterprises, we tailor solutions for all scales.',
      answerHtml: 'We have worked with sole proprietors, multibillion dollar corporations, universities, charities, and every kind of client in between. We are happy to receive inquiries from potential clients of any size. With over <strong style=\"color: #00FFAB;\">20,000 customers</strong>, including small businesses and enterprises, we tailor solutions for all scales.',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'General',
      iconType: 'icon',
      icon: 'Building2',
      iconBgColor: 'rgba(107, 70, 255, 0.15)',
      isActive: true,
      order: 2,
    },
    {
      id: 'faq-3',
      question: 'Does Digital Spyke do copywriting or only cloud services?',
      questionHtml: 'Does Digital Spyke do copywriting or only cloud services?',
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: 'We offer fully realized cloud solutions, including all necessary documentation and integration support. However, if you prefer to handle your own configurations or documentation, we are happy to incorporate it into our services.',
      answerHtml: 'We offer fully realized cloud solutions, including all necessary documentation and integration support. However, if you prefer to handle your own configurations or documentation, we are happy to incorporate it into our services.',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'Services',
      iconType: 'icon',
      icon: 'Sparkles',
      iconBgColor: 'rgba(34, 211, 238, 0.15)',
      isActive: true,
      order: 3,
    },
    {
      id: 'faq-4',
      question: 'Can I upgrade my cloud resources as my business grows?',
      questionHtml: 'Can I upgrade my cloud resources as my business grows?',
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: 'Yes, Digital Spyke provides scalable solutions, allowing you to adjust resources as needed. Whether your needs increase or decrease, we’ll make sure your infrastructure adapts accordingly with on-demand public cloud services.',
      answerHtml: 'Yes, Digital Spyke provides <strong style=\"color: #00FFAB;\">scalable solutions</strong>, allowing you to adjust resources as needed. Whether your needs increase or decrease, we’ll make sure your infrastructure adapts accordingly with on-demand public cloud services.',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'Services',
      iconType: 'icon',
      icon: 'Zap',
      iconBgColor: 'rgba(234, 179, 8, 0.15)',
      isActive: true,
      order: 4,
    },
    {
      id: 'faq-5',
      question: 'What support does Digital Spyke offer?',
      questionHtml: 'What support does Digital Spyke offer?',
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: 'Digital Spyke offers 24/7 support for all our clients, ensuring prompt assistance for troubleshooting, system updates, and optimizing cloud performance to keep your business running smoothly. Our human-led team is always ready to help.',
      answerHtml: 'Digital Spyke offers <strong style=\"color: #22d3ee;\">24/7 support</strong> for all our clients, ensuring prompt assistance for troubleshooting, system updates, and optimizing cloud performance to keep your business running smoothly. Our human-led team is always ready to help.',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'Support',
      iconType: 'icon',
      icon: 'MessageSquareQuote',
      iconBgColor: 'rgba(107, 70, 255, 0.15)',
      isActive: true,
      order: 5,
    },
    {
      id: 'faq-6',
      question: "Will my data be secure on Digital Spyke's platform?",
      questionHtml: "Will my data be secure on Digital Spyke's platform?",
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: 'Absolutely. We follow stringent security protocols and employ the latest cybersecurity measures to ensure your data is protected at all times, backed by ISO certifications like 27001:2022.',
      answerHtml: 'Absolutely. We follow stringent security protocols and employ the latest cybersecurity measures to ensure your data is protected at all times, backed by <strong style=\"color: #00FFAB;\">ISO certifications like 27001:2022</strong>.',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'Security',
      iconType: 'icon',
      icon: 'Shield',
      iconBgColor: 'rgba(16, 185, 129, 0.15)',
      isActive: true,
      order: 6,
    },
  ],
};
