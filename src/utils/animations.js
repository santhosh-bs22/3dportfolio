// src/utils/animations.js
import gsap from 'gsap';
import * as THREE from 'three';

// GSAP animations for 3D objects
export const animations = {
  // Float animation for objects
  float: (object, options = {}) => {
    const {
      duration = 3,
      yoyo = true,
      repeat = -1,
      ease = "sine.inOut",
      height = 0.5
    } = options;

    return gsap.to(object.position, {
      y: `+=${height}`,
      duration,
      yoyo,
      repeat,
      ease,
    });
  },

  // Rotate animation
  rotate: (object, options = {}) => {
    const {
      duration = 10,
      repeat = -1,
      ease = "none",
      y = 360
    } = options;

    return gsap.to(object.rotation, {
      y: THREE.MathUtils.degToRad(y),
      duration,
      repeat,
      ease,
    });
  },

  // Pulse animation for lights
  pulse: (light, options = {}) => {
    const {
      duration = 2,
      repeat = -1,
      intensity = 2
    } = options;

    return gsap.to(light, {
      intensity,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },

  // Orbit animation around a point
  orbit: (object, center, options = {}) => {
    const {
      radius = 5,
      duration = 10,
      repeat = -1,
      ease = "none"
    } = options;

    return gsap.to(object.position, {
      x: `+=${radius}`,
      duration,
      repeat,
      ease,
      modifiers: {
        x: (x) => center.x + Math.cos(performance.now() * 0.001) * radius,
        z: (z) => center.z + Math.sin(performance.now() * 0.001) * radius,
      }
    });
  },

  // Bounce animation
  bounce: (object, options = {}) => {
    const {
      height = 1,
      duration = 1,
      repeat = -1,
      ease = "bounce.out"
    } = options;

    return gsap.to(object.position, {
      y: `+=${height}`,
      duration,
      repeat,
      ease,
      yoyo: true,
    });
  },

  // Shake animation
  shake: (object, options = {}) => {
    const {
      intensity = 0.1,
      duration = 0.5,
      repeat = 0
    } = options;

    return gsap.to(object.rotation, {
      x: `+=${intensity}`,
      y: `+=${intensity}`,
      duration: duration / 4,
      repeat: 4,
      yoyo: true,
      ease: "sine.inOut",
      onComplete: () => {
        gsap.to(object.rotation, {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });
  },

  // Scale in animation
  scaleIn: (object, options = {}) => {
    const {
      duration = 1,
      ease = "back.out(1.7)",
      from = 0
    } = options;

    object.scale.set(from, from, from);
    
    return gsap.to(object.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration,
      ease,
    });
  },

  // Fade in animation
  fadeIn: (material, options = {}) => {
    const {
      duration = 1,
      to = 1,
      from = 0
    } = options;

    material.opacity = from;
    material.transparent = true;
    
    return gsap.to(material, {
      opacity: to,
      duration,
      ease: "power2.out",
    });
  },

  // Color transition animation
  colorTransition: (material, toColor, options = {}) => {
    const {
      duration = 1,
      ease = "power2.inOut"
    } = options;

    return gsap.to(material, {
      color: new THREE.Color(toColor),
      duration,
      ease,
    });
  },

  // Scroll-triggered animations
  onScroll: (object, trigger, animations) => {
    const scrollTrigger = {
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        animations.forEach(anim => {
          if (typeof anim === 'function') {
            anim(object, self.progress);
          }
        });
      }
    };

    return gsap.timeline({ scrollTrigger });
  },

  // Stagger animations for multiple objects
  stagger: (objects, animation, options = {}) => {
    const {
      stagger = 0.1,
      from = "center",
      ease = "power2.out"
    } = options;

    return gsap.from(objects, {
      ...animation,
      stagger,
      from,
      ease,
    });
  },

  // Create a wave effect
  wave: (objects, options = {}) => {
    const {
      amplitude = 1,
      frequency = 1,
      duration = 2,
      repeat = -1
    } = options;

    return objects.forEach((object, i) => {
      gsap.to(object.position, {
        y: `+=${amplitude}`,
        duration,
        repeat,
        ease: "sine.inOut",
        delay: i * 0.1,
        yoyo: true,
      });
    });
  },

  // Particle explosion
  explode: (particles, options = {}) => {
    const {
      force = 2,
      duration = 1
    } = options;

    particles.forEach(particle => {
      const angle = Math.random() * Math.PI * 2;
      const forceX = Math.cos(angle) * force;
      const forceZ = Math.sin(angle) * force;
      
      gsap.to(particle.position, {
        x: `+=${forceX}`,
        z: `+=${forceZ}`,
        y: `+=${force}`,
        duration,
        ease: "power3.out",
        onComplete: () => {
          // Return to original position
          gsap.to(particle.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: "power2.inOut",
            delay: 0.5
          });
        }
      });
    });
  }
};

// Animation presets
export const animationPresets = {
  // Entry animations
  slideInFromLeft: (object) => ({
    x: -10,
    duration: 1,
    ease: "power3.out"
  }),

  slideInFromRight: (object) => ({
    x: 10,
    duration: 1,
    ease: "power3.out"
  }),

  dropIn: (object) => ({
    y: 10,
    duration: 1,
    ease: "bounce.out"
  }),

  popIn: (object) => ({
    scale: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }),

  // Hover animations
  hover: (object) => ({
    scale: 1.1,
    duration: 0.3,
    ease: "power2.out"
  }),

  glow: (material) => ({
    emissiveIntensity: 1,
    duration: 0.5,
    ease: "power2.out"
  }),

  // Exit animations
  fadeOut: (material) => ({
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  }),

  shrink: (object) => ({
    scale: 0,
    duration: 0.5,
    ease: "power2.in"
  })
};

// Easing functions
export const easings = {
  elastic: (amplitude = 1, period = 0.3) => {
    const pi = Math.PI;
    return (t) => {
      if (t === 0 || t === 1) return t;
      const s = period / (2 * pi) * Math.asin(1 / amplitude);
      return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * pi) / period) + 1;
    };
  },

  bounce: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },

  bezier: (p0, p1, p2, p3) => {
    return (t) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;
      
      const p = new THREE.Vector3();
      p.multiplyScalar(uuu).addScaledVector(p0, uuu);
      p.addScaledVector(p1, 3 * uu * t);
      p.addScaledVector(p2, 3 * u * tt);
      p.addScaledVector(p3, ttt);
      
      return p;
    };
  }
};

// Scroll-based animations
export const scrollAnimations = {
  parallax: (object, speed = 0.5) => {
    const update = () => {
      const scrollY = window.scrollY;
      object.position.y = scrollY * speed;
    };
    
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  },

  revealOnScroll: (object, threshold = 0.5) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(object.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 1,
              ease: "back.out(1.7)"
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(object);
    return () => observer.disconnect();
  }
};

// Particle system animations
export const particleAnimations = {
  flowField: (particles, fieldFunction, options = {}) => {
    const {
      speed = 0.01,
      scale = 1
    } = options;

    const update = () => {
      particles.forEach(particle => {
        const force = fieldFunction(particle.position.x, particle.position.y, particle.position.z);
        particle.position.add(force.multiplyScalar(speed * scale));
      });
    };

    return { update };
  },

  swarm: (particles, target, options = {}) => {
    const {
      attraction = 0.01,
      repulsion = 0.001,
      alignment = 0.05,
      separation = 1
    } = options;

    const update = () => {
      particles.forEach(particle => {
        // Attraction to target
        const toTarget = new THREE.Vector3()
          .subVectors(target, particle.position)
          .multiplyScalar(attraction);
        
        particle.position.add(toTarget);
        
        // Separation from other particles
        particles.forEach(other => {
          if (other !== particle) {
            const distance = particle.position.distanceTo(other.position);
            if (distance < separation) {
              const away = new THREE.Vector3()
                .subVectors(particle.position, other.position)
                .normalize()
                .multiplyScalar(repulsion);
              
              particle.position.add(away);
            }
          }
        });
      });
    };

    return { update };
  }
};

// Camera animations
export const cameraAnimations = {
  dollyZoom: (camera, target, duration = 2) => {
    const startFov = camera.fov;
    const startPosition = camera.position.clone();
    const direction = new THREE.Vector3()
      .subVectors(target, startPosition)
      .normalize();
    
    const timeline = gsap.timeline();
    
    timeline
      .to(camera.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration,
        ease: "power2.inOut"
      })
      .to(camera, {
        fov: startFov * 1.5,
        duration,
        ease: "power2.inOut"
      }, 0);
    
    return timeline;
  },

  orbitAround: (camera, center, options = {}) => {
    const {
      radius = 10,
      duration = 10,
      height = 5
    } = options;

    return gsap.to(camera.position, {
      duration,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: () => center.x + Math.cos(performance.now() * 0.001) * radius,
        y: () => center.y + Math.sin(performance.now() * 0.002) * height,
        z: () => center.z + Math.sin(performance.now() * 0.001) * radius,
      }
    });
  }
};