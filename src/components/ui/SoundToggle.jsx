// src/components/ui/SoundToggle.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = ({ soundEnabled, setSoundEnabled }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setSoundEnabled(!soundEnabled);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className="glass-effect p-3 rounded-xl"
      title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      <div className="relative">
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-[#00d9ff]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
        {isAnimating && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 rounded-full border-2 border-[#00d9ff]"
          />
        )}
      </div>
    </motion.button>
  );
};

export default SoundToggle;