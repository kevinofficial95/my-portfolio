export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React 19", "React Native", "Expo", "TypeScript", "Radix UI", "Vite"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "TypeORM", "REST APIs"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Google Cloud", "Cloud Run", "Cloud SQL", "Docker", "GitHub Actions", "Cloud Build", "CI/CD", "Monitoring Alerts", "Budgets", "Auto Scaling", "Nginx"]
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Vitest", "Figma", "App Store Connect", "Google Play Console"]
  }
];
