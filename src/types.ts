export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  logoText: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  logoText: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  link?: string;
}

export interface AchievementItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface CareerInterestItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
