import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const ContactPortal = () => {
  const portalRef = useRef();
  const [hovered, setHovered] = useState(false);
  const particlesRef = useRef();

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.y += 0.005;
      portalRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01;
        particle.rotation.y += 0.02;
      });
    }
  });

  const socialLinks = [
    { platform: 'Email', value: 'santhosh220506@gmail.com', color: '#00d9ff' },
    { platform: 'Phone', value: '+91 7695801106', color: '#9d4edd' },
    { platform: 'GitHub', value: 'santhosh-bs22', color: '#333' },
    { platform: 'LinkedIn', value: 'santhosh-b-s', color: '#0077B5' }
  ];

  return (
    <group ref={portalRef} position={[0, 0, -10]}>
      {/* Main Portal Ring */}
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <ringGeometry args={[3, 3.5, 64]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Portal */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} />
        <meshStandardMaterial
          color="#1F4E79"
          emissive="#1F4E79"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Social Links */}
      <group position={[0, 2, 0]}>
        <Text
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Bold.ttf"
        >
          CONNECT WITH ME
        </Text>
      </group>

      {/* Social Link Cubes */}
      <group ref={particlesRef}>
        {socialLinks.map((link, i) => {
          const angle = (i / socialLinks.length) * Math.PI * 2;
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(i * 0.5) * 0.5;

          return (
            <Float key={link.platform} speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh position={[x, y, z]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                  color={link.color}
                  emissive={link.color}
                  emissiveIntensity={0.3}
                />
                
                {/* Link Text */}
                <Text
                  position={[0, 1.2, 0]}
                  fontSize={0.2}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2}
                  textAlign="center"
                >
                  {link.platform}
                </Text>
                
                <Text
                  position={[0, -1.2, 0]}
                  fontSize={0.15}
                  color="#00d9ff"
                  anchorX="center"
                  anchorY="middle"
                >
                  {link.value}
                </Text>

                {/* Interactive HTML Tooltip */}
                <Html
                  distanceFactor={15}
                  position={[0, 0, 1.2]}
                  style={{
                    display: 'none',
                    background: 'rgba(10, 14, 23, 0.95)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 217, 255, 0.3)',
                    minWidth: '180px',
                    backdropFilter: 'blur(10px)',
                    pointerEvents: 'none'
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    e.currentTarget.style.display = 'block';
                  }}
                  onPointerOut={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                >
                  <div className="p-2">
                    <h4 className="font-bold text-white mb-1">{link.platform}</h4>
                    <p className="text-sm text-gray-300">{link.value}</p>
                    <button className="mt-2 px-3 py-1 text-xs bg-[#1F4E79] text-white rounded hover:bg-[#00d9ff] transition-colors">
                      Copy
                    </button>
                  </div>
                </Html>
              </mesh>
            </Float>
          );
        })}
      </group>

      {/* Animated Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.2) * 5,
            Math.sin(i * 0.3) * 2,
            Math.sin(i * 0.2) * 5
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Portal Energy Beams */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            rotation={[0, angle, 0]}
            position={[
              Math.cos(angle) * 2.8,
              0,
              Math.sin(angle) * 2.8
            ]}
          >
            <cylinderGeometry args={[0.05, 0.2, 8]} />
            <meshBasicMaterial
              color="#00d9ff"
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default ContactPortal;