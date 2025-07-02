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

const textureLoader = new THREE.TextureLoader();

const fogBase = textureLoader.load('/textures/fogbase.png');
const fogMid = textureLoader.load('/textures/fogwispy1.png');
const fogTop = textureLoader.load('/textures/fogwispy2.png');

// 2. Create fog layers
function createFogLayer(texture, y, zIndex = 0.01) {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false, // Prevents weird z-fighting
    opacity: 1,
  });

  const geometry = new THREE.PlaneGeometry(10, 5); // Width, Height
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, y, zIndex);
  return mesh;
}

// 3. Add fog layers to scene
const fogLayer1 = createFogLayer(fogBase, 0);
const fogLayer2 = createFogLayer(fogMid, 0.1);
const fogLayer3 = createFogLayer(fogTop, 0.2);

scene.add(fogLayer1, fogLayer2, fogLayer3);

// 4. Animate layers
function animateFog() {
  fogLayer2.position.x += 0.001; // Subtle drift
  fogLayer3.position.x -= 0.002;
}


// SCROLL TRIGGER
const scrollTrigger = {
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  scrub: true
};

// LOGO
loader.load('https://phantom-scene.vercel.app/BoxFiveLogo.glb', gltf => {
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
  animateFog();
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
