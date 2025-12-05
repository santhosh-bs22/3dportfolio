// src/components/sections/ProjectsSection.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Code2 } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

const ProjectsSection = ({ id, setActiveSection }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

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
            <span className="text-white">Featured </span>
            <span className="text-gradient-space">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-effect rounded-xl overflow-hidden h-full flex flex-col">
                {/* Project Image/Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1F4E79]/30 to-[#00d9ff]/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-[#00d9ff]/30" />
                  </div>
                  
                  {/* Tech Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-black/50 backdrop-blur-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-[#1F4E79]/30 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00d9ff] transition-colors flex-1 justify-center"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#9d4edd] text-white rounded-lg hover:bg-[#00d9ff] transition-colors flex-1 justify-center"
                    >
                      <Eye size={16} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            View more projects on my{' '}
            <a
              href="https://github.com/santhosh-bs22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d9ff] hover:underline"
            >
              GitHub profile
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;