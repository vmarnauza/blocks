import * as THREE from "three";
import { colors } from "./colors";

const floorColor = colors.purple;

const createFloor = () => {
  const color = new THREE.Color(floorColor);

  const geometry = new THREE.PlaneGeometry(200, 200);
  const material = new THREE.MeshLambertMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(geometry, material);

  floor.position.set(0, 0, 0);
  floor.rotation.set(-Math.PI / 2, 0, 0);
  floor.receiveShadow = true;

  return floor;
};

export default createFloor;
