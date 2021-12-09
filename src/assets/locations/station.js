import * as THREE from 'three';
import { Location } from '../classes/Location';
import { Clue } from '../classes/clue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Textbox } from '../classes/textbox';
import { NPC } from '../classes/npc';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { skybox } from './skybox';
// let's make a floor

const loader = new GLTFLoader();
const plane = new THREE.PlaneGeometry(10,25,10,10);
const material = new THREE.MeshBasicMaterial({ color: "yellow" })
const floor = new THREE.Mesh(plane, material);
floor.position.z = -8
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x =-Math.PI/2;
floor.name = "ground"
floor.position.x = -17
floor.position.y = .5
floor.layers.enable(1)
floor.visible = false



const buildingArr = []

// making a light Arr
const lightArr = []

//adding lights
const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x34568b, .7)
const pLight =  new THREE.DirectionalLight( 0xffffbb, .7)
pLight.position.set(10,10,10)
pLight.target.position.set(0,0,0)
lightArr

lightArr.push(ambLight)
lightArr.push(pLight)

// making a propArr
const propArr = [];
// let's make a street


const clueArr = []

// final clue

const cube = new THREE.BoxGeometry(1.5,.3,1)
const cubeSkin = new THREE.MeshPhysicalMaterial()
const tesseractBox = new THREE.Mesh(cube, cubeSkin);
tesseractBox.material.color = new THREE.Color('blue')

tesseractBox.position.x = -20
tesseractBox.position.z = 3
tesseractBox.position.y = .5
tesseractBox.rotation.y = Math.PI/2
tesseractBox.name = "tesseract"
tesseractBox.layers.enable(1)
const tesseractClue = new Clue(tesseractBox, ["THIS IS UNDENYABLE PROOF OF GARY'S GUILT"])
clueArr.push(tesseractClue)

// boxofimported clothes clue

const box = new THREE.BoxGeometry(1.5,1.5,1.5)
const boxSkin = new THREE.MeshPhysicalMaterial()
const smokingGunBox = new THREE.Mesh(box, boxSkin);
smokingGunBox.material.color = new THREE.Color('black')

smokingGunBox.position.x = -10
smokingGunBox.position.z = -20
smokingGunBox.rotation.y = Math.PI/2
smokingGunBox.name = "smokingGun"
smokingGunBox.layers.enable(1)
const smokingGunClue = new Clue(smokingGunBox, ['The smoking gun!'])
clueArr.push(smokingGunClue)




const npcArr = []
// make eve's textbox
const subwayGuyText = []
const subwayGuyTextOne = new Textbox('Shiver me timbers!!!', 'src/assets/emoji/smileyFace.png','It be a hard night on the ocean! The waves are BEASTS!',  ['What mysteries have you seen on the seas tonight?', 'See anything suspicious on the docks?', 'close'] )
const subwayGuyTextTwo = new Textbox('What mysteries have you seen on the seas tonight?', 'src/assets/emoji/smileyFace.png','I saw an orb so green and fair I thought she be a mer-orb!',  ['close'] )
const subwayGuyTextThree = new Textbox('See anything suspicious on the docks?', 'src/assets/emoji/angryFace.png','Some shady red orb was going through a box over yonder.', ['Oh that is interesting!'] )
const subwayGuyTextFour = new Textbox('Oh that is interesting!', 'src/assets/emoji/angryFace.png','He left when I shouted at him! The box is over by the ship if you want to check it out!', ['close'] )
subwayGuyText.push(subwayGuyTextOne)
subwayGuyText.push(subwayGuyTextTwo)
subwayGuyText.push(subwayGuyTextThree)
subwayGuyText.push(subwayGuyTextFour)

const subwayGuy = new NPC('/src/assets/characters/eve.fbx', 'Eve', [-22, 0, -4], [-22, 0, -4], subwayGuyText)
npcArr.push(subwayGuy)

// make a test City


const Floader = new FBXLoader();

loader.load('src/assets/3dAssets/trainStation.gltf', (glb) => {
    const tstation = glb.scene
    tstation.scale.set(3.5,3.5,3.5)
    tstation.rotation.y = Math.PI
    tstation.position.x = -10
    tstation.position.z = -5
    tstation.position.y = -2
    tstation.traverse(c => {
        c.castShadow = true
        c.receiveShadow = true
        c.layers.enable(1)
    })
    station.scene.add(tstation)
})


const station = new Location('Station', floor, buildingArr, lightArr, propArr, clueArr, npcArr, [-15, 0, -4])

export {station}
