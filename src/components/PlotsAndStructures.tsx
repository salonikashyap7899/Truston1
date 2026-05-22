import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";
import * as THREE from "three";

// 3D Building Block Component
function BuildingBlock({ position, scale, color, delay = 0 }: { 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3} 
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// 3D Plot Grid Component
function PlotGrid() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Grid lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -0.5, i * 0.5 - 1.25]}>
          <boxGeometry args={[3, 0.02, 0.02]} />
          <meshStandardMaterial color="#00BFFF" opacity={0.3} transparent />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[i * 0.6 - 1.5, -0.5, 0]}>
          <boxGeometry args={[0.02, 0.02, 2.5]} />
          <meshStandardMaterial color="#00BFFF" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

// 3D Floating Structure
function FloatingStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main tower */}
        <BuildingBlock position={[0, 0.5, 0]} scale={[0.8, 2, 0.8]} color="#1a3a4a" delay={0} />
        
        {/* Secondary buildings */}
        <BuildingBlock position={[-1.2, 0, 0.3]} scale={[0.6, 1.2, 0.6]} color="#0d2a3a" delay={1} />
        <BuildingBlock position={[1.2, 0.2, -0.2]} scale={[0.5, 1.5, 0.5]} color="#153040" delay={2} />
        
        {/* Accent structures */}
        <BuildingBlock position={[-0.5, -0.2, 1]} scale={[0.4, 0.8, 0.4]} color="#00BFFF" delay={3} />
        <BuildingBlock position={[0.8, -0.1, 0.8]} scale={[0.3, 0.6, 0.3]} color="#00BFFF" delay={4} />
        
        {/* Plot grid */}
        <PlotGrid />
        
        {/* Ground plane with glass effect */}
        <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            opacity={0.1} 
            transparent 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Main 3D Scene
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#00BFFF"
      />
      <FloatingStructure />
      <Environment preset="city" />
    </Canvas>
  );
}

export function PlotsAndStructures() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 bg-background overflow-hidden"
    >
      <Section3DBackground opacity={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <SectionEyebrow>Strategic Masterpieces</SectionEyebrow>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 mb-8">
                Building <em className="text-luxe-cyan italic">Plots & Structures</em>
              </h2>
            </Reveal>

            <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
              <Reveal delay={0.2}>
                <p>
                  Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow&apos;s most promising corridors, offering 100% legal clearance and Jila Panchayat approval.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-12 pt-8">
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">150+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold">Premium Plots</p>
                  </div>
                  <div className="border-l border-luxe-cyan/30 pl-6">
                    <p className="text-3xl font-display text-white mb-2">Elite</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold">Architectural Support</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 3D Visual Side */}
          <div className="order-1 lg:order-2 h-[400px] md:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-luxe-cyan/5 to-transparent rounded-3xl border border-white/5" />
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-luxe-cyan/30 border-t-luxe-cyan rounded-full animate-spin" />
              </div>
            }>
              <Scene3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
