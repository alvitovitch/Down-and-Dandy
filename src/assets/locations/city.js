import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { dandyBox } from './skybox';
// let's make a floor

const plane = new THREE.PlaneGeometry(40,15,10,10);
const material = new THREE.MeshBasicMaterial({ color: "green" })
const floor = new THREE.Mesh(plane, material);
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.name = "ground"
floor.position.x = 5
floor.position.z = 0.5
floor.visible = false
floor.layers.enable(1)



const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 2)
const pLight =  new THREE.DirectionalLight( 0xffffff, .5)
pLight.position.set(10,10,10)
pLight.target.position.set(0,0,0)

lightArr.push(ambLight)
//lightArr.push(pLight)

// making a propArr
const propArr = [];

// let's add a skybox
propArr.push(dandyBox)


const clueArr = []

// test clue

const cube = new THREE.CylinderGeometry(1,1,.2,25)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const blood = new THREE.Mesh(cube, cubeSkin);
blood.material.color = new THREE.Color('red')

blood.position.x = 6
blood.position.y = .5
blood.position.z = 10
blood.name = "blood"
blood.layers.enable(1)
const testClue = new Clue(blood, ['A puddle of blood! Inside of it you find a shipping reciept! You might want to check out the port'])
clueArr.push(testClue)


const npcArr = []
// make eve's textbox
const eveTextboxArr = []
const eveTextboxOne = new Textbox('hello there', 'src/assets/emoji/eve/smiling-cop.png','Aight! Keep it moving!! Nothing to see here!',  ['What happened officer?'] )
const eveTextboxTwo = new Textbox('What happened officer?', 'src/assets/emoji/eve/smiling-cop.png',"Some hooligan busted up a shop window! He fled the scene but I'm keep watch incase he comes back!",  ['A hooligan you say?'] )
const eveTextboxThree = new Textbox('A hooligan you say?', 'src/assets/emoji/eve/smiling-cop.png',"He came down this way, but it looks like he's long gone. We're waiting for forensics to come sweep for clues!",  ['close'] )
eveTextboxArr.push(eveTextboxOne)
eveTextboxArr.push(eveTextboxTwo)
eveTextboxArr.push(eveTextboxThree)

const eve = new NPC('src/assets/characters/eve.fbx', 'Eve', [-15, 0, 7], [-15, 0, 7], eveTextboxArr)
npcArr.push(eve)
const gary = new NPC('src/assets/3dAssets/Orc Idle.fbx', 'Gary', [0, 0, 10], [0, 0, 10], eveTextboxArr)
npcArr.push(gary)

// make a test City

const haberdashery = new Location('Haberdashery', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [18.5,0,0])

dandyBox.name = "dandyBox"
haberdashery.scene.add(dandyBox)
// add a tree to the propArr
const loader = new GLTFLoader();
const buildingLoader = new FBXLoader()


loader.load("src/assets/3dAssets/haberdasheryStreet2.glb", function(glb){
  const building = glb.scene
  building.rotateY(Math.PI/2)
  building.castShadow = false;
  building.receiveShadow = true;
  building.position.x = -5;
  building.position.z = 6;
  building.position.y = -.5
  building.scale.set(3,3,3)
  //building.visible = false
  building.children[0].layers.enable(1)
  haberdashery.propsArr.push(building)
  haberdashery.scene.add(building)
})

// building the backdrop

loader.load('src/assets/3dAssets/cityBackdrop.glb', (gltf) =>{
  const building = gltf.scene;
  building.scale.set(100,100,100)
  building.position.y = 8
  building.position.z = 0
  building.position.x = -100
  //building.rotation.y = Math.PI / 2
  buildingArr.push(building)
  haberdashery.scene.add(building)
})
loader.load('src/assets/3dAssets/pinkCityBackdrop.glb', (gltf) =>{
  const building = gltf.scene;
  building.scale.set(100,120,100)
  building.position.y = 10
  building.position.z = 15
  building.position.x = -105
  building.receiveShadow = false
  //building.rotation.y = Math.PI / 2
  buildingArr.push(building)
  haberdashery.scene.add(building)
})


loader.load("src/assets/3dAssets/tree_low-poly/scene.gltf", function(gltf) {
  const tree = gltf.scene;
  tree.scale.set(.005, .005, .005)
  tree.position.y = 0
  tree.position.z = 8
  tree.position.x = 25
  // tree.traverse(c => {
  //     c.castShadow = true
  // })
  tree.children[0].layers.enable(1)
  haberdashery.propsArr.push(tree)
  haberdashery.scene.add(tree)
  
    
})
loader.load("src/assets/3dAssets/tree_low-poly/scene.gltf", function(gltf) {
  const tree = gltf.scene;
  tree.scale.set(.005, .005, .005)
  tree.position.y = 0
  tree.position.z = 8
  tree.position.x = -20
  // tree.traverse(c => {
  //     c.castShadow = true
  // })
  tree.children[0].layers.enable(1)
  haberdashery.propsArr.push(tree)
  haberdashery.scene.add(tree)
  
    
})
loader.load("src/assets/3dAssets/tree_low-poly/scene.gltf", function(gltf) {
  const tree = gltf.scene;
  tree.scale.set(.005, .005, .005)
  tree.position.y = 0
  tree.position.z = -8
  tree.position.x = -20
  // tree.traverse(c => {
  //     c.castShadow = true
  // })
  tree.children[0].layers.enable(1)
  haberdashery.propsArr.push(tree)
  haberdashery.scene.add(tree)
  
    
})
loader.load("src/assets/3dAssets/tree_low-poly/scene.gltf", function(gltf) {
  const tree = gltf.scene;
  tree.scale.set(.005, .005, .005)
  tree.position.y = 0
  tree.position.z = -8
  tree.position.x = 25
  tree.traverse(c => {
      c.castShadow = true
  })
  tree.children[0].layers.enable(1)
  haberdashery.propsArr.push(tree)
  haberdashery.scene.add(tree)
  
    
})
// loader.load("src/assets/3dAssets/angers_shop_2_france/scene.gltf", function(gltf) {
//   const tree = gltf.scene;
//   tree.scale.set(1.5, 1.5, 1.5)
//   tree.rotation.y = -Math.PI
//   tree.position.y = 0
//   tree.position.z = 23.8
//   tree.position.x = 23
//   tree.traverse(c => {
//       c.castShadow = true
//   })
//   tree.children[0].layers.enable(1)
//   haberdashery.propsArr.push(tree)
//   haberdashery.scene.add(tree)
  
    
// })
loader.load("src/assets/3dAssets/police_car_-_low_poly (1)/scene.gltf", function(gltf) {
  const policeCar = gltf.scene;
  policeCar.scale.set(2, 2, 2)
  policeCar.rotation.y = -Math.PI/2
  policeCar.position.y = 0
  policeCar.position.z = 0
  policeCar.position.x = -18
  policeCar.traverse(c => {
      c.castShadow = true
  })
  policeCar.children[0].layers.enable(1)
  haberdashery.propsArr.push(policeCar)
  haberdashery.scene.add(policeCar)
  
    
})


export {haberdashery}
