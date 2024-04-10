import { utils } from "Utils";
const entityContainer = 'rebo:death_drop_loot';

class DeathDropLoot {
  constructor() {
    utils.afterEvents.entityDie.subscribe(async (event) => {
      const entity = event.deadEntity;
      if (entity.typeId != "minecraft:player") { return; }

      const player = entity;
      const playerInventory = utils.getInventory(player);

      utils.entityCommandAsync(player, `summon ${entityContainer} ${player.name}`);
      const container = utils.getEntities(await utils.selectorToEntityQueryOptions(`@e[type=${entityContainer},c=1]`))[0]
      const containerInvertory = utils.getInventory(container);
      
      for (let slot = 0; slot < playerInventory.size; slot++) {
        const item = playerInventory.getItem(slot);
        if (!item) { continue; }

        containerInvertory.addItem(item);
      }
    });
  }
}

export const deathDropLoot = new DeathDropLoot();
