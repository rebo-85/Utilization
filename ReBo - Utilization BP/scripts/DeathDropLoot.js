/* 
================================================================================================================================
  DISCLAIMER: 
    This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
    the implied warranties of merchantability and fitness for a particular purpose. The contributors provide 
    this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
    this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
    unless explicit permission is obtained from the contributors.
================================================================================================================================= 
*/
import { EquipmentSlot } from "@minecraft/server";
import { afterEvents } from "./Minecraft"

const entityContainer = 'rebo:chest';

export class DeathDropLoot {
  constructor() {
    afterEvents.entityDie.subscribe((event) => {
      const entity = event.deadEntity;
      if (entity.typeId != "minecraft:player") {
        return;
      }

      const player = event.deadEntity;
      const dimension = player.dimension;
      const playerInventory = player.GetInventory();

      const container = dimension.spawnEntity(entityContainer, player.location);
      const containerInvertory = container.GetInventory();

      container.nameTag = player.name;
      container.setRotation(player.getRotation());

      // Copy Equipments
      const head = player.GetEquipment(EquipmentSlot.Head);
      const chest = player.GetEquipment(EquipmentSlot.Chest);
      const legs = player.GetEquipment(EquipmentSlot.Legs);
      const feet = player.GetEquipment(EquipmentSlot.Feet);
      const offhand = player.GetEquipment(EquipmentSlot.Offhand);

      const equipments = [head, chest, legs, feet, offhand];

      equipments.forEach((equipment) => {
        containerInvertory.addItem(equipment);
      });

      // Copy Inventory
      for (let slot = 0; slot < playerInventory.size; slot++) {
        const item = playerInventory.getItem(slot);
        if (!item) {
          continue;
        }

        containerInvertory.addItem(item);
      }
    });
  }
}
