export interface TestimonialItem {
  id: string;
  author: string;
  authorFontSize?: string;
  role: string;
  roleFontSize?: string;
  company: string;
  companyFontSize?: string;
  feedback: string;
  feedbackFontSize?: string;
  rating: number;
  avatarType: 'initials' | 'image' | 'icon';
  avatarImage?: string;
  avatarIcon?: string;
  avatarBgColor?: string;
  row: 'row1' | 'row2';
}

export interface TestimonialsSectionData {
  badgeText?: string;
  badgeFontSize?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  headingFontSize?: string;
  headingHtml?: string;
  description: string;
  descriptionFontSize?: string;
  descriptionHtml?: string;
  row1Speed: number;
  row2Speed: number;
  pauseOnHover: boolean;
  testimonials: TestimonialItem[];
}

export const DEFAULT_TESTIMONIALS_DATA: TestimonialsSectionData = {
  badgeText: '',
  badgeFontSize: '0.75rem',
  headingPrefix: 'Making ',
  headingHighlight: 'hundreds of businesses',
  headingSuffix: ' better, big or small.',
  headingFontSize: '2.5rem',
  headingHtml: 'Making <span style="background: linear-gradient(to right, #00FFAB, #6B46FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; display: inline-block;">hundreds of businesses</span> better, big or small.',
  description: "Don't just take our word for it - hear from our satisfied clients.",
  descriptionFontSize: '1rem',
  descriptionHtml: "Don't just take our word for it - hear from our satisfied clients.",
  row1Speed: 30,
  row2Speed: 30,
  pauseOnHover: true,
  testimonials: [
    {
      id: 'testi-1',
      company: 'NUTRIMERCHANT',
      feedback:
        "Digital Spyke's attention to detail and dedication to understanding our business needs helped us reach our target audience effectively. Our website is now fast, functional, and easy to manage!",
      author: 'Emily J',
      role: '@Agency Owner',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row1',
    },
    {
      id: 'testi-2',
      company: 'ECOBUILD',
      feedback:
        'Partnering with Digital Spyke has been instrumental in scaling our operations. The new website has not only attracted more clients but has improved overall team efficiency and project visibility.',
      author: 'John D',
      role: '@Project Manager',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row1',
    },
    {
      id: 'testi-3',
      company: 'LiquidWave',
      feedback:
        "Digital Spyke worked wonders for us. They took our ideas, gave them life, and created a website that truly represents our brand's values. The professional approach and seamless process were impressive.",
      author: 'Sarah L',
      role: '@Founder',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row1',
    },
    {
      id: 'testi-4',
      company: 'GreenFields',
      feedback:
        'Choosing Digital Spyke was one of the best decisions we made. They designed a website that fits our eco-conscious brand perfectly, and their customer support is outstanding.',
      author: 'David T',
      role: '@Marketing Director',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row1',
    },
    {
      id: 'testi-5',
      company: 'UrbanTech Solutions',
      feedback:
        'Digital Spyke brought our vision to life with their cutting-edge design and understanding of tech solutions. We now have a site that stands out in our industry.',
      author: 'Lisa M',
      role: '@CEO',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row1',
    },
    {
      id: 'testi-6',
      company: 'FreshWave Foods',
      feedback:
        'Digital Spyke understood our brand and created a seamless online ordering experience, boosting customer engagement significantly.',
      author: 'Michael S',
      role: '@Brand Manager',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row2',
    },
    {
      id: 'testi-7',
      company: 'Bright Futures Education',
      feedback:
        'Digital Spyke transformed our complex needs into a streamlined, user-friendly website, making the whole process smooth and enjoyable.',
      author: 'Sophia R',
      role: '@Program Director',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row2',
    },
    {
      id: 'testi-8',
      company: 'HealthFirst Clinic',
      feedback:
        'Digital Spyke delivered a secure, reliable healthcare platform that meets compliance standards and enhances patient trust.',
      author: 'Dr. Liam W',
      role: '@Clinic Head',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row2',
    },
    {
      id: 'testi-9',
      company: 'EcoScape Landscapes',
      feedback:
        'Digital Spyke provided a beautifully designed website that perfectly showcases our landscape services, exceeding expectations.',
      author: 'Olivia H',
      role: '@Co-Founder',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row2',
    },
    {
      id: 'testi-10',
      company: 'Peak Performance Fitness',
      feedback:
        'Digital Spyke built a modern, user-friendly website that integrates seamlessly with our scheduling tools, bringing in more clients.',
      author: 'Jake B',
      role: '@Operations Manager',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.2)',
      row: 'row2',
    },
  ],
};
