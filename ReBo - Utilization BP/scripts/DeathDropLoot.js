import { EquipmentSlot, world } from "@minecraft/server";
import { afterEvents, overworld, test, runTimeout, addScoreboard, getScore, setScore } from "./Minecraft";
import { onWorldOpen, onWorldClose } from "./Utils";

const sbId = "initial_gamerules";
const entityContainer = "rebo:loot_chest";
const entityGamerule = "rebo:gamerule";
const isSeeThrough = false;
const keepToOwner = false;
//==================================================================================================================================//
onWorldOpen((player) => {
  addScoreboard(sbId);

  const dimension = player.dimension;
  const gamerule = dimension.spawnEntity(entityGamerule, player.location);

  const keepInventory = gamerule.getProperty("p:keepinventory");
  gamerule.remove();

  if (keepInventory) setScore(sbId, "keepinventory", 1);
  else setScore(sbId, "keepinventory", 0);

  player.commandRunAsync(`gamerule keepinventory true`);
});

onWorldClose((player) => {
  const keepInventory = getScore(sbId, "keepinventory");
  if (!keepInventory) player.dimension.commandRun(`gamerule keepinventory false`);
});

afterEvents.entityDie.subscribe((event) => {
  const entity = event.deadEntity;
  if (entity.typeId != "minecraft:player") {
    return;
  }
  const player = event.deadEntity;

  const dimension = player.dimension;
  const playerInventory = player.getInventory();

  const container = dimension.spawnEntity(entityContainer, player.location);
  const containerInvertory = container.getInventory();

  container.nameTag = `Dropped by: ${player.name}`;
  container.setRotation(player.fetchRotation().toOppositeY());
  container.tp(container.getLocation().toCenterXZ());

  // Copy Equipments
  const head = player.getEquipment(EquipmentSlot.Head);
  const chest = player.getEquipment(EquipmentSlot.Chest);
  const legs = player.getEquipment(EquipmentSlot.Legs);
  const feet = player.getEquipment(EquipmentSlot.Feet);
  const offhand = player.getEquipment(EquipmentSlot.Offhand);

  const equipments = [head, chest, legs, feet, offhand];

  let hasItem = false;
  equipments.forEach((equipment) => {
    if (equipment) {
      containerInvertory.addItem(equipment);
      hasItem = true;
    }
  });

  // Copy Inventory
  for (let slot = 0; slot < playerInventory.size; slot++) {
    const item = playerInventory.getItem(slot);
    if (item) {
      containerInvertory.addItem(item);
      hasItem = true;
    }
  }

  // Clear
  player.commandRunAsync("clear @s");

  // Despawn
  if (!hasItem) container.remove();
});
