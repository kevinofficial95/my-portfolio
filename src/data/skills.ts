export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React 19", "TypeScript", "Radix UI", "Vite"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "TypeORM", "REST APIs"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Azure", "Google Cloud", "Docker", "GitHub Actions", "CI/CD"]
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Vitest", "Figma"]
  }
];
