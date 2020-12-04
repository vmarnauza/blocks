import * as THREE from "three";
import colors from "./colors";

export const createPillarTop = ({
  pillar, // Object3D
  gridSize, // vector 2
  gridGap, // number
  gridHeight, // number
  minElementSize, // vector 2
  maxElementSize, // vector 2
}) => {
  const boxGridPositions = [];
  const padding = gridGap;
  let colSpace = gridSize.x - padding * 2;

  while (colSpace) {
    let rowSpace = gridSize.y - padding * 2;
    const minSizeX = Math.max(minElementSize.x, 1);
    const maxSizeX = maxElementSize.x;
    const elementSizeX = Math.min(
      Math.floor(Math.random() * (maxSizeX - minSizeX) + minSizeX),
      colSpace
    );

    while (rowSpace) {
      const minSizeY = Math.max(minElementSize.y, 1);
      const maxSizeY = maxElementSize.y;
      const elementSizeY = Math.min(
        Math.floor(Math.random() * (maxSizeY - minSizeY) + minSizeY),
        rowSpace
      );

      boxGridPositions.push({
        colStart: gridSize.x - colSpace - padding,
        colEnd: gridSize.x - colSpace + elementSizeX - padding,
        rowStart: gridSize.y - rowSpace - padding,
        rowEnd: gridSize.y - rowSpace + elementSizeY - padding,
      });

      const rowSpaceToRemove =
        rowSpace >= elementSizeY + gridGap
          ? elementSizeY + gridGap
          : elementSizeY;

      rowSpace -= rowSpaceToRemove;
    }

    const colSpaceToRemove =
      colSpace >= elementSizeX + gridGap
        ? elementSizeX + gridGap
        : elementSizeX;

    colSpace -= colSpaceToRemove;
  }

  const pillarSize = new THREE.Vector3();
  pillar.geometry.computeBoundingBox();
  pillar.geometry.boundingBox.getSize(pillarSize);

  const availableWidth = pillarSize.x;
  const availableDepth = pillarSize.z;
  const originX = -availableWidth / 2;
  const originZ = -availableDepth / 2;
  const colSize = availableWidth / gridSize.x;
  const rowSize = availableDepth / gridSize.y;
  const group = new THREE.Group();

  group.position.set(
    pillar.position.x,
    pillar.position.y + pillarSize.y / 2 + colSize * gridHeight,
    pillar.position.z
  );
  group.rotation.setFromQuaternion(pillar.quaternion);

  boxGridPositions.forEach((gridPos) => {
    const size = new THREE.Vector3(
      (gridPos.colEnd - gridPos.colStart) * colSize,
      colSize * gridHeight,
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
  if (size.x === size.y && size.y === size.z)
    return new THREE.SphereGeometry(size.x / 2, 32, 32);
  else return new THREE.BoxGeometry(size.x, size.y, size.z);
};

export default createPillarTop;
