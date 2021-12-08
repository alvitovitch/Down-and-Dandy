import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// let's make a floor

const plane = new THREE.PlaneGeometry(10,10,10,10);
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const floor = new THREE.Mesh(plane, material);
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.name = "ground"
floor.position.x = -15
floor.layers.enable(1)



const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1)
const pLight =  new THREE.DirectionalLight( 0xffffff, 1)

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

const eve = new NPC('/src/assets/characters/eve.fbx', 'Eve', [10, 10, 0], [0,0,0], eveTextboxArr)
npcArr.push(eve)

// make a test City


// add a tree to the propArr
const loader = new FBXLoader();
loader.load('src/assets/3dAssets/port.fbx', (fbx) => {
    fbx.scale.set(0.01, 0.01, 0.01)
    propArr.push(fbx)
    port.scene.add(fbx)
    fbx.layers.enable(1)
})




const port = new Location('Port', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [-15, 0, -4])
export {port}
