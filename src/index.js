import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(255,255,255)

//loader
const loader = new GLTFLoader();

//loading tree
loader.load("./src/Assets/tree/scene.glb", function(gltf) {
    const tree = gltf.scene;
    scene.add(tree.children[0]);
    }, undefined,
    function(error){
        console.log("An error occured")
})

// light
const light = new THREE.AmbientLight(255,255,255);
scene.add(light)

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 5, 5, 5 );
//camera.lookAt( 0, 0, 0 );

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

console.log(scene)
console.log(camera)
console.log(light)
console.log(renderer)

// cube

const box = new THREE.BoxGeometry(1,1,1)
const material = new THREE.
    MeshBasicMaterial({ color: (255,0,0)})

const cube = new THREE.Mesh(box, material)
const cube2 = new THREE.Mesh(box, material)
cube2.position
scene.add(cube)
scene.add(cube2)

const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += .01
    cube2.rotation.y -=.01
    renderer.render(scene, camera)
};
animate();