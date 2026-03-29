import { useRef, useEffect } from "react";
import { getMasterTimeline } from "./timeline";

interface Section {
  label: string;
  subtitle: string;
  description: string;
  progress: number;
}

const sections: Section[] = [
  {
    label: "Intro",
    subtitle: "Welcome",
    description: "A cinematic journey through my work",
    progress: 0,
  },
  {
    label: "About",
    subtitle: "Who I Am",
    description: "Full-stack developer passionate about creative experiences",
    progress: 0.33,
  },
  {
    label: "Projects",
    subtitle: "My Work",
    description: "Building immersive digital products with modern technology",
    progress: 0.66,
  },
  {
    label: "Contact",
    subtitle: "Get In Touch",
    description: "Let's create something amazing together",
    progress: 1,
  },
];

interface OverlayUIProps {
  scrollProgress: number;
}

export default function OverlayUI({ scrollProgress }: OverlayUIProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = getMasterTimeline();
    const progress = tl.progress();
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const sectionProgress = sections[i].progress;
      const distance = Math.abs(progress - sectionProgress);
      const opacity = Math.max(0, 1 - distance * 6);
      const translateY = (progress - sectionProgress) * -80;
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${translateY}px)`;
    });
  }, [scrollProgress]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 8vw",
      }}
    >
      {sections.map((section, i) => (
        <div
          key={section.label}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            opacity: i === 0 ? 1 : 0,
            transition: "opacity 0.1s, transform 0.1s",
            color: "#ffffff",
            maxWidth: "480px",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#4ecdc4",
              marginBottom: "0.5rem",
              fontFamily: "monospace",
            }}
          >
            {section.subtitle}
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {section.label}
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.8)",
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
            }}
          >
            {section.description}
          </p>
        </div>
      ))}

      <div
        style={{
          position: "fixed",
          right: "4vw",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {sections.map((section, i) => {
          const active =
            Math.abs(scrollProgress - section.progress) <
            1 / (sections.length * 2);
          return (
            <div
              key={`dot-${i}`}
              style={{
                width: active ? "10px" : "6px",
                height: active ? "10px" : "6px",
                borderRadius: "50%",
                background: active ? "#4ecdc4" : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "4vh",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: scrollProgress < 0.05 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        Scroll to explore
      </div>
    </div>
  );
}
