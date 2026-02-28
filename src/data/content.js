// ─────────────────────────────────────────────────────────────────────────────
// Personal content — edit this file to personalise the entire site.
// ─────────────────────────────────────────────────────────────────────────────

export const personal = {
  name: 'Nevan',
  tagline: 'Full-Stack Developer & Creative Builder',
  bio: "I'm a developer who loves turning ideas into polished digital products. I obsess over clean code, great UX, and the tiny details that make the difference between good and great. When I'm not shipping features I'm exploring new tech, contributing to open source, or designing side projects.",
  location: 'Houston, Texas',
  email: 'Nevanle123@gmail.com',
  availability: 'Open to opportunities',
  stats: [
    { label: 'Projects Shipped', value: '20+' },
    { label: 'Years of Experience', value: '3+' },
    { label: 'Failures', value: '∞' },
  ],
}

export const socials = [
  { label: 'GitHub',   href: 'https://github.com/Nexan101',              icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/feed/',            icon: 'linkedin' },
  { label: 'Email',    href: 'mailto:Nevanle123@gmail.com',               icon: 'mail' },
]

export const projects = [
  {
    id: 1,
    title: 'Roofing Website',
    description: 'Designed and built a full production website for OP Roofing, a professional roofing company serving thousands of customers a year since 2011. The site features bilingual support (English & Spanish), a lead-generation estimate form, service showcases, and a mobile-first responsive layout optimised for local SEO.',
    tech: ['React', 'HTML', 'CSS', 'JavaScript'],
    github: null,
    live: 'https://oproofing.net/',
    image: '/op-roofing.png',
    featured: true,
  },
  {
    id: 2,
    title: 'DevToolkit CLI',
    description: 'A command-line toolkit that automates repetitive development tasks, from scaffolding to deployment pipelines.',
    tech: ['TypeScript', 'Node.js', 'Shell', 'Docker'],
    github: 'https://github.com/nevan/devtoolkit',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'AI Caption Generator',
    description: 'Leverages OpenAI\'s Vision API to generate contextual, SEO-friendly captions for images at scale.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React'],
    github: 'https://github.com/nevan/ai-caption',
    live: 'https://caption.nevan.dev',
    featured: true,
  },
  {
    id: 4,
    title: 'Finance Tracker',
    description: 'Personal finance dashboard with expense categorisation, trend charts, and monthly budget forecasting.',
    tech: ['Next.js', 'Prisma', 'Tailwind', 'Chart.js'],
    github: 'https://github.com/nevan/finance-tracker',
    live: 'https://finance.nevan.dev',
    featured: false,
  },
  {
    id: 5,
    title: 'Open Source Contributions',
    description: 'Bug fixes, feature additions, and documentation improvements across various open source repositories.',
    tech: ['Various'],
    github: 'https://github.com/nevan',
    live: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Design System',
    description: 'A reusable component library and design tokens system built with React and Storybook.',
    tech: ['React', 'Storybook', 'CSS Modules', 'Figma'],
    github: 'https://github.com/nevan/design-system',
    live: null,
    featured: false,
  },
]

export const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML & CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Python', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database & Infra',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Vercel'],
  },
  {
    category: 'Tools & Workflow',
    skills: ['Git', 'GitHub Actions', 'Figma', 'VS Code', 'Linux', 'Agile'],
  },
]

export const experience = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'Tech Company Inc.',
    companyUrl: 'https://example.com',
    period: '2023 — Present',
    description: 'Leading frontend development for the core product, driving architecture decisions, and mentoring junior developers.',
    bullets: [
      'Rebuilt the dashboard UI — reduced load time by 40% and improved user retention.',
      'Implemented a component library used across 4 products with 95% design-to-code fidelity.',
      'Introduced automated visual regression testing, cutting QA cycles in half.',
    ],
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'Startup Studio',
    companyUrl: 'https://example.com',
    period: '2021 — 2023',
    description: 'Wore many hats building MVPs and shipping features across the full stack in a fast-paced startup environment.',
    bullets: [
      'Built and launched 3 client products from zero to production.',
      'Integrated third-party APIs including Stripe, Twilio, and Mapbox.',
      'Maintained 99.9% uptime SLA through improved error monitoring and alerting.',
    ],
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'Digital Agency',
    companyUrl: 'https://example.com',
    period: '2020 — 2021',
    description: 'Started my professional journey building marketing websites and internal tools for agency clients.',
    bullets: [
      'Delivered 15+ client websites on time and within scope.',
      'Picked up React and Node.js on the job and shipped production code within 2 months.',
    ],
  },
]
