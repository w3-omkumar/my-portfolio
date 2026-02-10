const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create a professional wireframe background
const geometry = new THREE.IcosahedronGeometry(20, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00f2ff, wireframe: true, transparent: true, opacity: 0.1 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;
});

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
    
    // Subtle camera drift based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();
