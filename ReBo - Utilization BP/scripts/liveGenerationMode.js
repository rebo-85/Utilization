import noise from "./noise";
import { Vector3 } from "./ReBo/classes";
import { world } from "./ReBo/constants";
import { WorldDB } from "./ReBo/modules/worldDB";
import { generateUUIDv4, runInterval } from "./ReBo/utils";

const db = new WorldDB("LGM");
const seed = db.get("seed") ?? generateUUIDv4();
db.set("seed", seed);
noise.seedWithString(seed);

runInterval(() => {
  for (const player of world.players) {
    placeBlocksAroundPlayer(player);
  }
});

function placeBlocksAroundPlayer(player) {
  const pos = player.location;
  const dimension = player.dimension;

  // I want the blocks to be generated 2 block radius around the player
  // Generate bedrock at y = -64
  const bedrockPos = new Vector3(pos.x, -64, pos.z);
  const bedrockBlock = dimension.getBlock(bedrockPos);
  bedrockBlock.setType("minecraft:bedrock");

  // Use noise to create a random bedrock formation above y = -64
  for (let y = -63; y <= -60; y++) {
    const noiseValue = noise.perlin3(pos.x / 10, y / 10, pos.z / 10);
    if (noiseValue > 0.5) {
      const formationPos = new Vector3(pos.x, y, pos.z);
      const formationBlock = dimension.getBlock(formationPos);
      formationBlock.setType("minecraft:bedrock");
    }
    // TO DO: need more generation stuffs
  }
}
