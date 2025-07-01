import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('scene');
const scene = new THREE.Scene();

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// LOADER
const loader = new GLTFLoader();

// SCROLL TRIGGER
const scrollTrigger = {
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  scrub: true
};

// LOGO
loader.load('BoxFiveLogo.glb', gltf => {
  const logo = gltf.scene;
  logo.scale.set(1.5, 1.5, 1.5);
  logo.position.set(0.2, 0, 4);
  logo.rotation.set(0, 0, 0);
  scene.add(logo);
});

// LIGHTING
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0.2, 5);

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// GSAP SCROLL-BASED CAMERA ZOOM
gsap.to(camera.position, {
  x: -1,
  y: 0,
  z: 1,
  scrollTrigger
});
gsap.to(camera.rotation, {
  y: Math.PI * 0.5,
  scrollTrigger
});
