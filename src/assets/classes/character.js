import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'

// character class
// model, name, animationmixer, animations
// might need a state class

// player class
// inherits from character class
// also has movement

class Character {
    constructor(characterObjectPath, name, posArr) {
        this.loader = new FBXLoader();
        this.characterObjectPath = characterObjectPath
        this.name = name
        this.characterObject = []
        this.characterMixer = undefined
        this.size = .01
        this.position = new THREE.Vector3()
        this.position.copy(posArr)
        this.actions = []
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
        this.characterMixer = new THREE.AnimationMixer(char)
        this.characterObject = char
        char.name = this.name
        char.scale.setScalar(size)
        char.layers.enable(1)
        char.traverse((child) => {
            child.layers.enable(1)
        })
        char.position.copy(this.position)
        scene.add(char)
        this.addAnimation('src/assets/characters/animations/BreathingIdle.fbx')
        this.characterMixer.clipAction(this.characterObject.animations[0]).play()
    }, undefined, function(error) {
        console.log('error')
        console.error(error)
    })
    }

Character.prototype.setPosition = function(x,y,z) {
    if (this.characterObject.uuid !== undefined) {
        this.characterObject.position.x = x
        this.characterObject.position.y = y
        this.characterObject.position.z = z
    }
}
Character.prototype.addAnimation = function(clip) {
    this.loader.load(clip, ((animate) => {
        this.characterObject.animations.push(animate.animations[0])
        const walk = this.characterObject.animations[1]
        this.characterMixer.clipAction(walk).play()
    }).bind(this))
    
}

Character.prototype.update = function() {
    this.characterMixer.update(.009)
}


export {Character} 