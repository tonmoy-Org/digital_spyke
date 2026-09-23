import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ServicesConfig {
  headerSection: {
    enabled: boolean;
    brandName: string;
    primaryCta: { text: string; href: string };
  };
  heroSection: {
    enabled: boolean;
    badgeTag: string;
    headline: string;
    description: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  subServicesSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    services: Array<{
      id: string;
      slug: string;
      icon: string;
      title: string;
      description: string;
      features: string[];
    }>;
  };
  workProcessSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    steps: Array<{
      id: string;
      stepNumber: string;
      title: string;
      shortTitle: string;
      description: string;
      deliverables: string[];
    }>;
  };
  whyChooseUsSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    features: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  portfolioSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    viewAllLink: string;
    caseStudies: Array<{
      id: string;
      badge: string;
      title: string;
      description: string;
      stats: string;
      slug: string;
      thumbnail: string;
    }>;
  };
  faqSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
  testimonialsSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    testimonials: Array<{
      id: string;
      quote: string;
      rating: number;
      author: string;
      role: string;
      company: string;
      location: string;
      avatar: string;
    }>;
  };
  leadGenSection: {
    enabled: boolean;
    tag: string;
    headline: string;
    subheadline: string;
    inquiryTypes: string[];
  };
}

export const DEFAULT_SERVICES_CONFIG: ServicesConfig = {
  headerSection: {
    enabled: true,
    brandName: 'Digital Spyke',
    primaryCta: { text: 'Start a Project', href: '/book-meeting' },
  },
  heroSection: {
    enabled: true,
    badgeTag: '⚡ BRANDING & PR SOLUTIONS',
    headline: 'Elevate Your Brand Visibility & Scale Market Reach',
    description:
      'We combine strategic public relations, creative branding, and targeted digital ads to position your business at the forefront of your industry and drive measurable growth.',
    primaryCta: { text: 'TALK TO OUR EXPERTS', href: '#contact' },
    secondaryCta: { text: 'EXPLORE SERVICES', href: '#services-grid' },
  },
  subServicesSection: {
    enabled: true,
    tag: 'OUR SERVICES',
    headline: 'Custom Solutions Built For Your Growth',
    services: [
      {
        id: '1',
        slug: 'online-branding-strategy',
        icon: '🎯',
        title: 'ONLINE BRANDING STRATEGY',
        description:
          'Crafting unique brand identities, voice, and strategic digital positioning.',
        features: [
          'Brand Identity & Guidelines',
          'Market & Competitive Positioning',
          'Tone of Voice & Messaging Architecture',
          'Visual Archetype Blueprint',
        ],
      },
      {
        id: '2',
        slug: 'digital-creative-development',
        icon: '🎨',
        title: 'DIGITAL CREATIVE DEVELOPMENT',
        description:
          'High-converting graphics, UI visuals, and marketing collateral tailored to engage your target audience.',
        features: [
          'High-Conversion UI/UX Mockups',
          'Digital Ad Creatives & Video Assets',
          'Interactive Brand Collateral',
          'Motion Design & Micro-animations',
        ],
      },
      {
        id: '3',
        slug: 'google-advert-management',
        icon: '📈',
        title: 'GOOGLE ADVERT MANAGEMENT',
        description:
          'Data-driven PPC campaigns targeting high-intent keywords to boost ROI.',
        features: [
          'Search & Display Ad Campaigns',
          'High-Intent Keyword Intelligence',
          'Negative Keyword Optimization',
          'Conversion Rate Optimization (CRO)',
        ],
      },
      {
        id: '4',
        slug: 'social-media-optimization',
        icon: '🚀',
        title: 'SOCIAL MEDIA OPTIMIZATION',
        description:
          'Complete profile setup, content strategies and audience engagement tools.',
        features: [
          'Multi-Platform Profile Architecture',
          'Viral Content Calendars & Production',
          'Audience Growth & Community Building',
          'Influencer PR & Outreach Channels',
        ],
      },
    ],
  },
  workProcessSection: {
    enabled: true,
    tag: 'THE METHODOLOGY',
    headline: 'Simple, Transparent Steps That Scale With Your Needs',
    steps: [
      {
        id: '1',
        stepNumber: '01',
        shortTitle: 'Discovery',
        title: 'Discovery & Goal Alignment',
        description:
          'We analyze your brand identity, competitive landscape, target demographics, and primary key performance indicators (KPIs) to lay out a seamless roadmap.',
        deliverables: [
          'Competitive Landscape Audit',
          'Target Persona & Demographics Matrix',
          'KPI Benchmark Target Document',
          'Quarterly Strategy Milestones',
        ],
      },
      {
        id: '2',
        stepNumber: '02',
        shortTitle: 'Strategy',
        title: 'Strategic Blueprinting & Positioning',
        description:
          'We architect end-to-end campaigns, develop multi-touch attribution funnels, and define content pillars designed for rapid customer acquisition.',
        deliverables: [
          'Comprehensive Creative Brief',
          'Funnel Architecture & Touchpoint Map',
          'Budget & Channel Allocation Model',
          'PR Narrative & Pitch Angle Sheet',
        ],
      },
      {
        id: '3',
        stepNumber: '03',
        shortTitle: 'Execution',
        title: 'High-Impact Asset Rollout & Launch',
        description:
          'Our multidisciplinary team deploys design collateral, builds lightning-fast landing experiences, and launches synchronized ad & PR pushes.',
        deliverables: [
          'Multi-channel Ad Asset Production',
          'High-Performance Landing Experiences',
          'Press Release Wire Distribution',
          'A/B Testing Parameter Setup',
        ],
      },
      {
        id: '4',
        stepNumber: '04',
        shortTitle: 'Monitoring',
        title: 'Real-Time Telemetry & Optimization',
        description:
          'Continuous monitoring of acquisition costs, CTR, conversion lift, and audience feedback allows daily micro-optimizations that maximize every dollar.',
        deliverables: [
          'Real-time Executive Dashboard Access',
          'Algorithmic Bid & Budget Adjustments',
          'Creative Fatigue Replacement Cycles',
          'Audience Retargeting Layering',
        ],
      },
      {
        id: '5',
        stepNumber: '05',
        shortTitle: 'Growth',
        title: 'Exponential Scaling & Market Dominance',
        description:
          'With validated winning channels, we scale budgets systematically, build lookalike audiences, and solidify enduring brand authority in your sector.',
        deliverables: [
          'Lookalike & Enterprise Audience Expansion',
          'Long-term Organic Momentum Strategies',
          'Cross-sell & Retention Workflows',
          'Quarterly Growth Review & Next Stage Map',
        ],
      },
    ],
  },
  whyChooseUsSection: {
    enabled: true,
    tag: "BE ASSURED, WE'RE THE BEST DIGITAL MARKETING AGENCY",
    headline: 'Experience, knowledge, and insights that give your company a competitive advantage.',
    features: [
      {
        id: '1',
        icon: 'Workflow',
        title: 'Proven Expertise',
        description:
          "By assisting firms in turning concepts into seamless, scalable digital solutions that truly deliver, our team's years of practical experience helps them change.",
      },
      {
        id: '2',
        icon: 'Rocket',
        title: 'Innovation First',
        description:
          'To develop contemporary solutions that prepare your business for the future and maintain its competitiveness, we combine creativity with cutting-edge technologies and equipment.',
      },
      {
        id: '3',
        icon: 'Target',
        title: 'Growth-Focused',
        description:
          'With the goal of ensuring long-term scalability, quantifiable outcomes, and lasting business effect, each initiative is planned with your development in mind.',
      },
      {
        id: '4',
        icon: 'Boxes',
        title: 'Tailored Strategies',
        description:
          "We don't offer a one-size-fits-all approach; instead, we create tactics and solutions tailored to your specific industry, objectives, and difficulties in order to increase your chances of success.",
      },
      {
        id: '5',
        icon: 'Award',
        title: 'Reliable Support',
        description:
          'From launch to ongoing updates, we provide dependable support and improvements so your business continues to run smoothly and efficiently.',
      },
      {
        id: '6',
        icon: 'HeartHandshake',
        title: 'Trusted Partnership',
        description:
          'We believe in building long-term partnerships, working as an extension of your team to achieve success through trust and collaboration.',
      },
    ],
  },
  portfolioSection: {
    enabled: true,
    tag: 'PORTFOLIO',
    headline: 'Proven Success Stories In Branding & Digital Growth',
    viewAllLink: '/projects',
    caseStudies: [
      {
        id: '1',
        badge: 'Social Media Campaign',
        title: 'SMM Brand Overhaul Case Study',
        description:
          'A complete brand re-architecture and TikTok/LinkedIn viral strategy that drove unprecedented inbound pipeline.',
        stats: '+240% Audience Engagement • 4.2x ROAS',
        slug: 'smm-brand-overhaul-case-study',
        thumbnail:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: '2',
        badge: 'Ecommerce Growth',
        title: 'Fashion Store Revenue Expansion',
        description:
          'Scaling a DTC luxury fashion merchant from seed stage to $1.2M monthly run rate through full-funnel paid media and branding.',
        stats: '$1.2M MRR Milestone • 38% Repeat Order Rate',
        slug: 'fashion-store-revenue-expansion',
        thumbnail:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  faqSection: {
    enabled: true,
    tag: 'FAQ',
    headline: 'Frequently Asked Questions',
    faqs: [
      {
        id: '1',
        question:
          'How long does a typical branding campaign take to produce results?',
        answer:
          'Initial brand strategy setup takes 2-3 weeks. Measurable audience engagement and organic brand recognition gains typically manifest within 60 to 90 days.',
      },
      {
        id: '2',
        question:
          'What analytics and reporting tools do you provide during campaigns?',
        answer:
          'We provide custom real-time dashboards tracking CTR, CPA, brand mentions, conversion attribution, and weekly ROI executive summaries with video walkthroughs.',
      },
      {
        id: '3',
        question:
          'Do you customize marketing packages for early-stage startups?',
        answer:
          'Yes, we engineer agile, milestone-based packages tailored specifically for startups seeking high growth velocity within optimized, risk-managed budgets.',
      },
      {
        id: '4',
        question:
          'Can Digital Spyke integrate with our internal marketing or design team?',
        answer:
          'Absolutely. We seamlessly embed alongside your internal product, marketing, and executive teams, functioning either as an autonomous growth engine or an agile force multiplier.',
      },
    ],
  },
  testimonialsSection: {
    enabled: true,
    tag: 'TESTIMONIALS',
    headline: 'Trusted By Businesses Worldwide',
    testimonials: [
      {
        id: '1',
        quote:
          'SkillersZone completely transformed our brand identity. Their UI/UX and advertising strategies boosted our client conversions by 40% in under three months!',
        rating: 5,
        author: 'Michael Andersson',
        role: 'CEO',
        company: 'TechVision Inc.',
        location: 'Chicago, USA',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      },
      {
        id: '2',
        quote:
          'The branding and Google PPC campaign orchestrated by Digital Spyke generated an immediate 3.8x ROAS. Their work process is transparent, meticulous, and rapid.',
        rating: 5,
        author: 'Sarah Jenkins',
        role: 'VP of Marketing',
        company: 'Apex Global Logistics',
        location: 'Toronto, Canada',
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      },
      {
        id: '3',
        quote:
          'From initial discovery to high-impact creative rollout, the team delivered beyond expectations. Our social media engagement soared by 300% in 60 days.',
        rating: 5,
        author: 'David Chen',
        role: 'Founder & CEO',
        company: 'NovaGrowth Labs',
        location: 'San Francisco, USA',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  leadGenSection: {
    enabled: true,
    tag: 'GET IN TOUCH',
    headline: "Seen Enough? Let's Talk Results.",
    subheadline:
      'Now is the moment to build together and unlock sustainable growth.',
    inquiryTypes: [
      'General Inquiry',
      'Project Proposal',
      'Career',
      'Other',
    ],
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    config: DEFAULT_SERVICES_CONFIG,
  });
}
