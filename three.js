// Create the 3D scene
const scene = new THREE.Scene()

// Create the spotlight object to simulate the flashlight
const flashlight = new THREE.SpotLight(0xffffff)
flashlight.position.set(0, 0, 0)
flashlight.angle = Math.PI / 6 // Set the beam angle to 30 degrees
flashlight.intensity = 1.5 // Set the beam intensity
scene.add(flashlight)

// Load the 3D model of the flashlight
const loader = new THREE.ObjectLoader()
loader.load('flashlight.json', function(object) {
   scene.add(object)
})

// Create mouse or keyboard controls to move the flashlight object
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)

// In the render loop, update the position and direction of the spotlight based on the position of the flashlight object
function animate() {
   requestAnimationFrame(animate)

   // Update the position of the flashlight object using the controls
   object.position.copy(controls.target)

   // Update the direction of the spotlight to point in the direction the flashlight object is pointing
   flashlight.target.position.copy(object.position)
   flashlight.target.position.add(object.getWorldDirection())

   // Render the scene
   renderer.render(scene, camera)
}
