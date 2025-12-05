// src/components/sections/ContactSection.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const ContactSection = ({ id, setActiveSection }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, setActiveSection]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_name: 'Santhosh',
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail />,
      title: 'Email',
      value: 'santhosh220506@gmail.com',
      href: 'mailto:santhosh220506@gmail.com',
      color: '#00d9ff'
    },
    {
      icon: <Phone />,
      title: 'Phone',
      value: '+91 7695801106',
      href: 'tel:+917695801106',
      color: '#9d4edd'
    },
    {
      icon: <MapPin />,
      title: 'Location',
      value: 'Chennai, India',
      href: '#',
      color: '#ff6b6b'
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
            <span className="text-white">Get In </span>
            <span className="text-gradient-space">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 glass-effect rounded-xl group cursor-pointer"
                >
                  <div
                    className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <div style={{ color: info.color }}>{info.icon}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.title}</div>
                    <div className="text-white">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', url: 'https://github.com/santhosh-bs22', color: '#333' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/santhosh-b-s-ab6256278', color: '#0077B5' },
                  { name: 'Instagram', url: 'https://www.instagram.com/_santhosh2205/', color: '#E4405F' },
                  { name: 'Facebook', url: 'https://www.facebook.com/santhosh.naidu.984991', color: '#1877F2' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#1a1f2e] hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${social.color}20` }}
                    title={social.name}
                  >
                    <span className="text-sm font-medium" style={{ color: social.color }}>
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 glass-effect rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-2">Availability</h4>
              <p className="text-gray-300 mb-3">
                I'm currently available for freelance work and full-time opportunities.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-[#1a1f2e] border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } text-white focus:outline-none focus:border-[#00d9ff] transition-colors`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg bg-[#1a1f2e] border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } text-white focus:outline-none focus:border-[#00d9ff] transition-colors`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg bg-[#1a1f2e] border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } text-white focus:outline-none focus:border-[#00d9ff] transition-colors resize-none`}
                    placeholder="Enter your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#1F4E79] to-[#00d9ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-500" />
                    <span className="text-green-400">Message sent successfully!</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="text-red-500" />
                    <span className="text-red-400">Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </form>

              {/* Form Note */}
              <p className="text-sm text-gray-400 mt-6">
                I'll get back to you as soon as possible. Typically within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;