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

export { Location }