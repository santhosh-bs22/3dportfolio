// src/App.jsx
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Stars } from '@react-three/drei';
import { BrowserRouter as Router } from 'react-router-dom';

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

  useMouseInteraction();
  useTheme(theme);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className={`app theme-${theme} min-h-screen`}>
        {/* 3D Background Canvas */}
        <div className="canvas-container">
          <Canvas
            shadows
            camera={{ position: [0, 0, 15], fov: 60 }}
            className="three-canvas"
          >
            <Suspense fallback={null}>
              <UniverseScene activeSection={activeSection} />
              <Stars radius={100} depth={50} count={5000} factor={4} />
              <Preload all />
            </Suspense>
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxDistance={30}
              minDistance={5}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="ui-overlay min-h-screen relative z-10">
          <Header activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <div className="fixed top-6 right-6 flex flex-col gap-4 z-50">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <SoundToggle soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
          </div>
          
          <MobileMenu activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <main className="content-container relative z-10">
            <HomeSection 
              id="home" 
              setActiveSection={setActiveSection}
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
      </div>
    </Router>
  );
}

export default App;