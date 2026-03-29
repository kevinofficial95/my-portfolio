import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getMasterTimeline } from "./timeline";

const cameraPositions = [
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(0.5, 0.3, 5),
  new THREE.Vector3(-0.5, -0.2, 0),
  new THREE.Vector3(0.3, 0.1, -5),
];

const cameraLookAts = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.2, 0.1, 4),
  new THREE.Vector3(-0.2, -0.1, -1),
  new THREE.Vector3(0.1, 0, -6),
];

export default function CameraRig(): null {
  const positionRef = useRef(new THREE.Vector3());
  const lookAtRef = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const tl = getMasterTimeline();
    const progress = tl.progress();
    const scaledProgress = progress * (cameraPositions.length - 1);
    const index = Math.floor(scaledProgress);
    const t = scaledProgress - index;

    const clampedIndex = Math.min(index, cameraPositions.length - 2);
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    positionRef.current.lerpVectors(
      cameraPositions[clampedIndex],
      cameraPositions[clampedIndex + 1],
      ease
    );
    lookAtRef.current.lerpVectors(
      cameraLookAts[clampedIndex],
      cameraLookAts[clampedIndex + 1],
      ease
    );

    camera.position.lerp(positionRef.current, 0.05);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}
