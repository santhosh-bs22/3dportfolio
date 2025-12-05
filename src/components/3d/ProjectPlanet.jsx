// src/components/3d/ProjectPlanet.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Html } from '@react-three/drei';
import { projectsData } from '../../data/projectsData';

const ProjectPlanet = ({ index, total, radius = 5, speed = 0.3 }) => {
  const meshRef = useRef();
  const project = projectsData[index % projectsData.length];
  
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
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x += 0.01;
      
      // Floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[x, 0, z]}>
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
      
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {project.title}
      </Text>
      
      {/* Tech tags */}
      <group position={[0, -1.2, 0]}>
        {project.tech.slice(0, 3).map((tech, techIndex) => (
          <Text
            key={tech}
            position={[techIndex * 0.8 - 0.8, -techIndex * 0.3, 0]}
            fontSize={0.12}
            color="#00d9ff"
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        ))}
      </group>
      
      {/* Interactive HTML popup */}
      <Html
        distanceFactor={10}
        position={[0, 0, 1.5]}
        style={{
          display: 'none',
          background: 'rgba(10, 14, 23, 0.9)',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid rgba(0, 217, 255, 0.3)',
          minWidth: '200px',
          backdropFilter: 'blur(10px)'
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          e.currentTarget.style.display = 'block';
        }}
        onPointerOut={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      >
        <div className="p-3">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-gray-300 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs bg-blue-900/50 rounded">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-[#1F4E79] text-white rounded hover:bg-[#00d9ff] transition-colors"
            >
              GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-[#9d4edd] text-white rounded hover:bg-[#00d9ff] transition-colors"
            >
              Live Demo
            </a>
          </div>
        </div>
      </Html>
    </mesh>
  );
};

export default ProjectPlanet;