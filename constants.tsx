
import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Richard Akintunde",
  tagline: "Building Autonomous Systems & Scalable Architectures",
  title: "Full Stack Engineer • AI Specialist • Product Designer",
  bio: "Specializing in the intersection of Artificial Intelligence and high-performance web systems. I architect autonomous solutions that bridge the gap between complex data and intuitive user interfaces.",
  detailedBio: "As a multi-disciplinary engineer, I focus on building software that doesn't just work, but evolves. With deep expertise in the React ecosystem and modern AI integration, I help startups and established firms automate complex workflows and scale their digital presence.",
  email: "hello@richardakintunde.dev",
  linkedin: "https://www.linkedin.com/in/richard-akintunde/",
  github: "https://github.com/richardakintunde",
  location: "Lagos, Nigeria",
  availability: "Open for Strategic Collaborations"
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Sentience AI Dashboard",
    description: "A next-generation enterprise analytics platform using Gemini Flash for real-time market sentiment analysis.",
    tags: ["React", "TypeScript", "Node.js", "Gemini API"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#",
  },
  {
    id: "p2",
    title: "Flux Design System",
    description: "An atomic design system library focusing on performance and extreme accessibility for fintech applications.",
    tags: ["Tailwind CSS", "Storybook", "React", "Framer"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
    github: "#",
  },
  {
    id: "p3",
    title: "Omni-Channel Automator",
    description: "Automated revenue protection and multi-platform notification system for e-commerce vendors.",
    tags: ["n8n", "Python", "FastAPI", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800",
    link: "#",
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    company: "FutureScale Systems",
    role: "Lead Full Stack Architect",
    period: "2022 - Present",
    description: [
      "Leading a team of 5 developers to deliver AI-integrated SaaS solutions for global clients.",
      "Reduced infrastructure costs by 35% through strategic migration to serverless architectures.",
      "Architected a real-time collaborative workspace used by over 50,000 monthly active users."
    ]
  },
  {
    id: "exp2",
    company: "Creative Logic Agency",
    role: "Senior Product Engineer",
    period: "2020 - 2022",
    description: [
      "Developed custom e-commerce engines with integrated payment systems like Paystack and Stripe.",
      "Implemented a high-performance design system that unified 12 different product lines.",
      "Pioneered the use of automated testing which caught 90% of regressions before deployment."
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Architecture",
    items: ["Microservices", "Serverless", "System Design", "TDD", "CI/CD Pipelines"]
  },
  {
    category: "Frontend & UI",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    category: "Backend & AI",
    items: ["Node.js / Express", "Python / FastAPI", "Gemini AI", "n8n Automation", "PostgreSQL"]
  },
  {
    category: "Design",
    items: ["Product Design", "Figma", "Design Systems", "Prototyping", "UX Research"]
  }
];
