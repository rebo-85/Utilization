import { world, system, Entity, EntityDieAfterEvent } from "@minecraft/server";
import {} from "./ReBo/server";

world.afterEvents.itemCompleteUse.subscribe((e) => {
  console.warn(e.itemStack.typeId);
  if (e.itemStack.typeId == "minecraft:bread") world.sendMessage("yum");
});

world.afterEvents.itemReleaseUse.subscribe((e) => {
  console.warn(e.itemStack.typeId);
  if (e.itemStack.typeId == "minecraft:bread") world.sendMessage("a");
});

world.afterEvents.explosion.subscribe((e) => {
  console.warn(JSON.stringify(e.source.typeId, null, 0));
  if (e.source.typeId == "minecraft:tnt") world.sendMessage("boom");
});

world.afterEvents.playerBreakBlock.subscribe((e) => {
  console.warn(JSON.stringify(e.brokenBlockPermutation.type.id, null, 0));
  if (e.brokenBlockPermutation.type.id == "minecraft:tnt") world.explosion;
});
