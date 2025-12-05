// src/components/ui/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2, Sparkles } from 'lucide-react';

const Header = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect py-4' : 'py-6'
        }`}
      >
        <div className="content-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <Code2 className="w-8 h-8 text-[#00d9ff]" />
                <Sparkles className="w-4 h-4 text-[#9d4edd] absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-orbitron">
                  Santhosh B S
                </span>
                <span className="text-xs text-[#00d9ff]">Frontend Developer</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-[#1F4E79] text-white shadow-lg shadow-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-[#1a1f2e] border-l border-white/10 md:hidden ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-[#1F4E79] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/santhosh-bs22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/santhosh-b-s-ab6256278"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="mailto:santhosh220506@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;