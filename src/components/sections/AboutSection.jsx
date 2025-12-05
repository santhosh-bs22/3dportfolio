// src/components/sections/AboutSection.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Calendar, Code2, Palette, Shield } from 'lucide-react';

const AboutSection = ({ id, setActiveSection }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('about');
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  const details = [
    { icon: <User size={20} />, label: 'Name', value: 'Santhosh B S' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Chennai, India' },
    { icon: <GraduationCap size={20} />, label: 'Education', value: 'B.E. Computer Science (CGPA: 8.49)' },
    { icon: <Calendar size={20} />, label: 'Status', value: 'Available for opportunities' },
  ];

  const interests = [
    { icon: <Code2 />, label: 'Web Development', color: '#00d9ff' },
    { icon: <Palette />, label: 'UI/UX Design', color: '#9d4edd' },
    { icon: <Shield />, label: 'Cyber Security', color: '#ff6b6b' },
  ];

  return (
    <section id={id} className="min-h-screen py-20 flex items-center">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image & Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-[#1F4E79] to-[#00d9ff] p-1">
                <div className="w-full h-full rounded-full bg-[#0a0e17] flex items-center justify-center">
                  <div className="text-6xl font-bold text-gradient-space">SB</div>
                </div>
              </div>
              
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-[#00d9ff]/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-[#9d4edd]/20 rounded-full"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              {details.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 glass-effect rounded-xl"
                >
                  <div className="p-2 rounded-lg bg-[#1F4E79]/30">
                    <div className="text-[#00d9ff]">{detail.icon}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{detail.label}</div>
                    <div className="font-medium text-white">{detail.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">About </span>
                <span className="text-gradient-space">Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full mb-6" />
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate Frontend Developer specializing in React, JavaScript, and modern web technologies. 
              Currently pursuing my B.E. in Computer Science with a CGPA of 8.49, I'm dedicated to creating 
              responsive, visually appealing, and user-friendly web experiences.
            </p>

            <p className="text-gray-300 leading-relaxed">
              My journey in web development started with a curiosity about how websites work, and it has evolved 
              into a passion for building interactive applications. I enjoy turning complex problems into simple, 
              beautiful, and intuitive designs.
            </p>

            {/* Interests */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl glass-effect text-center group cursor-pointer"
                  >
                    <div
                      className="inline-flex p-3 rounded-full mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${interest.color}20` }}
                    >
                      <div style={{ color: interest.color }}>{interest.icon}</div>
                    </div>
                    <h4 className="font-semibold text-white mb-2">{interest.label}</h4>
                    <p className="text-sm text-gray-400">
                      {interest.label === 'Web Development' && 'Building modern web applications'}
                      {interest.label === 'UI/UX Design' && 'Creating intuitive user experiences'}
                      {interest.label === 'Cyber Security' && 'Learning about web security practices'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Education</h3>
              <div className="space-y-4">
                {[
                  {
                    degree: 'B.E. Computer Science',
                    institution: 'S.A. Engineering College',
                    period: '2021 - Present',
                    details: 'CGPA: 8.49 (Ongoing)',
                    color: '#00d9ff'
                  },
                  {
                    degree: 'Higher Secondary',
                    institution: 'Sundar Matriculation Hr. Sec. School',
                    period: '2021 - 2023',
                    details: 'Percentage: 75%',
                    color: '#9d4edd'
                  },
                  {
                    degree: 'Secondary School',
                    institution: 'Sundar Matriculation Hr. Sec. School',
                    period: '2019 - 2021',
                    details: 'All Pass',
                    color: '#ff6b6b'
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 rounded-xl glass-effect relative"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="w-3 h-3 rounded-full mt-2"
                        style={{ backgroundColor: edu.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{edu.degree}</h4>
                        <span className="text-sm text-gray-400">{edu.period}</span>
                      </div>
                      <p className="text-gray-300 mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-400">{edu.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;