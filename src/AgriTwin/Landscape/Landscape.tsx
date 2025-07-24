// export default LandScape;
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from '@/components/ui/badge'
import * as THREE from 'three'
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls'
import { motion } from "framer-motion"
import plotlayout from "@/assets/Irrigation/plotlayout.png"

const LandScape = () => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let scene, camera, renderer, controls, resizeObserver;

    const init = () => {
      // Scene Setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f9ff);
      

      // Camera
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );

      // Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      mountRef.current.appendChild(renderer.domElement);

      // Texture Loading
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(plotlayout, (texture) => {
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
          shininess: 20
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);
      });

      // Enhanced Lighting
      const ambientLight = new THREE.AmbientLight(0xe0e0e0, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Orbit Controls with mobile adjustments
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = isMobile ? 5 : 3;
      controls.maxDistance = isMobile ? 20 : 15;
      controls.enablePan = !isMobile; // Disable pan on mobile for better touch handling

      camera.position.set(isMobile ? 8 : 5, isMobile ? 8 : 5, isMobile ? 8 : 5);
      camera.lookAt(scene.position);

      // Pipe Paths and Animation (keep your existing code here)
    
      const pipePaths = [
        { start: [-0.1, 0.01, -0.19], end: [1.3, 0.01, -0.2] },
        // ... (rest of the existing pipe paths)
      ];

      // Animate Water Flow
      const flowSpeed = 0.008;
      const flowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4299e1,  // Tailwind blue-500
        transparent: true,
        opacity: 0.7
      });
      const flowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const flowParticles = [];

      pipePaths.forEach(path => {
        const particle = new THREE.Mesh(flowGeometry, flowMaterial);
        particle.position.set(...path.start);
        particle.userData = {
          start: new THREE.Vector3(...path.start),
          end: new THREE.Vector3(...path.end),
          progress: 0
        };
        flowParticles.push(particle);
        scene.add(particle);
      });

      const animateParticles = () => {
        flowParticles.forEach(particle => {
          particle.userData.progress += flowSpeed;
          if (particle.userData.progress >= 1) {
            particle.userData.progress = 0;
            particle.position.set(...particle.userData.start.toArray());
          } else {
            particle.position.lerpVectors(particle.userData.start, particle.userData.end, particle.userData.progress);
          }
        });
      };

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        animateParticles();
        controls.update();
        renderer.render(scene, camera);
      };
      animate();


      // Responsive Handling with ResizeObserver
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      });

      if (mountRef.current) {
        resizeObserver.observe(mountRef.current);
      }

      // Cleanup
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        controls.dispose();
        renderer.dispose();
        scene.traverse((object) => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          }
        });
      };
    };

    const cleanup = init();
    return cleanup;
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
    >
      <Card className="w-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 shadow-xl sm:shadow-2xl rounded-lg sm:rounded-2xl border-none">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 p-4 sm:p-6">
          <div className="space-y-1">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 dark:text-green-200">
              Irrigation Plot Visualization
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground/70">
              Advanced 3D Mapping of Irrigation Infrastructure
            </p>
          </div>
          <Badge variant="outline" className="mt-2 sm:mt-0 bg-white/50 dark:bg-black/30 text-xs sm:text-sm">
            Real-time Flow
          </Badge>
        </CardHeader>
        <CardContent className="p-0 relative">
          <div
            ref={mountRef}
            className="w-full h-[60vh] sm:h-[70vh] md:h-[500px] bg-white/20 dark:bg-black/10 backdrop-blur-sm"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LandScape;