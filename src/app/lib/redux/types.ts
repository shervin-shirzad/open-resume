// src/app/lib/redux/types.ts

// تعریف پروفایل رزومه
export interface ResumeProfile {
  name: string;
  email?: string;
  phone?: string;
  url?: string;
  location?: string;
  summary?: string;
  avatar?: string; // مسیر یا Base64 تصویر پروفایل
}

// تجربه کاری
export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

// تحصیلات
export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa?: string;
  descriptions: string[];
}

// پروژه‌ها
export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

// مهارت‌ها
export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

// بخش‌های دلخواه رزومه
export interface ResumeCustom {
  descriptions: string[];
}

// ساختار کلی رزومه
export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

// کلیدهای رزومه برای دسترسی داینامیک
export type ResumeKey = keyof Resume;
