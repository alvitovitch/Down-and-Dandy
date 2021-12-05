import * as THREE from 'three';
import { Location } from '../classes/Location';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// let's make a floor

const plane = new THREE.PlaneGeometry(100,100,10,10);
const material = new THREE.MeshBasicMaterial({ color: "green" })
const floor = new THREE.Mesh(plane, material);
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.name = "ground"
floor.layers.enable(1)

const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.AmbientLight(0x404040)
const pLight =  new THREE.DirectionalLight( 0xffffff, 1)

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];

const clueArr = []
const npcArr = []

// make a test City
const testCity = new Location(floor, buildingArr, lightArr, propArr, clueArr, npcArr)
// add a tree to the propArr
const loader = new GLTFLoader();
    loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.01, .01, .01)
    tree.position.y = 15
    tree.traverse(c => {
        c.castShadow = true
    })
    tree.children[0].layers.enable(1)
    testCity.scene.add(tree)
    propArr.push(tree)

    
      
})




export const city = testCity
