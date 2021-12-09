import * as THREE from 'three';
import { Player } from './assets/classes/player'; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Clue } from './assets/classes/clue';
import { haberdashery } from './assets/locations/city';
import { Phone } from './assets/classes/Phone';
import { port } from './assets/locations/port';
import { station } from './assets/locations/station';
import { Textbox } from './assets/classes/textbox';
import { skybox } from './assets/locations/skybox';
import { jailcell } from './assets/locations/jail';


// renderer - what will make everything show up on the screen
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight);

// camera
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight), .1, 1000);



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
let phoneBoxDisplayed = false;

const locations = []
locations.push(haberdashery)
//locations.push(port)
let selectedLocation = locations[0]
let currentScene = selectedLocation.scene

camera.position.copy(selectedLocation.startingPos);
camera.position.x += 10
camera.position.y += 5
camera.lookAt( selectedLocation.startingPos);

debugger
const archibald = new Player('./src/assets/characters/malcolm.fbx', 'Archibald', selectedLocation.startingPos)
// load player

if (archibald.addModel(currentScene, .01)){
  archibald.loader.load('src/assets/characters/animations/Walking.fbx',(ani) =>{
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
      //char.quaternion.y += 1
    }
    if (targetX < char.position.x) {
      char.position.x -= 0.1
      camera.position.x -= 0.1
      //char.qiaternion.y -= 1

    }
    if (targetZ > char.position.z) {
      char.position.z += 0.1
      camera.position.z += 0.1
      //char.qiaternion.x += 1

    }
    if (targetZ < char.position.z) {
      char.position.z -= 0.1
      camera.position.z -= 0.1
      //char.qiaternion.x -= 1

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

const phone = document.createElement("div")
const smartPhone = document.createElement("img")
smartPhone.id = "phone"
smartPhone.src = "src/assets/phone/iphone-1936818_1280.png"
phone.appendChild(smartPhone)
document.body.appendChild(phone)

// add a character text box

let characterText = document.createElement("div")
characterText.id = "characterTextBox"
document.body.appendChild(characterText)

const phoneMenu = new Phone()
document.body.appendChild(phoneMenu.phonebox)


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})
//const controls = new OrbitControls( camera, renderer.domElement )

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(currentScene, camera)
    raycaster.setFromCamera(mouse, camera)
    if (textBoxDisplayed === true || phoneBoxDisplayed === true) {
      raycaster.layers.set(3)
    } else {
      raycaster.layers.set(1)
    }
    const player = currentScene.getObjectByName('Archibald')
    if (player !== undefined && playerMovement === true){
      //walk = archibald.characterMixer.clipAction(archibald.characterObject.animations[0])
      characterMovement(player, camera);
      archibald.update()
    } else if (player !== undefined) {
      camera.lookAt(player.position)
    }
    // add the port if you find the blood

    archibald.foundClues.forEach((clue) => {
      if (clue.name === "blood" && !locations.includes(port)) {
        locations.push(port)
      }
      if (clue.name === "briefcase" && !locations.includes(station)) {
        locations.push(station)
      }
    })

    selectedLocation.npcArr.forEach((npc) => {
      if (currentScene.getObjectByName(npc.name) !== undefined){
        npc.characterMixer.clipAction(npc.characterObject.animations[0]).play()
        npc.update()
      }
    })

    
    //controls.update()
};
animate();

const relativePostion = function(firstModel, secondModel){
    return (Math.abs(Math.abs(firstModel.position.x) - Math.abs(secondModel.position.x)) < 5 &&
      Math.abs(Math.abs(firstModel.position.z) - Math.abs(secondModel.position.z)) < 5)
}




addEventListener('mousemove', (e) => {
  // 3js uses coordinates with the (0,0) being the center of the screen, 
  // as such you need to map everything out via the following math
  mouse.x = (e.clientX / innerWidth) * 2 - 1
  mouse.y = -(e.clientY / innerHeight) * 2 + 1
  isClue()
 
})


// phone popup

addEventListener('click', (e) => {
  if (phoneBoxDisplayed === false) {
    if (e.target === document.getElementById("phone")){
      phoneBoxDisplayed = true;
      phoneMenu.phoneMainMenu()
    }
  }
})

// phone menu options

addEventListener('click', (e) => {
  if (phoneBoxDisplayed === true) {
    if (e.target === document.getElementById("mapButton")) {
      phoneMenu.phoneMap(locations)
    }
  }
})

// phone menu hover change

addEventListener('mouseover', (e) => {
  if (phoneBoxDisplayed === true) {
    if (e.target === document.getElementById("Port")){
      document.getElementById("mapImage").src = 'src/assets/phone/Docks.png'
    } else if (e.target === document.getElementById("Haberdashery")){
      document.getElementById("mapImage").src = 'src/assets/phone/Haberdashery.png'
    } else if (e.target === document.getElementById("Station")){
      document.getElementById("mapImage").src = 'src/assets/phone/Subway.png'
    } else if (e.target === document.getElementById("mapImage") || e.target === document.getElementById("mapButtons")){
      document.getElementById("mapImage").src = 'src/assets/phone/map.png'
    }
  }
})



// player movement
addEventListener('click', () => {
  if (textBoxDisplayed === false && phoneBoxDisplayed === false) {
  const intersects = raycaster.intersectObjects(currentScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (intersects[0]["object"].name === "ground"){
    playerMovement = true
    targetX = (Math.round((selectedPoint.x * 10)) / 10)
    targetZ = (Math.round((selectedPoint.z * 10)) / 10)
    
    }}
  
  console.log(targetX, targetZ)
})

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
        archibald.foundClues.push(clue)
        currentScene.remove(intersects[0]["object"])

        //setTimeout()
        
      }


  }})

  }
})


// loading the walk, need to refactor
let playerMixer = undefined


addEventListener('click', () => {
  if (playerMovement === true) {
    if (playerMixer !== archibald.characterMixer)
    {
      playerMixer = archibald.characterMixer
      archibald.addAnimation('./src/assets/characters/animations/Walking.fbx')
    }
    if (archibald.characterObject.animations[1] !== undefined){
    archibald.characterMixer.clipAction(archibald.characterObject.animations[2]).play()
    }
  }
})

// npc dialogue box pop up
addEventListener('click', () => {
  
  if (textBoxDisplayed === false) {
  const intersects = raycaster.intersectObjects(currentScene.children)[0].object
  selectedLocation.npcArr.forEach((npc) => {
    if (npc.characterObject.name === intersects.parent.name || npc.characterObject.name === intersects.parent.parent.name){
      debugger
      if (relativePostion(intersects.parent, archibald.characterObject) || (relativePostion(intersects.parent.parent, archibald.characterObject))){
        textBoxDisplayed = true;
        npc.displayText(0)
      }
    }
  }
)}})
// phone menue close
addEventListener('click', (e) => {
  if (phoneBoxDisplayed === true) {

    // loop through the locations and make 
    locations.forEach((location) => {
      if (e.target === document.getElementById(location.scene.name)){
        phoneBoxDisplayed = false;
        document.getElementById("phoneOn").innerHTML = ''
        selectedLocation = location
        currentScene.remove(archibald.characterObject)
        currentScene = selectedLocation.scene
        currentScene.add(archibald.characterObject)
        currentScene.add(skybox)
        archibald.characterObject.position.copy(selectedLocation.startingPos)
        camera.position.copy(archibald.characterObject.position)
        camera.position.x += 10
        camera.position.y += 5
        camera.position.z += 0
      }
    })
  }
})

// if you click on a button get rid of the text box else progress through dialogue tree
addEventListener('click', (e) => {
  let buttons = document.getElementsByTagName("button"); 
  if(buttons.length > 0) {
    buttons = [...buttons]
    buttons.forEach((button) => {
      if (e.target == button) { 
        if (button.name === 'close') {
        document.getElementById('characterTextBox').innerHTML = ''
        textBoxDisplayed = false;
      } else if (button.name === "You did it! I'm calling the police!!!") {
        document.getElementById('characterTextBox').innerHTML = ''
        textBoxDisplayed = false
        selectedLocation = jailcell
        currentScene.remove(archibald.characterObject)
        currentScene = selectedLocation.scene
        currentScene.add(archibald.characterObject)
        currentScene.add(skybox)
        archibald.characterObject.position.copy(selectedLocation.startingPos)
        camera.position.copy(archibald.characterObject.position)
        camera.position.x += 10
        camera.position.y += 5
        camera.position.z += 0

        setTimeout(()=> {
          let textbox = document.getElementById("characterTextBox")
          let jailtextbox = document.createElement('ul')
          jailtextbox.innerText = "Sadly you didn't have enough clues and were arrested for being a nucense. Your business failed and like went on without you. Eventually even the memory of you faded as you rotted in your ineptitude"
          let playAgain = document.createElement('button')
          playAgain.id = 'playAgain'
          playAgain.innerText = 'Play again?'
          jailtextbox.appendChild(playAgain)
          textbox.appendChild(jailtextbox)
          textbox.opacity = 1
        }, 2000)
      } else if (button.id === 'playAgain'){
        //crude but effective
        location.reload()
      } else if (button.name === "It's over Gary. You're going to jail!") {
        let gary = selectedLocation.npcArr[1].characterObject
        selectedLocation = jailcell
        currentScene = selectedLocation.scene
        currentScene.add(gary)
        gary.position.copy(jailcell.startingPos)
        camera.position.copy(jailcell.startingPos)
        camera.position.x += 10
        camera.position.y += 5
        camera.position.z += 0
        camera.lookAt(jailcell.startingPos)
        document.getElementById('characterTextBox').innerHTML = ''
        setTimeout(()=> {
          let textbox = document.getElementById("characterTextBox")
          let jailtextbox = document.createElement('ul')
          jailtextbox.innerText = "And thus your business was saved! Gary was thrown in jail for being the absolute worst and everyone else was very, very happy!"
          let playAgain = document.createElement('button')
          playAgain.id = 'playAgain'
          playAgain.innerText = 'Play again?'
          jailtextbox.appendChild(playAgain)
          textbox.appendChild(jailtextbox)
          textbox.opacity = 1
        }, 2000)

      }
      else {
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

let hab = haberdashery
const garyTextBox = new Textbox('less than three clues', 'src/assets/emoji/smileyFace.png',"Bad luck having your window smashed. Looks like you'll be out of business unless you figure out who did it... IF you can figure out who did it",  ["You did it! I'm calling the police!!!",'close'] )
const garyTextBoxTwo = new Textbox('2 < x < 5', 'src/assets/emoji/smileyFace.png',"So you found a briefcase and some clothes, that proves nothing! I didn't do anything!",  ["You did it! I'm calling the police!!!", 'close'] )
const garyTextBoxThree = new Textbox('5', 'src/assets/emoji/smileyFace.png',"You found the tesseract AND the smoking gun?!",  ["It's over Gary. You're going to jail!"] )
// Gary dialogue tree switch up!
addEventListener('click', () => {
  if (selectedLocation === haberdashery) {
    if (archibald.foundClues.length < 3 && selectedLocation === hab) {
      hab.npcArr[1].messageArr = [garyTextBox]
    } else if (archibald.foundClues.length > 2 && archibald.foundClues.length < 5) {
      hab.npcArr[1].messageArr = [garyTextBoxTwo]
    } else if (archibald.foundClues.length === 5) {
      hab.npcArr[1].messageArr = [garyTextBoxThree]
    }
  }
})

