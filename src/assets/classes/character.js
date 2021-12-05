import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'

// character class
// model, name, animationmixer, animations
// might need a state class

// player class
// inherits from character class
// also has movement

class character {
    constructor(characterObjectPath, name) {
        this.loader = new FBXLoader();
        this.characterObject = undefined;
        loader.load(characterObjectPath, (char) => {
            char.name = name
            this.characterObject = char
        })
        this.characterMixer = new THREE.AnimationMixer(this.characterObject);
        
    }
}

character.prototype.addAnimation = function(clip) {
    this.characterMixer.clipAction(clip)
}

character.prototype.update = function() {
    this.characterMixer.update((.2))
}


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
    ///fbx.movement = false;
    scene.add(fbx)
    })
}

