import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';

// Import all 3D components - FIXED PATHS
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

// Import Galaxy components - FIXED PATHS
import GalaxySpiral from './GalaxySpiral';
import BlackHole from './BlackHole';
import NebulaClouds from './NebulaClouds';

// Import hooks - FIXED PATHS
import { use3dEffects } from '../../hooks/use3dEffects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const UniverseScene = ({ activeSection }) => {
  const universeRef = useRef();
  
  // Initialize hooks
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

      {/* Galaxy Spiral */}
      <GalaxySpiral 
        position={[30, 15, -50]}
        scale={0.8}
        rotation={[0, Math.PI / 4, 0]}
      />

      {/* Black Hole */}
      <BlackHole 
        position={[-25, -10, -40]}
        scale={0.5}
      />

      {/* Nebula Clouds */}
      <NebulaClouds 
        count={3}
        positions={[
          [20, 5, -30],
          [-15, 10, -35],
          [10, -8, -25]
        ]}
      />

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
        </mesh>
      ))}

      <Preload all />
    </group>
  );
};

export default UniverseScene;