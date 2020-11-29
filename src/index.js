import * as THREE from "three";
import createCubes from "./cubes";

let camera, scene, renderer;
let frustumWidth, aspect, frustumSize;

setup();
animate();

function setup() {
  aspect = window.innerWidth / window.innerHeight;
  frustumWidth = 1000;
  frustumSize = new THREE.Vector2(frustumWidth, frustumWidth / aspect);

  camera = new THREE.OrthographicCamera(
    -frustumSize.width,
    frustumSize.width,
    frustumSize.height,
    -frustumSize.height,
    0,
    1000
  );

  camera.position.z = 200;

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#f7f7f7");

  const cubes = createCubes(3, new THREE.Vector3(200, 200, 200), frustumSize);
  scene.add(...cubes);

  const ambientLight = new THREE.AmbientLight(0xfffffff, 0.7); // soft white light
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 100, 200);
  spotLight.angle = Math.PI;
  spotLight.decay = 0.2;
  spotLight.distance = 500;

  scene.add(ambientLight);
  scene.add(spotLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.querySelector("#scene").appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

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
