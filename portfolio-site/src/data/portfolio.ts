import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Asif Nawaz Sharif",
  title: "Frontend Developer (React / Next.js)",
  summary:
    "Mid-level Frontend Developer with 2+ years of experience building responsive, scalable, and high-performance web applications using React.js, JavaScript, and TypeScript.",
  location: "Rawalpindi, Pakistan",
  availability: "Open to frontend and full-stack opportunities",
  qualifications: [
    "2+ years building production-ready React applications",
    "Strong state management using Redux Toolkit, Zustand, and RTK Query",
    "Experience with API integration, error handling, and performance optimization",
    "Skilled in turning Figma designs into clean, reusable, intuitive interfaces",
  ],
  keyContributions: [
    "Delivered multiple production-ready React applications with reusable architecture",
    "Improved UI responsiveness by implementing data caching and efficient fetching",
    "Built mobile-first, accessible interfaces with consistency across pages",
    "Optimized rendering logic to reduce unnecessary re-renders and load times",
    "Developed dynamic dashboards, protected routes, and advanced filtering workflows",
  ],
  skills: [
    "React.js",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Redux Toolkit",
    "RTK Query",
    "Zustand",
    "React Hook Form",
    "Zod",
    "TanStack Query",
    "REST API Integration",
    "Git / GitHub / Bitbucket",
  ],
  experiences: [
    {
      company: "Hypertext Solutions Private Ltd.",
      role: "Frontend Developer",
      timeline: "April 2025 - December 2025",
      highlights: [
        "Built and maintained React applications using Redux Toolkit and RTK Query for state and API data handling.",
        "Developed reusable and scalable UI components using Tailwind CSS and Styled Components.",
        "Implemented performance optimization techniques like lazy loading, code splitting, and memoization.",
        "Integrated backend services with Axios and Fetch API with robust error handling.",
      ],
    },
    {
      company: "Smart Coders (SMC) Private Ltd",
      role: "Frontend Developer",
      timeline: "September 2023 - March 2025",
      highlights: [
        "Developed responsive mobile-first interfaces in React and Tailwind from Figma designs.",
        "Used React Hooks to manage state, side effects, and dynamic behaviors.",
        "Structured apps into modular reusable components to improve maintainability.",
        "Implemented form validation and user-friendly error handling to improve data quality.",
      ],
    },
  ],
  education: [
    {
      institute: "PMAS Arid Agriculture University, Rawalpindi",
      degree: "Bachelor's in Computer Science",
      timeline: "2017 - 2021",
    },
  ],
  projects: [
    {
      title: "Recruitment Dashboard",
      summary:
        "A role-based dashboard for managing candidates, interview stages, and hiring analytics.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "RTK Query"],
      impact:
        "Reduced manual filtering effort by introducing dynamic filters and fast search across large datasets.",
    },
    {
      title: "E-Commerce Frontend Platform",
      summary:
        "Responsive storefront with category browsing, cart flow, and seamless checkout experience.",
      stack: ["React.js", "TypeScript", "Redux Toolkit", "REST APIs"],
      impact:
        "Improved conversion flow with optimized state updates and smooth cart interactions.",
    },
    {
      title: "Admin Workflow Suite",
      summary:
        "An internal operations panel with secure routes, dynamic forms, and analytics widgets.",
      stack: ["React.js", "Tailwind CSS", "Zustand", "React Hook Form"],
      impact:
        "Enhanced team productivity by centralizing workflows and reducing repetitive manual tasks.",
    },
  ],
  certifications: [
    {
      title: "Frontend Development Specialization",
      issuer: "Professional Learning Program",
      year: "2024",
    },
    {
      title: "Advanced JavaScript Concepts",
      issuer: "Online Certification Program",
      year: "2023",
    },
  ],
  contacts: [
    { label: "Email", href: "mailto:asifnawazsharif3@gmail.com" },
    { label: "Phone", href: "tel:+923040974004" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/asif-nawaz-sharif/" },
  ],
  nav: [
    { label: "Qualifications", href: "#qualifications" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "/contact" },
  ],
};
