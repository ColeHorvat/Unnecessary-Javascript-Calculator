import './style.css'

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

pointLight.position.set(0,0,1000);

scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate()