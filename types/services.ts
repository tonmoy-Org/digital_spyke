import React from 'react';

export interface PrimaryCta {
  text: string;
  href: string;
  fontSize?: string;
  bgColor?: string;
  textColor?: string;
  showIcon?: boolean;
}

export interface SecondaryCta {
  enabled?: boolean;
  text: string;
  href: string;
  fontSize?: string;
  bgColor?: string;
  textColor?: string;
}

export interface SubServiceItem {
  id: string;
  slug?: string;
  icon: string;
  iconColor?: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionHtml?: string;
  descriptionFontSize?: string;
  features: string[];
}

export interface WorkProcessStep {
  id: string;
  stepNumber: string;
  shortTitle: string;
  title: string;
  titleFontSize?: string;
  icon?: string;
  iconColor?: string;
  description: string;
  descriptionHtml?: string;
  descriptionFontSize?: string;
  deliverables: string[];
}

export interface WhyChooseUsFeature {
  id: string;
  icon: string;
  iconColor?: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionHtml?: string;
  descriptionFontSize?: string;
}

export interface PortfolioCaseStudy {
  id: string;
  badge: string;
  title: string;
  description: string;
  stats: string;
  slug: string;
  thumbnail: string;
}

export interface ServiceTestimonial {
  id: string;
  quote: string;
  quoteHtml?: string;
  quoteFontSize?: string;
  rating: number;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
}

export interface PortfolioProductItem {
  id: string;
  title: string;
  titleFontSize?: string;
  link: string;
  thumbnail: string;
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  questionFontSize?: string;
  answer: string;
  answerHtml?: string;
  answerFontSize?: string;
  category?: string;
}

export interface FullServicePageConfig {
  id: string;
  slug: string;
  navTitle: string;
  pageTitle: string;
  isPrimary?: boolean;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;

  headerSection: {
    enabled: boolean;
    brandName: string;
    brandNameFontSize?: string;
    primaryCta: PrimaryCta;
  };

  heroSection: {
    enabled: boolean;
    badgeTag: string;
    badgeFontSize?: string;
    badgeColor?: string;
    badgeBgColor?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    headlineGradient?: string;
    description: string;
    descriptionHtml?: string;
    descriptionFontSize?: string;
    sliderImages: string[];
    primaryCta: PrimaryCta;
    secondaryCta: SecondaryCta;
  };

  subServicesSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    services: SubServiceItem[];
  };

  workProcessSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    steps: WorkProcessStep[];
  };

  whyChooseUsSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    features: WhyChooseUsFeature[];
  };

  portfolioSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    description?: string;
    descriptionFontSize?: string;
    viewAllLink?: string;
    viewAllText?: string;
    caseStudies: PortfolioCaseStudy[];
    products: PortfolioProductItem[];
  };

  faqSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    description?: string;
    descriptionFontSize?: string;
    inheritGlobalFaqs?: boolean;
    faqs: ServiceFaqItem[];
  };

  testimonialsSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    testimonials: ServiceTestimonial[];
  };

  leadGenSection: {
    enabled: boolean;
    tag: string;
    tagFontSize?: string;
    headline: string;
    headlineHtml?: string;
    headlineFontSize?: string;
    subheadline: string;
    subheadlineFontSize?: string;
    inquiryTypes: string[];
    submitButtonText?: string;
    submitButtonFontSize?: string;
  };
}

export const DEFAULT_HERO_SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop',
];

export const DEFAULT_PRIMARY_SERVICE: FullServicePageConfig = {
  id: 'web-development-services',
  slug: 'web-development-services',
  navTitle: 'Web Development Services',
  pageTitle: 'Web Development Services | Digital Spyke',
  isPrimary: true,
  isActive: true,
  order: 1,

  headerSection: {
    enabled: true,
    brandName: 'Digital Spyke',
    primaryCta: { text: 'Start a Project', href: '/book-meeting', fontSize: '1rem', bgColor: '#1D4ED8', textColor: '#ffffff' },
  },

  heroSection: {
    enabled: true,
    badgeTag: '⚡ ENTERPRISE WEB ENGINEERING',
    badgeFontSize: '0.75rem',
    badgeColor: '#3BA2F9',
    badgeBgColor: 'rgba(59, 162, 249, 0.1)',
    headline: 'Architecting High-Performance & Scalable Web Applications',
    headlineHtml: 'Architecting High-Performance & <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Scalable Web Applications</span>',
    headlineFontSize: '4rem',
    headlineGradient: 'Scalable Web Applications',
    description:
      'We engineer mission-critical web platforms, custom SaaS solutions, and high-conversion web applications. Combining modern tech stacks, headless architecture, and sub-second performance to accelerate business velocity.',
    descriptionHtml:
      '<p>We engineer mission-critical web platforms, custom SaaS solutions, and high-conversion web applications. Combining modern tech stacks, headless architecture, and sub-second performance to accelerate business velocity.</p>',
    descriptionFontSize: '1.125rem',
    sliderImages: DEFAULT_HERO_SLIDER_IMAGES,
    primaryCta: {
      text: 'START YOUR PROJECT',
      href: '#contact',
      fontSize: '1rem',
      bgColor: '#1D4ED8',
      textColor: '#ffffff',
      showIcon: true,
    },
    secondaryCta: {
      enabled: true,
      text: 'EXPLORE WEB SERVICES',
      href: '#services-grid',
      fontSize: '1rem',
      bgColor: 'transparent',
      textColor: '#ffffff',
    },
  },

  subServicesSection: {
    enabled: true,
    tag: 'OUR WEB ENGINEERING SERVICES',
    tagFontSize: '0.875rem',
    headline: 'Modern full-stack solutions engineered for scale & speed',
    headlineHtml: 'Modern full-stack solutions <br class="hidden sm:block" /> engineered for <span class="text-[#3BA2F9]">scale & speed</span>',
    headlineFontSize: '2.5rem',
    services: [
      {
        id: '1',
        slug: 'full-stack-web-applications',
        icon: '💻',
        iconColor: '#3BA2F9',
        title: 'FULL-STACK WEB APPLICATIONS',
        titleFontSize: '1.5rem',
        description:
          'Bespoke web applications built with Next.js, React, Node.js, and TypeScript. From relational database modeling to intuitive, reactive frontends designed for high concurrency.',
        descriptionHtml:
          '<p>Bespoke web applications built with Next.js, React, Node.js, and TypeScript. From relational database modeling to intuitive, reactive frontends designed for high concurrency.</p>',
        descriptionFontSize: '1rem',
        features: [
          'Full-Cycle TypeScript & Next.js Architecture',
          'Scalable SQL & NoSQL Database Modeling',
          'Micro-Frontend & Component Systems',
          'Role-Based Access Control (RBAC) & Auth',
        ],
      },
      {
        id: '2',
        slug: 'enterprise-saas-development',
        icon: '⚡',
        iconColor: '#3BA2F9',
        title: 'ENTERPRISE SAAS PLATFORMS',
        titleFontSize: '1.5rem',
        description:
          'Multi-tenant cloud SaaS platforms built for reliability and scale. Includes automated subscription billing, granular team permissions, and third-party API webhooks.',
        descriptionHtml:
          '<p>Multi-tenant cloud SaaS platforms built for reliability and scale. Includes automated subscription billing, granular team permissions, and third-party API webhooks.</p>',
        descriptionFontSize: '1rem',
        features: [
          'Multi-Tenant Data Partitioning',
          'Automated Stripe & Billing Engine Integration',
          'Real-Time WebSockets & Telemetry',
          'Granular Team & Permission Management',
        ],
      },
      {
        id: '3',
        slug: 'headless-ecommerce-engineering',
        icon: '🛍️',
        iconColor: '#3BA2F9',
        title: 'HEADLESS E-COMMERCE SYSTEMS',
        titleFontSize: '1.5rem',
        description:
          'Lightning-fast commerce platforms leveraging headless architectures (Shopify Storefront API, Medusa, Next.js Commerce) engineered for maximum checkout conversion rates.',
        descriptionHtml:
          '<p>Lightning-fast commerce platforms leveraging headless architectures (Shopify Storefront API, Medusa, Next.js Commerce) engineered for maximum checkout conversion rates.</p>',
        descriptionFontSize: '1rem',
        features: [
          'Headless Shopify & Custom Cart Architecture',
          'Sub-Second Edge Checkout & Instant Search',
          'Omnichannel ERP & Inventory Syncing',
          'Conversion Rate Optimization (CRO)',
        ],
      },
      {
        id: '4',
        slug: 'api-cloud-microservices',
        icon: '🚀',
        iconColor: '#3BA2F9',
        title: 'API & CLOUD INFRASTRUCTURE',
        titleFontSize: '1.5rem',
        description:
          'High-throughput RESTful & GraphQL APIs, serverless edge functions, and containerized microservices engineered for zero-downtime scaling and sub-50ms latency.',
        descriptionHtml:
          '<p>High-throughput RESTful & GraphQL APIs, serverless edge functions, and containerized microservices engineered for zero-downtime scaling and sub-50ms latency.</p>',
        descriptionFontSize: '1rem',
        features: [
          'RESTful & GraphQL API Architecture',
          'Cloud Native Deployments (AWS, Vercel, GCP)',
          'Redis Edge Caching & Queue Processing',
          'Zero-Downtime CI/CD Automated Pipelines',
        ],
      },
    ],
  },

  workProcessSection: {
    enabled: true,
    tag: 'OUR ENGINEERING LIFECYCLE',
    tagFontSize: '0.875rem',
    headline: 'From system architecture to production launch: we build world-class software',
    headlineHtml: 'From system architecture to production launch: <br class="hidden sm:block" /> we build <span class="text-[#3BA2F9]">world-class software</span>',
    headlineFontSize: '2.5rem',
    steps: [
      {
        id: '1',
        stepNumber: '01',
        shortTitle: 'Discovery',
        title: 'Architecture & Technical Discovery',
        titleFontSize: '1.25rem',
        icon: 'Compass',
        iconColor: '#3BA2F9',
        description:
          'We evaluate your system requirements, data schema models, user journeys, and integration constraints to architect a resilient, future-proof technical roadmap.',
        descriptionHtml:
          '<p>We evaluate your system requirements, data schema models, user journeys, and integration constraints to architect a resilient, future-proof technical roadmap.</p>',
        descriptionFontSize: '0.875rem',
        deliverables: [
          'System Architecture Blueprint',
          'Database Entity Relationship (ERD) Schema',
          'API Specification & Contract Models',
          'Sprint Milestones & Tech Stack Matrix',
        ],
      },
      {
        id: '2',
        stepNumber: '02',
        shortTitle: 'Prototyping',
        title: 'UI/UX System & Interactive Wireframes',
        titleFontSize: '1.25rem',
        icon: 'Target',
        iconColor: '#3BA2F9',
        description:
          'We transform product requirements into accessible, high-conversion Figma interfaces, establishing a reusable component design system before writing a single line of code.',
        descriptionHtml:
          '<p>We transform product requirements into accessible, high-conversion Figma interfaces, establishing a reusable component design system before writing a single line of code.</p>',
        descriptionFontSize: '0.875rem',
        deliverables: [
          'Interactive High-Fidelity Prototypes',
          'Tailwind & Figma Token Design System',
          'WCAG 2.1 Accessibility Compliance',
          'Responsive Mobile & Tablet Viewports',
        ],
      },
      {
        id: '3',
        stepNumber: '03',
        shortTitle: 'Development',
        title: 'Agile Full-Stack Engineering Sprints',
        titleFontSize: '1.25rem',
        icon: 'Rocket',
        iconColor: '#3BA2F9',
        description:
          'Our senior software engineers build modular, type-safe codebases with Next.js, React, and TypeScript, backed by automated testing and continuous integration.',
        descriptionHtml:
          '<p>Our senior software engineers build modular, type-safe codebases with Next.js, React, and TypeScript, backed by automated testing and continuous integration.</p>',
        descriptionFontSize: '0.875rem',
        deliverables: [
          'Clean, Strict Type-Safe Codebase',
          'Scalable Serverless & Microservice APIs',
          'Dynamic Data Hydration & State Management',
          'Bi-Weekly Sprint Demos & Staging Deploys',
        ],
      },
      {
        id: '4',
        stepNumber: '04',
        shortTitle: 'QA & Security',
        title: 'Rigorous QA, Security & Performance Audits',
        titleFontSize: '1.25rem',
        icon: 'LayoutDashboard',
        iconColor: '#3BA2F9',
        description:
          'End-to-end Cypress/Playwright testing, OWASP vulnerability audits, stress benchmarking, and sub-second Lighthouse Core Web Vitals optimization.',
        descriptionHtml:
          '<p>End-to-end Cypress/Playwright testing, OWASP vulnerability audits, stress benchmarking, and sub-second Lighthouse Core Web Vitals optimization.</p>',
        descriptionFontSize: '0.875rem',
        deliverables: [
          'Unit & E2E Automated Test Coverage',
          'Lighthouse 95+ Core Web Vitals Score',
          'OWASP Vulnerability Penetration Checks',
          'Cross-Browser & Multi-Device Validation',
        ],
      },
      {
        id: '5',
        stepNumber: '05',
        shortTitle: 'Deployment',
        title: 'Cloud Deployment, CI/CD & Ongoing Scaling',
        titleFontSize: '1.25rem',
        icon: 'TrendingUp',
        iconColor: '#3BA2F9',
        description:
          'Zero-downtime automated deployment to production via Vercel or AWS, coupled with edge caching, automated database backups, and 24/7 telemetry monitoring.',
        descriptionHtml:
          '<p>Zero-downtime automated deployment to production via Vercel or AWS, coupled with edge caching, automated database backups, and 24/7 telemetry monitoring.</p>',
        descriptionFontSize: '0.875rem',
        deliverables: [
          'Automated GitHub Actions CI/CD Pipeline',
          'Infrastructure as Code (Terraform / Docker)',
          'Global CDN Edge Caching Setup',
          '24/7 Error Tracking & Telemetry Dashboard',
        ],
      },
    ],
  },

  whyChooseUsSection: {
    enabled: true,
    tag: 'WHY CHOOSE DIGITAL SPYKE',
    tagFontSize: '0.875rem',
    headline: 'Senior engineering, modern architecture, and code that gives your business a decisive edge.',
    headlineHtml: 'Senior engineering, modern architecture, and <br class="hidden sm:block" /> code that gives your business a <span class="text-[#3BA2F9]">decisive edge.</span>',
    headlineFontSize: '2.5rem',
    features: [
      {
        id: '1',
        icon: 'Workflow',
        iconColor: '#3BA2F9',
        title: 'Full-Cycle Engineering',
        titleFontSize: '1.375rem',
        description:
          'We oversee the entire software development lifecycle—from relational database architecture and serverless APIs to reactive, pixel-perfect user interfaces.',
        descriptionHtml: '<p>We oversee the entire software development lifecycle—from relational database architecture and serverless APIs to reactive, pixel-perfect user interfaces.</p>',
        descriptionFontSize: '0.9375rem',
      },
      {
        id: '2',
        icon: 'Rocket',
        iconColor: '#3BA2F9',
        title: 'Modern Next-Gen Stack',
        titleFontSize: '1.375rem',
        description:
          'We build exclusively with high-velocity, modern technologies: Next.js 14/15, TypeScript, React, Tailwind CSS, PostgreSQL, and cloud edge networks.',
        descriptionHtml: '<p>We build exclusively with high-velocity, modern technologies: Next.js 14/15, TypeScript, React, Tailwind CSS, PostgreSQL, and cloud edge networks.</p>',
        descriptionFontSize: '0.9375rem',
      },
      {
        id: '3',
        icon: 'Target',
        iconColor: '#3BA2F9',
        title: 'Sub-Second Performance & SEO',
        titleFontSize: '1.375rem',
        description:
          'Every web application is engineered for speed, delivering sub-second load times, 95+ Lighthouse scores, and semantic technical SEO structure.',
        descriptionHtml: '<p>Every web application is engineered for speed, delivering sub-second load times, 95+ Lighthouse scores, and semantic technical SEO structure.</p>',
        descriptionFontSize: '0.9375rem',
      },
      {
        id: '4',
        icon: 'Boxes',
        iconColor: '#3BA2F9',
        title: 'Clean Architecture & Type Safety',
        titleFontSize: '1.375rem',
        description:
          'Strict TypeScript standards, modular component hierarchies, and comprehensive documentation ensure your codebase remains maintainable for years.',
        descriptionHtml: '<p>Strict TypeScript standards, modular component hierarchies, and comprehensive documentation ensure your codebase remains maintainable for years.</p>',
        descriptionFontSize: '0.9375rem',
      },
      {
        id: '5',
        icon: 'Award',
        iconColor: '#3BA2F9',
        title: 'Enterprise Security by Default',
        titleFontSize: '1.375rem',
        description:
          'Built-in defense against OWASP vulnerabilities, encrypted session handling, parameterized database queries, and continuous security patch management.',
        descriptionHtml: '<p>Built-in defense against OWASP vulnerabilities, encrypted session handling, parameterized database queries, and continuous security patch management.</p>',
        descriptionFontSize: '0.9375rem',
      },
      {
        id: '6',
        icon: 'HeartHandshake',
        iconColor: '#3BA2F9',
        title: 'Dedicated Engineering Partnership',
        titleFontSize: '1.375rem',
        description:
          'We work as an embedded extension of your team—providing proactive architectural guidance, transparent sprint reporting, and reliable post-launch SLAs.',
        descriptionHtml: '<p>We work as an embedded extension of your team—providing proactive architectural guidance, transparent sprint reporting, and reliable post-launch SLAs.</p>',
        descriptionFontSize: '0.9375rem',
      },
    ],
  },

  portfolioSection: {
    enabled: true,
    tag: 'PORTFOLIO',
    tagFontSize: '0.875rem',
    headline: 'Proven Web Applications & Engineering Case Studies',
    headlineFontSize: '2.5rem',
    description: 'We build high-performance digital products with the latest technologies. Explore how we help ambitious brands transform their digital presence and scale revenue.',
    viewAllLink: '/projects',
    viewAllText: 'View All Projects',
    caseStudies: [
      {
        id: '1',
        badge: 'Enterprise SaaS',
        title: 'Cloud Analytics Platform Architecture',
        description:
          'A multi-tenant data visualization and analytics dashboard built on Next.js, processing over 10M daily events with sub-100ms query responses.',
        stats: '10M+ Daily Events • 99.99% Uptime',
        slug: 'cloud-analytics-platform-architecture',
        thumbnail:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: '2',
        badge: 'Headless E-Commerce',
        title: 'Next.js Headless Commerce Redesign',
        description:
          'Re-platforming a global merchant to Next.js and Shopify Storefront API, slashing page load times by 70% and increasing checkout conversion by 34%.',
        stats: '0.5s Load Time • +34% Conversion Lift',
        slug: 'nextjs-headless-commerce-redesign',
        thumbnail:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    products: [
      {
        id: 'prod-1',
        title: 'Moonbeam',
        link: 'https://gomoonbeam.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png',
      },
      {
        id: 'prod-2',
        title: 'Cursor',
        link: 'https://cursor.so',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/cursor.png',
      },
      {
        id: 'prod-3',
        title: 'Rogue',
        link: 'https://userogue.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/rogue.png',
      },
      {
        id: 'prod-4',
        title: 'Editorially',
        link: 'https://editorially.org',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/editorially.png',
      },
      {
        id: 'prod-5',
        title: 'Editrix AI',
        link: 'https://editrix.ai',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/editrix.png',
      },
      {
        id: 'prod-6',
        title: 'Pixel Perfect',
        link: 'https://app.pixelperfect.quest',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png',
      },
      {
        id: 'prod-7',
        title: 'Algochurn',
        link: 'https://algochurn.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/algochurn.png',
      },
      {
        id: 'prod-8',
        title: 'Aceternity UI',
        link: 'https://ui.aceternity.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png',
      },
      {
        id: 'prod-9',
        title: 'Tailwind Master Kit',
        link: 'https://tailwindmasterkit.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png',
      },
      {
        id: 'prod-10',
        title: 'SmartBridge',
        link: 'https://smartbridgetech.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png',
      },
      {
        id: 'prod-11',
        title: 'Renderwork Studio',
        link: 'https://renderwork.studio',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/renderwork.png',
      },
      {
        id: 'prod-12',
        title: 'Creme Digital',
        link: 'https://cremedigital.com',
        thumbnail: 'https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png',
      },
    ],
  },

  faqSection: {
    enabled: true,
    tag: 'FAQ',
    tagFontSize: '0.875rem',
    headline: 'Frequently Asked Questions About Our Web Development',
    headlineFontSize: '2.5rem',
    description: 'Everything you need to know about our web engineering processes, architectural standards, and SLA guarantees.',
    inheritGlobalFaqs: false,
    faqs: [
      {
        id: 'faq-1',
        question: 'What modern technologies do you build with?',
        answer: 'We build with Next.js 14/15, TypeScript, React, Tailwind CSS, PostgreSQL, Prisma, Node.js, Redis edge caching, and automated CI/CD deployed to AWS or Vercel.',
        category: 'Engineering',
      },
      {
        id: 'faq-2',
        question: 'How do you guarantee sub-second speed & Lighthouse 95+ score?',
        answer: 'We optimize the entire delivery pipeline: server components, edge caching, responsive image conversion to WebP/AVIF, code splitting, and zero unnecessary runtime dependencies.',
        category: 'Performance',
      },
      {
        id: 'faq-3',
        question: 'Can you migrate our legacy web application to Next.js?',
        answer: 'Yes. We specialize in zero-downtime, staged migrations—decoupling legacy backends via microservices or headless APIs before transforming frontends into lightning-fast applications.',
        category: 'Migration',
      },
      {
        id: 'faq-4',
        question: 'What is your typical project delivery lifecycle and timeline?',
        answer: 'Most custom web applications launch within 4 to 10 weeks across bi-weekly agile sprints. You receive staging preview links, automated test reports, and sprint demos at every milestone.',
        category: 'Process',
      },
    ],
  },

  testimonialsSection: {
    enabled: true,
    tag: 'TESTIMONIALS',
    tagFontSize: '0.875rem',
    headline: 'Trusted by engineering leaders & founders worldwide',
    headlineHtml: 'Trusted by engineering leaders & <br /> <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">founders worldwide</span>',
    headlineFontSize: '3rem',
    testimonials: [
      {
        id: '1',
        quote:
          'Digital Spyke engineered our SaaS web application from the ground up using Next.js and TypeScript. Their architectural decisions helped us scale to 150,000 monthly active users smoothly. The cleanest codebase we have ever inherited.',
        quoteHtml: '<p>Digital Spyke engineered our SaaS web application from the ground up using Next.js and TypeScript. Their architectural decisions helped us scale to 150,000 monthly active users smoothly. The cleanest codebase we have ever inherited.</p>',
        quoteFontSize: '0.875rem',
        rating: 5,
        author: 'Michael Andersson',
        role: 'VP of Engineering',
        company: 'CloudScale Technologies',
        location: 'Chicago, USA',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      },
      {
        id: '2',
        quote:
          'Migrating our legacy portal to a headless Next.js architecture seemed daunting until we brought in Digital Spyke. Our page load speed dropped from 4.2s to 0.6s, resulting in an immediate 38% increase in user signups.',
        quoteHtml: '<p>Migrating our legacy portal to a headless Next.js architecture seemed daunting until we brought in Digital Spyke. Our page load speed dropped from 4.2s to 0.6s, resulting in an immediate 38% increase in user signups.</p>',
        quoteFontSize: '0.875rem',
        rating: 5,
        author: 'Sarah Jenkins',
        role: 'Head of Product',
        company: 'Apex Global Logistics',
        location: 'Toronto, Canada',
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },

  leadGenSection: {
    enabled: true,
    tag: 'START YOUR PROJECT',
    headline: 'Now is the moment to build together.',
    headlineHtml: 'Now is the moment <br /> to build <span class="text-[#00d2ff] drop-shadow-[0_0_24px_rgba(0,210,255,0.55)]">together.</span>',
    headlineFontSize: '4rem',
    subheadline: "Ready to build your next web application? Let's talk architecture.",
    subheadlineFontSize: '0.875rem',
    inquiryTypes: [
      'Custom Web Application',
      'Enterprise SaaS Platform',
      'Headless E-Commerce System',
      'Next.js / Jamstack Website',
      'API & Cloud Infrastructure',
      'Codebase Audit & Modernization',
    ],
    submitButtonText: 'Send Message',
  },
};
