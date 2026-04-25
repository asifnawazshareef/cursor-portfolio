export type NavItem = {
  label: string;
  href: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type Experience = {
  company: string;
  role: string;
  timeline: string;
  highlights: string[];
};

export type Education = {
  institute: string;
  degree: string;
  timeline: string;
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  impact: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

export type PortfolioData = {
  name: string;
  title: string;
  summary: string;
  location: string;
  availability: string;
  qualifications: string[];
  keyContributions: string[];
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  contacts: ContactLink[];
  nav: NavItem[];
};
