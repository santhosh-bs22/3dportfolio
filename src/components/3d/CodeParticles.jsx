// src/components/3d/CodeParticles.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CodeParticles = ({ count = 100 }) => {
  const meshRef = useRef();
  
  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.03;
      const x = Math.cos(time) * factor;
      const y = Math.sin(time) * factor;
      const z = Math.sin(time) * factor;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        let { factor, speed, time } = particle;
        time = particle.time += speed / 2;
        
        const s = Math.cos(time);
        particle.x = Math.cos(time) * factor;
        particle.y = Math.sin(time) * factor;
        particle.z = Math.sin(time) * factor;
        
        meshRef.current.geometry.attributes.position.setXYZ(
          i,
          particle.x,
          particle.y,
          particle.z
        );
      });
      meshRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.05}
        color="#00d9ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

export default CodeParticles;