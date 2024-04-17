import { EquipmentSlot } from "@minecraft/server";
import { utils } from "Utils";

/* 
*******************************************************************************************************************************
DISCLAIMER: 
  This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
  the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
  this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
  this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
  unless explicit permission is obtained from ReBo and any contributors.
******************************************************************************************************************************* 
*/

const entityContainer = 'rebo:chest';

class DeathDropLoot {
  constructor() {
    utils.afterEvents.entityDie.subscribe(async (event) => {
      const entity = event.deadEntity;
      if (entity.typeId != "minecraft:player") { return; }

      const player = entity;
      const playerInventory = utils.getInventory(player);

      utils.entityCommandAsync(player, `summon ${entityContainer} ${player.name}`);
      const container = utils.getEntities(await utils.selectorToEntityQueryOptions(`@e[type=${entityContainer},x=${player.location.x},y=${player.location.y},z=${player.location.z},c=1,r=1]`))[0]
      const containerInvertory = utils.getInventory(container);
      
      // Copy Equipments
      const head = utils.getEquipment(player, EquipmentSlot.Head);
      const chest = utils.getEquipment(player, EquipmentSlot.Chest);
      const legs = utils.getEquipment(player, EquipmentSlot.Legs);
      const feet = utils.getEquipment(player, EquipmentSlot.Feet);
      const offhand = utils.getEquipment(player, EquipmentSlot.Offhand);

      const equipments = [head, chest, legs, feet, offhand];

      equipments.forEach((equipment) => {
        containerInvertory.addItem(equipment);
      });

      // Copy Inventory
      for (let slot = 0; slot < playerInventory.size; slot++) {
        const item = playerInventory.getItem(slot);
        if (!item) { continue; }

        containerInvertory.addItem(item);
      }
    });
  }
}

export const deathDropLoot = new DeathDropLoot();
