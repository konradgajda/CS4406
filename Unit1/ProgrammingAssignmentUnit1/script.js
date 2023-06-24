import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene = new THREE.Scene();


// Set camera atributes
var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 1000;

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// alt camera >> var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far); 

// positioning and pointing the camera to the center
camera.position.x = 150;
camera.position.y = 160;
camera.position.z = 130;
camera.lookAt(scene.position);

// adding sphere

var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
var radius = 50, segments = 15, rings = 15;
var sphereGeomethry = new THREE.SphereGeometry(radius, segments, rings);
var sphere = new THREE.Mesh(sphereGeomethry, sphereMaterial);

scene.add(sphere);

// checking for the webgl support, selecting the most optimal solution (fastest available)

if (webgl_support())
  var renderer = new THREE.WebGLRenderer({ alpha: true });
else
  var renderer = new THREE.CanvasRenderer();

renderer.setClearColor(0xffffff, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight - 150);


var cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.addEventListener('mousemove', renderer);
cameraControls.autoRotate = true;

// add the output of the renderer to the html element
document.body.appendChild(renderer.domElement);

function webgl_support() {
  try {
    var canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
};

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  cameraControls.update();
  renderer.render(scene, camera);
}

animate(); 