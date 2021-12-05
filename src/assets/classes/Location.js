import * as THREE from 'three';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
/// what does a location have
// class location
// has npcs, clues, buildings/props, floor, player 

class Location {
    constructor(floor, buildingsArr, lightArr, propsArr,  clueArr, npcArr){
        this.scene = new THREE.Scene()
        this.floor = floor;
        this.lights = lightArr// kinda grey light
        this.buildingsArr = buildingsArr;
        this.propsArr = propsArr;
        this.clueArr = clueArr;
        this.npcArr = npcArr;

        this.scene.add(this.floor)

        // add lights
        this.lights.forEach((light) => {
            this.scene.add(light)
        })

        // add buildings
        this.buildingsArr.forEach((building) => {
            this.scene.add(building)
        })

        // add props
        this.propsArr.forEach((prop) => {
            this.scene.add(prop)
        })
        
        // add clue
        this.clueArr.forEach((clue) => {
            this.scene.add(clue.clueObject)
        })

        // add npc
        this.npcArr.forEach((npc) => {
            this.scene.add(npc.characterObject)
        })
    }
}

// // scene
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(255,255,255)

// // light
// const light = new THREE.AmbientLight(0x404040);
// scene.add(light)

// const dirLight = new THREE.DirectionalLight( 0xffffff, 1);
// scene.add(dirLight);


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

// scene.name = "test"
// scene.clues = ['testClue']
// export const testScene = scene;
export { Location }