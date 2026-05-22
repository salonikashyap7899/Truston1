import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="oklch(0.55 0.15 250)"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive="oklch(0.75 0.12 220)"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function Section3DBackground({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000`}
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          color="oklch(0.75 0.12 220)"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="oklch(0.55 0.15 250)" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
