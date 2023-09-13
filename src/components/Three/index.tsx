import React, { useEffect } from 'react';
import * as THREE from 'three';

export const ThreeJSComponent = () => {
  useEffect(() => {
    let mount = document.getElementById('threejs-canvas-header');

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 400,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    mount.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

    // Create an animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();
  }, []);

  return <div id="threejs-canvas-header"></div>;
};

export default ThreeJSComponent;
