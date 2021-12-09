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
const plane = new THREE.PlaneGeometry(8,25,10,10);
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const floor = new THREE.Mesh(plane, material);
floor.position.z = 0
floor.position.x = 0
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.visible = true
floor.name = "ground"
floor.layers.enable(1)



const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x34568b, .7)
const pLight =  new THREE.DirectionalLight( 0xffffbb, .5)
pLight.position.set(-10,8,-0)
pLight.target.position.set(0,0,0)
lightArr

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];
// let's make a street


const clueArr = []

// briefcase clue


// boxofimported clothes clue




const npcArr = []

// add a tree to the propArr
loader.load('src/assets/3dAssets/jail_cell/scene.gltf', (gltf) => {
    const jail = gltf.scene
    jail.rotation.y = Math.PI/2
    jail.position.x = -10
    jail.position.y = 10
    jail.position.z = -40
    //jail.scale.set(0.03, 0.03, 0.03)
    jail.layers.enable(1)
    jail.traverse(c => {
        c.castShadow = true
        c.receiveShadow = true
        //c.emissive = new THREE.Color("blue")
    })
    propArr.push(jail)
    jailcell.scene.add(jail)
})




const jailcell = new Location('Jail', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [0, 0, 0])

export {jailcell}
