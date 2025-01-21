import { world } from "./ReBo/constants";
import { runInterval } from "./ReBo/utils";

runInterval(() => {
  for (const player of world.getAllPlayers()) {
    let obj = player.getEntitiesFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true })[0];

    if (!obj) {
      obj = player.getBlockFromViewDirection({
        includeLiquidBlocks: true,
        includePassableBlocks: true,
        maxDistance: 7,
      });
    }
    let rawtext = "No selected Block/Entity";
    if (obj?.block) {
      const block = obj.block;
      rawtext = {
        rawtext: [
          {
            text: `§bBlock§r: §f${block.typeId}\n§r`,
          },
          {
            text: `§bFace§r: §f${obj.face}\n§r`,
          },
          {
            text: `§bData§r: §f${JSON.stringify(block.permutation.getAllStates(), null, 2)}§r`,
          },
        ],
      };
    } else if (obj?.entity) {
      const entity = obj.entity;
      const entityData = {
        dynamicProperties: entity.getDynamicPropertyIds(),
      };
      rawtext = {
        rawtext: [
          {
            text: `§bEntity§r: §f${entity.typeId}\n§r`,
          },
          {
            text: `§bHealth§r: §f${entity.health}/${entity.maxHealth}\n§r`,
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
