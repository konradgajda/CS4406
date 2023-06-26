import * as THREE from 'three';
import * as THREE_ADDONS from 'three-addons';
import * as DAT_GUI from 'dat.gui';
import * as $ from 'jquery';


      // config
      const config = {
        scene: {
          width: 500,
          height: 500,
          background: "#ffffff",
        },
        camera: {
          viewAngle: 45,
          aspect: 1,
          near: 1,
          far: 1000,
          positionX: 5,
          positionY: 5,
          positionZ: 5,
        },
      };

      // create a WebGL renderer, camera, and a scene
      var renderer = new THREE.WebGLRenderer({ alpha: true });

      var scene = new THREE.Scene();
      var clock = new THREE.Clock();

      // set some camera attributes
      var camera = new THREE.PerspectiveCamera(
        config.camera.viewAngle,
        config.camera.aspect,
        config.camera.near,
        config.camera.far
      );
      // the camera starts at 0,0,0 so pull it back
      camera.position.x = config.camera.positionX;
      camera.position.y = config.camera.positionY;
      camera.position.z = config.camera.positionZ;
      camera.lookAt(scene.position);
      // add the camera to the scene
      scene.add(camera);

      // start the renderer
      renderer.setSize(config.scene.width, config.scene.height);
      renderer.setClearColor(getThreeColor(config.scene.background), 1.0);
      document.body.appendChild(renderer.domElement);

      // get the element to attach
      // get container using jQuery
      var $container = $("#container");

      // attach the render-supplied DOM element
      $container.append(renderer.domElement);

      // Light
      const ambientLight = new THREE.AmbientLight("white", 5);
      ambientLight.position.set(10, 10, 10);
      scene.add(ambientLight);

      // Poligon variables for GUI
      var poligonProperties = {
        rotationSpeedX: 0.001,
        rotationSpeedY: 0.001,
        color: "blue",
        showWireframe: false,
      };

      // Create material
      var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: poligonProperties.showWireframe,
        side: THREE.DoubleSide,
      });

      // calculating vectors
      let pentagonPoints = [];
      let radius = 2;
      for (let i = 0; i < 5; i++) {
        pentagonPoints.push(
          new THREE.Vector2(
            radius * Math.cos((2 * Math.PI * i) / 5),
            radius * Math.sin((2 * Math.PI * i) / 5)
          )
        );
      }

      // Create shape
      const shape = new THREE.Shape(pentagonPoints);

      // Create geometry
      const geometry = new THREE.ShapeGeometry(shape);

      // Create mesh
      var poligon = new THREE.Mesh(geometry, material);

      // Add mesh to scene
      scene.add(poligon);

      // GUI menu
      const gui = new DAT_GUI.GUI();
      gui.width = 355;
      const menuFolder = gui.addFolder("Menu");
      menuFolder.width = 350;
      var poligonSpeedRotationX = menuFolder
        .add(poligonProperties, "rotationSpeedX", -0.1, 0.1)
        .name("Rotation speed X")
        .listen();
      var poligonSpeedRotationY = menuFolder
        .add(poligonProperties, "rotationSpeedY", -0.1, 0.1)
        .name("Rotation speed Y")
        .listen();

      var poligonColor = menuFolder
        .add(poligonProperties, "color", ["blue", "red"])
        .name("Color")
        .listen();

      var poligonShowWireframe = menuFolder
        .add(poligonProperties, "showWireframe", false)
        .name("Show Wireframe")
        .listen();

      menuFolder.open();

      poligonSpeedRotationX.onChange(function (value) {
        // log to console
        console.log("Rotation speed changed: ", value);
      });

      poligonSpeedRotationY.onChange(function (value) {
        // log to console
        console.log("Rotation speed changed: ", value);
      });

      poligonColor.onChange(function (value) {
        // log to console
        console.log("Mesh color changed: ", value);
      });

      // Orbit controls
      var cameraControls = new THREE_ADDONS.OrbitControls(camera, renderer.domElement);
      cameraControls.addEventListener("mousemove", renderer);
      cameraControls.autoRotate = true;


      // get THREE color
      function getThreeColor(value) {
        var colorValue = parseInt(value.replace("#","0x"), 16);
        return new THREE.Color(colorValue);
      }

      function render() {
        cameraControls.update();
        renderer.render(scene, camera);
      }

      function animate() {
        requestAnimationFrame(animate);
        // applying rotation agaings x and y axes
        poligon.rotation.x += poligonProperties.rotationSpeedX;
        poligon.rotation.y += poligonProperties.rotationSpeedY;

        // appying color to the mesh material
        poligon.material.color.set(poligonProperties.color);

        // applying show vertrices
        poligon.material.wireframe = poligonProperties.showWireframe;
        poligon.material.needsUpdate = true;
        render();
      }

      animate();


