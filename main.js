import './style.css'

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Text } from 'troika-three-text'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

//Scene

const scene = new THREE.Scene();

//Camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 100, 100000);
camera.position.setZ(1000);

//Renderer

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#calc')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.render(scene, camera);

//Controls 

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan = false

controls.mouseButtons = {
  RIGHT: THREE.MOUSE.ROTATE,
}





//Calculator Loader

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'Calculator/source/Calculator.FBX',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

//Lighting

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(0,0,500);

scene.add(pointLight, ambientLight);

//Calculator text

var calcText = new Text();

calcText.text = "0";
calcText.fontSize = 200;
calcText.position.z = 49;
calcText.position.x = 192;
calcText.position.y = 457;
calcText.color = 0x123B13;
//calcText.clipRect = 'Bounds of calculator screen'
//calcText.direction = 'left?'
calcText.font = "Fonts/digital-7.ttf"

/*x: 192 y:457 */

scene.add(calcText);
calcText.sync();

//GUI
const gui = new GUI();
const calcTextFolder = gui.addFolder('Calculator Text');
calcTextFolder.add(calcText.position, 'x', 0, 1000);
calcTextFolder.add(calcText.position, 'y', 0, 1000);
calcTextFolder.add(calcText.position, 'z', 0, 100);
calcTextFolder.open();


//Animation

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate()