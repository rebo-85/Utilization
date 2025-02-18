import { EquipmentSlot, world } from "@minecraft/server";
import { runInterval } from "../utils";

/**
 * Class representing an item description.
 */
class ItemDescription {
  /**
   * Create an item description.
   * @param {string} id - The ID of the item.
   * @param {string[]} lore - The lore of the item.
   */
  constructor(id, lore) {
    this.id = id;
    this.lore = lore;
  }
}

/**
 * Array of item descriptions.
 * @type {ItemDescription[]}
 */
const itemDescriptions = [
  new ItemDescription("ecbl_bc:antler_helmet", ["Increase Knockback Effect"]),
  new ItemDescription("ecbl_bc:bear_claw", ["§rOn-hit: Bleeding effect"]),
  new ItemDescription("ecbl_bc:fur_boots", ["15% Movement Speed in Snow Biome"]),
];

runInterval(async () => {
  for (const player of world.players) {
    for (const iDes of itemDescriptions) {
      const items = player.getItems(iDes.id);
      if (items.size > 0) {
        for (const [k, v] of items) {
          const item = v;
          if (item.getLore().length === 0) {
            item.setLore(iDes.lore);

            const equipmentSlots = Object.values(EquipmentSlot).filter((val) => typeof val === "string");

            if (equipmentSlots.includes(k)) {
              player.setEquipment(k, item);
            } else {
              const slot = parseInt(k.split(":")[1], 10);
              player.inventory.setItem(slot, item);
            }
          }
        }
      }
    }
  }
});
