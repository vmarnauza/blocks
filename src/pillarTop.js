import * as THREE from "three";
import colors from "./colors";

export const createPillarTop = ({
  pillar, // Object3D
  gridSize, // vector 2
  gridGap, // weighted values
  padding = 1, // number
  gridHeight, // number
  minElementSize, // vector 2
  maxElementSize, // vector 2
  level = 0,
}) => {
  const boxGridPositions = [];
  let colSpace = gridSize.x;
  let gap = gridGap.random;

  while (colSpace) {
    if (colSpace <= gap) break;

    let rowSpace = gridSize.y;
    const minSizeX = Math.max(minElementSize.x, 1);
    const maxSizeX = maxElementSize.x;
    const elementSizeX = Math.min(
      Math.floor(Math.random() * (maxSizeX - minSizeX) + minSizeX),
      colSpace
    );

    while (rowSpace) {
      if (rowSpace <= gap) break;

      const minSizeY = Math.max(minElementSize.y, 1);
      const maxSizeY = maxElementSize.y;
      const elementSizeY = Math.min(
        Math.floor(Math.random() * (maxSizeY - minSizeY) + minSizeY),
        rowSpace
      );

      boxGridPositions.push({
        colStart: gridSize.x - colSpace,
        colEnd: gridSize.x - colSpace + elementSizeX,
        rowStart: gridSize.y - rowSpace,
        rowEnd: gridSize.y - rowSpace + elementSizeY,
      });

      if (elementSizeY < rowSpace - gap) rowSpace -= gap;
      rowSpace -= elementSizeY;
    }

    if (elementSizeX < colSpace - gap) colSpace -= gap;
    colSpace -= elementSizeX;
  }

  const pillarSize = new THREE.Vector3();
  pillar.geometry.computeBoundingBox();
  pillar.geometry.boundingBox.getSize(pillarSize);

  const totalGridWidth = gridSize.x + padding * 2;
  const totalGridDepth = gridSize.y + padding * 2;
  const availableWidth = (pillarSize.x / totalGridWidth) * gridSize.x;
  const availableDepth = (pillarSize.z / totalGridDepth) * gridSize.y;
  const originX = -availableWidth / 2;
  const originZ = -availableDepth / 2;
  const colSize = availableWidth / gridSize.x;
  const rowSize = availableDepth / gridSize.y;
  const group = new THREE.Group();
  const groupHeight = colSize * gridHeight;
  const groupPositionOffsetY = groupHeight + groupHeight * 1.5 * level;

  group.position.set(
    pillar.position.x,
    pillar.position.y + pillarSize.y / 2 + groupPositionOffsetY,
    pillar.position.z
  );
  group.rotation.setFromQuaternion(pillar.quaternion);

  boxGridPositions.forEach((gridPos) => {
    const size = new THREE.Vector3(
      (gridPos.colEnd - gridPos.colStart) * colSize,
      groupHeight,
      (gridPos.rowEnd - gridPos.rowStart) * rowSize
    );
    const geometry = getGeometry(size);
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(colors.random()),
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      originX + gridPos.colStart * colSize + size.x / 2,
      0,
      originZ + gridPos.rowStart * rowSize + size.z / 2
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add(mesh);
  });

  group.rotation.y += (Math.PI / 2) * Math.floor(Math.random() * 2);

  return group;
};

const getGeometry = (size) => {
  if (size.x === size.z && size.y === size.z)
    return new THREE.SphereGeometry(size.x / 2, 32, 32);
  else return new THREE.BoxGeometry(size.x, size.y, size.z);
};

export default createPillarTop;
