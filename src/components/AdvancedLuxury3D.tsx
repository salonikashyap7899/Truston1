import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  PerspectiveCamera,
  Torus,
  Box,
  Icosahedron,
} from "@react-three/drei";
import * as THREE from "three";

function LuxurySphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = Math.sin(t / 2) / 8;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.8}>
        <MeshDistortMaterial
          color="oklch(0.50 0.155 245)"
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.95}
          roughness={0.05}
        />
      </Sphere>
    </Float>
  );
}

function PremiumTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <Torus ref={meshRef} args={[2, 0.6, 100, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="oklch(0.50 0.155 245)"
        metalness={0.8}
        roughness={0.2}
        emissive="oklch(0.40 0.12 245)"
        emissiveIntensity={0.3}
      />
    </Torus>
  );
}

function AccentIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.2, 4]} position={[3, -1, -2]}>
      <meshStandardMaterial
        color="oklch(0.50 0.15 245)"
        metalness={0.9}
        roughness={0.1}
        emissive="oklch(0.45 0.15 245)"
        emissiveIntensity={0.2}
      />
    </Icosahedron>
  );
}

function AdvancedParticles({ count = 100 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.5;
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
        size={0.08}
        color="oklch(0.50 0.155 245)"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlowPlane() {
  return (
    <Box args={[8, 8, 0.1]} position={[0, -3, -5]}>
      <meshStandardMaterial
        color="oklch(0.30 0.10 245)"
        metalness={0.6}
        roughness={0.8}
        emissive="oklch(0.45 0.12 245)"
        emissiveIntensity={0.2}
      />
    </Box>
  );
}

export function AdvancedLuxury3D({
  intensity = 0.4,
  interactive = false,
}: {
  intensity?: number;
  interactive?: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (interactive) {
    return (
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-auto"
        onMouseMove={(e) => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
          });
        }}
      >
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="oklch(0.50 0.155 245)" />
          <pointLight position={[0, 5, 5]} intensity={0.6} color="oklch(0.50 0.155 245)" />
          <LuxurySphere />
          <PremiumTorus />
          <AccentIcosahedron />
          <AdvancedParticles count={150} />
          <GlowPlane />
        </Canvas>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: intensity }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="oklch(0.50 0.155 245)" />
        <pointLight position={[0, 5, 5]} intensity={0.6} color="oklch(0.50 0.155 245)" />
        <LuxurySphere />
        <PremiumTorus />
        <AccentIcosahedron />
        <AdvancedParticles count={100} />
        <GlowPlane />
      </Canvas>
    </div>
  );
}

export default AdvancedLuxury3D;
