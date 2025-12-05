// src/components/3d/FloatingIcons.jsx
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const techIcons = [
  { name: 'React', color: '#61DAFB', position: [3, 2, 0] },
  { name: 'TypeScript', color: '#3178C6', position: [-3, 1, 2] },
  { name: 'JavaScript', color: '#F7DF1E', position: [2, -2, 3] },
  { name: 'HTML', color: '#E34F26', position: [-2, 3, -1] },
  { name: 'CSS', color: '#1572B6', position: [1, -3, -2] },
  { name: 'Tailwind', color: '#06B6D4', position: [-1, 2, -3] },
  { name: 'Java', color: '#007396', position: [4, 1, 1] },
  { name: 'Git', color: '#F05032', position: [-4, -1, 2] },
];

const FloatingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      techIcons.forEach((icon, i) => {
        const child = groupRef.current.children[i];
        if (child) {
          const time = state.clock.elapsedTime;
          child.position.y = icon.position[1] + Math.sin(time + i) * 0.5;
          child.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {techIcons.map((icon, i) => (
        <mesh key={icon.name} position={icon.position} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={icon.color}
            emissive={icon.color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
          <Text
            position={[0, 0, 0.3]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {icon.name}
          </Text>
        </mesh>
      ))}
    </group>
  );
};

export default FloatingIcons;