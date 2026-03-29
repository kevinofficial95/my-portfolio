import gsap from "gsap";

let masterTimeline: gsap.core.Timeline | null = null;

export function getMasterTimeline(): gsap.core.Timeline {
  if (!masterTimeline) {
    masterTimeline = gsap.timeline({ paused: true });
  }
  return masterTimeline;
}

export function resetMasterTimeline(): void {
  masterTimeline = null;
}
