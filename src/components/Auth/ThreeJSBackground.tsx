import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeJSBackgroundProps {
  darkMode?: boolean;
}

const ThreeJSBackground: React.FC<ThreeJSBackgroundProps> = ({ darkMode = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: darkMode ? 0xff6b35 : 0x4f46e5,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Dodecahedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(0.5);
    const dodecaMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0xff6b35 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    dodeca.position.set(-2, 1, -3);
    scene.add(dodeca);
    shapes.push(dodeca);

    // Icosahedron
    const icosaGeometry = new THREE.IcosahedronGeometry(0.7);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x10b981 : 0xff6b35,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const icosa = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosa.position.set(2, -1, -4);
    scene.add(icosa);
    shapes.push(icosa);

    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.6);
    const octaMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x3b82f6 : 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const octa = new THREE.Mesh(octaGeometry, octaMaterial);
    octa.position.set(0, 2, -5);
    scene.add(octa);
    shapes.push(octa);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array([
      -2, 1, -3,  // dodeca position
      2, -1, -4,  // icosa position
      0, 2, -5,   // octa position
      -2, 1, -3,  // back to dodeca
    ]);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: darkMode ? 0x6b7280 : 0x9ca3af,
      transparent: true,
      opacity: 0.3,
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.005 * (index + 1);
        shape.rotation.z += 0.003 * (index + 1);
      });

      // Animate line opacity
      lineMaterial.opacity = 0.3 + Math.sin(Date.now() * 0.001) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeJSBackground;