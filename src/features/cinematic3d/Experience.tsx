import { Canvas } from "@react-three/fiber";
import CanvasScene from "./CanvasScene";
import CameraRig from "./CameraRig";

interface ExperienceProps {
  scrollProgress: number;
}

export default function Experience({ scrollProgress }: ExperienceProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.1, 16], fov: 52, near: 0.1, far: 100 }}
      shadows={{ type: 1 }}
      dpr={[0.8, 1.25]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <CanvasScene scrollProgress={scrollProgress} />
      <CameraRig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
