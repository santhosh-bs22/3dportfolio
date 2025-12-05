// src/components/sections/HomeSection.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Code2, Mail, Github, Linkedin, Instagram, Facebook } from 'lucide-react';

const HomeSection = ({ id, setActiveSection }) => {
  useEffect(() => {
    setActiveSection('home');
  }, [setActiveSection]);

  const socialLinks = [
    { icon: <Mail size={20} />, href: 'mailto:santhosh220506@gmail.com', label: 'Email' },
    { icon: <Github size={20} />, href: 'https://github.com/santhosh-bs22', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/santhosh-b-s-ab6256278', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/_santhosh2205/', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/santhosh.naidu.984991', label: 'Facebook' },
  ];

  return (
    <section id={id} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00d9ff] rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="content-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F4E79]/20 border border-[#00d9ff]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00d9ff]" />
            <span className="text-sm text-[#00d9ff]">Welcome to my 3D Portfolio</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Hi, I'm </span>
            <span className="text-gradient-space animate-text-gradient">Santhosh B S</span>
          </h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6"
          >
            <span className="text-[#00d9ff]">Frontend Developer</span>
            <span className="mx-2">•</span>
            <span className="text-[#9d4edd]">React Specialist</span>
            <span className="mx-2">•</span>
            <span className="text-[#ff6b6b]">UI/UX Enthusiast</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Crafting immersive web experiences with modern technologies. 
            Passionate about creating responsive, visually appealing, and user-friendly interfaces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-transparent border-2 border-[#9d4edd] text-white font-semibold rounded-lg hover:bg-[#9d4edd]/10 transition-all transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-4 mb-12"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-[#1a1f2e] border border-white/10 hover:border-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all group"
                title={link.label}
              >
                <div className="text-gray-300 group-hover:text-[#00d9ff] transition-colors">
                  {link.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
          >
            {[
              { label: 'Projects', value: '6+' },
              { label: 'Technologies', value: '10+' },
              { label: 'Experience', value: '1 Year' },
              { label: 'Certifications', value: '6' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-effect p-4 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 text-[#00d9ff] animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;