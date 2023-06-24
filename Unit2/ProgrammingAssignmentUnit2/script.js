
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// config
const config = {
    scene: {
        width: 500, 
        height: 500,
        background: '0xffffff'
    },
    camera: {
        viewAngle: 45,
        aspect: 1,
        near: 1,
        far: 1000,
        positionX: 5,
        positionY: 5,
        positionZ: 5
    }
};

// create a WebGL renderer, camera, and a scene
if (webgl_support())
  var renderer = new THREE.WebGLRenderer({ alpha: true });
else
  var renderer = new THREE.CanvasRenderer();

var scene = new THREE.Scene();
var clock = new THREE.Clock();


// set some camera attributes
var camera = new THREE.PerspectiveCamera(config.camera.viewAngle, config.camera.aspect, config.camera.near, config.camera.far);
// the camera starts at 0,0,0 so pull it back
camera.position.x = config.camera.positionX;
camera.position.y = config.camera.positionY;
camera.position.z = config.camera.positionZ;
camera.lookAt(scene.position);
// add the camera to the scene
scene.add(camera);
// set up the camera controls.  Please keep in mind that what this does is move the entire scene around.
// because the entire scene is moving the position of the camera and lights in relation to objects within 
// the scene doesn't change so the lighting on the surface of the object(s) will not change either

// start the renderer
renderer.setSize(config.scene.width, config.scene.height);
renderer.setClearColor(config.scene.background, 1.0);
document.body.appendChild(renderer.domElement);

// get the element to attach
// get container using jQuery
var $container = $('#container');

// attach the render-supplied DOM element
$container.append(renderer.domElement);
// ----------------------------------------------------------------------------------------
//  END OF THE STANDARD CODE FOR THE ASSIGNMENT
// ----------------------------------------------------------------------------------------

// create the material
// To create clour red the hex value is 0XFF0000
// for Blue color the hex value is 0X0000FF
// Note that changing the mesh clolor will require to make sure that the ambient light 
// contains red or blue otherwise the mesh is invisible

// Create material

// Light

const ambientLight = new THREE.AmbientLight('white', 5);
ambientLight.position.set(10, 10, 10);
scene.add(ambientLight);


var shapeColor = 0xff0000;

var material = new THREE.MeshBasicMaterial({ 
  color: 0xff0000, 
  wireframe: false, 
  side: THREE.DoubleSide,
});

// Poligon points
var poligonProperties = {
  rotationSpeed: 0.001,
  color: 'blue',
  poligonType: 5,
  poligonTypeName: '5 Pentagon'
};

let pentagonPoints = [];
let radius = 2;
for (let i = 0; i < 5; i++) {
    pentagonPoints.push(new THREE.Vector2(
        radius * Math.cos(2 * Math.PI * i / 5),
        radius * Math.sin(2 * Math.PI * i / 5)
    ));
}

// Create shape
const shape = new THREE.Shape(pentagonPoints);

// Create geometry
const geometry = new THREE.ShapeGeometry(shape);


// Create mesh
var poligon = new THREE.Mesh(geometry, material);

// Add mesh to scene
scene.add(poligon);


// GUI
const gui = new dat.GUI();
gui.width = 355 ;
const menuFolder = gui.addFolder('Menu')
menuFolder.width = 350;
var poligonSpeedRotation = menuFolder.add(poligonProperties, 'rotationSpeed', -0.1, 0.1).name('Rotation speed').listen();
var poligonColor = menuFolder.add(poligonProperties, 'color',['blue', 'red', 'green', 'yellow', 'white', 'lime']).name('Color').listen();
var poligonType = menuFolder.add(poligonProperties, 'poligonTypeName', [
  '3 Triangle',
  '4 Quadrilateral (Square)',
  '5 Pentagon',
  '6 Hexagon',
  '7 Heptagon',
  '8 Octagon',
'9 Nonagon', '10 Decagon']).name('Poligon type').listen();

menuFolder.open()

poligonSpeedRotation.onChange(  
  function(value) {
    // log to console
     console.log('Rotation speed changed: ', value );
  });

poligonColor.onChange(
  function(value) {
    // log to console
     console.log('Mesh color changed: ', value );
  });

poligonType.onChange(
  function(value) {
     translatePoligon(value);
     //log to console
        console.log('Poligon types changed: ', poligonProperties.poligonType );
  });

function translatePoligon(value) {
  switch(value) {
    case '3 Triangle':
      poligonProperties.poligonType = 3;
      break;
    case '4 Quadrilateral (Square)':
      poligonProperties.poligonType = 4;
      break;
    case '5 Pentagon':
      poligonProperties.poligonType = 5;
      break;
    case '6 Hexagon':
      poligonProperties.poligonType = 6;
      break;
    case '7 Heptagon':
      poligonProperties.poligonType = 7;
      break;
    case '8 Octagon':
      poligonProperties.poligonType = 8;
      break;
    case '9 Nonagon':
      poligonProperties.poligonType = 9;
      break;
    case '10 Decagon':
      poligonProperties.poligonType = 10;
      break;
    default:
      poligonProperties.poligonType = 5;
  }
}

// Orbit controls
var cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.addEventListener('mousemove', renderer);
cameraControls.autoRotate = true;

// ----------------------------------------------------------------------------------------
// END OF YOUR CUSTOM CODE FOR THE ASSIGNMENT
// The rendering functions that follow are standard and can be used for this assignment.  
// You are welcome to customize them or create your own if you desire, however, you can 
// simply use the code provided.


// Standard functions for rendering the scene.  Notice how we have the animate function 
// which submits a call to requestAnimationFrame to call animate.   This creates a loop
// that will render the scene again whenever something within the scene changes.
// Standard functions for rendering the scene.  Notice how we have the animate function 
// which submits a call to requestAnimationFrame to call animate.   This creates a loop
// that will render the scene again whenever something within the scene changes.


// function checking if browser support WebGL
function webgl_support() {
  try {
    var canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
};


function render() {
  cameraControls.update();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  poligon.rotation.x += poligonProperties.rotationSpeed;
  poligon.rotation.y += poligonProperties.rotationSpeed;
  poligon.material.color.set(poligonProperties.color);
  render();
}

animate();




