import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { skybox } from './skybox';
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

// briefcase clue

const cube = new THREE.BoxGeometry(1.5,.3,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const clue = new THREE.Mesh(cube, cubeSkin);
clue.material.color = new THREE.Color('black')

clue.position.x = -22
clue.position.z = -15
clue.rotation.y = Math.PI/2
clue.name = "briefcase"
clue.layers.enable(1)
const testClue = new Clue(clue, ['A briefcase full of cash?! AND TAX DOCUMENTS?!'])
clueArr.push(testClue)

// boxofimported clothes clue

const box = new THREE.BoxGeometry(1.5,1.5,1.5)
const boxSkin = new THREE.MeshPhysicalMaterial()
const boxClue = new THREE.Mesh(box, boxSkin);
boxClue.material.color = new THREE.Color('brown')

boxClue.position.x = -10
boxClue.position.z = -20
boxClue.rotation.y = Math.PI/2
boxClue.name = "fakeChannel"
boxClue.layers.enable(1)
const theBoxClue = new Clue(boxClue, ['A box full of counterfit Channel. It feels like polyester'])
clueArr.push(theBoxClue)




const npcArr = []
// make eve's textbox
const dockWorkerText = []
const dockworkerTextOne = new Textbox('Shiver me timbers!!!', 'src/assets/emoji/smileyFace.png','It be a hard night on the ocean! The waves are BEASTS!',  ['Hi Eve, nice to meet you! My name is Archibald', 'shutup bitch!', 'close'] )
const dockWorkerTextTwo = new Textbox('Hi Eve, nice to meet you! My name is Archibald', 'src/assets/emoji/smileyFace.png','It is wonderful to meet you Archibald!',  ['close'] )
const dockWorkerTextThree = new Textbox('shutup bitch!', 'src/assets/emoji/angryFace.png','How rude! You are a fucking creep!!!',  ['close'] )
dockWorkerText.push(dockworkerTextOne)
dockWorkerText.push(dockWorkerTextTwo)
dockWorkerText.push(dockWorkerTextThree)

const dockWorker = new NPC('/src/assets/characters/eve.fbx', 'Eve', [-15, 0, -4], [-15, 0, -4], dockWorkerText)
npcArr.push(dockWorker)

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

skybox.name = "skybox"
const portbox = skybox
port.scene.add(portbox)
export {port}
