// src/components/sections/ExperienceSection.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

const ExperienceSection = ({ id, setActiveSection }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('experience');
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance & Personal Projects',
      period: '2023 - Present',
      location: 'Chennai, India',
      description: 'Developing responsive web applications using React, TypeScript, and modern web technologies.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
      type: 'work'
    },
    {
      title: 'Student Developer',
      company: 'S.A. Engineering College',
      period: '2021 - Present',
      location: 'Chennai, India',
      description: 'Building projects as part of coursework and personal learning, focusing on web development and UI/UX design.',
      technologies: ['Java', 'React', 'Figma', 'Git'],
      type: 'education'
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
            <span className="text-white">Experience & </span>
            <span className="text-gradient-space">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My journey in web development and the experiences that shaped my skills
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${exp.company}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
            >
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#1F4E79] via-[#00d9ff] to-[#9d4edd]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#00d9ff]" />
              </div>

              {/* Experience Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                <div className="glass-effect p-6 rounded-xl">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-[#00d9ff] mb-2">
                        <Briefcase size={16} />
                        <span className="text-sm">{exp.company}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exp.type === 'work' 
                        ? 'bg-[#1F4E79]/30 text-[#00d9ff]'
                        : 'bg-[#9d4edd]/30 text-[#9d4edd]'
                    }`}>
                      {exp.type === 'work' ? 'Work' : 'Education'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300">{exp.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-[#1a1f2e] rounded-full border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Development */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Skills Development Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { year: '2021', skill: 'HTML/CSS/JS', level: 'Beginner' },
              { year: '2022', skill: 'React Basics', level: 'Intermediate' },
              { year: '2023', skill: 'TypeScript', level: 'Advanced' },
              { year: '2024', skill: 'Full Stack', level: 'Proficient' },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 text-center glass-effect rounded-xl"
              >
                <div className="text-3xl font-bold text-[#00d9ff] mb-2">{item.year}</div>
                <h4 className="font-semibold text-white mb-1">{item.skill}</h4>
                <div className="text-sm text-gray-400">{item.level}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Declaration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass-effect rounded-xl"
        >
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-2">Declaration</h4>
              <p className="text-gray-300">
                I hereby declare that the information provided is true to the best of my knowledge and belief.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;