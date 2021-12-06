import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
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
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1)
const pLight =  new THREE.DirectionalLight( 0xffffff, 1)

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];
// let's make a street

const streetPlane = new THREE.PlaneGeometry(100, 20, 10, 10);
const streetMaterial = new THREE.MeshBasicMaterial({ color: "grey"})
const street = new THREE.Mesh(streetPlane, streetMaterial)
street.castShadow = false;
street.receiveShadow = true;
street.rotation.x =-Math.PI/2;
street.name = "street"
street.position.y = 0.01

propArr.push(street)

const clueArr = []

// test clue

const cube = new THREE.BoxGeometry(1,1,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const clue = new THREE.Mesh(cube, cubeSkin);

clue.position.x = 5
clue.position.z = 5
clue.name = "testClue"
clue.layers.enable(1)
const testClue = new Clue(clue, ['this is a clue'])
clueArr.push(testClue)


const npcArr = []

// make a test City

const testCity = new Location(floor, buildingArr, lightArr, propArr, clueArr, npcArr)

// add a tree to the propArr
const loader = new GLTFLoader();
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.01, .01, .01)
    tree.position.y = 15
    tree.position.z = 20
    tree.traverse(c => {
        c.castShadow = true
    })
    tree.children[0].layers.enable(1)
    testCity.clueArr.push(tree)
    testCity.scene.add(tree)
    
      
})
loader.load("./src/assets/3dAssets/road.glb", function(glb){
  const road = glb.scene
  road.rotateY(Math.PI/2)
  road.castShadow = false;
  road.receiveShadow = true;
  road.scale.set(5,1,8)
  testCity.propsArr.push(road)
  testCity.scene.add(road)
})
loader.load("./src/assets/3dAssets/testBuilding.glb", function(glb){
  const building = glb.scene
  //building.rotateY(Math.PI/2)
  building.castShadow = false;
  building.receiveShadow = true;
  building.position.x = -40;
  ///building.scale.set(5,1,8)
  testCity.propsArr.push(building)
  testCity.scene.add(building)
})
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.007, .007, .007)
    tree.position.y = 10
    tree.position.z = -15
    tree.traverse(c => {
        c.castShadow = true
    })
    tree.children[0].layers.enable(1)
    testCity.clueArr.push(tree)
    testCity.scene.add(tree)
    
      
})
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.01, .01, .01)
    tree.position.y = 15
    tree.position.z = 20
    tree.position.x = 30
    tree.traverse(c => {
        c.castShadow = true
    })
    tree.children[0].layers.enable(1)
    testCity.clueArr.push(tree)
    testCity.scene.add(tree)
    
      
})
loader.load("./src/assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    tree.scale.set(.007, .007, .007)
    tree.position.y = 10
    tree.position.z = -15
    tree.position.z = -20
    tree.traverse(c => {
        c.castShadow = true
    })
    tree.children[0].layers.enable(1)
    testCity.clueArr.push(tree)
    testCity.scene.add(tree)
    
      
})




export {testCity}
