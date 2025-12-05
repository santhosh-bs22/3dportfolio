import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

const ExperienceTimeline = () => {
  const timelineRef = useRef();
  const nodesRef = useRef();

  const experiences = [
    {
      year: '2021',
      title: 'Started Web Dev',
      description: 'Began learning HTML, CSS & JavaScript',
      color: '#FF6B6B',
      position: [-8, 0, 0]
    },
    {
      year: '2022',
      title: 'React Journey',
      description: 'Mastered React & modern frontend',
      color: '#4ECDC4',
      position: [-4, 2, 0]
    },
    {
      year: '2023',
      title: 'Full Stack',
      description: 'Expanded to backend & databases',
      color: '#FFD166',
      position: [0, 4, 0]
    },
    {
      year: '2024',
      title: '3D & Advanced',
      description: 'Three.js & advanced animations',
      color: '#118AB2',
      position: [4, 2, 0]
    },
    {
      year: 'Now',
      title: 'Portfolio',
      description: 'Building this 3D portfolio',
      color: '#9D4EDD',
      position: [8, 0, 0]
    }
  ];

  useFrame((state) => {
    if (timelineRef.current) {
      timelineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        node.position.y = experiences[i].position[1] + Math.sin(state.clock.elapsedTime + i) * 0.2;
        node.rotation.y += 0.01;
      });
    }
  });

  // Create timeline points
  const points = experiences.map(exp => new THREE.Vector3(...exp.position));

  return (
    <group ref={timelineRef} position={[0, -2, -5]}>
      {/* Timeline Path */}
      <Line
        points={points}
        color="#00d9ff"
        lineWidth={3}
        transparent
        opacity={0.6}
      />
      
      {/* Animated timeline points */}
      <group ref={nodesRef}>
        {experiences.map((exp, i) => (
          <mesh key={exp.year} position={exp.position}>
            {/* Main node */}
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color={exp.color}
              emissive={exp.color}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
            
            {/* Year text */}
            <Text
              position={[0, 1, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {exp.year}
            </Text>
            
            {/* Title */}
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.2}
              color={exp.color}
              anchorX="center"
              anchorY="middle"
            >
              {exp.title}
            </Text>
            
            {/* Connection lines */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.6, 0.8, 32]} />
              <meshBasicMaterial
                color={exp.color}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Glowing orb inside */}
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
              />
            </mesh>
          </mesh>
        ))}
      </group>
      
      {/* Floating connectors */}
      {Array.from({ length: 100 }).map((_, i) => {
        const progress = i / 100;
        const point = new THREE.Vector3();
        const curve = new THREE.CatmullRomCurve3(points);
        point.copy(curve.getPoint(progress));
        
        return (
          <mesh key={i} position={point}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#00d9ff"
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
      
      {/* Timeline title */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.5}
        color="#00d9ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Bold.ttf"
      >
        DEVELOPMENT TIMELINE
      </Text>
    </group>
  );
};

export default ExperienceTimeline;