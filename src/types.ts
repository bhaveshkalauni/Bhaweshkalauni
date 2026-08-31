export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  focus: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  impactMetrics?: { value: string; label: string }[];
  deliverables: string[];
  skills: string[];
}

export interface ExpertiseCategory {
  id: string;
  category: string;
  subtitle: string;
  items: {
    name: string;
    detail?: string;
  }[];
}

export interface CaseStudyItem {
  id: string;
  index: string; // "01", "02", etc.
  title: string;
  category: string;
  timeline: string;
  role: string;
  heroMetric: { value: string; label: string };
  summary: string;
  problem: string;
  objective: string;
  context: string;
  approach: string[];
  analysis: string[];
  keyFindings: string[];
  recommendations: string[];
  toolsUsed: string[];
  tags: string[];
  /** When set, the project card opens this in-app route (live embedded project). */
  href?: string;
}

export interface BackgroundPhase {
  phase: string;
  title: string;
  institution: string;
  period: string;
  summary: string;
  takeaways: string[];
}
