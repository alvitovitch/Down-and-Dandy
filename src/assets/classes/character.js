import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'

// character class
// model, name, animationmixer, animations
// might need a state class

// player class
// inherits from character class
// also has movement

class Character {
    constructor(characterObjectPath, name) {
        this.loader = new FBXLoader();
        this.characterObjectPath = characterObjectPath
        this.name = name
        this.characterMixer = new THREE.AnimationMixer(this.characterObject);
        
    }
}

Character.prototype.addModel = function(scene, size, animations) {
    this.loader.load(this.characterObjectPath, (char) => {
        char.name = this.name
        char.scale.setScalar(size)
        this.characterObject = char
        const mixer = this.characterMixer
        scene.add(char)
        animations.forEach((animation) =>{
            debugger
            this.loader.load(animation, (animate) => {
                debugger
                const walk = mixer.clipAction(animate.animations[0])
                debugger
                //const walk = this.characterMixer(player.animations[0])
                walk.play()
            })
        })
        
    }, undefined, function(error) {
        console.log('error')
        console.error(error)
    })}

Character.prototype.addAnimation = function(clipPath) {
    const model = this.characterObject
    debugger
    this.loader.load(clipPath, (animate) => {
        debugger
        model.animations.push(animate.animations[0])
        debugger
    })
    //this.characterMixer.clipAction(clip)
}

Character.prototype.update = function() {
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

//arhcibald = new Character('src/assets/characters/malcolm.fbx', 'Archibald')

export {Character} 