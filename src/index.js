import * as THREE from 'three';
import { testScene } from './assets/classes/Location';
import { loadCharacter } from './assets/classes/character';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// renderer - what will make everything show up on the screen
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 25, 25, 0 );
camera.lookAt( 0, 0, 0 );

// raycaster - a laserpointer from your mouse to the 3d space

const raycaster = new THREE.Raycaster()

//raycaster.layers.set( 1 );

const mouse = {
  x: undefined,
  y: undefined,
}



// camera follow loop

// function cameraFollow(camera, character) {
//     debugger
//     camera.lookAt(character.position);
//     camera.position.x = character.position.x + 1;
//     camera.position.y = character.position.y + 1;
//     camera.position.z = character.position.z + 1;
// }

let currentScene = testScene 

loadCharacter(currentScene)

// ground

const plane = new THREE.PlaneGeometry(100,100,10,10);
const material = new THREE.MeshBasicMaterial({ color: (0x404040)});


const ground = new THREE.Mesh(plane, material)
ground.castShadow = false;
ground.receiveShadow = true;
ground.rotation.x =-Math.PI/2;
testScene.add(ground)

// //loader
const loader = new GLTFLoader();
// // //loading tree
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.01, .01, .01)
    tree.position.y = 15
    console.log(tree.children[0])
    tree.children[0].layers.enable(1)

    testScene.add(tree)
})
loader.load("./src/assets/low_poly_city/scene.gltf", function(gltf) {
    const city = gltf.scene;
    // city.position.y = 15
    // city.position.x = 15
    testScene.add(city)
})



const controls = new OrbitControls(
    camera, renderer.domElement);
  controls.target.set(0, 20, 0);

// mouse - lets you see where the mouse is using Event Listeners



/// testing out scene change

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(currentScene, camera)
    controls.update();
    raycaster.setFromCamera(mouse, camera)
    
  
};
animate();

addEventListener('mousemove', (event) => {
  // 3js uses coordinates with the (0,0) being the center of the screen, 
  // as such you need to map everything out via the following math
   mouse.x = (event.clientX / innerWidth) * 2 - 1
   mouse.y = -(event.clientY / innerHeight) * 2 + 1
})
addEventListener('click', () => {
  const intersects = raycaster.intersectObjects(testScene.children)
  //find the player model
  const player = testScene.getObjectByName('Archibald')
  const selectedPoint = intersects[ 0 ].point
  player.position.x = selectedPoint.x
  player.position.z = selectedPoint.z
  console.log(player)
  
  
})