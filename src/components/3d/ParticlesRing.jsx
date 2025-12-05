// src/components/3d/ParticlesRing.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticlesRing = ({ count = 50, radius = 7 }) => {
  const meshRef = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.3;
      const z = Math.sin(angle) * radius * 0.5;
      
      temp.push({ x, y, z, angle, speed: 0.5 + Math.random() * 0.5 });
    }
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        const time = state.clock.elapsedTime * particle.speed;
        const newAngle = particle.angle + time;
        
        particle.x = Math.cos(newAngle) * radius;
        particle.y = Math.sin(newAngle) * radius * 0.3;
        particle.z = Math.sin(newAngle) * radius * 0.5;
        
        meshRef.current.geometry.attributes.position.setXYZ(
          i,
          particle.x,
          particle.y,
          particle.z
        );
      });
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.y += 0.001;
    }
  });

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    return positions;
  }, [count, particles]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#9d4edd"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticlesRing;