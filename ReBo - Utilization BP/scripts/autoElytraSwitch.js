import {} from "./ReBo/server";
import { EquipmentSlot, world } from "@minecraft/server";
import { runInterval } from "./ReBo/utils";
import { Vector3 } from "./ReBo/classes";

const prevChestItem = new Map();
runInterval(() => {
  for (const player of world.players) {
    if (!player.isOnGround) {
      let isOnHighs = true;
      for (let i = 1; i <= 4; i++) {
        const blockBelow = player.dimension.getBlock(new Vector3(player.location.x, player.location.y - i, player.location.z));
        if (blockBelow && blockBelow.typeId !== "minecraft:air") {
          isOnHighs = false;
          break;
        }
      }
      const chestItem = player.getEquipment(EquipmentSlot.Chest);
      const mainHandItem = player.getEquipment(EquipmentSlot.Mainhand);
      const elytras = player.getItems("minecraft:elytra").inventory;

      if ((isOnHighs || mainHandItem?.typeId === "minecraft:firework_rocket") && chestItem?.typeId !== "minecraft:elytra" && elytras.size > 0) {
        let elytraSlotId = elytras.keys().next().value;
        player.setEquipmentFromInventory(EquipmentSlot.Chest, elytraSlotId);
        prevChestItem.set(player.id, chestItem);
      }
    } else if (prevChestItem.has(player.id) && (player.isOnGround || player.isInWater)) {
      const chestItem = prevChestItem.get(player.id);
      player.inventory.forEachSlot((slot, id) => {
        const item = slot.getItem();
        if (item && item.compare(chestItem)) {
          player.setEquipmentFromInventory(EquipmentSlot.Chest, id);
        }
      });

      prevChestItem.delete(player.id);
    }
  }
});
