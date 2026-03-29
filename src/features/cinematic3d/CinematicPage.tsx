import { useState, useCallback, Suspense, lazy } from "react";
import { getMasterTimeline } from "./timeline";
import { useScroll } from "./useScroll";
import OverlayUI from "./OverlayUI";

const Experience = lazy(() => import("./Experience"));

export default function CinematicPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleProgress = useCallback((progress: number) => {
    const tl = getMasterTimeline();
    tl.progress(progress);
    setScrollProgress(progress);
  }, []);

  useScroll(handleProgress);

  return (
    <div
      style={{
        height: "500vh",
        background: "#050510",
        position: "relative",
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#050510",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4ecdc4",
              fontSize: "1.2rem",
              letterSpacing: "0.2em",
            }}
          >
            Loading...
          </div>
        }
      >
        <Experience />
      </Suspense>
      <OverlayUI scrollProgress={scrollProgress} />
    </div>
  );
}
