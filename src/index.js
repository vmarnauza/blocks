import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createGround from "./ground";
import createPillars from "./pillars";
import createLights from "./lights";
import { groundColor } from "./colors";

let camera, scene, renderer;
let frustumWidth, aspect, frustumSize;
let controls;

setup();
animate();

function setup() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(groundColor);
  scene.fog = new THREE.Fog(new THREE.Color(groundColor), 70, 140);

  scene.add(...createPillars(7, 10, new THREE.Vector3(10, 10, 10)));
  scene.add(...createLights());
  scene.add(createGround());

  aspect = window.innerWidth / window.innerHeight;
  frustumWidth = 100;
  frustumSize = new THREE.Vector2(frustumWidth, frustumWidth / aspect);

  camera = new THREE.OrthographicCamera(
    -frustumSize.width,
    frustumSize.width,
    frustumSize.height,
    -frustumSize.height,
    0,
    1000
  );

  camera.position.set(0, 100, 100);
  camera.lookAt(scene.position);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  document.querySelector("#scene").appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

function onWindowResize() {
  aspect = window.innerWidth / window.innerHeight;
  frustumSize = new THREE.Vector2(frustumWidth, frustumWidth / aspect);

  camera.left = -frustumSize.width;
  camera.right = frustumSize.width;
  camera.top = frustumSize.height;
  camera.bottom = -frustumSize.height;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
