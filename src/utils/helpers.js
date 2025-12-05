// src/utils/helpers.js
import * as THREE from 'three';

// Math utilities
export const math = {
  // Random number in range
  random: (min, max) => Math.random() * (max - min) + min,
  
  // Random integer in range
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  // Clamp value between min and max
  clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
  
  // Linear interpolation
  lerp: (start, end, t) => start * (1 - t) + end * t,
  
  // Map value from one range to another
  map: (value, inMin, inMax, outMin, outMax) => 
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
  
  // Degree to radian conversion
  degToRad: (degrees) => degrees * (Math.PI / 180),
  
  // Radian to degree conversion
  radToDeg: (radians) => radians * (180 / Math.PI),
  
  // Check if value is between range
  inRange: (value, min, max) => value >= min && value <= max,
  
  // Normalize value to 0-1 range
  normalize: (value, min, max) => (value - min) / (max - min),
  
  // Smooth step interpolation
  smoothstep: (edge0, edge1, x) => {
    const t = math.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
};

// Color utilities
export const color = {
  // Convert hex to RGB
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  
  // Convert RGB to hex
  rgbToHex: (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },
  
  // Generate random color
  random: () => {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 60%)`;
  },
  
  // Generate color palette
  generatePalette: (count, saturation = 70, lightness = 60) => {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * hueStep}, ${saturation}%, ${lightness}%)`);
    }
    
    return colors;
  },
  
  // Darken color
  darken: (hex, percent) => {
    const rgb = color.hexToRgb(hex);
    const factor = 1 - (percent / 100);
    
    return color.rgbToHex(
      Math.floor(rgb.r * factor),
      Math.floor(rgb.g * factor),
      Math.floor(rgb.b * factor)
    );
  },
  
  // Lighten color
  lighten: (hex, percent) => {
    const rgb = color.hexToRgb(hex);
    const factor = 1 + (percent / 100);
    
    return color.rgbToHex(
      Math.min(255, Math.floor(rgb.r * factor)),
      Math.min(255, Math.floor(rgb.g * factor)),
      Math.min(255, Math.floor(rgb.b * factor))
    );
  }
};

// Geometry utilities
export const geometry = {
  // Generate sphere positions
  generateSpherePoints: (count, radius) => {
    const points = [];
    
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    return points;
  },
  
  // Generate points on a circle
  generateCirclePoints: (count, radius) => {
    const points = [];
    const angleStep = (Math.PI * 2) / count;
    
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      points.push(new THREE.Vector3(x, 0, z));
    }
    
    return points;
  },
  
  // Generate points in a grid
  generateGridPoints: (width, depth, spacing) => {
    const points = [];
    
    for (let x = -width / 2; x <= width / 2; x += spacing) {
      for (let z = -depth / 2; z <= depth / 2; z += spacing) {
        const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;
        points.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return points;
  },
  
  // Calculate distance between points
  distance: (p1, p2) => {
    return Math.sqrt(
      Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2) +
      Math.pow(p2.z - p1.z, 2)
    );
  }
};

// Data utilities
export const data = {
  // Format bytes to human readable
  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  
  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Deep clone object
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  
  // Merge objects deeply
  deepMerge: (target, source) => {
    const output = Object.assign({}, target);
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  },
  
  // Check if value is object
  isObject: (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
};

// DOM utilities
export const dom = {
  // Get element position relative to viewport
  getPosition: (element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    };
  },
  
  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Scroll to element smoothly
  scrollToElement: (element, offset = 0, duration = 1000) => {
    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + startPosition - offset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    requestAnimationFrame(animation);
  },
  
  // Create HTML element
  createElement: (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  }
};

// Performance utilities
export const performance = {
  // Measure function execution time
  measure: (func, iterations = 1000) => {
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      func();
    }
    
    const end = performance.now();
    return (end - start) / iterations;
  },
  
  // Get FPS
  getFPS: () => {
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    
    const calculate = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime > lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        lastTime = currentTime;
        frameCount = 0;
      }
      
      requestAnimationFrame(calculate);
    };
    
    calculate();
    return () => fps;
  }
};

// String utilities
export const string = {
  // Capitalize first letter
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  // Generate random string
  random: (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  },
  
  // Truncate string with ellipsis
  truncate: (str, length = 50) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },
  
  // Convert camelCase to kebab-case
  camelToKebab: (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  
  // Convert kebab-case to camelCase
  kebabToCamel: (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }
};

// Time utilities
export const time = {
  // Format date
  formatDate: (date, format = 'DD/MM/YYYY') => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },
  
  // Get time ago
  timeAgo: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;
    
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    
    if (diff < minute) return 'just now';
    if (diff < hour) return `${Math.floor(diff / minute)} minutes ago`;
    if (diff < day) return `${Math.floor(diff / hour)} hours ago`;
    if (diff < week) return `${Math.floor(diff / day)} days ago`;
    if (diff < month) return `${Math.floor(diff / week)} weeks ago`;
    if (diff < year) return `${Math.floor(diff / month)} months ago`;
    return `${Math.floor(diff / year)} years ago`;
  },
  
  // Sleep function
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// Validation utilities
export const validation = {
  // Validate email
  isEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Validate URL
  isUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Validate phone number (basic)
  isPhone: (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
  },
  
  // Check if string is empty
  isEmpty: (str) => {
    return !str || str.trim().length === 0;
  }
};

// Export all utilities
export default {
  math,
  color,
  geometry,
  data,
  dom,
  performance,
  string,
  time,
  validation
};