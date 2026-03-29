import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createRouteCurve } from "./route";
import { storyBeats } from "./story";

type CameraPose = {
  back: number;
  height: number;
  side: number;
  lookAhead: number;
  lookHeight: number;
};

const poses: CameraPose[] = [
  { back: -4.8, height: 2.1, side: 1.6, lookAhead: 4.5, lookHeight: 1.2 },
  { back: -1.2, height: 7.6, side: 0.4, lookAhead: 5.5, lookHeight: 0.8 },
  { back: -5.8, height: 2.8, side: -2.2, lookAhead: 4.8, lookHeight: 1.4 },
  { back: -2.4, height: 8.8, side: 2.6, lookAhead: 5.8, lookHeight: 0.9 },
  { back: -3.6, height: 3.2, side: -1.4, lookAhead: 3.2, lookHeight: 1.8 },
];

interface CameraRigProps {
  scrollProgress: number;
}

function samplePose(progress: number): CameraPose {
  let index = 0;

  for (let cursor = 0; cursor < storyBeats.length - 1; cursor += 1) {
    if (
      progress >= storyBeats[cursor].progress &&
      progress <= storyBeats[cursor + 1].progress
    ) {
      index = cursor;
      break;
    }

    if (progress > storyBeats[storyBeats.length - 1].progress) {
      index = storyBeats.length - 2;
    }
  }

  const start = storyBeats[index].progress;
  const end = storyBeats[index + 1]?.progress ?? 1;
  const rawT = end > start ? (progress - start) / (end - start) : 0;
  const t = THREE.MathUtils.smootherstep(THREE.MathUtils.clamp(rawT, 0, 1), 0, 1);
  const from = poses[index];
  const to = poses[Math.min(index + 1, poses.length - 1)];

  return {
    back: THREE.MathUtils.lerp(from.back, to.back, t),
    height: THREE.MathUtils.lerp(from.height, to.height, t),
    side: THREE.MathUtils.lerp(from.side, to.side, t),
    lookAhead: THREE.MathUtils.lerp(from.lookAhead, to.lookAhead, t),
    lookHeight: THREE.MathUtils.lerp(from.lookHeight, to.lookHeight, t),
  };
}

export default function CameraRig({ scrollProgress }: CameraRigProps): null {
  const curve = useMemo(() => createRouteCurve(), []);
  const currentPosition = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }) => {
    const riderT = Math.min(scrollProgress * 0.96 + 0.02, 1);
    const point = curve.getPointAt(riderT);
    const tangent = curve.getTangentAt(riderT).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const pose = samplePose(scrollProgress);
    const sway = Math.sin(clock.elapsedTime * 0.8) * 0.12;
    const lift = Math.cos(clock.elapsedTime * 0.55) * 0.08;

    const desiredPosition = point
      .clone()
      .add(tangent.clone().multiplyScalar(pose.back))
      .add(normal.clone().multiplyScalar(pose.side))
      .add(new THREE.Vector3(0, pose.height + lift, 0));

    const desiredTarget = point
      .clone()
      .add(tangent.clone().multiplyScalar(pose.lookAhead))
      .add(new THREE.Vector3(normal.x * 0.3, pose.lookHeight, normal.z * 0.3));

    currentPosition.current.lerp(desiredPosition, 0.08);
    currentTarget.current.lerp(desiredTarget, 0.1);

    camera.position.copy(currentPosition.current);
    camera.lookAt(
      currentTarget.current.x + sway,
      currentTarget.current.y,
      currentTarget.current.z
    );

    if ("fov" in camera) {
      const fov = pose.height > 6 ? 42 : 50;
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
