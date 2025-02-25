import { beforeEvents, runInterval, EquipmentSlot, runTimeout } from "./ReBo/server";

beforeEvents.playerBreakBlock.subscribe((e) => {
  const { block, player } = e;

  const toolTags = [
    "minecraft:is_shovel_item_destructible",
    "minecraft:is_pickaxe_item_destructible",
    "minecraft:is_axe_item_destructible",
    "minecraft:is_hoe_item_destructible",
  ];

  const matchingTag = toolTags.find((tag) => block.getTags().includes(tag));
  if (matchingTag) {
    const toolType = matchingTag.replace("minecraft:is_", "").replace("_item_destructible", "");

    const mainHandItem = player.getEquipment(EquipmentSlot.Mainhand);
    if (!mainHandItem.hasTag(`minecraft:is_${toolType}`)) {
      runTimeout(() => {
        // player.setEquipmentFromInventory(EquipmentSlot.Mainhand, 2);
        // TO DO: find a way to detect player if they are starting digging so be able to swap tools
        //        before player completely destroy the block
      });
    }
  }
});
