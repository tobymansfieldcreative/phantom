gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry();
scene.background = new THREE.Color(0x111111); // dark grey
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // red
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Scroll-linked rotation
gsap.to(sphere.rotation, {
  y: Math.PI * 2,
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
