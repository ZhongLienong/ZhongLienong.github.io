'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { locations } from './locations';

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

    // Textured Earth
    const radius = 5;
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const texture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.7
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Lighting for textured globe
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);


    // Create container for markers so we can handle them as a group
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Label
    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.color = 'white';
    label.style.backgroundColor = 'rgba(0,0,0,0.7)';
    label.style.padding = '5px 10px';
    label.style.borderRadius = '5px';
    label.style.display = 'none';
    label.style.pointerEvents = 'none'; // Ensure it doesn't interfere with mouse events
    label.style.zIndex = '1000'; // Ensure it appears above the canvas
    mountRef.current.appendChild(label);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Base marker size - will be scaled based on camera distance
    const baseMarkerSize = 0.05;
    const minMarkerSize = 0.01;

    // Create marker geometries of different levels of detail
    const markerGeometryLOD = {
      high: new THREE.SphereGeometry(1, 16, 16),
      medium: new THREE.SphereGeometry(1, 12, 12),
      low: new THREE.SphereGeometry(1, 8, 8)
    };

    // Markers
    const markers: THREE.Mesh[] = [];
    const markerData: { position: THREE.Vector3, name: string }[] = [];

    locations.forEach(loc => {
      // Convert lat/lng to 3D position
      // Convert to radians
      const latRad = loc.lat * (Math.PI / 180);
      const lngRad = -loc.lng * (Math.PI / 180); // Negative because we want east to be positive in 3D space

      // Calculate position on sphere
      const x = radius * Math.cos(latRad) * Math.cos(lngRad);
      const y = radius * Math.sin(latRad);
      const z = radius * Math.cos(latRad) * Math.sin(lngRad);

      // Store position data for markers
      const position = new THREE.Vector3(x, y, z);
      markerData.push({
        position: position,
        name: loc.name
      });

      // Initial marker creation with minimum size
      const marker = new THREE.Mesh(
        markerGeometryLOD.low,
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.9
        })
      );

      // Position slightly above the surface
      const elevationFactor = 1.0025; // 0.25% above the surface
      marker.position.set(
        position.x * elevationFactor,
        position.y * elevationFactor,
        position.z * elevationFactor
      );

      marker.userData = { name: loc.name, basePosition: position.clone() };
      marker.scale.set(minMarkerSize, minMarkerSize, minMarkerSize);

      markersGroup.add(marker);
      markers.push(marker);
    });

    // Function to update marker sizes based on camera distance
    function updateMarkerSizes() {
      const cameraPosition = new THREE.Vector3();
      camera.getWorldPosition(cameraPosition);

      // Calculate distance from camera to globe center
      const distanceToCenter = cameraPosition.distanceTo(new THREE.Vector3(0, 0, 0));

      markers.forEach((marker, index) => {
        // Get marker position in world space
        const markerPosition = new THREE.Vector3();
        marker.getWorldPosition(markerPosition);

        // Calculate distance from camera to marker
        const distanceToMarker = cameraPosition.distanceTo(markerPosition);

        // Calculate visibility factor (0 to 1) based on whether the marker is facing the camera
        const direction = markerPosition.clone().normalize();
        const dot = direction.dot(cameraPosition.clone().normalize());
        const isFacing = dot < 0; // Negative dot product means the marker is facing the camera

        // Calculate size based on camera distance
        // The closer the camera, the larger the marker
        const size = isFacing ? Math.max(minMarkerSize, baseMarkerSize * (10 / distanceToCenter)) : minMarkerSize;

        // Update marker size
        marker.scale.set(size, size, size);

        // Use higher detail geometry when closer
        if (distanceToCenter < 7) {
          marker.geometry = markerGeometryLOD.high;
        } else if (distanceToCenter < 10) {
          marker.geometry = markerGeometryLOD.medium;
        } else {
          marker.geometry = markerGeometryLOD.low;
        }
      });
    }

    // Track hover state
    let isHoveringMarker = false;

    // Hover handler
    function onMouseMove(event: MouseEvent) {
      // Get mouse position relative to the container
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);

      renderer.domElement.style.cursor = 'default';

      if (intersects.length > 0) {
        const marker = intersects[0].object as THREE.Mesh;
        label.textContent = marker.userData.name;
        label.style.display = 'block';
        label.style.left = `${event.clientX - rect.left + 10}px`;
        label.style.top = `${event.clientY - rect.top + 10}px`;

        // Highlight the marker on hover
        (marker.material as THREE.MeshBasicMaterial).color.set(0xffff00);
        renderer.domElement.style.cursor = 'pointer';
        isHoveringMarker = true;
      } else {
        label.style.display = 'none';
        isHoveringMarker = false;

        // Reset color of all markers
        markers.forEach(m => {
          (m.material as THREE.MeshBasicMaterial).color.set(0xff0000);
        });
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Camera and controls
    camera.position.z = 10;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.minDistance = 5.5; // Allow zooming closer to the surface
    controls.maxDistance = 30;

    // Enable zooming with better sensitivity
    controls.zoomSpeed = 1.0;
    controls.enablePan = true;

    // Add click handler
    function onClick(event: MouseEvent) {
      // Get mouse position relative to the container
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);

      if (intersects.length > 0) {
        const marker = intersects[0].object as THREE.Mesh;
        const position = marker.userData.basePosition.clone();

        // Animate camera to look at the marker
        const targetPosition = position.clone().multiplyScalar(1.5);
        const duration = 1000; // ms
        const startPosition = camera.position.clone();
        const startTime = Date.now();

        function animateCamera() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease in-out function
          const t = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

          camera.position.lerpVectors(startPosition, targetPosition, t);
          controls.target.lerpVectors(new THREE.Vector3(0, 0, 0), position, t);

          if (progress < 1) {
            requestAnimationFrame(animateCamera);
          }
        }

        animateCamera();
      }
    }

    renderer.domElement.addEventListener('click', onClick);

    // Window resize handler
    function onWindowResize() {
      const width = mountRef.current?.clientWidth || 800;
      const height = mountRef.current?.clientHeight || 500;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize(); // Initial size

    // Define base rotation speed and zoom-dependent factors
    const baseRotationSpeed = 0.0001;
    const minZoomDistance = controls.minDistance;
    const maxZoomDistance = controls.maxDistance;

    // Animate
    let lastTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Update marker sizes based on camera distance
      updateMarkerSizes();

      // Calculate current distance from camera to center
      const cameraPosition = new THREE.Vector3();
      camera.getWorldPosition(cameraPosition);
      const distanceToCenter = cameraPosition.distanceTo(new THREE.Vector3(0, 0, 0));

      // Calculate rotation speed based on zoom level
      // The closer to the surface, the slower the rotation
      const zoomFactor = Math.min(1, Math.max(0.1,
        (distanceToCenter - minZoomDistance) / (maxZoomDistance - minZoomDistance)
      ));

      // Apply rotation with adaptive speed (only when not hovering over a marker)
      const time = performance.now();
      if ((!controls.enableDamping || controls.enabled) && !isHoveringMarker) {
        const delta = time - lastTime;
        const currentRotationSpeed = baseRotationSpeed * zoomFactor;
        globe.rotation.y += delta * currentRotationSpeed;
        markersGroup.rotation.y = globe.rotation.y; // Keep markers in sync with globe
      }
      lastTime = time;

      // Keep directional light pointing from camera
      directionalLight.position.copy(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      mountRef.current?.removeChild(label);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="globe-container"
      style={{
        width: '100%',
        height: '500px',
        position: 'relative'
      }}
    />
  );
}
