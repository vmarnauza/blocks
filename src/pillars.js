import * as THREE from "three";
import colors from "./colors";

const createPillars = (maxColumns, maxRows, size) => {
  const pillars = [];
  const boxInterval = size.x * 2;

  for (let row = 0; row < maxRows; row++) {
    const isOdd = row % 2 > 0;
    const columns = isOdd ? maxColumns - 1 : maxColumns;

    const originX = -boxInterval * ((columns - 1) / 2);

    for (let col = 0; col < columns; col++) {
      const noise = Math.random() * 1.2;
      const height = size.y * (maxRows - row);
      const geometry = new THREE.BoxGeometry(size.x, height, size.z);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(colors.getByAbsolutePosition(col + noise)),
      });
      const mesh = new THREE.Mesh(geometry, material);
      const x = originX + boxInterval * col;
      const z = 0.75 + (boxInterval / 2) * row; // 0.75 seems like a good nudge forward for all pillars

      mesh.position.set(x, height / 2, z);
      mesh.rotation.set(0, Math.PI / 4, 0);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      pillars.push(mesh);
    }
  }

  return pillars;
};

export default createPillars;
