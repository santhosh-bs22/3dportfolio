// src/components/ui/Loader.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Loader as LoaderIcon } from 'lucide-react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e17]"
    >
      <div className="relative">
        {/* Animated orbits */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-[#00d9ff]/20 rounded-full"
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 border border-[#9d4edd]/20 rounded-full"
        />
        
        {/* Center icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10"
        >
          <Code2 className="w-16 h-16 text-[#00d9ff]" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2 font-orbitron">
          Loading Universe
        </h2>
        <p className="text-gray-400 mb-6">Preparing 3D experience...</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-[#1a1f2e] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full"
          />
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <LoaderIcon className="w-4 h-4 text-[#00d9ff] animate-spin" />
          <span className="text-sm text-gray-400">{progress}%</span>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="absolute w-1 h-1 bg-[#00d9ff] rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default Loader;