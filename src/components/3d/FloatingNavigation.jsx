import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingNavigation = ({ setActiveSection }) => {
  const navRef = useRef();
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', color: '#00d9ff', position: [0, 3, 0] },
    { id: 'about', label: 'About', color: '#9d4edd', position: [-2, 2, -2] },
    { id: 'skills', label: 'Skills', color: '#FF6B6B', position: [2, 2, -2] },
    { id: 'projects', label: 'Projects', color: '#4ECDC4', position: [-3, 0, -3] },
    { id: 'experience', label: 'Experience', color: '#FFD166', position: [3, 0, -3] },
    { id: 'contact', label: 'Contact', color: '#118AB2', position: [0, -2, -4] }
  ];

  useFrame((state) => {
    if (navRef.current) {
      navRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      navRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const handleClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group ref={navRef} position={[0, 0, -8]}>
      {/* Central navigation hub */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1F4E79"
          emissive="#1F4E79"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Navigation items */}
      {navItems.map((item) => (
        <Float
          key={item.id}
          speed={2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <group position={item.position}>
            {/* Navigation sphere */}
            <mesh
              onClick={() => handleClick(item.id)}
              onPointerOver={() => setHovered(item.id)}
              onPointerOut={() => setHovered(null)}
              scale={hovered === item.id ? 1.2 : 1}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={hovered === item.id ? 0.8 : 0.3}
                metalness={0.9}
                roughness={0.1}
              />
              
              {/* Inner glow */}
              <mesh scale={0.8}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.2}
                />
              </mesh>
            </mesh>
            
            {/* Label */}
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {item.label}
            </Text>
            
            {/* Connection line to center */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 1]} />
              <meshBasicMaterial
                color={item.color}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        </Float>
      ))}
      
      {/* Orbiting particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2 + Math.sin(i * 0.5) * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.cos(i * 0.3) * 0.5;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#00d9ff"
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
      
      {/* Navigation title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Bold.ttf"
      >
        NAVIGATE PORTFOLIO
      </Text>
    </group>
  );
};

export default FloatingNavigation;