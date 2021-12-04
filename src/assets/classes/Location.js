import * as THREE from 'three';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
/// what does a location have

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(255,255,255)

// light
const light = new THREE.AmbientLight(0x404040);
scene.add(light)

const dirLight = new THREE.DirectionalLight( 0xffffff, 1);
scene.add(dirLight);


// // ground

// const plane = new THREE.PlaneGeometry(100,100,10,10);
// const material = new THREE.MeshBasicMaterial({ color: (0x404040)});


// const ground = new THREE.Mesh(plane, material)
// ground.castShadow = false;
// ground.receiveShadow = true;
// ground.rotation.x =-Math.PI/2;
// scene.add(ground)

// //loader
// const loader = new GLTFLoader();

// // //loading tree
// loader.load("./src/assets/tree/scene.gltf", function(gltf) {
//     const tree = gltf.scene;
//     tree.scale.set(.01, .01, .01)
//     tree.position.y = 15
//     scene.add(tree)
// })
// loader.load("./src/assets/low_poly_city/scene.gltf", function(gltf) {
//     const city = gltf.scene;
//     // city.position.y = 15
//     // city.position.x = 15
//     scene.add(city)
// })


export const testScene = scene;