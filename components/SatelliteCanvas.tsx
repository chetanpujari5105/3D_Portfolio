"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function DustParticles({ count = 250 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;     // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.006;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FBD5A5"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

function Satellites({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotation combining clock and mouse coordinates
      const targetX = mouse.y * 0.4;
      const targetY = mouse.x * 0.4;
      
      // Interpolate rotation for smooth lag effect
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
      
      // Idle slow spin
      groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Geometric Satellite - Octahedron Wireframe */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#F37512" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Outer Shell */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#FBD5A5" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Small revolving satellite nodes */}
      <mesh position={[2, 0.4, -0.8]} scale={0.12}>
        <dodecahedronGeometry />
        <meshBasicMaterial color="#F37512" wireframe />
      </mesh>
      <mesh position={[-1.7, -0.8, 0.8]} scale={0.1}>
        <octahedronGeometry />
        <meshBasicMaterial color="#FBD5A5" wireframe />
      </mesh>
    </group>
  );
}

export default function SatelliteCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates -1 to 1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none select-none canvas-container opacity-60">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <DustParticles count={250} />
        <Satellites mouse={mouse} />
      </Canvas>
    </div>
  );
}
