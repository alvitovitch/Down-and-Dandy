import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// let's make a floor

const loader = new GLTFLoader();
const plane = new THREE.PlaneGeometry(10,25,10,10);
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const floor = new THREE.Mesh(plane, material);
floor.position.z = -8
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
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x34568b, .7)
const pLight =  new THREE.DirectionalLight( 0xffffbb, .7)
pLight.position.set(10,10,10)
pLight.target.position.set(0,0,0)
lightArr

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];
// let's make a street


const clueArr = []

// test clue

const cube = new THREE.BoxGeometry(1.5,.3,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const clue = new THREE.Mesh(cube, cubeSkin);
clue.material.color = new THREE.Color('black')

clue.position.x = -14
clue.position.z = 5
clue.name = "testClue"
clue.layers.enable(1)
const testClue = new Clue(clue, ['The white box. The simplest and most important of clues!'])
clueArr.push(testClue)

loader.load('src/assets/3dAssets/briefcase/scene.gltf', (gltf) => {
    const briefcase = gltf.scene
    briefcase.rotation.y = Math.PI/2
    briefcase.position.x = -14
    briefcase.position.y = 0
    briefcase.position.z = -7
    briefcase.scale.set(.5, .5, .5)
    briefcase.layers.enable(1)
    briefcase.traverse(c => {
        c.castShadow = true
        c.receiveShadow = true
    })
    const briefClue = new Clue(briefcase, ['A briefcase full of cash?! AND TAX DOCUMENTS?!'])
    propArr.push(briefClue)
    port.scene.add(briefcase)
})




const npcArr = []
// make eve's textbox
const eveTextboxArr = []
const eveTextboxOne = new Textbox('hello there', 'src/assets/emoji/smileyFace.png','Hello There! My name is Eve!',  ['Hi Eve, nice to meet you! My name is Archibald', 'shutup bitch!', 'close'] )
const eveTextboxTwo = new Textbox('Hi Eve, nice to meet you! My name is Archibald', 'src/assets/emoji/smileyFace.png','It is wonderful to meet you Archibald!',  ['close'] )
const eveTextboxThree = new Textbox('shutup bitch!', 'src/assets/emoji/angryFace.png','How rude! You are a fucking creep!!!',  ['close'] )
eveTextboxArr.push(eveTextboxOne)
eveTextboxArr.push(eveTextboxTwo)
eveTextboxArr.push(eveTextboxThree)

const eve = new NPC('/src/assets/characters/eve.fbx', 'Eve', [5, 0, 5], [5, 0, 5], eveTextboxArr)
npcArr.push(eve)

// make a test City


// add a tree to the propArr
loader.load('src/assets/3dAssets/low_poly_cargo_ship/scene.gltf', (gltf) => {
    const ship = gltf.scene
    ship.rotation.y = Math.PI/2
    ship.position.x = -10
    ship.position.y = 10
    ship.position.z = -40
    ship.scale.set(0.03, 0.03, 0.03)
    ship.layers.enable(1)
    ship.traverse(c => {
        c.castShadow = true
        c.receiveShadow = true
    })
    propArr.push(ship)
    port.scene.add(ship)
})

const Floader = new FBXLoader();
Floader.load('src/assets/3dAssets/port.fbx', (fbx) => {
    fbx.scale.set(0.01, 0.01, 0.01)
    propArr.push(fbx)
    port.scene.add(fbx)
    fbx.layers.enable(1)
})



const port = new Location('Port', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [-15, 0, -4])
export {port}
