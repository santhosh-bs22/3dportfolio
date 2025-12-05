import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NebulaClouds = ({ count = 3, positions = [[20, 5, -30], [-15, 10, -35], [10, -8, -25]] }) => {
  const cloudsRef = useRef([]);

  // Nebula colors
  const nebulaColors = [
    '#9d4edd', // Purple
    '#00d9ff', // Cyan
    '#ff6b6b', // Red
    '#4ECDC4', // Teal
    '#FFD166'  // Yellow
  ];

  const noiseTexture = useMemo(() => {
    const size = 64;
    const data = new Uint8Array(size * size * size * 4);
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          const index = (i * size * size + j * size + k) * 4;
          const value = Math.random() * 255;
          data[index] = value;     // R
          data[index + 1] = value; // G
          data[index + 2] = value; // B
          data[index + 3] = 255;   // A
        }
      }
    }
    
    const texture = new THREE.DataTexture3D(data, size, size, size);
    texture.format = THREE.RGBAFormat;
    texture.type = THREE.UnsignedByteType;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    
    return texture;
  }, []);

  useFrame((state) => {
    cloudsRef.current.forEach((cloud, i) => {
      if (cloud) {
        // Gentle floating motion
        cloud.position.y = positions[i][1] + Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.3;
        
        // Slow rotation
        cloud.rotation.y += 0.001;
        
        // Pulsing scale
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05;
        cloud.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={el => cloudsRef.current[i] = el}
          position={positions[i] || [0, 0, 0]}
        >
          <sphereGeometry args={[5 + i * 2, 32, 32]} />
          <meshBasicMaterial
            color={nebulaColors[i % nebulaColors.length]}
            transparent
            opacity={0.08 + i * 0.02}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
          
          {/* Inner cloud detail */}
          <mesh scale={0.8}>
            <sphereGeometry args={[5 + i * 2, 32, 32]} />
            <meshBasicMaterial
              color={nebulaColors[(i + 1) % nebulaColors.length]}
              transparent
              opacity={0.05}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Star particles in nebula */}
          {Array.from({ length: 50 }).map((_, j) => (
            <mesh
              key={j}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
              ]}
            >
              <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.7 + Math.random() * 0.3}
              />
            </mesh>
          ))}
        </mesh>
      ))}
    </group>
  );
};

export default NebulaClouds;