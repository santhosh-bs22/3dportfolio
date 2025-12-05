import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GalaxySpiral = ({ position = [30, 15, -50], scale = 0.8, rotation = [0, Math.PI / 4, 0] }) => {
  const galaxyRef = useRef();
  const particlesRef = useRef();
  
  const arms = 3;
  const stars = 3000;

  // Create galaxy particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(stars * 3);
    const colors = new Float32Array(stars * 3);
    
    for (let i = 0; i < stars; i++) {
      const arm = Math.floor(Math.random() * arms);
      const distance = Math.random() ** 1.5 * 15; // More stars in center
      const angle = (arm / arms) * Math.PI * 2 + (distance * 6);
      const vertical = (Math.random() - 0.5) * 2;
      
      // Spiral position
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = vertical * 0.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color based on distance (blue in center, white in arms)
      const color = new THREE.Color();
      const hue = 0.6 + (distance / 15) * 0.2;
      const saturation = 0.7;
      const brightness = 0.5 + (distance / 15) * 0.3;
      color.setHSL(hue, saturation, brightness);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [stars, arms]);

  useFrame((state) => {
    if (galaxyRef.current) {
      // Slow rotation
      galaxyRef.current.rotation.y += 0.0002;
      
      // Gentle floating motion
      galaxyRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
    
    // Animate individual particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group 
      ref={galaxyRef} 
      position={position}
      scale={scale}
      rotation={rotation}
    >
      {/* Galaxy Core (Bright center) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Spiral Arms (Particle System) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={stars}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          sizeAttenuation={true}
          vertexColors={true}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Outer Halo */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[18, 32, 32]} />
        <meshBasicMaterial
          color="#1F4E79"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dust Clouds */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 1.5) * 10,
            Math.sin(i) * 3,
            Math.sin(i * 1.2) * 10
          ]}
        >
          <sphereGeometry args={[3 + i, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#9d4edd' : '#00d9ff'}
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      ))}

      {/* Star Clusters */}
      {Array.from({ length: 6 }).map((_, i) => {
        const clusterAngle = (i / 6) * Math.PI * 2;
        const clusterRadius = 8 + Math.random() * 4;
        
        return (
          <group
            key={i}
            position={[
              Math.cos(clusterAngle) * clusterRadius,
              (Math.random() - 0.5) * 2,
              Math.sin(clusterAngle) * clusterRadius
            ]}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <mesh
                key={j}
                position={[
                  (Math.random() - 0.5) * 1.5,
                  (Math.random() - 0.5) * 1.5,
                  (Math.random() - 0.5) * 1.5
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.7}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Energy Beams from Core */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const length = 12 + Math.random() * 6;
        
        return (
          <mesh
            key={i}
            rotation={[0, angle, Math.PI / 2]}
            position={[0, 0, 0]}
          >
            <cylinderGeometry args={[0.05, 0.2, length, 8]} />
            <meshBasicMaterial
              color="#00ffaa"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default GalaxySpiral;