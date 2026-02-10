const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#geometric-bg'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Create Geometric Mesh
const geometry = new THREE.PlaneGeometry(150, 150, 20, 20);
const material = new THREE.MeshLambertMaterial({ color: 0x7cfc00, wireframe: true, transparent: true, opacity: 0.1 });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -1.2;
scene.add(mesh);

// Randomize heights for "Low Poly" look
const pos = geometry.attributes.position;
for (let i = 0; i < pos.count; i++) {
    const z = Math.random() * 5;
    pos.setZ(i, z);
}

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 20);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.2));

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 200;
    mouseY = (e.clientY - window.innerHeight / 2) / 200;
});

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.z += 0.001;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();
