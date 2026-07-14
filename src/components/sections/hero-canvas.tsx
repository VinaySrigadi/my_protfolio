"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMounted } from "@/hooks/use-mounted";

const spherePositions = new Float32Array(3000 * 3);
for (let i = 0; i < 3000; i++) {
  // Random spherical distribution
  const r = 1.2 * Math.cbrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  
  spherePositions[i * 3] = x;
  spherePositions[i * 3 + 1] = y;
  spherePositions[i * 3 + 2] = z;
}

function NeuralNetwork() {
  const ref = useRef<THREE.Points>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4F7EF0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export function HeroCanvas() {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
