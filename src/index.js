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
renderer.gammaOutput = true;


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
camera.position.x += 15
camera.position.y += 10
camera.lookAt( selectedLocation.startingPos);

const archibald = new Player('./src/assets/characters/malcolm.fbx', 'Archibald', selectedLocation.startingPos)
// load player
archibald.addModel(currentScene, .015)

// if {
//   archibald.loader.load('src/assets/characters/animations/Walking.fbx',(ani) =>{
//     archibald.addAnimation(ani)
//   })}

// player movement
let targetX = undefined;
let targetY = undefined;
let targetZ = undefined;

let playerMovement = false;

function characterMovement(char, camera) {
  if (char !== undefined) {
    char.characterMixer.clipAction(char.characterObject.animations[2])
    let targetPos = new THREE.Vector3(targetX, targetY, targetZ)
    char.characterObject.position.x = Math.round(char.characterObject.position.x * 10)/10 
    char.characterObject.position.z = Math.round(char.characterObject.position.z * 10)/10 
    char.characterObject.lookAt(targetPos)

    if( Math.abs(targetX - char.characterObject.position.x) < 0.2 && Math.abs(targetZ - char.characterObject.position.z) < 0.2 ) {
      playerMovement = false
      char.characterMixer.clipAction(char.characterObject.animations[2]).stop()

    }

    if (targetX > char.characterObject.position.x) {
      char.characterObject.position.x += 0.1
      camera.position.x += 0.1

      //char.characterObject.quaternion.y += 1
    }
    if (targetX < char.characterObject.position.x) {
      char.characterObject.position.x -= 0.1
      camera.position.x -= 0.1
      //char.characterObject.qiaternion.y -= 1


    }
    if (targetZ > char.characterObject.position.z) {
      char.characterObject.position.z += 0.1
      camera.position.z += 0.1
      //char.characterObject.qiaternion.x += 1


    }
    if (targetZ < char.characterObject.position.z) {
      char.characterObject.position.z -= 0.1
      camera.position.z -= 0.1

      //char.characterObject.qiaternion.x -= 1

    }
  }
  if (char.characterObject.position.x === targetX && char.characterObject.position.z === targetZ) {
    playerMovement = false
    char.characterMixer.clipAction(char.characterObject.animations[2]).stop()


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
    const player = archibald
    if (player !== undefined && playerMovement === true){
      //walk = archibald.characterMixer.clipAction(archibald.characterObject.animations[0])
      characterMovement(player, camera);
      archibald.update()
    } else if (player.characterObject.type === 'Group' && playerMovement === false && player.characterObject.animations[1] !== undefined) {
      player.characterMixer.clipAction(player.characterObject.animations[1]).play()
      archibald.update()
    } else if (player.characterObject.length > 0) {
      camera.lookAt(player.characterObject.position)
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
      document.getElementById('phoneOn').style.display = 'flex'
      phoneMenu.phoneMainMenu()
    }
  }
})

// phone menu options

addEventListener('click', (e) => {
  if (phoneBoxDisplayed === true) {
    if (e.target === document.getElementById("mapButton")) {
      phoneMenu.phoneMap(locations)
    } else if (e.target === document.getElementById('phoneOn'))
 {
   phoneBoxDisplayed = false
   phoneMenu.closePhone()
   document.getElementById('phoneOn').style.display = 'none'
 }  }
})

// phone menu hover change

addEventListener('mouseover', (e) => {
  if (phoneBoxDisplayed === true) {
    if (e.target === document.getElementById("Port")){
      document.getElementById("mapImage").style.backgroundImage = "url(../src/assets/phone/Docks.png)"
    } else if (e.target === document.getElementById("Haberdashery")){
      document.getElementById("mapImage").style.backgroundImage = "url(../src/assets/phone/Haberdashery.png)"
    } else if (e.target === document.getElementById("Station")){
      document.getElementById("mapImage").style.backgroundImage = "url(../src/assets/phone/Subway.png)"
    } else if (e.target === document.getElementById("mapImage") || e.target === document.getElementById("mapButtons")){
      document.getElementById("mapImage").style.backgroundImage = "url(../src/assets/phone/map.png)"
    }
  }
})


//crosshairs on clickable terrain



// player movement
addEventListener('click', () => {
  if (textBoxDisplayed === false && phoneBoxDisplayed === false && raycaster.intersectObjects(currentScene.children)[0] !== undefined) {
  const intersects = raycaster.intersectObjects(currentScene.children)
  //find the player model
  const selectedPoint = intersects[ 0 ].point
  if (intersects[0]["object"].name === "ground"){
    playerMovement = true
    targetX = (Math.round((selectedPoint.x * 10)) / 10)
    targetY = (Math.round((selectedPoint.y * 10)) / 10)
    targetZ = (Math.round((selectedPoint.z * 10)) / 10)
    
    }}
})

// clicking a clue
addEventListener('click', () => {
  if (textBoxDisplayed === false && raycaster.intersectObjects(currentScene.children)[0] !== undefined) {
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
    // if (playerMixer !== archibald.characterMixer)
    // {
    //   playerMixer = archibald.characterMixer
    //   archibald.addAnimation('./src/assets/characters/animations/Walking.fbx')
    // }
    
    if (archibald.characterObject.animations[1] !== undefined){
    archibald.characterMixer.clipAction(archibald.characterObject.animations[2]).play()
    }
  }
})

// npc dialogue box pop up
addEventListener('click', () => {
  
  if (textBoxDisplayed === false && raycaster.intersectObjects(currentScene.children)[0] !== undefined) {
  const intersects = raycaster.intersectObjects(currentScene.children)[0].object
  selectedLocation.npcArr.forEach((npc) => {
    if (npc.characterObject.name === intersects.parent.name || (intersects.parent.parent !== null && npc.characterObject.name === intersects.parent.parent.name)){
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
    if (e.target === document.getElementById('Port')) {
      document.getElementById('loading-background').style.opacity = 1;
      document.getElementById('loading-background').style.display = 'flex';
    }
    // loop through the locations and make 
    locations.forEach((location) => {
      if (e.target === document.getElementById(location.scene.name)){
        document.getElementById('loading-background').style.opacity = 1;
        document.getElementById('loading-background').style.display = 'flex';
        setTimeout( () => {
          document.getElementById('loading-background').style.opacity = 0;
        }, 3000)
        setTimeout( () => {
          document.getElementById('loading-background').style.display = 'none';}
          , 6000)
        phoneBoxDisplayed = false;
        document.getElementById("phoneOn").innerHTML = ''
        selectedLocation = location
        currentScene.remove(archibald.characterObject)
        currentScene = selectedLocation.scene
        currentScene.add(archibald.characterObject)
        if (currentScene.name !== 'Station'){
          currentScene.add(skybox)
        }
        archibald.characterObject.position.copy(selectedLocation.startingPos)
        camera.position.copy(archibald.characterObject.position)
        camera.position.x += 10
        camera.position.y += 5
        camera.position.z += 0
        if (location.scene.name === 'Haberdashery') {
          camera.position.copy(selectedLocation.startingPos);
          camera.position.x += 15
          camera.position.y += 10
          camera.lookAt( selectedLocation.startingPos)
        }
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
          jailtextbox.id = 'jail-box'
          jailtextbox.innerText = "Sadly you didn't have enough clues and were arrested for being a nuisance. Your business failed and life went on without you. Eventually even the memory of you faded as you rotted in your ineptitude."
          let playAgain = document.createElement('button')
          playAgain.id = 'playAgain'
          playAgain.innerText = 'Play again?'
          let jailtextdiv = document.createElement('div')
          jailtextdiv.appendChild(playAgain)
          jailtextbox.appendChild(jailtextdiv)
          textbox.appendChild(jailtextbox)
          textbox.opacity = 1
        }, 1000)
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
          jailtextbox.id = 'jail-box'
          jailtextbox.innerText = "And thus your business was saved! Gary was thrown in jail for being the absolute worst and everyone else was very, very happy!"
          let playAgainLi = document.createElement('li')
          let playAgain = document.createElement('button')
          playAgain.id = 'playAgain'
          playAgain.innerText = 'Play again?'
          playAgain.appendChild(playAgainLi)
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
const garyTextBox = new Textbox('less than three clues', 'src/assets/emoji/gary/mr-big-boss.svg',"Bad luck having your window smashed. Looks like you'll be out of business unless you figure out who did it... IF you can figure out who did it",  ["You did it! I'm calling the police!!!",'close'] )
const garyTextBoxTwo = new Textbox('2 < x < 5', 'src/assets/emoji/gary/mr-big-boss.svg',"So you found a briefcase and some clothes, that proves nothing! I didn't do anything!",  ["You did it! I'm calling the police!!!", 'close'] )
const garyTextBoxThree = new Textbox('5', 'src/assets/emoji/gary/mr-big-boss.svg',"Waaa?! You found all my evidence?!!! Impossible!!!",  ["It's over Gary. You're going to jail!"] )
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

setTimeout( () => {
  document.getElementById('loading-background').style.opacity = 0;
}, 7000)
setTimeout( () => {
  document.getElementById('loading-background').style.display = 'none';}
  , 10000)