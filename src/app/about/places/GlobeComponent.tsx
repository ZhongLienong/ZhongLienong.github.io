'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function GlobeComponent() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(800, 500);
    mountRef.current.appendChild(renderer.domElement);

    // Earth with texture
    const texture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.7
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(directionalLight);

    // Locations
    const locations = [
      { name: 'Toronto', lat: 43.7, lng: -79.4, color: 0xff0000 },
      { name: 'Paris', lat: 48.9, lng: 2.3, color: 0x00ff00 },
      { name: 'Kyoto', lat: 35.0, lng: 135.8, color: 0x0000ff },
      { name: 'NYC', lat: 40.7, lng: -74.0, color: 0xffff00 },
      { name: 'Bali', lat: -8.4, lng: 115.2, color: 0xff00ff }
    ];

    // Label
    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.color = 'white';
    label.style.backgroundColor = 'rgba(0,0,0,0.7)';
    label.style.padding = '5px 10px';
    label.style.borderRadius = '5px';
    label.style.display = 'none';
    document.body.appendChild(label);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Markers
    const markers = locations.map(loc => {
      const radius = 5;
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lng) * (Math.PI / 180); // Removed +180 to fix position

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = radius * Math.cos(phi) * Math.sin(theta);

      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 12, 12), // smaller marker
        new THREE.MeshBasicMaterial({ color: loc.color })
      );
      marker.position.set(x, y, z);
      marker.userData = { name: loc.name };
      scene.add(marker);
      return marker;
    });

    // Click handler
    function onClick(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);

      if (intersects.length > 0) {
        const marker = intersects[0].object;
        label.textContent = marker.userData.name;
        label.style.display = 'block';
        label.style.left = `${event.clientX}px`;
        label.style.top = `${event.clientY}px`;
      } else {
        label.style.display = 'none';
      }
    }

    window.addEventListener('click', onClick);

    // Camera and controls
    camera.position.z = 10;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Keep directional light pointing from camera
      directionalLight.position.copy(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      document.body.removeChild(label);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return <div ref={mountRef} className="globe-container" />;
}