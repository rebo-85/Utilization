import { Vector3 } from "./ReBo/Classes";
import { afterEvents, structureManager, world } from "./ReBo/Constants";
import { placeStructure, test } from "./ReBo/Utils";

const structure = structureManager.get("mystructure:dirt_golem");

afterEvents.playerPlaceBlock.subscribe((event) => {
  const player = event.player;
  const block = event.block;
  const center = getCenter(structure.size);

  if (block.permutation === structure.getBlockPermutation(center)) {
    const coords = getArea(block.location, structure.size);
    const coords2 = getSizeCoordinates(structure.size);
    coords.forEach((coord, i) => {
      const block = player.dimension.getBlock(coord);
      if (block.permutation === structure.getBlockPermutation(coords2[i])) {
        test("test");
      }
    });
  }
});

function getArea(origin, size) {
  let coordinates = [];

  // Calculate the bounds
  const minX = origin.x - Math.floor(size.x / 2);
  const maxX = origin.x + Math.floor(size.x / 2);
  const minY = origin.y - Math.floor(size.y / 2);
  const maxY = origin.y + Math.floor(size.y / 2);
  const minZ = origin.z - Math.floor(size.z / 2);
  const maxZ = origin.z + Math.floor(size.z / 2);

  // Iterate through each coordinate within the bounds
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        coordinates.push(new Vector3(x, y, z));
      }
    }
  }

  return coordinates;
}

function getSizeCoordinates(size) {
  const sizeCoordinates = [];

  for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
      for (let z = 0; z < size.z; z++) {
        sizeCoordinates.push({
          x: x,
          y: y,
          z: z,
        });
      }
    }
  }

  return sizeCoordinates;
}

function getCenter(vector3) {
  return new Vector3(Math.floor(vector3.x / 2), Math.floor(vector3.y / 2), Math.floor(vector3.z / 2));
}
