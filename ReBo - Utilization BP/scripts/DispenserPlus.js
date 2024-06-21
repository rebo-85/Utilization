import { runInterval, runTimeout, test } from "./ReBo/Utils";
import { afterEvents, overworld } from "./ReBo/Constants";
import { BlockInventoryComponent } from "@minecraft/server";

afterEvents.buttonPush.subscribe((event) => {
  const redstoneSource = event.block;
  dispenserPlaceBlock(redstoneSource);
});

async function getPoweredBlocks(sourceBlock) {
  const poweredBlocks = {
    strong: [],
    weak: [],
  };

  const attachedBlock = await getBlockAttached(sourceBlock);
  const poweredRedstones = await getPoweredRedstones(sourceBlock, attachedBlock);

  poweredBlocks.strong.push(attachedBlock);
  poweredRedstones.forEach((redstone) => {
    poweredBlocks.weak.push(redstone.below(1));
  });
  return poweredBlocks;
}

function getPowerType(block) {
  const buttonTypes = [
    "minecraft:acacia_button",
    "minecraft:bamboo_button",
    "minecraft:birch_button",
    "minecraft:cherry_button",
    "minecraft:crimson_button",
    "minecraft:dark_oak_button",
    "minecraft:jungle_button",
    "minecraft:mangrove_button",
    "minecraft:polished_blackstone_button",
    "minecraft:spruce_button",
    "minecraft:stone_button",
    "minecraft:warped_button",
    "minecraft:wooden_button",
  ];

  const perm = block.permutation;
  return buttonTypes.some((type) => perm.matches(type)) ? "button" : null;
}

function getPoweredRedstones(sourceBlock, attachedBlock = null) {
  return new Promise((resolve) => {
    runTimeout(() => {
      const redstones = [];
      const checkedLocations = new Set();

      function checkRedstone(blockLocation, skip = false) {
        const key = `${blockLocation.x},${blockLocation.y},${blockLocation.z}`;
        if (checkedLocations.has(key)) return;
        checkedLocations.add(key);

        const block = sourceBlock.dimension.getBlock(blockLocation);
        if (block && (block.permutation.matches("minecraft:redstone_wire") || skip)) {
          const powerLevel = block.permutation.getState("redstone_signal");
          if (powerLevel > 0) {
            redstones.push(block);
          }

          // Check adjacent blocks
          const adjacentOffsets = [
            { x: -1, y: -1, z: 0 },
            { x: -1, y: +1, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: +1, y: -1, z: 0 },
            { x: +1, y: +1, z: 0 },
            { x: +1, y: 0, z: 0 },
            { x: 0, y: -1, z: -1 },
            { x: 0, y: -1, z: 0 },
            { x: 0, y: -1, z: +1 },
            { x: 0, y: +1, z: -1 },
            { x: 0, y: +1, z: 0 },
            { x: 0, y: +1, z: +1 },
            { x: 0, y: 0, z: -1 },
            { x: 0, y: 0, z: +1 },
          ];

          for (const offset of adjacentOffsets) {
            const adjLocation = {
              x: blockLocation.x + offset.x,
              y: blockLocation.y + offset.y,
              z: blockLocation.z + offset.z,
            };
            checkRedstone(adjLocation);
          }
        }
      }

      if (attachedBlock) checkRedstone(attachedBlock.location, true);
      checkRedstone(sourceBlock.location, true);
      resolve(redstones);
    }, 2);
  });
}

function getBlockAttached(sourceBlock) {
  return new Promise((resolve) => {
    const perm = sourceBlock.permutation;
    let attachedBlock = null;

    const powerType = getPowerType(sourceBlock);
    if (powerType === "button") {
      const dir = perm.getState("facing_direction");
      switch (dir) {
        case 0:
          attachedBlock = sourceBlock.above();
          break;
        case 1:
          attachedBlock = sourceBlock.below();
          break;
        case 2:
          attachedBlock = sourceBlock.south();
          break;
        case 3:
          attachedBlock = sourceBlock.north();
          break;
        case 4:
          attachedBlock = sourceBlock.east();
          break;
        case 5:
          attachedBlock = sourceBlock.west();
          break;
      }
    }

    resolve(attachedBlock);
  });
}

function getPoweredDispensers(poweredBlocks) {
  return new Promise((resolve) => {
    const dispensers = [];
    const checkedLocations = new Set();

    // Check adjacent blocks
    const adjacentOffsets = [
      { x: -1, y: 0, z: 0 },
      { x: +1, y: 0, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 0, y: +1, z: 0 },
      { x: 0, y: 0, z: -1 },
      { x: 0, y: 0, z: +1 },
    ];

    const blocks = [...poweredBlocks.strong, ...poweredBlocks.weak];

    blocks.forEach((block) => {
      for (const offset of adjacentOffsets) {
        const adjLocation = {
          x: block.location.x + offset.x,
          y: block.location.y + offset.y,
          z: block.location.z + offset.z,
        };

        const fetchedBlock = block.dimension.getBlock(adjLocation);

        if (fetchedBlock && fetchedBlock.permutation.matches("minecraft:dispenser")) {
          const key = `${fetchedBlock.location.x},${fetchedBlock.location.y},${fetchedBlock.location.z}`;
          if (checkedLocations.has(key)) continue;
          checkedLocations.add(key);
          dispensers.push(fetchedBlock);
        }
      }
    });

    resolve(dispensers);
  });
}

async function dispenserPlaceBlock(redstoneSource) {
  const poweredBlocks = await getPoweredBlocks(redstoneSource);

  const poweredDispensers = await getPoweredDispensers(poweredBlocks);
  poweredDispensers.forEach((dispenser) => {
    const direction = dispenser.permutation.getState("facing_direction");
    let placingOffset = null;

    switch (direction) {
      case 0:
        placingOffset = { x: 0, y: -1, z: 0 };
        break;
      case 1:
        placingOffset = { x: 0, y: 1, z: 0 };
        break;
      case 2:
        placingOffset = { x: 0, y: 0, z: -1 };
        break;
      case 3:
        placingOffset = { x: 0, y: 0, z: 1 };
        break;
      case 4:
        placingOffset = { x: -1, y: 0, z: 0 };
        break;
      case 5:
        placingOffset = { x: 1, y: 0, z: 0 };
        break;
      default:
        break;
    }

    const faceBlock = dispenser.dimension.getBlock({
      x: dispenser.location.x + placingOffset.x,
      y: dispenser.location.y + placingOffset.y,
      z: dispenser.location.z + placingOffset.z,
    });
    const isAir = faceBlock.isAir;

    if (isAir) {
      // const container = dispenser.getComponent(BlockInventoryComponent.componentId).container;
      // let item;
      // while (!item) {
      //   item = container.getItem(Math.randomInt(0, container.size - 1));
      // }
      // dispenser.dimension.commandRunAsync(`setblock ${faceBlock.x} ${faceBlock.y} ${faceBlock.z} hopper`);
      // runTimeout(() => {
      //   const item = dispenser.dimension.fetchEntities(`@e[x=${faceBlock.x},y=${faceBlock.y},z=${faceBlock.z},r=1]`)[0];
      //   test(item.nameTag);
      // }, 2);
      const hopper = dispenser.dimension.fetchEntities(
        `@e[type=hopper,x=${faceBlock.x},y=${faceBlock.y},z=${faceBlock.z},r=1]`
      )[0];
    }
  });
}
