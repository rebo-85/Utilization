import {
  EntityInventoryComponent,
  EntityEquippableComponent,
  EntityRideableComponent,
  EntityRidingComponent,
  Dimension,
  Entity,
  Player,
  Container,
  WorldAfterEvents,
  EntityComponentTypes,
} from "@minecraft/server";
import { Vector3, Checkpoint, Vector2, EntityJumpAfterEventSignal } from "./classes";
import { tps } from "./constants";
import { runTimeout, runCommand, runCommandAsync, runInterval } from "./utils";

// Player methods
Player.prototype.moveEquipment = function (slot) {
  const item = this.getEquipment(slot);
  if (!item) return;

  const inventory = this.inventory;
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

Player.prototype.doUseAnimation = function (item) {
  runTimeout(() => {
    const slot = this.getEquipmentSlot(EquipmentSlot.Mainhand);
    const item = slot.getItem();
    slot.setItem(null);

    runTimeout(() => {
      slot.setItem(item);
    }, 2);
  });
};

Object.defineProperty(Player.prototype, "gamemode", {
  get: function () {
    return this.getGameMode();
  },
  configurable: false,
  enumerable: true,
});

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

Entity.prototype.getEquipment = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipment(slot);
};

Entity.prototype.getEquipmentSlot = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(slot);
};

Entity.prototype.setEquipment = function (slot, item) {
  return this.getComponent(EntityEquippableComponent.componentId).setEquipment(slot, item);
};

Entity.prototype.runCommand = function (...commands) {
  return runCommand.call(this, Entity, ...commands);
};

Entity.prototype.runCommandAsync = function (...commands) {
  return runCommandAsync.call(this, Entity, ...commands);
};

Entity.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.runCommandAsync(commands);
  }, time * tps);
};

Entity.prototype.getVariant = function () {
  return this.getComponent(EntityComponentTypes.Variant)?.value;
};

Entity.prototype.getRide = function () {
  return this.getComponent(EntityRidingComponent.componentId)?.entityRidingOn;
};

Entity.prototype.getRiders = function () {
  return this.getComponent(EntityRideableComponent.componentId)?.getRiders();
};

Object.defineProperty(Entity.prototype, "inventory", {
  get: function () {
    return this.getComponent(EntityInventoryComponent.componentId).container;
  },
  configurable: false,
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "isTamed", {
  get: function () {
    if (this.getComponent(EntityComponentTypes.IsTamed)) return true;
    else return false;
  },
  configurable: false,
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "x", {
  get: function () {
    return this.location.x;
  },
  configurable: false,
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "y", {
  get: function () {
    return this.location.y;
  },
  configurable: false,
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "z", {
  get: function () {
    return this.location.z;
  },
  configurable: false,
  enumerable: true,
});

// Dimension methods
const dimensionGetEntities = Dimension.prototype.getEntities;

Dimension.prototype.getEntities = function (filter) {
  if (typeof filter === "string") {
    return dimensionGetEntities.call(this, filter.toEQO());
  }
  return dimensionGetEntities.call(this, filter);
};

Dimension.prototype.runCommand = function (...commands) {
  return runCommand.call(this, Dimension, ...commands);
};

Dimension.prototype.runCommandAsync = function (...commands) {
  return runCommandAsync.call(this, Dimension, ...commands);
};

Dimension.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.runCommandAsync(commands);
  }, time * tps);
};

// WorldAfterEvents methods
Object.defineProperty(WorldAfterEvents.prototype, "entityStartJump", {
  get: function () {
    return new EntityJumpAfterEventSignal();
  },
  configurable: false,
  enumerable: true,
});

// Container methods

Container.prototype.getItemCount = function (itemId) {
  let count = 0;
  for (let i = 0; i < this.size; i++) {
    const slot = this.getSlot(i);
    try {
      if (slot.isValid() && slot.typeId === itemId) count = count + slot.amount;
    } catch (error) {}
  }
  return count;
};
