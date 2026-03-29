export interface StoryBeat {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  progress: number;
  meta: string[];
}

export const storyBeats: StoryBeat[] = [
  {
    id: "intro",
    eyebrow: "Departure",
    title: "Hop on. We ride through Kevin&apos;s city.",
    description:
      "A rider waits on the scooter at the edge of the city. Scroll and the journey begins, moving through the places that define how I build products.",
    progress: 0.04,
    meta: ["Scooter Ride", "Night City", "Scroll-Controlled Story"],
  },
  {
    id: "about",
    eyebrow: "First Stop",
    title: "Product-minded engineer with a frontend eye",
    description:
      "I work across interface, backend, and cloud delivery, building experiences that feel polished on the surface and dependable under load.",
    progress: 0.26,
    meta: ["React", "TypeScript", "Node.js", "Google Cloud"],
  },
  {
    id: "work",
    eyebrow: "Work District",
    title: "Shipping products from mobile app to production infra",
    description:
      "Church Circle, cloud deployments, reusable systems, and delivery pipelines all live here. This stop is about execution, not just concepts.",
    progress: 0.5,
    meta: ["Church Circle App", "Cloud Run", "CI/CD", "Reusable UI"],
  },
  {
    id: "skills",
    eyebrow: "Tech Square",
    title: "I can design, build, ship, and refine",
    description:
      "From animations and responsive UI to APIs, Docker, monitoring, and scaling decisions, I like owning the whole route from idea to launch.",
    progress: 0.74,
    meta: ["React 19", "Expo", "Docker", "Cloud SQL", "Monitoring"],
  },
  {
    id: "contact",
    eyebrow: "Final Stop",
    title: "Let&apos;s meet at the skyline",
    description:
      "The ride ends at the rooftop. If you need someone who can carry a product from concept to production, I’m ready for the next build.",
    progress: 0.96,
    meta: ["kevinofficial95@gmail.com", "GitHub", "LinkedIn"],
  },
];

export function getActiveBeat(progress: number): number {
  let activeIndex = 0;
  for (let index = 0; index < storyBeats.length; index += 1) {
    if (progress >= storyBeats[index].progress) {
      activeIndex = index;
    }
  }
  return activeIndex;
}

export function getSegmentProgress(
  progress: number,
  start: number,
  end: number
): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}
