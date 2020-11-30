import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createCubes from "./cubes";
import createLights from "./lights";

let camera, scene, renderer;
let frustumWidth, aspect, frustumSize;
let controls;

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
    10000
  );

  camera.position.set(0, 0, 1500);
  // camera.rotation.set(Math.PI / 4, Math.PI / 4, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#f7f7f7");

  scene.add(...createCubes(7, 10, new THREE.Vector3(100, 100, 100)));
  scene.add(...createLights());

  const geometry = new THREE.PlaneGeometry(2000, 3000);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color("#71427E"),
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);

  plane.position.set(0, -200, -200);
  plane.rotation.set(-Math.PI / 4, 0, 0);
  scene.add(plane);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

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
