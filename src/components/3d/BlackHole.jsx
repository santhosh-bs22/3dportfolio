import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring } from '@react-three/drei';
import * as THREE from 'three';

const BlackHole = ({ position = [-25, -10, -40], scale = 0.5 }) => {
  const blackHoleRef = useRef();
  const accretionDiskRef = useRef();
  const particleRingRef = useRef();

  useFrame((state) => {
    if (blackHoleRef.current) {
      // Black hole rotation
      blackHoleRef.current.rotation.y += 0.005;
      
      // Pulsing effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      blackHoleRef.current.scale.setScalar(pulse * scale);
    }
    
    // Accretion disk rotation
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.y += 0.01;
    }
    
    // Particle ring rotation (faster)
    if (particleRingRef.current) {
      particleRingRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={blackHoleRef} position={position}>
      {/* Black Hole Core (Dark sphere) */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#000000"
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Event Horizon (Glowing edge) */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial
          color="#ff0000"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Accretion Disk */}
      <group ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
        <Ring args={[2.5, 6, 64]}>
          <meshBasicMaterial
            color="#ff5500"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>
        
        {/* Inner disk */}
        <Ring args={[2.2, 2.5, 64]}>
          <meshBasicMaterial
            color="#ff9900"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      {/* Particle Ring (Orbiting debris) */}
      <group ref={particleRingRef} rotation={[Math.PI / 3, 0, 0]}>
        {Array.from({ length: 200 }).map((_, i) => {
          const angle = (i / 200) * Math.PI * 2;
          const radius = 4 + Math.random() * 2;
          
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
              <meshBasicMaterial
                color="#ff6600"
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        })}
      </group>

      {/* Gravitational Lensing Effect */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Jet Streams */}
      {[1, -1].map((direction, i) => (
        <mesh
          key={i}
          position={[0, direction * 8, 0]}
          rotation={[direction > 0 ? Math.PI : 0, 0, 0]}
        >
          <cylinderGeometry args={[0.2, 1.5, 15, 8]} />
          <meshBasicMaterial
            color="#00aaff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Warped Space Grid */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[0, (i / 20) * Math.PI, 0]}
          position={[0, 0, 0]}
        >
          <ringGeometry args={[2.5, 10, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

export default BlackHole;