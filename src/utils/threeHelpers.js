// src/utils/threeHelpers.js
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

// Geometry helpers
export const geometryHelpers = {
  // Create custom geometry with parameters
  createParametricGeometry: (func, slices, stacks) => {
    const geometry = new THREE.ParametricGeometry(func, slices, stacks);
    geometry.computeVertexNormals();
    return geometry;
  },

  // Create lathe geometry from points
  createLatheGeometry: (points, segments = 12) => {
    const geometry = new THREE.LatheGeometry(points, segments);
    geometry.computeVertexNormals();
    return geometry;
  },

  // Create extrusion geometry
  createExtrusionGeometry: (shape, options) => {
    const settings = {
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelSegments: 3,
      ...options
    };
    
    const geometry = new THREE.ExtrudeGeometry(shape, settings);
    geometry.computeVertexNormals();
    return geometry;
  },

  // Create tube geometry along path
  createTubeGeometry: (path, tubularSegments = 64, radius = 1, radialSegments = 8) => {
    const geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments);
    geometry.computeVertexNormals();
    return geometry;
  },

  // Merge multiple geometries
  mergeGeometries: (geometries) => {
    const merged = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    
    let indexOffset = 0;
    
    geometries.forEach(geometry => {
      geometry.computeVertexNormals();
      
      const position = geometry.attributes.position;
      const index = geometry.index;
      
      // Add vertices
      for (let i = 0; i < position.count; i++) {
        vertices.push(
          position.getX(i),
          position.getY(i),
          position.getZ(i)
        );
      }
      
      // Add indices with offset
      if (index) {
        for (let i = 0; i < index.count; i++) {
          indices.push(index.getX(i) + indexOffset);
        }
      }
      
      indexOffset += position.count;
    });
    
    merged.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    if (indices.length > 0) {
      merged.setIndex(indices);
    }
    
    merged.computeVertexNormals();
    return merged;
  },

  // Create wireframe geometry
  createWireframe: (geometry, color = 0xffffff) => {
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    line.material.color = new THREE.Color(color);
    return line;
  }
};

// Material helpers
export const materialHelpers = {
  // Create gradient material
  createGradientMaterial: (colors, stops = [0, 1]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 256, 0);
    
    colors.forEach((color, i) => {
      gradient.addColorStop(stops[i], color);
    });
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
  },

  // Create shader material
  createShaderMaterial: (vertexShader, fragmentShader, uniforms = {}) => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        ...uniforms
      },
      side: THREE.DoubleSide,
      transparent: true
    });
  },

  // Create glass material
  createGlassMaterial: (color = 0xffffff, opacity = 0.25) => {
    return new THREE.MeshPhysicalMaterial({
      color,
      transmission: 1,
      opacity,
      metalness: 0,
      roughness: 0,
      ior: 1.5,
      thickness: 0.01,
      specularIntensity: 1,
      specularColor: 0xffffff,
      envMapIntensity: 1,
      transparent: true
    });
  },

  // Create hologram material
  createHologramMaterial: (color = 0x00ffff) => {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  },

  // Create glowing material
  createGlowingMaterial: (color = 0x00ffff, intensity = 1) => {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
  },

  // Create toon material
  createToonMaterial: (color = 0xff0000) => {
    return new THREE.MeshToonMaterial({
      color,
      gradientMap: null
    });
  }
};

// Light helpers
export const lightHelpers = {
  // Create area light
  createAreaLight: (width, height, color = 0xffffff, intensity = 1) => {
    const light = new THREE.RectAreaLight(color, intensity, width, height);
    light.position.set(0, 5, 0);
    light.lookAt(0, 0, 0);
    return light;
  },

  // Create spotlight with helper
  createSpotlightWithHelper: (color = 0xffffff, intensity = 1, distance = 0, angle = Math.PI / 3) => {
    const light = new THREE.SpotLight(color, intensity, distance, angle);
    const helper = new THREE.SpotLightHelper(light);
    
    return { light, helper };
  },

  // Create ambient light with color variation
  createAmbientLight: (color = 0x404040, intensity = 1) => {
    return new THREE.AmbientLight(color, intensity);
  },

  // Create hemisphere light
  createHemisphereLight: (skyColor = 0x87ceeb, groundColor = 0x8b7355, intensity = 1) => {
    return new THREE.HemisphereLight(skyColor, groundColor, intensity);
  },

  // Create directional light with shadow
  createDirectionalLightWithShadow: (color = 0xffffff, intensity = 1) => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    
    return light;
  }
};

// Camera helpers
export const cameraHelpers = {
  // Create perspective camera with controls
  createPerspectiveCamera: (fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) => {
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
  },

  // Create orthographic camera
  createOrthographicCamera: (size = 10, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) => {
    const aspectRatio = aspect;
    const width = size * aspectRatio;
    const height = size;
    
    return new THREE.OrthographicCamera(
      -width, width, height, -height, near, far
    );
  },

  // Create camera rig (multiple cameras)
  createCameraRig: (count = 3, distance = 5) => {
    const cameras = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      
      camera.position.set(
        Math.cos(angle) * distance,
        2,
        Math.sin(angle) * distance
      );
      
      camera.lookAt(0, 0, 0);
      cameras.push(camera);
    }
    
    return cameras;
  }
};

// Particle helpers
export const particleHelpers = {
  // Create particle system
  createParticleSystem: (count = 1000, color = 0xffffff, size = 0.1) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geometry, material);
  },

  // Create particle trail
  createParticleTrail: (points, color = 0x00ffff, size = 0.2) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geometry, material);
  },

  // Create exploding particles
  createExplodingParticles: (center, count = 100, speed = 2) => {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const velocity = speed * (0.5 + Math.random() * 0.5);
      
      const particle = {
        position: center.clone(),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(angle) * velocity,
          Math.cos(phi) * velocity,
          Math.sin(phi) * Math.sin(angle) * velocity
        ),
        life: 1
      };
      
      particles.push(particle);
    }
    
    return particles;
  }
};

// Effect helpers
export const effectHelpers = {
  // Create fog effect
  createFog: (color = 0x0a0e17, near = 1, far = 100) => {
    return new THREE.Fog(color, near, far);
  },

  // Create fog exp2
  createFogExp2: (color = 0x0a0e17, density = 0.001) => {
    return new THREE.FogExp2(color, density);
  },

  // Create post-processing effects
  createPostProcessing: (renderer, scene, camera) => {
    // Note: This requires additional imports from three/examples/jsm
    return {
      composer: null,
      renderPass: null,
      bloomPass: null,
      filmPass: null
    };
  },

  // Create screen space ambient occlusion
  createSSAO: () => {
    // Implementation for SSAO effect
    return null;
  }
};

// UI helpers
export const uiHelpers = {
  // Create 2D text label
  createTextLabel: (text, color = '#ffffff', size = 0.2) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 256;
    canvas.height = 128;
    
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'bold 48px Arial';
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    
    sprite.scale.set(size, size * 0.5, 1);
    return sprite;
  },

  // Create HTML label
  createHTMLLabel: (content, className = 'three-label') => {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = content;
    div.style.color = 'white';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.style.padding = '5px 10px';
    div.style.borderRadius = '5px';
    div.style.pointerEvents = 'none';
    
    return new CSS2DObject(div);
  },

  // Create interactive button
  createInteractiveButton: (text, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = `
      position: absolute;
      padding: 10px 20px;
      background: linear-gradient(45deg, #1F4E79, #00d9ff);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: sans-serif;
      font-size: 14px;
      transition: transform 0.2s;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', onClick);
    
    return button;
  }
};

// Animation helpers
export const animationHelpers = {
  // Create tween animation
  createTween: (object, target, duration = 1000, easing = 'linear') => {
    return {
      object,
      target,
      duration,
      easing,
      startTime: Date.now(),
      startValues: {
        position: object.position.clone(),
        rotation: object.rotation.clone(),
        scale: object.scale.clone()
      }
    };
  },

  // Create path animation
  createPathAnimation: (object, path, duration = 5000) => {
    const points = path.getPoints(50);
    const times = points.map((_, i) => i / (points.length - 1));
    
    const positionKF = new THREE.VectorKeyframeTrack(
      '.position',
      times,
      points.flatMap(p => [p.x, p.y, p.z])
    );
    
    const clip = new THREE.AnimationClip('path', duration, [positionKF]);
    const mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(clip);
    
    return { mixer, action };
  },

  // Create morph animation
  createMorphAnimation: (geometry, morphTargets, duration = 2000) => {
    geometry.morphTargets = morphTargets;
    geometry.morphAttributes.position = morphTargets;
    
    const material = new THREE.MeshBasicMaterial({
      morphTargets: true,
      color: 0x00ffff
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = THREE.AnimationClip.CreateFromMorphTargetSequence(
      'morph',
      morphTargets,
      duration / 1000
    );
    
    const action = mixer.clipAction(clip);
    
    return { mesh, mixer, action };
  }
};

// Utility functions
export const threeUtils = {
  // Convert screen coordinates to world coordinates
  screenToWorld: (x, y, camera, depth = 10) => {
    const vector = new THREE.Vector3();
    vector.set(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight) * 2 + 1,
      0.5
    );
    
    vector.unproject(camera);
    vector.sub(camera.position).normalize();
    
    return camera.position.clone().add(vector.multiplyScalar(depth));
  },

  // Get mouse position in normalized device coordinates
  getMouseNDC: (event) => {
    return {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };
  },

  // Create ray from camera through mouse position
  createRayFromMouse: (mouseX, mouseY, camera) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(mouseX, mouseY);
    
    raycaster.setFromCamera(mouse, camera);
    return raycaster;
  },

  // Calculate bounding box center
  getBoundingBoxCenter: (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return center;
  },

  // Fit camera to object
  fitCameraToObject: (camera, object, offset = 1.5) => {
    const boundingBox = new THREE.Box3().setFromObject(object);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * offset;
    
    camera.position.set(center.x, center.y, cameraZ);
    camera.lookAt(center);
    
    return cameraZ;
  },

  // Create grid helper
  createGridHelper: (size = 100, divisions = 100, color1 = 0x444444, color2 = 0x888888) => {
    return new THREE.GridHelper(size, divisions, color1, color2);
  },

  // Create axes helper
  createAxesHelper: (size = 5) => {
    return new THREE.AxesHelper(size);
  },

  // Create bounding box helper
  createBoundingBoxHelper: (object, color = 0xffff00) => {
    const box = new THREE.Box3().setFromObject(object);
    const helper = new THREE.Box3Helper(box, color);
    return helper;
  }
};

// Export all helpers
export default {
  geometryHelpers,
  materialHelpers,
  lightHelpers,
  cameraHelpers,
  particleHelpers,
  effectHelpers,
  uiHelpers,
  animationHelpers,
  threeUtils
};