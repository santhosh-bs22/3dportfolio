// src/components/3d/SkillPlanet.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { skillsData } from '../../data/skillsData';

const SkillPlanet = ({ index, total, radius = 3, speed = 0.5 }) => {
  const meshRef = useRef();
  const skill = skillsData[index % skillsData.length];
  
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Orbital motion
      const time = state.clock.elapsedTime * speed;
      const newAngle = angle + time;
      meshRef.current.position.x = Math.cos(newAngle) * radius;
      meshRef.current.position.z = Math.sin(newAngle) * radius;
      
      // Rotation
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      // Floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
    }
  });

  const getColor = (level) => {
    if (level >= 90) return '#00ff88';
    if (level >= 80) return '#00d9ff';
    if (level >= 70) return '#9d4edd';
    return '#ff6b6b';
  };

  return (
    <mesh ref={meshRef} position={[x, 0, z]}>
      <Sphere args={[0.5 + (skill.level / 100), 32, 32]}>
        <meshStandardMaterial
          color={getColor(skill.level)}
          emissive={getColor(skill.level)}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {skill.name}
      </Text>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.15}
        color={getColor(skill.level)}
        anchorX="center"
        anchorY="middle"
      >
        {skill.level}%
      </Text>
      
      {/* Skill level ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial
          color={getColor(skill.level)}
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>
    </mesh>
  );
};

export default SkillPlanet;