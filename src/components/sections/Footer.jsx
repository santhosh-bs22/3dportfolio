// src/components/sections/Footer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, ArrowUp, Sparkles, ExternalLink, Mail, Phone, MapPin, Rocket, Stars, Satellite } from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [particles, setParticles] = useState([]);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    { icon: <Mail size={16} />, label: 'Email', value: 'santhosh220506@gmail.com', href: 'mailto:santhosh220506@gmail.com' },
    { icon: <Phone size={16} />, label: 'Phone', value: '+91 7695801106', href: 'tel:+917695801106' },
    { icon: <MapPin size={16} />, label: 'Location', value: 'Chennai, India', href: '#' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const techStack = [
    'React', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite', 'Node.js'
  ];

  return (
    <footer className="relative mt-20 py-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#00d9ff] to-[#9d4edd]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(particle.id) * 10, 0],
            }}
            transition={{
              duration: 3 + particle.speed,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Orbiting Satellites */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-64 h-64"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <Satellite className="w-4 h-4 text-[#00d9ff]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <Satellite className="w-4 h-4 text-[#9d4edd]" />
          </div>
        </motion.div>
      </div>

      <div className="content-container relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full blur-md opacity-50" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#1F4E79] to-[#00d9ff] flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-orbitron">Santhosh B S</h3>
                <p className="text-sm text-[#00d9ff]">Frontend Developer</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              Crafting immersive web experiences with modern technologies. 
              Passionate about creating responsive, visually appealing interfaces.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4 text-[#00d9ff]" />
              <span>Currently exploring: 3D Web Development & AI Integration</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#00d9ff]" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00d9ff] transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-[#00d9ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00d9ff]" />
              Contact Info
            </h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-[#1F4E79]/30 group-hover:bg-[#00d9ff]/20 transition-colors">
                    <div className="text-[#00d9ff]">{info.icon}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{info.label}</div>
                    <div className="text-sm">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#00d9ff]" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs bg-[#1a1f2e] border border-white/10 rounded-full hover:border-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Live Stats */}
            <div className="mt-6 p-4 glass-effect rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Current Time</span>
                <Stars className="w-4 h-4 text-[#00d9ff] animate-pulse" />
              </div>
              <div className="text-lg font-mono text-white">{currentTime}</div>
              <div className="text-xs text-gray-500 mt-1">Chennai, India (GMT+5:30)</div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00d9ff] rounded-full" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright & Credits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            {/* <div className="flex items-center gap-2 text-gray-400 mb-2 justify-center md:justify-start">
              <Code2 size={14} />
              <span>Built with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>using React & Three.js</span>
            </div> */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Santhosh B S. All rights reserved.
            </p>
          </motion.div>

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Orbiting particles around button */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -ins-2"
            >
              {[0, 120, 240].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-1 h-1 bg-[#00d9ff] rounded-full"
                  style={{
                    transform: `rotate(${angle}deg) translateX(32px)`,
                  }}
                />
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="relative p-4 rounded-full bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] hover:shadow-lg hover:shadow-blue-500/30 transition-all group"
              title="Back to top"
            >
              <ArrowUp className="w-6 h-6 text-white" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] blur-md opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
            </motion.button>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#1a1f2e] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Back to Top
            </div>
          </motion.div>

          {/* Social Links (Mobile) */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4 md:hidden"
          >
            {['github', 'linkedin', 'instagram', 'facebook'].map((platform, index) => (
              <motion.a
                key={platform}
                href="#"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-[#1a1f2e] hover:bg-[#1F4E79]/30 transition-colors"
                title={platform.charAt(0).toUpperCase() + platform.slice(1)}
              >
                <div className="w-5 h-5 bg-gray-400 rounded-full" />
              </motion.a>
            ))}
          </motion.div> */}
        </div>

        {/* Easter Egg */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-600 font-space-mono">
            Made with 💻 and ☕️ • View source on{' '}
            <a
              href="https://github.com/santhosh-bs22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#00d9ff] transition-colors"
            >
              GitHub
            </a>
          </p>
          <p className="text-xs text-gray-700 mt-1">
            🚀 Performance optimized • 🎨 3D Interactive • 📱 Fully Responsive
          </p>
        </motion.div> */}
      </div>

      {/* Interactive Mouse Trailer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-[#1F4E79]/5 to-[#00d9ff]/5 rounded-full blur-3xl" 
             style={{ 
               left: 'calc(50% - 8rem)', 
               top: 'calc(50% - 8rem)' 
             }} 
        />
      </div>
    </footer>
  );
};

export default Footer;