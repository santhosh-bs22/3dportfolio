import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarsBackground = ({ count = 5000 }) => {
  const starsRef = useRef();
  const nebulaRef = useRef();

  // Create star positions
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = 50 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  // Create star sizes and colors
  const sizes = useMemo(() => {
    const sizes = [];
    for (let i = 0; i < count; i++) {
      sizes.push(Math.random() * 1.5);
    }
    return new Float32Array(sizes);
  }, [count]);

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const temperature = Math.random();
      let color;
      
      if (temperature > 0.8) {
        // Blue stars
        color = new THREE.Color(0.8, 0.9, 1);
      } else if (temperature > 0.6) {
        // White stars
        color = new THREE.Color(1, 1, 0.9);
      } else if (temperature > 0.4) {
        // Yellow stars
        color = new THREE.Color(1, 0.9, 0.6);
      } else {
        // Red stars
        color = new THREE.Color(1, 0.6, 0.6);
      }
      
      colors.push(color.r, color.g, color.b);
    }
    return new Float32Array(colors);
  }, [count]);

  useFrame((state) => {
    if (starsRef.current) {
      // Slow rotation
      starsRef.current.rotation.y += 0.0001;
      
      // Pulsing effect
      const time = state.clock.elapsedTime;
      starsRef.current.children.forEach((star, i) => {
        const scale = 0.8 + Math.sin(time * 2 + i) * 0.2;
        star.scale.setScalar(scale);
      });
    }
    
    if (nebulaRef.current) {
      nebulaRef.current.rotation.x += 0.00005;
      nebulaRef.current.rotation.y += 0.00003;
    }
  });

  return (
    <group>
      {/* Main starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula clouds */}
      <group ref={nebulaRef}>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[
            Math.sin(i * 1.2) * 100,
            Math.cos(i * 0.8) * 80,
            Math.sin(i * 0.5) * 120
          ]}>
            <sphereGeometry args={[30 + i * 10, 32, 32]} />
            <meshBasicMaterial
              color={i === 0 ? '#1F4E79' : i === 1 ? '#9d4edd' : '#00d9ff'}
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </mesh>
        ))}
      </group>

      {/* Shooting stars */}
      {Array.from({ length: 5 }).map((_, i) => {
        const speed = 0.5 + Math.random() * 0.5;
        const length = 10 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        
        return (
          <mesh key={i}>
            <cylinderGeometry args={[0.05, 0.05, length, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Constellation lines */}
      {Array.from({ length: 20 }).map((_, i) => {
        const points = [];
        for (let j = 0; j < 3; j++) {
          const angle = (i + j) * 0.5;
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * (80 + Math.random() * 40),
              Math.sin(angle * 2) * 30,
              Math.sin(angle) * (80 + Math.random() * 40)
            )
          );
        }
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#00d9ff"
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
        );
      })}

      {/* Planets in distance */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 2) * 200,
            Math.cos(i * 1.5) * 150,
            Math.cos(i * 2) * 180
          ]}
        >
          <sphereGeometry args={[5 + i * 2, 32, 32]} />
          <meshStandardMaterial
            color={i === 0 ? '#FF6B6B' : i === 1 ? '#4ECDC4' : '#FFD166'}
            emissive={i === 0 ? '#FF6B6B' : i === 1 ? '#4ECDC4' : '#FFD166'}
            emissiveIntensity={0.1}
          />
          
          {/* Rings for some planets */}
          {i === 1 && (
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <ringGeometry args={[7, 10, 32]} />
              <meshBasicMaterial
                color="#9d4edd"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </mesh>
      ))}
    </group>
  );
};

export default StarsBackground;