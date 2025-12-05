// src/components/3d/Avatar.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Avatar = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main Avatar Cube */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#1F4E79"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner Glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      
      {/* Floating Tech Icons around avatar */}
      {['React', 'JS', 'CSS', 'TS'].map((tech, i) => (
        <mesh
          key={tech}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 3,
            Math.sin((i / 4) * Math.PI * 2) * 1.5,
            Math.sin((i / 4) * Math.PI * 2) * 3
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={i === 0 ? '#61DAFB' : i === 1 ? '#F7DF1E' : i === 2 ? '#2965F1' : '#3178C6'}
            emissive={i === 0 ? '#61DAFB' : i === 1 ? '#F7DF1E' : i === 2 ? '#2965F1' : '#3178C6'}
            emissiveIntensity={0.5}
          />
          <Text
            position={[0, 0, 0.3]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        </mesh>
      ))}
    </group>
  );
};

export default Avatar;