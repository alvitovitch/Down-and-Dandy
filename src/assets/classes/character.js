import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        this.characterObject = []
        this.characterMixer = undefined
        // this.loader.load(this.characterObjectPath, (char) => {
        //     debugger
        //     char.name = this.name
        //     char.scale
        //     this.characterMixer = new THREE.AnimationMixer(char)
        //     this.characterObject.push(char)
        // })

        
        //this.characterMixer = new THREE.AnimationMixer(this.characterObject);
        //debugger
        
    }
}

Character.prototype.addModel = function(scene, size) {
    this.loader.load(this.characterObjectPath, (char) => {
        char.name = this.name
        char.scale.setScalar(size)
        this.characterObject = char
        this.characterMixer = new THREE.AnimationMixer(char)
        scene.add(char)
    }, undefined, function(error) {
        console.log('error')
        console.error(error)
    })
    
    }
Character.prototype.addAnimation = function(clipPath) {
    const model = this.characterObject
    this.loader.load(clipPath, (animate) => {
        model.animations.push(animate.animations[0])
    })}

Character.prototype.update = function() {
    this.characterMixer.update(.2)
}


export {Character} 