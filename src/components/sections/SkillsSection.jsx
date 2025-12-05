// src/components/sections/SkillsSection.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Wrench, Languages } from 'lucide-react';
import { skillsData } from '../../data/skillsData';

const SkillsSection = ({ id, setActiveSection }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      icon: <Code2 />,
      color: '#00d9ff',
      skills: skillsData.filter(s => s.category === 'language')
    },
    {
      title: 'Tools & Platforms',
      icon: <Wrench />,
      color: '#9d4edd',
      skills: skillsData.filter(s => s.category === 'tool')
    },
    {
      title: 'Design',
      icon: <Palette />,
      color: '#ff6b6b',
      skills: skillsData.filter(s => s.category === 'design')
    },
    {
      title: 'Languages',
      icon: <Languages />,
      color: '#00ff88',
      skills: skillsData.filter(s => s.category === 'spoken')
    }
  ];

  return (
    <section id={id} className="min-h-screen py-20">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">My </span>
            <span className="text-gradient-space">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to create amazing web experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div style={{ color: category.color }}>{category.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="font-semibold" style={{ color: category.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-[#1a1f2e] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Adaptability', 'Teamwork', 'Leadership', 'Positive Attitude'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center glass-effect rounded-xl"
              >
                <div className="text-2xl mb-2">
                  {skill === 'Adaptability' && '🔄'}
                  {skill === 'Teamwork' && '👥'}
                  {skill === 'Leadership' && '🌟'}
                  {skill === 'Positive Attitude' && '😊'}
                </div>
                <h4 className="font-semibold text-white">{skill}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'MePro Pearson Level 10',
              'NPTEL Java',
              'Matlab Certificate',
              'Mendix Rapid Developer',
              'Novitech Full Stack',
              'HackerRank Python (Basic)'
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 glass-effect rounded-lg flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-[#1F4E79]/30">
                  <div className="text-[#00d9ff]">✓</div>
                </div>
                <span className="text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;