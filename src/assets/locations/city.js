import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// let's make a floor

const plane = new THREE.PlaneGeometry(50,25,10,10);
const material = new THREE.MeshBasicMaterial({ color: "green" })
const floor = new THREE.Mesh(plane, material);
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.name = "ground"
floor.visible = false
floor.layers.enable(1)



const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, .7)
const pLight =  new THREE.DirectionalLight( 0xffffff, .5)

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];
// let's make a street

const clueArr = []

// test clue

const cube = new THREE.BoxGeometry(1,1,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const clue = new THREE.Mesh(cube, cubeSkin);

clue.position.x = 5
clue.position.z = 5
clue.name = "testClue"
clue.layers.enable(1)
const testClue = new Clue(clue, ['The white box. The simplest and most important of clues!'])
clueArr.push(testClue)


const npcArr = []
// make eve's textbox
const eveTextboxArr = []
const eveTextboxOne = new Textbox('hello there', 'src/assets/emoji/smileyFace.png','Hello There! My name is Eve!',  ['Hi Eve, nice to meet you! My name is Archibald', 'shutup bitch!', 'close'] )
const eveTextboxTwo = new Textbox('Hi Eve, nice to meet you! My name is Archibald', 'src/assets/emoji/smileyFace.png','It is wonderful to meet you Archibald!',  ['close'] )
const eveTextboxThree = new Textbox('shutup bitch!', 'src/assets/emoji/angryFace.png','How rude! You are a fucking creep!!!',  ['close'] )
eveTextboxArr.push(eveTextboxOne)
eveTextboxArr.push(eveTextboxTwo)
eveTextboxArr.push(eveTextboxThree)

const eve = new NPC('/src/assets/characters/eve.fbx', 'Eve', [10, 0, 0], [0,0,0], eveTextboxArr)
npcArr.push(eve)

// make a test City

const haberdashery = new Location('Haberdashery', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [18.5,0,0])

// add a tree to the propArr
const loader = new GLTFLoader();
const buildingLoader = new FBXLoader()

// buildingLoader.load('src/assets/3dAssets/road_straight/source/0a4a98ec7e604ea2b22bb82e66d926dc.fbx', (gltf) => {
//   const building = gltf;
//   building.name = "street"
//   building.scale.set(.2,.2,.2)
//   building.position.y = 1
//   building.position.x = 10
//   building.position.z = -15
//   buildingArr.push(building)
//   haberdashery.scene.add(building)
// })

loader.load("src/assets/3dAssets/haberdasheryStreet.glb", function(glb){
  const building = glb.scene
  building.rotateY(Math.PI/2)
  building.castShadow = false;
  building.receiveShadow = true;
  building.position.x = -5;
  building.position.z = 6;
  building.position.y = -.5
  building.scale.set(3,3,3)
  haberdashery.propsArr.push(building)
  haberdashery.scene.add(building)
})

loader.load('src/assets/3dAssets/stairs/stairs.gltf', (gltf) =>{
  const building = gltf.scene;
  building.scale.set(20,20,40)
  building.position.y = 20
  building.position.z = -10.8
  building.position.x = -17
  building.rotation.y = Math.PI / 2
  buildingArr.push(building)
  haberdashery.scene.add(building)
})




loader.load('src/assets/3dAssets/stairs/stairs.gltf', (gltf) =>{
  const building = gltf.scene;
  building.scale.set(20,20,25)
  building.position.y = 20
  building.position.z = -11
  building.position.x = 21
  building.rotation.y = Math.PI / 2
  buildingArr.push(building)
  haberdashery.scene.add(building)
})


export {haberdashery}
