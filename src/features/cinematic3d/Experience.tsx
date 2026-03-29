import { Canvas } from "@react-three/fiber";
import CanvasScene from "./CanvasScene";
import CameraRig from "./CameraRig";

export default function Experience() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
      shadows
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <CanvasScene />
      <CameraRig />
    </Canvas>
  );
}
