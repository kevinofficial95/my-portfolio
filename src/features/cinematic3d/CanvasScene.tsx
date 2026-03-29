import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createRouteCurve } from "./route";
import { storyBeats } from "./story";
import { createLabelTexture } from "./textures";

interface CanvasSceneProps {
  scrollProgress: number;
}

type BlockInstance = {
  position: THREE.Vector3;
  scale: THREE.Vector3;
  color: THREE.Color;
};

type PoleInstance = {
  position: THREE.Vector3;
  rotationY: number;
  side: number;
  color: string;
};

function CityGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -14]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#06070a" roughness={0.98} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, -14]}>
        <planeGeometry args={[38, 120]} />
        <meshStandardMaterial color="#0b0f16" roughness={0.94} metalness={0.04} />
      </mesh>
    </>
  );
}

function CityRoad() {
  const curve = useMemo(() => createRouteCurve(), []);
  const segments = useMemo(() => {
    return Array.from({ length: 96 }, (_, index) => {
      const t = index / 95;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t).normalize();
      const angle = Math.atan2(tangent.x, tangent.z);
      return { point, angle };
    });
  }, [curve]);

  return (
    <group>
      {segments.map(({ point, angle }, index) => (
        <group
          key={index}
          position={[point.x, point.y, point.z]}
          rotation={[0, angle, 0]}
        >
          <mesh receiveShadow>
            <boxGeometry args={[4.3, 0.08, 2]} />
            <meshStandardMaterial color="#11161f" roughness={0.92} metalness={0.08} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.7]} />
            <meshBasicMaterial color={index % 5 < 3 ? "#ffd36b" : "#ff8a3d"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CityBlocks() {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const colorArrayRef = useRef<Float32Array | null>(null);
  const blocks = useMemo<BlockInstance[]>(() => {
    const curve = createRouteCurve();
    const instances: BlockInstance[] = [];

    for (let row = 0; row < 26; row += 1) {
      const t = 0.04 + row / 30;
      const point = curve.getPointAt(Math.min(t, 0.98));
      const tangent = curve.getTangentAt(Math.min(t, 0.98)).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      for (let side = -1; side <= 1; side += 2) {
        for (let depth = 0; depth < 2; depth += 1) {
          const width = 1.8 + ((row + depth) % 3) * 0.55;
          const height = 3 + ((row * 2 + depth) % 5) * 1.5;
          const blockDepth = 1.8 + ((row + depth) % 3) * 0.5;
          const lateral = 6.3 + depth * 3;
          const forward = (depth - 0.5) * 1.2;
          const position = point
            .clone()
            .add(normal.clone().multiplyScalar(lateral * side))
            .add(tangent.clone().multiplyScalar(forward));

          position.y = -1.2 + height / 2;

          instances.push({
            position,
            scale: new THREE.Vector3(width, height, blockDepth),
            color: new THREE.Color(
              (row + depth + side) % 3 === 0
                ? "#111723"
                : (row + depth) % 2 === 0
                  ? "#161d2a"
                  : "#0d1118"
            ),
          });
        }
      }
    }

    return instances;
  }, []);

  useEffect(() => {
    if (!instancedRef.current) return;
    const dummy = new THREE.Object3D();
    const colors = new Float32Array(blocks.length * 3);

    blocks.forEach((block, index) => {
      dummy.position.copy(block.position);
      dummy.scale.copy(block.scale);
      dummy.updateMatrix();
      instancedRef.current?.setMatrixAt(index, dummy.matrix);
      block.color.toArray(colors, index * 3);
    });

    colorArrayRef.current = colors;
    instancedRef.current.instanceMatrix.needsUpdate = true;
    instancedRef.current.geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 3)
    );
  }, [blocks]);

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors roughness={0.76} metalness={0.18} />
    </instancedMesh>
  );
}

function StreetLights() {
  const poles = useMemo<PoleInstance[]>(() => {
    const curve = createRouteCurve();
    return Array.from({ length: 24 }, (_, index) => {
      const t = 0.06 + index / 27;
      const point = curve.getPointAt(Math.min(t, 0.98));
      const tangent = curve.getTangentAt(Math.min(t, 0.98)).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      return [-1, 1].map((side) => {
        const position = point.clone().add(normal.clone().multiplyScalar(3.5 * side));
        position.y = -0.25;
        return {
          position,
          rotationY: Math.atan2(tangent.x, tangent.z),
          side,
          color: index % 2 === 0 ? "#ffb347" : "#d4ff72",
        };
      });
    }).flat();
  }, []);

  return (
    <group>
      {poles.map((pole, index) => (
        <group
          key={index}
          position={[pole.position.x, pole.position.y, pole.position.z]}
          rotation={[0, pole.rotationY, 0]}
        >
          <mesh castShadow position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 2.6, 8]} />
            <meshStandardMaterial color="#2a3140" metalness={0.45} roughness={0.5} />
          </mesh>
          <mesh position={[pole.side * 0.3, 2.45, 0]}>
            <boxGeometry args={[0.68, 0.08, 0.08]} />
            <meshStandardMaterial color="#2a3140" metalness={0.45} roughness={0.5} />
          </mesh>
          <mesh position={[pole.side * 0.56, 2.35, 0]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshBasicMaterial color={pole.color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StopSign({
  title,
  subtitle,
  accent,
  position,
  rotationY,
}: {
  title: string;
  subtitle: string;
  accent: string;
  position: [number, number, number];
  rotationY?: number;
}) {
  const texture = useMemo(
    () => createLabelTexture(title, subtitle, accent),
    [title, subtitle, accent]
  );

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  return (
    <group position={position} rotation={[0, rotationY ?? 0, 0]}>
      <mesh castShadow position={[0, 1.7, 0]}>
        <boxGeometry args={[3.4, 2.1, 0.18]} />
        <meshStandardMaterial color="#0f131b" metalness={0.36} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.7, 0.11]}>
        <planeGeometry args={[3, 1.7]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh castShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 2.3, 12]} />
        <meshStandardMaterial color="#2a3140" />
      </mesh>
    </group>
  );
}

function Scooter({ scrollProgress }: CanvasSceneProps) {
  const curve = useMemo(() => createRouteCurve(), []);
  const ref = useRef<THREE.Group>(null);
  const frontWheel = useRef<THREE.Mesh>(null);
  const backWheel = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current || !frontWheel.current || !backWheel.current || !headRef.current) return;
    const riderT = Math.min(scrollProgress * 0.96 + 0.02, 1);
    const point = curve.getPointAt(riderT);
    const tangent = curve.getTangentAt(riderT).normalize();
    const yaw = Math.atan2(tangent.x, tangent.z);
    const bob = Math.sin(state.clock.elapsedTime * 7) * 0.03;
    ref.current.position.set(point.x, point.y + 0.22 + bob, point.z);
    ref.current.rotation.set(0, yaw, 0);
    headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
    frontWheel.current.rotation.x -= 0.32;
    backWheel.current.rotation.x -= 0.32;
  });

  return (
    <group ref={ref}>
      <mesh castShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.82, 0.14, 1.45]} />
        <meshStandardMaterial color="#f4efe7" roughness={0.18} metalness={0.58} />
      </mesh>
      <mesh castShadow position={[0, 0.7, 0.04]}>
        <boxGeometry args={[0.28, 0.12, 0.66]} />
        <meshStandardMaterial color="#ff8a3d" emissive="#ff8a3d" emissiveIntensity={0.2} />
      </mesh>
      <mesh castShadow position={[0, 1.1, 0.56]}>
        <boxGeometry args={[0.1, 0.64, 0.1]} />
        <meshStandardMaterial color="#2b3340" />
      </mesh>
      <mesh castShadow position={[0, 1.34, 0.76]}>
        <boxGeometry args={[0.62, 0.08, 0.08]} />
        <meshStandardMaterial color="#2b3340" />
      </mesh>
      <group position={[0, 0.58, -0.1]}>
        <mesh castShadow position={[0, 1.02, 0]} rotation={[0, 0, -0.04]}>
          <capsuleGeometry args={[0.18, 0.55, 6, 12]} />
          <meshStandardMaterial color="#151a22" />
        </mesh>
        <mesh castShadow position={[0, 1.48, 0.1]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.52, 0.5, 0.22]} />
          <meshStandardMaterial color="#5c738e" />
        </mesh>
        <mesh castShadow position={[-0.14, 0.46, 0.12]} rotation={[0.2, 0, 0.08]}>
          <capsuleGeometry args={[0.06, 0.46, 4, 8]} />
          <meshStandardMaterial color="#151a22" />
        </mesh>
        <mesh castShadow position={[0.14, 0.46, 0.12]} rotation={[0.2, 0, -0.08]}>
          <capsuleGeometry args={[0.06, 0.46, 4, 8]} />
          <meshStandardMaterial color="#151a22" />
        </mesh>
        <mesh castShadow position={[-0.12, -0.02, 0.02]} rotation={[-0.35, 0, 0.05]}>
          <capsuleGeometry args={[0.07, 0.64, 4, 8]} />
          <meshStandardMaterial color="#202838" />
        </mesh>
        <mesh castShadow position={[0.12, -0.02, 0.02]} rotation={[-0.35, 0, -0.05]}>
          <capsuleGeometry args={[0.07, 0.64, 4, 8]} />
          <meshStandardMaterial color="#202838" />
        </mesh>
        <mesh ref={headRef} castShadow position={[0, 1.85, 0.12]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#f1c9b6" />
        </mesh>
        <mesh castShadow position={[0, 2.02, 0.1]}>
          <sphereGeometry args={[0.2, 10, 10]} />
          <meshStandardMaterial color="#131720" />
        </mesh>
      </group>
      <mesh ref={frontWheel} castShadow position={[0, 0.2, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.07, 12, 24]} />
        <meshStandardMaterial color="#0d0f13" metalness={0.24} roughness={0.82} />
      </mesh>
      <mesh ref={backWheel} castShadow position={[0, 0.2, -0.56]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.07, 12, 24]} />
        <meshStandardMaterial color="#0d0f13" metalness={0.24} roughness={0.82} />
      </mesh>
    </group>
  );
}

function StopCluster() {
  return (
    <>
      <group position={[4.2, -0.15, -0.4]}>
        <StopSign title="About Me" subtitle="First Stop" accent="#ff8a3d" position={[0, 0, 0]} rotationY={-0.32} />
        <mesh castShadow position={[-1.8, 1.45, -1.4]}>
          <boxGeometry args={[1, 3.8, 1]} />
          <meshStandardMaterial color="#d4ff72" emissive="#d4ff72" emissiveIntensity={0.1} />
        </mesh>
      </group>
      <group position={[-4.3, -0.12, -14.2]}>
        <StopSign title="Selected Work" subtitle="Work District" accent="#7be7ff" position={[0, 0, 0]} rotationY={0.46} />
        <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.18}>
          <mesh castShadow position={[2.2, 2.2, -0.6]} rotation={[0.04, -0.28, -0.04]}>
            <boxGeometry args={[2.1, 1.36, 0.12]} />
            <meshStandardMaterial color="#11161f" metalness={0.42} roughness={0.22} />
          </mesh>
          <mesh position={[2.2, 2.2, -0.51]} rotation={[0.04, -0.28, -0.04]}>
            <planeGeometry args={[1.62, 1.05]} />
            <meshBasicMaterial color="#ff8a3d" transparent opacity={0.92} />
          </mesh>
        </Float>
      </group>
      <group position={[3.8, -0.15, -28.4]}>
        <StopSign title="Capabilities" subtitle="Tech Square" accent="#d4ff72" position={[0, 0, 0]} rotationY={-0.4} />
        {[-1.1, -0.25, 0.6, 1.45].map((x, index) => (
          <mesh key={x} castShadow position={[x, 1.2 + index * 0.16, -1.5 + index * 0.18]}>
            <boxGeometry args={[0.34, 2 + index * 0.22, 0.34]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#d4ff72" : "#ff8a3d"}
              emissive={index % 2 === 0 ? "#d4ff72" : "#ff8a3d"}
              emissiveIntensity={0.22}
              metalness={0.6}
              roughness={0.28}
            />
          </mesh>
        ))}
      </group>
      <group position={[0.8, 0.15, -42]}>
        <StopSign title="Contact" subtitle="Final Stop" accent="#ff8a3d" position={[-2.2, -0.2, 1.2]} rotationY={0.3} />
        <mesh castShadow>
          <octahedronGeometry args={[1.15, 0]} />
          <meshStandardMaterial
            color="#f4efe7"
            emissive="#ff8a3d"
            emissiveIntensity={0.58}
            roughness={0.12}
            metalness={0.65}
          />
        </mesh>
        <mesh position={[0, -1.8, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.55, 3.5, 16]} />
          <meshStandardMaterial color="#ff8a3d" emissive="#ff8a3d" emissiveIntensity={0.28} />
        </mesh>
        <pointLight position={[0, 1.45, 0]} intensity={7} distance={16} color="#ff8a3d" />
      </group>
    </>
  );
}

export default function CanvasScene({ scrollProgress }: CanvasSceneProps) {
  return (
    <>
      <color attach="background" args={["#040507"]} />
      <fog attach="fog" args={["#040507", 12, 50]} />
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#d8deff", "#050609", 0.44]} />
      <directionalLight
        position={[10, 14, 6]}
        intensity={1.15}
        color="#f6efe4"
        castShadow
      />
      <pointLight position={[0, 8, -18]} intensity={2.2} distance={24} color="#7be7ff" />
      <Stars radius={90} depth={36} count={520} factor={3.2} saturation={0} fade speed={0.35} />

      <CityGround />
      <CityRoad />
      <CityBlocks />
      <StreetLights />
      <Scooter scrollProgress={scrollProgress} />
      <StopCluster />
    </>
  );
}
