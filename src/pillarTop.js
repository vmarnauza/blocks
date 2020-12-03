import * as THREE from "three";
import colors from "./colors";

export const createPillarTop = (
  pillar,
  gridRows,
  gridCols,
  gridGap,
  maxElementSize
) => {
  const boxGridPositions = [];
  const padding = gridGap;
  let space = gridCols - padding * 2;

  while (space) {
    let elementSize = Math.min(
      Math.floor(Math.random() * maxElementSize + 1),
      space
    );

    boxGridPositions.push({
      colStart: gridRows - space - padding,
      colEnd: gridRows - space + elementSize - padding,
      rowStart: 1,
      rowEnd: gridRows - 1,
    });

    const spaceToRemove =
      space >= elementSize + gridGap ? elementSize + gridGap : elementSize;

    space -= spaceToRemove;
  }

  const pillarSize = new THREE.Vector3();
  pillar.geometry.computeBoundingBox();
  pillar.geometry.boundingBox.getSize(pillarSize);

  const availableWidth = pillarSize.x;
  const availableDepth = pillarSize.z;
  const originX = -availableWidth / 2;
  const originZ = -availableDepth / 2;
  const colSize = availableWidth / gridCols;
  const rowSize = availableDepth / gridRows;
  const group = new THREE.Group();

  group.position.set(
    pillar.position.x,
    pillar.position.y + pillarSize.y / 2 + colSize * 2,
    pillar.position.z
  );
  group.rotation.setFromQuaternion(pillar.quaternion);

  boxGridPositions.forEach((gridPos) => {
    const size = new THREE.Vector3(
      (gridPos.colEnd - gridPos.colStart) * colSize,
      colSize * 2,
      (gridPos.rowEnd - gridPos.rowStart) * rowSize
    );
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
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

  return group;
};

export default createPillarTop;
