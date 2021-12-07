import * as THREE from 'three';
import { Character } from './assets/classes/character';
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Clue } from './assets/classes/clue';
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

let textBoxDisplayed = false;

const locations = []
locations.push(pleaseCity)
let selectedLocation = locations[0]
let currentScene = locations[0].scene

currentScene = testCity.scene

console.log(testCity)

const archibald = new Character('./src/assets/characters/malcolm.fbx', 'Archibald', [10,10,10])
// load player
if (archibald.addModel(currentScene, .01)){
  debugger
  archibald.loader.load('src/assets/characters/animations/Walking.fbx',(ani) =>{
    debugger
    archibald.addAnimation(ani)
  })}



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
// add a clue text box
let clueText = document.createElement("div")
clueText.id = "clueText"
document.body.appendChild(clueText)

// add a character text box

let characterText = document.createElement("div")
characterText.id = "characterTextBox"
document.body.appendChild(characterText)


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(currentScene, camera)
    raycaster.setFromCamera(mouse, camera)
    if (textBoxDisplayed === true) {
      raycaster.layers.set(3)
    } else {
      raycaster.layers.set(1)
    }
    const player = currentScene.getObjectByName('Archibald')
    if (player !== undefined && playerMovement === true){
      //walk = archibald.characterMixer.clipAction(archibald.characterObject.animations[0])
      characterMovement(player, camera);
      archibald.update()
    }

    const eve = selectedLocation.npcArr[0]
    if (eve !== undefined){
      eve.movement()
    }
    

};
animate();

const relativePostion = function(firstModel, secondModel){
    return (Math.abs(Math.abs(firstModel.position.x) - Math.abs(secondModel.position.x)) < 2 &&
      Math.abs(Math.abs(firstModel.position.z) - Math.abs(secondModel.position.z)) < 2)
}


addEventListener('mousemove', (event) => {
  // 3js uses coordinates with the (0,0) being the center of the screen, 
  // as such you need to map everything out via the following math
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
  isClue()
})

// movement
addEventListener('click', () => {
  if (textBoxDisplayed === false) {
  const intersects = raycaster.intersectObjects(currentScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (intersects[0]["object"].name === "ground"){
    playerMovement = true
    targetX = (Math.round((selectedPoint.x * 10)) / 10)
    targetZ = (Math.round((selectedPoint.z * 10)) / 10)
}}})

// clicking a clue
addEventListener('click', () => {
  if (textBoxDisplayed === false) {
  const intersects = raycaster.intersectObjects(currentScene.children)
  selectedLocation.clueArr.forEach((clue) => {

    // if the first object the raycaster intersects is a clue
    if (clue.clueObject === (intersects[0]["object"])){
      
      // if the archibald is close enough tot the clue
      /// might makethe following a function
      if (relativePostion(archibald.characterObject, clue.clueObject)) {
        // add to document
        
        clue.displayText()
        //currentScene.remove(intersects[0]["object"])
        //setTimeout()
        
      }


  }})

  }
})
// addEventListener('click', () => {
//   if (playerMovement === true) {
//     if (playerMixer !== archibald.characterMixer)
//     {
//       playerMixer = archibald.characterMixer
//       debugger
//       archibald.addAnimation('./src/assets/characters/animations/walking.fbx')
//     }
//     if (playerWalk !== archibald.characterObject.animations[1]){

//       playerWalk = archibald.characterObject.animations[1]
//     }
//     //debugger
//     //playerMixer.clipAction(playerWalk).play()
//     }
// })

// npc dialogue box pop up
addEventListener('click', () => {
  if (textBoxDisplayed === false) {
  const intersects = raycaster.intersectObjects(currentScene.children)[0].object
  selectedLocation.npcArr.forEach((npc) => {
    if (npc.characterObject.name === intersects.parent.name){
      if (relativePostion(intersects.parent, archibald.characterObject)){
        textBoxDisplayed = true;
        npc.displayText(0)
      }
    }
  }
)}})

// if you click on a button get rid of the text box
addEventListener('click', (e) => {
  let buttons = document.getElementsByTagName("button"); 
  if(buttons.length > 0) {
    buttons = [...buttons]
    buttons.forEach((button) => {
      if (e.target == button) { 
        if (button.name === 'close') {
        document.getElementById('characterTextBox').innerHTML = ''
        textBoxDisplayed = false;
      } else {
        selectedLocation.npcArr.forEach((npc) => {
          npc.messageArr.forEach((message) => {
            if (message.name === button.name){
              document.getElementById('characterTextBox').innerHTML = ''
              npc.displayText(npc.messageArr.indexOf(message))
            }
          })
        })
      }
    }
  })
  }
})