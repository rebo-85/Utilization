import { world } from "./ReBo/constants";
import { runInterval } from "./ReBo/utils";

runInterval(() => {
  for (const player of world.getAllPlayers()) {
    let item = player.getEntitiesFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true })[0];

    if (!item) {
      item = player.getBlockFromViewDirection({
        includeLiquidBlocks: true,
        includePassableBlocks: true,
        maxDistance: 7,
      });
    }
    let rawtext = "No selected Block/Entity";
    if (item?.block) {
      const block = item.block;
      rawtext = {
        rawtext: [
          {
            text: `§bBlock§r: §f${block.typeId}\n§r`,
          },
          {
            text: `§bFace§r: §f${item.face}\n§r`,
          },
          {
            text: `§bData§r: §f${JSON.stringify(block.permutation.getAllStates(), null, 2)}§r`,
          },
        ],
      };
    } else if (item?.entity) {
      const entity = item.entity;
      const entityData = {
        // isClimbing: entity.isClimbing,
        // isFalling: entity.isFalling,
        // isInWater: entity.isInWater,
        // isOnGround: entity.isOnGround,
        // isSleeping: entity.isSleeping,
        // isSneaking: entity.isSneaking,
        // isSprinting: entity.isSprinting,
        // isSwimming: entity.isSwimming,
        // location: entity.location,
        // components: entity.getComponents(),
        // dynamicProperties: entity.getDynamicPropertyIds(),
        // effects: entity.getEffects(),
        // nameTag: entity.nameTag,
      };
      rawtext = {
        rawtext: [
          {
            text: `§bEntity§r: §f${entity.typeId}\n§r`,
          },
          {
            text: `§bDistance§r: §f${Number(item.distance.toFixed(3))}\n§r`,
          },
          {
            text: `§bData§r: §f${JSON.stringify(entityData, null, 2)}§r`,
          },
        ],
      };
    }
    player.onScreenDisplay.setActionBar(rawtext);
  }
});
