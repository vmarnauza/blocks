import * as THREE from "three";
import colors from "./colors";

const createCubes = (maxRows, maxColumns, size) => {
  const cubes = [];
  const boxInterval = size.x * 2;
  const originY = (-boxInterval / 2) * ((maxRows - 1) / 2);

  for (let row = 0; row < maxRows; row++) {
    const isOdd = row % 2 > 0;
    const columns = isOdd ? maxColumns - 1 : maxColumns;

    const originX = -boxInterval * ((columns - 1) / 2);

    for (let col = 0; col < columns; col++) {
      const height = size.y * (row + 1);
      const geometry = new THREE.BoxGeometry(size.x, height, size.z);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(colors.random()),
      });
      const mesh = new THREE.Mesh(geometry, material);
      const x = originX + boxInterval * col;
      const y = originY + (boxInterval / 2) * row;

      mesh.position.set(x, y, 0);
      mesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);

      cubes.push(mesh);
    }
  }

  return cubes;
};

export default createCubes;
