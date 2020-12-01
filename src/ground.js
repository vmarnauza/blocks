import * as THREE from "three";
import { groundColor } from "./colors";

const createGround = () => {
  const color = new THREE.Color(groundColor);

  const geometry = new THREE.PlaneGeometry(200, 200);
  const material = new THREE.MeshLambertMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(geometry, material);

  ground.position.set(0, 0, 0);
  ground.rotation.set(-Math.PI / 2, 0, 0);
  ground.receiveShadow = true;

  return ground;
};

export default createGround;
