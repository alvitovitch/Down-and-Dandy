import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'

export function loadCharacter(scene) {
    const loader = new FBXLoader();
    loader.load('src/assets/characters/malcolm.fbx', (fbx) => {
        fbx.scale.setScalar(0.01);
        fbx.traverse(c => {
            c.castShadow = true
        })
    
    const animation = new FBXLoader();
    animation.load('src/assets/characters/animations/Walking.fbx', (animate) => {
        const mixer = new THREE.AnimationMixer(fbx);
        const walk = mixer.clipAction(animate.animations[0])
        fbx.animations.push(mixer)
        walk.play();
    })
    fbx.name = "Archibald"
    scene.add(fbx)
    })
}

