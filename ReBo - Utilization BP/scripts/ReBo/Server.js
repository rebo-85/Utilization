import { EntityInventoryComponent, EntityEquippableComponent, Dimension, Entity, Player } from "@minecraft/server";
import { Vector3, Checkpoint, Vector2 } from "./classes";
import { tps } from "./constants";
import { runTimeout, commandRun, commandRunAsync } from "./utils";

// Player methods
Player.prototype.moveEquipment = function (slot) {
  const item = this.getEquipment(slot);
  if (!item) return;

  const inventory = this.getInventory();
  if (inventory.emptySlotsCount === 0) return;

  for (let slotIndex = 0; slotIndex < inventory.size; slotIndex++) {
    const inventoryItem = inventory.getItem(slotIndex);
    if (!inventoryItem) {
      inventory.setItem(slotIndex, item);
      const eSlot = this.getEquipmentSlot(slot);
      eSlot.setItem(null);
      break;
    }
  }
};

// Entity methods
Entity.prototype.tp = function (loc, rot) {
  if (typeof loc === "string") loc = loc.toVector3();
  if (!rot) {
    rot = this.fetchRotation();
  } else if (typeof rot === "string") {
    rot = rot.toVector2();
  }
  this.teleport(loc, { rotation: rot });
};

Entity.prototype.dispose = function () {
  this.remove();
};

Entity.prototype.fetchRotation = function () {
  return new Vector2(this.getRotation().x, this.getRotation().y);
};

Entity.prototype.getLocation = function () {
  return new Vector3(this.location.x, this.location.y, this.location.z);
};

Entity.prototype.getCheckpoint = function () {
  return new Checkpoint(this);
};

Entity.prototype.getInventory = function () {
  return this.getComponent(EntityInventoryComponent.componentId).container;
};

Entity.prototype.getEquipment = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipment(slot);
};

Entity.prototype.getEquipmentSlot = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(slot);
};

Entity.prototype.setEquipment = function (slot, item) {
  return this.getComponent(EntityEquippableComponent.componentId).setEquipment(slot, item);
};

Entity.prototype.commandRun = function (...commands) {
  return commandRun(this, ...commands);
};

Entity.prototype.commandRunAsync = async function (...commands) {
  return commandRunAsync(this, ...commands);
};

Entity.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.commandRunAsync(commands);
  }, time * tps);
};

// Dimension methods
Dimension.prototype.fetchEntities = function (filter) {
  if (typeof filter === "string") {
    const matches = filter.getSelectorMatches();
    if (matches) {
      return this.getEntities(filter.toEQO());
    }
    return [];
  }
  return this.getEntities(filter);
};

Dimension.prototype.commandRun = function (...commands) {
  return commandRun(this, ...commands);
};

Dimension.prototype.commandRunAsync = async function (...commands) {
  return commandRunAsync(this, ...commands);
};

Dimension.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.commandRunAsync(commands);
  }, time * tps);
};
