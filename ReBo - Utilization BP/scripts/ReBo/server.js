import {
  EntityInventoryComponent,
  EntityEquippableComponent,
  EntityRideableComponent,
  EntityRidingComponent,
  EntityHealthComponent,
  Dimension,
  Entity,
  BlockPermutation,
  Player,
  WorldAfterEvents,
  EntityComponentTypes,
  Container,
  ItemStack,
  World,
  Block,
  ItemDurabilityComponent,
} from "@minecraft/server";
import { Vector3, Checkpoint, Vector2, EntityJumpAfterEventSignal } from "./classes";
import { beforeEvents, tps, overworld, nether, end } from "./constants";
import { runTimeout, runCommand, runCommandAsync } from "./utils";

const errors = {
  INVENTORY_MISSING: `No container found in the entity. Expected to have 'minecraft:inventory' component.`,
};

// World methods
Object.defineProperty(World.prototype, "getEntities", {
  value: function (selector) {
    if (!selector) throw new Error("A selector is required to fetch entities.");
    const dimensions = [overworld, nether, end];

    const entities = new Set();

    dimensions.forEach((dimension) => {
      dimension.getEntities(selector).forEach((entity) => {
        entities.add(entity);
      });
    });
    return Array.from(entities);
  },
  configurable: false,
  enumerable: false,
});

Object.defineProperty(World.prototype, "players", {
  get: function () {
    return this.getAllPlayers();
  },
  configurable: false,
  enumerable: true,
});

beforeEvents.worldInitialize.subscribe(() => {
  // ItemStack methods
  Object.defineProperty(ItemStack.prototype, "durability", {
    get: function () {
      const component = this.getComponent(ItemDurabilityComponent.componentId);
      if (!component) throw new Error("Item does not have a durability component.");

      return component.maxDurability - component.damage;
    },
    set: function (durability) {
      const component = this.getComponent(ItemDurabilityComponent.componentId);
      if (!component) throw new Error("Item does not have a durability component.");

      const newDamage = component.maxDurability - durability;
      if (newDamage < 0 || newDamage > component.maxDurability) {
        throw new RangeError(`Invalid durability value. Valid range is 0 to ${component.maxDurability}.`);
      }

      component.damage = newDamage;
    },
    configurable: true,
    enumerable: true,
  });
  Object.defineProperty(ItemStack.prototype, "maxDurability", {
    get: function () {
      return this.getComponent(ItemDurabilityComponent.componentId).maxDurability;
    },
    configurable: false,
    enumerable: true,
  });

  // Block methods
  Object.defineProperty(Block.prototype, "getState", {
    value: function (state) {
      return this.permutation.getState(state);
    },
    configurable: false,
    enumerable: false,
  });

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

  Object.defineProperty(Entity.prototype, "isPlayer", {
    get: function () {
      return this.typeId === "minecraft:player";
    },
    configurable: false,
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "health", {
    get: function () {
      return this.getComponent(EntityHealthComponent.componentId).currentValue;
    },
    set: function (value) {
      return this.getComponent(EntityHealthComponent.componentId).setCurrentValue(value);
    },
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "maxHealth", {
    get: function () {
      return this.getComponent(EntityHealthComponent.componentId)?.effectiveMax;
    },
    configurable: false,
    enumerable: true,
  });

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

  Object.defineProperty(Entity.prototype, "rotation", {
    get: function () {
      return new Vector2(this.getRotation().x, this.getRotation().y);
    },
    set: function (rotation) {
      this.setRotation(rotation);
    },
    configurable: true,
    enumerable: true,
  });

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

  /** @type {import("@minecraft/server").Container} */
  Object.defineProperty(Entity.prototype, "inventory", {
    get: function () {
      return this.getComponent(EntityInventoryComponent.componentId).container;
    },
    configurable: false,
    enumerable: true,
  });

  /** @type {import("@minecraft/server").EntityHealthComponent} */
  Object.defineProperty(Entity.prototype, "health", {
    get: function () {
      return this.getComponent(EntityComponentTypes.Health);
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
  Container.prototype.forEachSlot = function (cb) {
    for (let i = 0; i < this.size; i++) {
      const slot = this.getSlot(i);
      cb(slot, i);
    }
  };

  Container.prototype.getItemData = function (item) {
    let itemId;

    if (item.constructor.name === "ItemStack") {
      itemId = item.typeId;
    } else if (typeof item === "string") {
      itemId = item;
    } else {
      console.warn(`Invalid argument passed to checkItem. Expected an ItemStack or a string, but received ${typeof item}.`);
      return;
    }

    const data = {
      slots: [],
      total: 0,
    };
    this.forEachSlot((slot, i) => {
      if (slot) {
        const slotItem = slot.getItem();
        if (slotItem && slotItem.typeId === itemId) {
          data.slots.push(i);
          data.total = data.total + slot.amount;
        }
      }
    });
    return data;
  };

  // BlockPermutation methods
  BlockPermutation.prototype.setState = function (state, value) {
    return BlockPermutation.resolve(this.type.id, {
      ...this.getAllStates(),
      [state]: value,
    });
  };
});
