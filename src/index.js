import * as THREE from 'three';
//import { testScene } from './assets/classes/Location';
import { Character } from './assets/classes/character';
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { Clue } from './assets/classes/clue';
//import { Location } from './assets/classes/Location';

import { testCity } from './assets/locations/city';

const pleaseCity = testCity

// renderer - what will make everything show up on the screen
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight);

// camera
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight), .1, 1000);
camera.position.set( 10, 10, 2 );
camera.lookAt( 0, 0, 0 );


// raycaster - a laserpointer from your mouse to the 3d space

const raycaster = new THREE.Raycaster()

// raycaster layers
// 1 = ground (walkable terrain)
// 2 = clue 
// 3 = npc
raycaster.layers.set(1);

const mouse = {
  x: undefined,
  y: undefined,
}



const plane = new THREE.PlaneGeometry(100,100,10,10);
const material = new THREE.MeshBasicMaterial({ color: (0x404040)});


const ground = new THREE.Mesh(plane, material)
ground.castShadow = false;
ground.receiveShadow = true;
ground.rotation.x =-Math.PI/2;
ground.name = "ground"
ground.layers.enable(1)
//testScene.add(ground)
const ambLight = new THREE.AmbientLight(0x404040)
const pLight =  new THREE.DirectionalLight( 0xffffff, 1)
const lights =  [ambLight, pLight]

//const newLocation = new Location(ground, [], lights, [], [], [] )
//debugger

const locations = []
locations.push(pleaseCity)
let selectedLocation = locations[0]
let currentScene = locations[0].scene

currentScene = testCity.scene

console.log(testCity)

const archibald = new Character('./src/assets/characters/malcolm.fbx', 'Archibald')
// load player
archibald.addModel(currentScene, .01)
archibald.addAnimation('src/assets/characters/animations/Walking.fbx')
//console.log(archibald)
currentScene.add(archibald.characterObject)

// player movement
let targetX = undefined;
let targetZ = undefined;

let playerMovement = false;
function characterMovement(char, camera) {
  if (char !== undefined) {
    char.position.x = Math.round(char.position.x * 10)/10 
    char.position.z = Math.round(char.position.z * 10)/10 
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
  if (char.position.x === targetX && char.position.z === targetZ) {
    playerMovement = false
    archibald.characterObject.visible = true
  }
}

// raycaster is always active so I just need it to show/hide the ! for clues if it's intesecting it
function isClue(){
  if (raycaster.intersectObjects(currentScene.children).length > 0 ){ 
      selectedLocation.clueArr.forEach( (ele) => {
          ele.hover(raycaster, currentScene)
        }
      )
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
    raycaster.setFromCamera(mouse, camera)
    const player = currentScene.getObjectByName('Archibald')
    if (player !== undefined && playerMovement === true){
      characterMovement(player, camera);
      archibald.update()
    }
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
  const intersects = raycaster.intersectObjects(currentScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (intersects[0]["object"].name === "ground"){
    playerMovement = true
    targetX = (Math.round((selectedPoint.x * 10)) / 10)
    targetZ = (Math.round((selectedPoint.z * 10)) / 10)
}})

// clicking a clue
addEventListener('click', () => {
  const intersects = raycaster.intersectObjects(currentScene.children)
  selectedLocation.clueArr.forEach((clue) => {
    if (clue.clueObject === (intersects[0]["object"])){
      
      if (Math.abs(clue.clueObject.position.x) - Math.abs(archibald.characterObject.position.x) < 2 &&
      Math.abs(clue.clueObject.position.y) - Math.abs(archibald.characterObject.position.y) < 2) {
        console.log('you clicked a clue')
        currentScene.remove(intersects[0]["object"])
        
      }


  }})

  }
  )
//const walk = archibald.characterMixer(player.animations[0])
addEventListener('click', () => {
  if (playerMovement === true) {
    archibald.characterMixer.clipAction(archibald.characterObject.animations[0]).play()
    //archibald.characterObject.visible = false
  }
})