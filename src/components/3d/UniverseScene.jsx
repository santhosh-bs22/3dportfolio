import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';

// Import all 3D components
import Avatar from './Avatar';
import SkillPlanet from './SkillPlanet';
import ProjectPlanet from './ProjectPlanet';
import CodeParticles from './CodeParticles';
import ParticlesRing from './ParticlesRing';
import FloatingIcons from './FloatingIcons';
import ContactPortal from './ContactPortal';
import ExperienceTimeline from './ExperienceTimeline';
import FloatingNavigation from './FloatingNavigation';
import StarsBackground from './StarsBackground';

// Import custom hooks
import { use3dEffects } from '../../hooks/use3dEffects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const UniverseScene = ({ activeSection }) => {
  const universeRef = useRef();
  const effects = use3dEffects();
  const { createScrollTrigger } = useScrollAnimation();

  useFrame((state) => {
    if (universeRef.current) {
      // Gentle universe rotation
      universeRef.current.rotation.y += 0.0005;
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
      universeRef.current.scale.setScalar(scale);
    }
    
    // Camera follow active section
    switch(activeSection) {
      case 'home':
        state.camera.position.lerp({ x: 0, y: 0, z: 15 }, 0.05);
        break;
      case 'about':
        state.camera.position.lerp({ x: 5, y: 2, z: 10 }, 0.05);
        break;
      case 'skills':
        state.camera.position.lerp({ x: -5, y: 3, z: 8 }, 0.05);
        break;
      case 'projects':
        state.camera.position.lerp({ x: 0, y: -2, z: 12 }, 0.05);
        break;
      case 'experience':
        state.camera.position.lerp({ x: 8, y: 0, z: 10 }, 0.05);
        break;
      case 'contact':
        state.camera.position.lerp({ x: -8, y: -1, z: 9 }, 0.05);
        break;
    }
  });

  return (
    <group ref={universeRef}>
      {/* Background Elements */}
      <Suspense fallback={null}>
        <StarsBackground />
      </Suspense>

      {/* Central Elements - Always Visible */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Avatar position={[0, 0, 0]} />
      </Float>

      {/* Skill Planets Orbit */}
      <group position={[0, 3, -3]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkillPlanet
            key={i}
            index={i}
            total={8}
            radius={4}
            speed={0.3 + i * 0.05}
          />
        ))}
      </group>

      {/* Project Planets - Different Orbit */}
      <group position={[0, -2, -5]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectPlanet
            key={i}
            index={i}
            total={6}
            radius={6}
            speed={0.2 + i * 0.03}
          />
        ))}
      </group>

      {/* Interactive Navigation */}
      <FloatingNavigation />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Contact Portal */}
      <ContactPortal />

      {/* Code Particles - Background Effect */}
      <CodeParticles count={200} />

      {/* Multiple Particle Rings */}
      <ParticlesRing count={60} radius={8} color="#00d9ff" />
      <ParticlesRing count={40} radius={12} color="#9d4edd" rotation={[Math.PI/4, 0, 0]} />
      <ParticlesRing count={30} radius={16} color="#FF6B6B" rotation={[Math.PI/2, 0, 0]} />

      {/* Floating Tech Icons */}
      <FloatingIcons />

      {/* Additional Decorative Elements */}
      
      {/* Orbiting Satellites */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * 2) * 10,
          Math.cos(i * 1.5) * 8,
          Math.cos(i * 2) * 10
        ]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.5}
          />
          
          {/* Solar panels */}
          <mesh position={[0.5, 0, 0]}>
            <boxGeometry args={[1, 0.1, 0.5]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
          <mesh position={[-0.5, 0, 0]}>
            <boxGeometry args={[1, 0.1, 0.5]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        </mesh>
      ))}

      {/* Data Streams */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={i} position={[
          Math.sin(i * 1.5) * 15,
          Math.cos(i) * 10,
          Math.cos(i * 1.2) * 12
        ]}>
          {Array.from({ length: 20 }).map((_, j) => (
            <mesh key={j} position={[0, j * 0.5, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color="#00ff88" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Binary Code Rain */}
      <group position={[0, 10, -20]}>
        {Array.from({ length: 100 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              Math.random() * -30,
              (Math.random() - 0.5) * 20
            ]}
          >
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshBasicMaterial
              color={Math.random() > 0.5 ? '#00d9ff' : '#9d4edd'}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      <Preload all />
    </group>
  );
};

export default UniverseScene;