import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getMasterTimeline } from "./timeline";

interface SceneMeshProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "torus";
  color: string;
  speed: number;
}

function SceneMesh({ position, geometry, color, speed }: SceneMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.y = clock.elapsedTime * speed;
    const tp = getMasterTimeline().progress();
    meshRef.current.position.y = position[1] + Math.sin(tp * Math.PI * 2) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      {geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.6, 32, 32]} />}
      {geometry === "torus" && <torusGeometry args={[0.5, 0.2, 16, 64]} />}
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

const meshData: SceneMeshProps[] = [
  { position: [1.5, 0, 8], geometry: "box", color: "#4ecdc4", speed: 0.5 },
  { position: [-1.5, 0.5, 6], geometry: "sphere", color: "#ff6b6b", speed: 0.3 },
  { position: [0, -0.5, 4], geometry: "torus", color: "#a8edea", speed: 0.7 },
  { position: [2, 0.3, 2], geometry: "box", color: "#fed9b7", speed: 0.4 },
  { position: [-2, -0.3, 0], geometry: "sphere", color: "#f7797d", speed: 0.6 },
  { position: [0.5, 0.5, -2], geometry: "torus", color: "#c6ffdd", speed: 0.35 },
  { position: [-1, 0, -4], geometry: "box", color: "#fbd3e9", speed: 0.55 },
  { position: [1, -0.5, -6], geometry: "sphere", color: "#b8c6db", speed: 0.45 },
];

export default function CanvasScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ff6b6b" distance={20} />
      {meshData.map((mesh, i) => (
        <SceneMesh key={i} {...mesh} />
      ))}
    </>
  );
}
