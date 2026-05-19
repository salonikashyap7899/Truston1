import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    // Subtle drift + mouse reaction
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 4) / 8 + y * 0.2, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 2) / 8 + x * 0.2, 0.05);
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
          metalness={1}
          roughness={0.05}
          emissive="oklch(0.50 0.155 245)"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 40 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { x, y } = state.mouse;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + x * 0.1;
    pointsRef.current.rotation.x = y * 0.1;
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
        size={0.06}
        color="oklch(0.50 0.155 245)"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneEffects() {
  const { camera } = useThree();

  useFrame((state) => {
    const { x, y } = state.mouse;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y * 0.8, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Luxury3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="oklch(0.50 0.155 245)" />
        <Environment preset="city" />
        <AnimatedShape />
        <Particles count={80} />
        <SceneEffects />
      </Canvas>
    </div>
  );
}
