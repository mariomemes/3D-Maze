// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scary lemon model and add to the scene
const lemonLoader = new THREE.GLTFLoader();
lemonLoader.load('lemon.gltf', (gltf) => {
  const lemon = gltf.scene;
  lemon.scale.set(0.1, 0.1, 0.1);
  scene.add(lemon);
});

// Set up variables for player and lemon positions
const player = new THREE.Object3D();
const lemon = new THREE.Object3D();
let mouseCoords = new THREE.Vector2();

// Load the maze and add to the scene
const mazeLoader = new THREE.TextureLoader();
mazeLoader.load('maze.jpg', (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10); // Adjust the repeat values to match the size of your maze
  const mazeGeometry = new THREE.PlaneGeometry(100, 100); // Adjust the plane size to match the size of your maze
  const mazeMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const maze = new THREE.Mesh(mazeGeometry, mazeMaterial);
  scene.add(maze);
});

// Set up event listeners to update player position
document.addEventListener('mousemove', (event) => {
  mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouseCoords.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Set up animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Update the player's position based on mouse movement
  player.position.x = mouseCoords.x * 5;
  player.position.y = mouseCoords.y * 5;

  // Check if the lemon is close to the player and update its position
  if (player.position.distanceTo(lemon.position) < 10) {
    lemon.position.x += (lemon.position.x - player.position.x) * 0.01;
    lemon.position.y += (lemon.position.y - player.position.y) * 0.01;
  }

  renderer.render(scene, camera);
};

animate();
