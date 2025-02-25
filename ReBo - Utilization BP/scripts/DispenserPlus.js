import { afterEvents } from "./ReBo/constants";
import { Vector3 } from "./ReBo/classes";
import {} from "./ReBo/devTools";
import { runInterval, runTimeout } from "./ReBo/utils";
import { BlockTypes, system } from "@minecraft/server";

// TODO: Fix getPoweredBlocks function -- it dont fetch powered blocks with more than 2 ticks delay

// Events
//// Make dispenser able to dispense all blocks
afterEvents.buttonPush.subscribe((e) => {
  const { block } = e;

  checkDispenser(block);
});

afterEvents.leverAction.subscribe((e) => {
  const { block, isPowered } = e;
  if (isPowered) {
    checkDispenser(block);
  }
});

afterEvents.playerPlaceBlock.subscribe((e) => {
  const { block } = e;
  if (block.getRedstonePower() >= 0) {
    checkDispenser(block);
  }
});

// Functions
async function checkDispenser(block) {
  await system.waitTicks(4);
  const poweredBlocks = getPoweredBlocks(block);

  for (const [k, v] of poweredBlocks) {
    if (v.typeId === "minecraft:dispenser") {
      monitorDispenser(v);
    }
  }
}

function monitorDispenser(block) {
  const checker = runInterval(() => {
    const dispenser = block.dimension.getBlock(block.location);
    if (dispenser?.typeId === "minecraft:dispenser") {
      const isPowered = dispenser.getState("triggered_bit");
      if (isPowered) {
        dispenseBlock(dispenser);
        checker.dispose();
      }
    } else checker.dispose();
  });
}

function dispenseBlock(block) {
  const directions = ["below", "above", "north", "south", "west", "east"];
  const facingDirection = block.getState("facing_direction");
  const targetBlock = block[directions[facingDirection]]();

  if (targetBlock.typeId === "minecraft:air") {
    runTimeout(() => {
      const blockEntity = block.dimension.getEntities({ type: "minecraft:item", location: targetBlock.bottomCenter, maxDistance: 1 })[0];
      if (blockEntity) {
        const blockItem = blockEntity.toItemStack();

        if (blockItem.isVanillaBlock) {
          targetBlock.setType(blockItem.typeId);
          blockEntity.dispose();
        }
      }
    }, 2);
  }
}

function getPoweredBlocks(block) {
  const poweredBlocks = new Map();
  poweredBlocks.set(block.location, block);

  const visited = new Set();

  function addPoweredBlocks(currentBlock) {
    const locStr = `${currentBlock.x} ${currentBlock.y} ${currentBlock.z} `;
    if (visited.has(locStr)) return;
    visited.add(locStr);

    const adjBlocks = currentBlock.getAdjacentBlocks();
    for (const adjBlock of adjBlocks) {
      const adjLocStr = `${adjBlock.x} ${adjBlock.y} ${adjBlock.z} `;
      if (!visited.has(adjLocStr)) {
        const adjRsp = adjBlock.getRedstonePower();
        const bRsp = block.getRedstonePower();
        if (adjRsp && adjRsp <= bRsp) {
          poweredBlocks.set(adjBlock.location, adjBlock);
          addPoweredBlocks(adjBlock);
        }
      }
    }
  }

  for (const [k, v] of poweredBlocks) {
    addPoweredBlocks(v);
  }

  return poweredBlocks;
}
