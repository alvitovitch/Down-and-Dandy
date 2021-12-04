import * as THREE from 'three';
import { testScene } from './assets/classes/Location';
import { loadCharacter } from './assets/classes/character';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Clue } from './assets/classes/clue';

import { sampleText } from './assets/classes/textbox';

// renderer - what will make everything show up on the screen
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight);

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.set( 10, 10, 2 );
camera.lookAt( 0, 0, 0 );


// raycaster - a laserpointer from your mouse to the 3d space

const raycaster = new THREE.Raycaster()

//raycaster.layers.set( 1 );

const mouse = {
  x: undefined,
  y: undefined,
}



// camera follow loop

function cameraFollow(camera, character) {
    
    camera.lookAt(character.position);
    camera.position.x = character.position.x + 1;
    camera.position.y = character.position.y + 1;
    camera.position.z = character.position.z + 1;
}

let currentScene = testScene 

// load player
loadCharacter(currentScene)
console.log(testScene)

// ground

const plane = new THREE.PlaneGeometry(100,100,10,10);
const material = new THREE.MeshBasicMaterial({ color: (0x404040)});


const ground = new THREE.Mesh(plane, material)
ground.castShadow = false;
ground.receiveShadow = true;
ground.rotation.x =-Math.PI/2;
ground.name = "ground"
testScene.add(ground)

// clue

const testSceneClues = []

const cube = new THREE.BoxGeometry(1,1,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const clue = new THREE.Mesh(cube, cubeSkin);

clue.position.x = 5
clue.position.z = 5
clue.name = "testClue"

const testClue = new Clue(clue, ['this is a clue'])
testSceneClues.push(testClue)

testScene.add(clue)

//loader
const loader = new GLTFLoader();
// // //loading tree
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.01, .01, .01)
    tree.position.y = 15
    tree.children[0].layers.enable(1)

    testScene.add(tree)
})
loader.load("./src/assets/low_poly_city/scene.gltf", function(gltf) {
    const city = gltf.scene;
    // city.position.y = 15
    // city.position.x = 15
    testScene.add(city)
})

// popup box


// const controls = new OrbitControls(
//     camera, renderer.domElement);
//   controls.target.set(0, 20, 0);

// player movement
let targetX = undefined;
let targetZ = undefined;

function characterMovement(char, camera) {
  if (char !== undefined) {
    if (targetX > char.position.x) {
      char.position.x += 0.1
      camera.position.x += 0.1
    }
    if (targetX < char.position.x) {
      char.position.x -= 0.1
      camera.position.x -= 0.1
    }
    if (targetZ > char.position.z) {
      char.position.z += 0.1
      camera.position.z += 0.1
    }
    if (targetZ < char.position.z) {
      char.position.z -= 0.1
      camera.position.z -= 0.1
    }
  }
}

// raycaster is always active so I just need it to show/hide the ! for clues if it's intesecting it
function isClue(){
  if (raycaster.intersectObjects(currentScene.children).length > 0){ 
      testSceneClues.forEach( (ele) => {
        ele.hover(raycaster, currentScene)
    })
  }
}

/// testing out scene change
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(currentScene, camera)
    //controls.update();
    raycaster.setFromCamera(mouse, camera)
    const player = testScene.getObjectByName('Archibald')
    characterMovement(player, camera);
    //cameraTracking(camera, player)
    isClue()

};
animate();




addEventListener('mousemove', (event) => {
  // 3js uses coordinates with the (0,0) being the center of the screen, 
  // as such you need to map everything out via the following math
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

// movement
addEventListener('click', () => {
  const intersects = raycaster.intersectObjects(testScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (intersects[0]["object"].name === "ground"){
    targetX = Math.round((selectedPoint.x * 10) / 10)
    targetZ = Math.round((selectedPoint.z * 10) / 10)
}})

// clicking a clue
addEventListener('click', () => {
  const intersects = raycaster.intersectObjects(testScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (currentScene.clues.includes((intersects[0]["object"].name))){
    console.log('you clicked a clue')

  }
  })