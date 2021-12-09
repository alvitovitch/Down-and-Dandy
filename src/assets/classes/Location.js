import * as THREE from 'three';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
/// what does a location have
// class location
// has npcs, clues, buildings/props, floor, player 

class Location {
    constructor(name, floor, buildingsArr, lightArr, propsArr,  clueArr, npcArr, startingPosArr){
        this.scene = new THREE.Scene()
        //this.scene.background = new THREE.Color( 0xff0000 )
        this.scene.name = name
        this.floor = floor;
        this.lights = lightArr// kinda grey light
        this.buildingsArr = buildingsArr;
        this.propsArr = propsArr;
        this.clueArr = clueArr;
        this.npcArr = npcArr;
        this.startingPos = new THREE.Vector3(startingPosArr[0],startingPosArr[1],startingPosArr[2])

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
            debugger
            npc.addModel(this.scene, npc.size)
            debugger
            //npc.setPosition(npc.position)
        })
    }

}

export { Location }