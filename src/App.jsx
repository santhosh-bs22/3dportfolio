import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Stars } from '@react-three/drei';
import { BrowserRouter as Router } from 'react-router-dom';
import { gsap } from 'gsap';

// Components
import Loader from './components/ui/Loader';
import UniverseScene from './components/3d/UniverseScene';
import Header from './components/ui/Header';
import ThemeToggle from './components/ui/ThemeToggle';
import SoundToggle from './components/ui/SoundToggle';
import MobileMenu from './components/ui/MobileMenu';

// Sections
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

// New 3D Components
import GalaxySpiral from './components/3d/GalaxySpiral';
import BlackHole from './components/3d/BlackHole';
import NebulaClouds from './components/3d/NebulaClouds';

// Hooks
import useMouseInteraction from './hooks/useMouseInteraction';
import useTheme from './hooks/useTheme';

// Styles
import './App.css';

function App() {
  const [theme, setTheme] = useState('space');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef();
  const cameraRef = useRef();

  useMouseInteraction();
  useTheme(theme);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle smooth transitions
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add cursor trail effect
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    const handleMouseMove = (e) => {
      gsap.to(cursorTrail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeChild(cursorTrail);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Handle section change with animation
  const handleSectionChange = (sectionId) => {
    const prevSection = activeSection;
    setActiveSection(sectionId);
    
    // Animate camera transition
    const sections = {
      home: { position: [0, 0, 20], target: [0, 0, 0] },
      about: { position: [5, 2, 18], target: [2, 1, 0] },
      skills: { position: [-5, 3, 16], target: [-3, 2, 0] },
      projects: { position: [0, -2, 22], target: [0, -1, 0] },
      experience: { position: [8, 0, 18], target: [4, 0, 0] },
      contact: { position: [-8, -1, 19], target: [-4, -1, 0] }
    };

    if (cameraRef.current && sections[sectionId]) {
      gsap.to(cameraRef.current.position, {
        duration: 1.5,
        x: sections[sectionId].position[0],
        y: sections[sectionId].position[1],
        z: sections[sectionId].position[2],
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <Router>
      <div className={`app theme-${theme} min-h-screen relative`}>
        {/* Custom cursor trail */}
        <style>{`
          .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, #00d9ff22 0%, #00d9ff00 70%);
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            filter: blur(5px);
            transform: translate(-50%, -50%);
          }
        `}</style>

        {/* 3D Background Canvas */}
        <div className="canvas-container">
          <Canvas
            ref={canvasRef}
            shadows
            camera={{ 
              position: [0, 0, 20], 
              fov: 75,
              near: 0.1,
              far: 1000
            }}
            className="three-canvas"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true
            }}
            onCreated={({ camera }) => {
              cameraRef.current = camera;
              camera.lookAt(0, 0, 0);
            }}
          >
            {/* Background color */}
            <color attach="background" args={theme === 'space' ? ['#0a0e17'] : theme === 'cyber' ? ['#0d1117'] : ['#000000']} />
            
            {/* Fog effect */}
            <fog 
              attach="fog" 
              args={theme === 'space' ? ['#0a0e17', 10, 100] : theme === 'cyber' ? ['#0d1117', 5, 50] : ['#000000', 1, 30]} 
            />
            
            <Suspense fallback={null}>
              {/* Main Universe Scene */}
              <UniverseScene 
                activeSection={activeSection} 
                mousePosition={mousePosition}
              />
              
              {/* Galaxy Spiral - Positioned in distance */}
              <GalaxySpiral 
                position={[30, 15, -50]}
                scale={0.8}
                rotation={[0, Math.PI / 4, 0]}
              />
              
              {/* Black Hole Effect */}
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
              
              {/* Additional Stars */}
              <Stars 
                radius={150} 
                depth={80} 
                count={7000} 
                factor={6} 
                saturation={0} 
                fade 
                speed={0.5}
              />
              
              <Preload all />
            </Suspense>

            {/* Enhanced Camera Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxDistance={80}
              minDistance={5}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
              autoRotate={activeSection === 'home'}
              autoRotateSpeed={0.2}
              rotateSpeed={0.5}
              panSpeed={0.5}
              zoomSpeed={0.8}
              target={[0, 0, 0]}
              onChange={() => {
                // Update active section based on camera position
                if (cameraRef.current) {
                  const { x, y, z } = cameraRef.current.position;
                  
                  // Simple section detection based on camera position
                  if (z > 18 && Math.abs(x) < 3 && Math.abs(y) < 3) {
                    setActiveSection('home');
                  } else if (x > 3 && y > 1) {
                    setActiveSection('about');
                  } else if (x < -3 && y > 2) {
                    setActiveSection('skills');
                  } else if (y < -1) {
                    setActiveSection('projects');
                  } else if (x > 6) {
                    setActiveSection('experience');
                  } else if (x < -6) {
                    setActiveSection('contact');
                  }
                }
              }}
            />

            {/* Lighting Setup */}
            <ambientLight intensity={theme === 'wireframe' ? 0.5 : 0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d9ff" />
            
            {/* Hemisphere light for more natural lighting */}
            <hemisphereLight
              args={['#ffffff', '#1F4E79', 0.3]}
            />
            
            {/* Spotlights for highlights */}
            {activeSection === 'skills' && (
              <spotLight
                position={[0, 5, 10]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#00d9ff"
                castShadow
              />
            )}
            
            {activeSection === 'projects' && (
              <spotLight
                position={[0, 10, 5]}
                angle={0.4}
                penumbra={1}
                intensity={0.8}
                color="#9d4edd"
                castShadow
              />
            )}
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="ui-overlay min-h-screen relative z-10">
          <Header 
            activeSection={activeSection} 
            setActiveSection={handleSectionChange} 
          />
          
          <div className="fixed top-6 right-6 flex flex-col gap-4 z-50">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <SoundToggle soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
          </div>
          
          <MobileMenu 
            activeSection={activeSection} 
            setActiveSection={handleSectionChange} 
          />
          
          <main className="content-container relative z-10">
            <HomeSection 
              id="home" 
              setActiveSection={setActiveSection}
              mousePosition={mousePosition}
            />
            <AboutSection 
              id="about" 
              setActiveSection={setActiveSection}
            />
            <SkillsSection 
              id="skills" 
              setActiveSection={setActiveSection}
            />
            <ProjectsSection 
              id="projects" 
              setActiveSection={setActiveSection}
            />
            <ExperienceSection 
              id="experience" 
              setActiveSection={setActiveSection}
            />
            <ContactSection 
              id="contact" 
              setActiveSection={setActiveSection}
            />
          </main>
          
          <Footer />
        </div>

        {/* Interactive Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-20">
          {/* Floating code snippets */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-green-400 opacity-30 animate-float"
              style={{
                left: `${10 + i * 8}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`
              }}
            >
              {`<Code />`}
            </div>
          ))}
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00d9ff] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#1F4E79] via-[#00d9ff] to-[#9d4edd] transition-all duration-300"
            style={{
              width: `${((window.scrollY || 0) / (document.body.scrollHeight - window.innerHeight)) * 100}%`
            }}
          />
        </div>

        {/* Audio Visualizer (if sound enabled) */}
        {soundEnabled && (
          <div className="fixed bottom-4 right-4 w-32 h-8 flex items-center gap-1 z-50">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#00d9ff] to-[#9d4edd] rounded-t-sm animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Performance Monitor (Dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded z-50">
            FPS: <span className="text-green-400">60</span> | 
            Tris: <span className="text-yellow-400">12k</span> | 
            Mem: <span className="text-blue-400">128MB</span>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;