import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"


// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(255,0,0)

//loader
const loader = new GLTFLoader();

// loading tree
loader.load("./src/Assets/tree/scene.gltf", function(gltf) {
    const tree = gltf.scene;
    console.log(tree)
    tree.scale.set(0.5, 0.5, 0.5)
    scene.add(tree)
}, undefined,
function(error){
    console.log("An error occured")
})

// light
const light = new THREE.AmbientLight(0x404040);
scene.add(light)

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize( 1200, 900);
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 100, 100, 100 );
camera.lookAt( 0, 0, 0 );


var controls = new OrbitControls(camera, renderer.domElement)





const animate = function () {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera)
};
animate();