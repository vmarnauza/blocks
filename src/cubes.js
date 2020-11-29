import * as THREE from "three";
import { colors } from "./colors";

const createCubes = (count, size, frustumSize) => {
  const cubes = [];
  const { width } = frustumSize;
  const boxInterval = width / count;
  const originX = -boxInterval * ((count - 1) / 2);

  for (let ii = 0; ii < count; ii++) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(colors[ii]),
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(originX + boxInterval * ii, 0, 0);
    mesh.rotation.set(45, 45, 0);

    cubes.push(mesh);
  }

  return cubes;
};

export default createCubes;
