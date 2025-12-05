// src/components/sections/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 py-8 border-t border-white/10">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 text-gray-400 mb-2 justify-center md:justify-start">
              <Code2 size={16} />
              <span>Built with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>by Santhosh B S</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            'React',
            'Three.js',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'Vite',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-[#1a1f2e] rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;