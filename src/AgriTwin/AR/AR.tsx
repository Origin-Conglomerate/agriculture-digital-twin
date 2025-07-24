import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import imageUrl from "@/assets/Irrigation/plotlayout.png";

const AR = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Additional refs for visualization elements
  const plotMeshRef = useRef<THREE.Mesh | null>(null);
  const waterDropletsRef = useRef<
    Array<{ mesh: THREE.Mesh; speed: number; startX: number }>
  >([]);
  const metricsGroupRef = useRef<THREE.Group | null>(null);

  // Data for AR metrics visualization
  const metrics = [
    { label: "Area", value: "24 Acres", icon: "📏" },
    { label: "Irrigation", value: "In Progress", icon: "💧" },
    { label: "Temperature", value: "26°C", icon: "🌡️" },
    { label: "Rainfall", value: "22 mm", icon: "🌧️" },
  ];

  // Update camera and renderer dimensions based on container size
  const handleResize = () => {
    if (cameraRef.current && rendererRef.current && containerRef.current) {
      const container = containerRef.current;
      const aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.aspect = aspect;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      handleResize();
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Create metric panels and add them to a group positioned above the plot
  const createMetricsInAR = (scene: THREE.Scene) => {
    const group = new THREE.Group();
    group.position.set(0, 1.5, 0); // Position above the plot layout

    metrics.forEach((metric, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 128;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Draw panel background and border
      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = "#3b82f6";
      context.lineWidth = 4;
      context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Draw metric text
      context.fillStyle = "#ffffff";
      context.font = "bold 24px Arial";
      context.fillText(metric.icon + " " + metric.label, 20, 40);
      context.font = "24px Arial";
      context.fillText(metric.value, 20, 80);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const geometry = new THREE.PlaneGeometry(0.5, 0.25);
      const mesh = new THREE.Mesh(geometry, material);

      // Arrange metrics horizontally
      mesh.position.set(index * 0.6 - 0.9, 0, 0);
      group.add(mesh);
    });

    metricsGroupRef.current = group;
    scene.add(group);
  };

  // Create water droplets that simulate irrigation water movement
  const createWaterDroplets = (scene: THREE.Scene) => {
    // Remove any existing droplets first
    waterDropletsRef.current.forEach((droplet) => {
      scene.remove(droplet.mesh);
    });
    waterDropletsRef.current = [];

    const dropletCount = 50;
    for (let i = 0; i < dropletCount; i++) {
      const geometry = new THREE.SphereGeometry(0.01, 8, 8);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.8,
        emissive: 0x0044ff,
        emissiveIntensity: 0.5,
      });
      const droplet = new THREE.Mesh(geometry, material);
      droplet.position.set(
        Math.random() * 0.8 - 0.4, // x: randomly across the plot
        0.5,                       // y: starting height above plot
        Math.random() * 0.1 - 0.05   // z: slight depth variation
      );
      scene.add(droplet);
      waterDropletsRef.current.push({
        mesh: droplet,
        speed: 0.005 + Math.random() * 0.005,
        startX: droplet.position.x,
      });
    }
  };

  // Animate water droplets so they move downward and reset when reaching a threshold
  const animateWaterDroplets = () => {
    waterDropletsRef.current.forEach((droplet) => {
      droplet.mesh.position.y -= droplet.speed;
      // Add a slight horizontal oscillation
      droplet.mesh.position.x =
        droplet.startX + Math.sin(Date.now() * 0.001 + droplet.startX) * 0.02;
      if (droplet.mesh.position.y < -0.5) {
        droplet.mesh.position.y = 0.5;
      }
    });
  };

  // Initialize Three.js, load the plot layout visualization, and add additional elements
  const initThreeJS = () => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const container = containerRef.current;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.01, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Load the plot layout texture and create a plane mesh
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const plotMesh = new THREE.Mesh(geometry, material);
      plotMeshRef.current = plotMesh;
      scene.add(plotMesh);
    });

    // Add lighting for enhanced visualization
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add water droplets and metrics visualization to the scene
    createWaterDroplets(scene);
    createMetricsInAR(scene);

    const animate = () => {
      requestAnimationFrame(animate);
      animateWaterDroplets();
      // Ensure the metrics always face the camera
      if (metricsGroupRef.current && camera) {
        metricsGroupRef.current.quaternion.copy(camera.quaternion);
      }
      renderer.render(scene, camera);
    };

    animate();
  };

  // Start AR by initializing the Three.js scene and visualization
  const startAR = () => {
    initThreeJS();
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
        Augmented Reality
      </h1>
      <p className="text-lg sm:text-xl mb-3 sm:mb-6 text-gray-600 dark:text-gray-300">
        Experience your agricultural plot in immersive 3D visualization
      </p>
      <p className="text-base sm:text-lg mb-4 sm:mb-8 text-gray-600 dark:text-gray-300">
        Our AR technology enables you to walk through your plot virtually, visualize irrigation systems,
        and monitor key metrics in real-time.
      </p>
      {/* Responsive Three.js canvas container */}
      <div
        ref={containerRef}
        className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] max-h-[800px] relative rounded-lg overflow-hidden"
      />
      <button
        onClick={startAR}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 text-sm sm:text-base mt-4"
      >
        Start AR
      </button>
      <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        ⚠️ AR mode works only on mobile devices with ARCore (Android) or ARKit (iOS) support
      </div>
      {error && (
        <div className="absolute top-2 left-2 right-2 mx-auto text-center bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-sm">
          {error}
        </div>
      )}
      {info && (
        <div className="absolute top-2 left-2 right-2 mx-auto text-center bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-sm">
          {info}
        </div>
      )}
    </div>
  );
};

export default AR;
