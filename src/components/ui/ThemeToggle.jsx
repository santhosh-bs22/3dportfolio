// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeToggle = ({ theme, setTheme }) => {
  const themes = [
    { id: 'space', name: 'Space', icon: <Moon size={16} /> },
    { id: 'cyber', name: 'Cyber', icon: <Monitor size={16} /> },
    { id: 'wireframe', name: 'Wireframe', icon: <Sun size={16} /> },
  ];

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="glass-effect rounded-xl p-2 flex flex-col gap-2"
    >
      {themes.map((t) => (
        <motion.button
          key={t.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(t.id)}
          className={`p-2 rounded-lg transition-all ${
            theme === t.id
              ? 'bg-[#1F4E79] text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
          title={`Switch to ${t.name} theme`}
        >
          {t.icon}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ThemeToggle;