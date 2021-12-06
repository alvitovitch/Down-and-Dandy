import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


/// textbox what does it have?
/// the box itself. Possibly a plane element
/// the various texts that will appear on it (save as seperate objects) set .visible to false for the hidden objects and then to true when clicking them 

const loader = new FontLoader();

const text = loader.load( './src/assets/fonts/Cotton Butter1638640145.json', function ( font ) {

	const geometry = new TextGeometry( '!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
    debugger
    return geometry
} );

const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

const geometry = new THREE.ExtrudeGeometry( text, extrudeSettings)
const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial())

export const sampleText = mesh