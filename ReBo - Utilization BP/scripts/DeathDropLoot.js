import { EquipmentSlot, GameRule } from "@minecraft/server";
import { afterEvents, scriptEvent, world } from "./ReBo/constants";
import { WorldDB } from "./ReBo/modules/worldDB";
import { onWorldOpen, onWorldClose, display } from "./ReBo/utils";

const entityContainer = "rebo:loot_chest";
const isSeeThrough = false;
const keepToOwner = false;

const db = new WorldDB("ddl");
const gamerules = world.gameRules;
let initialKeepInventory = db.get("initialKeepInventory");

onWorldOpen(() => {
  initialKeepInventory = gamerules.keepInventory;
  db.set("initialKeepInventory", initialKeepInventory);
  gamerules.keepInventory = true;
});

onWorldClose(() => {
  if (initialKeepInventory === false && gamerules.keepInventory === true) {
    gamerules.keepInventory = false;
  }
});

afterEvents.entityDie.subscribe((event) => {
  const entity = event.deadEntity;
  if (entity.typeId != "minecraft:player") return;

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

scriptEvent.subscribe((event) => {
  const source = getScriptEventSource(event);
  if (source.typeId != "minecraft:player") return;
  const id = event.id;

  switch (id) {
    case "ddl:init":
      init();

    default:
      return;
  }
});

function init() {
  db.removeAll();
}
