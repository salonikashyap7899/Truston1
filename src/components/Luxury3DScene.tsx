import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Environment,
  Text,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

function ArchitecturalElement({ position, rotation, color, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.position.y += Math.sin(t) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 0.05, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color={color}
        />
      </mesh>
    </Float>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.5 + i * 0.5}>
            <torusGeometry args={[1, 0.01, 16, 100]} />
            <meshStandardMaterial
              color={i === 1 ? "oklch(0.65 0.12 240)" : "oklch(0.55 0.15 250)"}
              metalness={1}
              roughness={0.1}
              emissive={i === 1 ? "oklch(0.65 0.12 240)" : "oklch(0.55 0.15 250)"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function MouseResponsiveScene() {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.1,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.1,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingRings />

      {/* Abstract Architectural Shapes */}
      <ArchitecturalElement
        position={[-2, 1, -1]}
        rotation={[0.5, 0.5, 0]}
        color="oklch(0.55 0.15 250)"
        scale={1.2}
      />
      <ArchitecturalElement
        position={[2, -1, 1]}
        rotation={[-0.5, -0.5, 0]}
        color="oklch(0.65 0.12 240)"
        scale={0.8}
      />

      <Particles count={150} />
    </group>
  );
}

function Particles({ count = 100 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="oklch(0.65 0.12 240)"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export function Luxury3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          color="oklch(0.65 0.12 240)"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="oklch(0.55 0.15 250)" />

        <MouseResponsiveScene />

        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
