import { useMemo } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { getActiveBeat, storyBeats } from "./story";

interface OverlayUIProps {
  scrollProgress: number;
}

export default function OverlayUI({ scrollProgress }: OverlayUIProps) {
  const activeIndex = useMemo(
    () => getActiveBeat(scrollProgress),
    [scrollProgress]
  );

  return (
    <div className="story-overlay">
      <div className="story-topbar">
        <div>
          <span className="story-wordmark">Kevin James</span>
          <span className="story-role">Software Engineer</span>
        </div>
        <div className="story-topbar-links">
          <a href="/Kevin_James_CV.html" target="_blank" rel="noreferrer">
            CV
          </a>
          <a href="/classic">Classic</a>
        </div>
      </div>

      <div className="story-copy">
        {storyBeats.map((beat, index) => {
          const distance = Math.abs(scrollProgress - beat.progress);
          const opacity = Math.max(0, 1 - distance * 5.4);
          const translateY = (scrollProgress - beat.progress) * -120;

          return (
            <article
              key={beat.id}
              className="story-copy-card"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                pointerEvents: index === activeIndex ? "auto" : "none",
              }}
            >
              <p className="story-eyebrow">{beat.eyebrow}</p>
              <h1>{beat.title}</h1>
              <p className="story-description">{beat.description}</p>
              <div className="story-meta">
                {beat.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {beat.id === "intro" && (
                <div className="story-actions">
                  <a href="#story-contact" className="story-button story-button-solid">
                    Ride to the skyline
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="/Kevin_James_CV.html"
                    target="_blank"
                    rel="noreferrer"
                    className="story-button story-button-ghost"
                  >
                    View CV
                    <Download size={16} />
                  </a>
                </div>
              )}

              {beat.id === "contact" && (
                <div id="story-contact" className="story-actions">
                  <a
                    href="mailto:kevinofficial95@gmail.com"
                    className="story-button story-button-solid"
                  >
                    Email Me
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="https://github.com/kevinofficial95"
                    target="_blank"
                    rel="noreferrer"
                    className="story-button story-button-ghost"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/kevinjames95"
                    target="_blank"
                    rel="noreferrer"
                    className="story-button story-button-ghost"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="story-progress-rail" aria-label="Story progress">
        {storyBeats.map((beat, index) => (
          <div key={beat.id} className="story-progress-item">
            <span
              className={index === activeIndex ? "is-active" : ""}
              style={{
                opacity: scrollProgress >= beat.progress ? 1 : 0.35,
              }}
            />
            <small>{beat.eyebrow}</small>
          </div>
        ))}
      </div>

      <div
        className="story-scroll-hint"
        style={{ opacity: scrollProgress < 0.08 ? 1 : 0 }}
      >
        Scroll to ride through the city
      </div>
    </div>
  );
}
