import {
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
  ItemComponentTypes,
  ScriptEventCommandMessageAfterEvent,
  ScriptEventSource,
} from "@minecraft/server";
import {
  Vector2,
  PlayerJumpAfterEventSignal,
  PlayerCollectItemAfterEventSignal,
  PlayerStartJumpingAfterEventSignal,
  PlayerStopJumpingAfterEventSignal,
  PlayerOnAirJumpAfterEventSignal,
  PlayerOnLandAfterEventSignal,
  PlayerOnEquipAfterEventSignal,
  PlayerOnUnequipAfterEventSignal,
} from "./classes";
import { beforeEvents, overworld, nether, end } from "./constants";
import { runTimeout, runCommand, runCommandAsync, arraysEqual } from "./utils";

const errors = {
  ENCHANTABLE_MISSING: `Item must have 'minecraft:enchantable' component.`,
  DURABILITY_MISSING: `Item must have 'minecraft:durability' component.`,
  INVENTORY_MISSING: `No container found in the entity. Expected to have 'minecraft:inventory' component.`,
  INVALID_HEALTH: `Entity has no valid health component.`,
  EQUIPPABLE_MISSING: `Entity must have 'minecraft:wearable' component.`,
  VARIANT_MISSING: `Entity must have 'minecraft:variant' component.`,
  RIDING_MISSING: `Entity must have 'minecraft:rideable' component.`,
  TYPE_FAMILY_MISSING: `Entity must have 'minecraft:type_family' component.`,
  MOVEMENT_MISSING: `Entity must have 'minecraft:movement' component.`,
};

// WorldAfterEvents methods
Object.defineProperty(WorldAfterEvents.prototype, "playerJump", {
  get: function () {
    return new PlayerJumpAfterEventSignal();
  },
});
Object.defineProperty(WorldAfterEvents.prototype, "playerStartJumping", {
  get: function () {
    return new PlayerStartJumpingAfterEventSignal();
  },
});
Object.defineProperty(WorldAfterEvents.prototype, "playerStopJumping", {
  get: function () {
    return new PlayerStopJumpingAfterEventSignal();
  },
});
Object.defineProperty(WorldAfterEvents.prototype, "playerOnAirJump", {
  get: function () {
    return new PlayerOnAirJumpAfterEventSignal();
  },
});
Object.defineProperty(WorldAfterEvents.prototype, "playerOnLand", {
  get: function () {
    return new PlayerOnLandAfterEventSignal();
  },
});

Object.defineProperty(WorldAfterEvents.prototype, "playerOnUnequip", {
  get: function () {
    return new PlayerOnUnequipAfterEventSignal();
  },
});

Object.defineProperty(WorldAfterEvents.prototype, "playerOnEquip", {
  get: function () {
    return new PlayerOnEquipAfterEventSignal();
  },
});
Object.defineProperty(WorldAfterEvents.prototype, "playerCollectItem", {
  get: function () {
    return new PlayerCollectItemAfterEventSignal();
  },
});

// World methods
Object.defineProperty(World.prototype, "getEntities", {
  value: function (selector) {
    const dimensions = [overworld, nether, end];

    const entities = new Set();

    dimensions.forEach((dimension) => {
      dimension.getEntities(selector).forEach((entity) => {
        entities.add(entity);
      });
    });
    return Array.from(entities);
  },
});

Object.defineProperty(World.prototype, "players", {
  get: function () {
    return this.getAllPlayers();
  },
  enumerable: true,
});

beforeEvents.worldInitialize.subscribe(() => {
  // ItemStack methods
  Object.defineProperty(ItemStack.prototype, "compare", {
    value: function (itemStack) {
      if (itemStack === null || itemStack === undefined) return false;
      if (
        this.amount === itemStack.amount &&
        this.isStackable === itemStack.isStackable &&
        this.keepOnDeath === itemStack.keepOnDeath &&
        this.lockMode === itemStack.lockMode &&
        this.maxAmount === itemStack.maxAmount &&
        this.nameTag === itemStack.nameTag &&
        this.type === itemStack.type &&
        this.typeId === itemStack.typeId &&
        arraysEqual(this.getCanDestroy(), itemStack.getCanDestroy()) &&
        arraysEqual(this.getComponents(), itemStack.getComponents()) &&
        arraysEqual(this.getComponents(), itemStack.getComponents()) &&
        arraysEqual(this.getLore(), itemStack.getLore()) &&
        arraysEqual(this.getTags(), itemStack.getTags()) &&
        this.getDynamicPropertyTotalByteCount() === itemStack.getDynamicPropertyTotalByteCount()
      ) {
        return true;
      }
      return false;
    },
  });

  Object.defineProperty(ItemStack.prototype, "enchantableComponent", {
    get: function () {
      const component = this.getComponent(ItemComponentTypes.Enchantable);
      if (!component) throw new Error(errors.ENCHANTABLE_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(ItemStack.prototype, "enchantmentSlots", {
    get: function () {
      return this.enchantableComponent.slots;
    },
    enumerable: true,
  });

  Object.defineProperty(ItemStack.prototype, "addEnchantments", {
    value: function (...enchantments) {
      const enchantmentList = enchantments.flat();

      enchantmentList.forEach((ench) => this.enchantableComponent.addEnchantments(ench));
    },
  });

  Object.defineProperty(ItemStack.prototype, "canAddEnchantment", {
    value: function (enchantment) {
      return this.enchantableComponent.canAddEnchantment(enchantment);
    },
  });

  Object.defineProperty(ItemStack.prototype, "getEnchantment", {
    value: function (enchantmentType) {
      return this.enchantableComponent.getEnchantment(enchantmentType);
    },
  });
  Object.defineProperty(ItemStack.prototype, "hasEnchantment", {
    value: function (enchantmentType) {
      try {
        return this.enchantableComponent.hasEnchantment(enchantmentType);
      } catch (e) {
        return false;
      }
    },
  });

  Object.defineProperty(ItemStack.prototype, "removeEnchantment", {
    value: function (enchantmentType) {
      return this.enchantableComponent.removeEnchantment(enchantmentType);
    },
  });

  Object.defineProperty(ItemStack.prototype, "removeEnchantments", {
    value: function () {
      return this.enchantableComponent.removeAllEnchantments();
    },
  });

  Object.defineProperty(ItemStack.prototype, "durabilityComponent", {
    get: function () {
      const component = this.getComponent(ItemComponentTypes.Durability);
      if (!component) throw new Error(errors.DURABILITY_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(ItemStack.prototype, "durability", {
    get: function () {
      return this.durabilityComponent.maxDurability - this.durabilityComponent.damage;
    },
    set: function (durability) {
      const newDamage = this.durabilityComponent.maxDurability - durability;
      if (newDamage < 0 || newDamage > this.durabilityComponent.maxDurability) {
        throw new RangeError(`Invalid durability value. Valid range is 0 to ${this.durabilityComponent.maxDurability}.`);
      }

      this.durabilityComponent.damage = newDamage;
    },
    enumerable: true,
  });
  Object.defineProperty(ItemStack.prototype, "maxDurability", {
    get: function () {
      return this.durabilityComponent.maxDurability;
    },
    enumerable: true,
  });

  // Block methods
  const blockCenter = Block.prototype.center;
  const blockBottomCenter = Block.prototype.bottomCenter;
  Object.defineProperty(Block.prototype, "center", {
    get: function () {
      return blockCenter.call(this);
    },
  });

  Object.defineProperty(Block.prototype, "bottomCenter", {
    get: function () {
      return blockBottomCenter.call(this);
    },
  });

  Object.defineProperty(Block.prototype, "getState", {
    value: function (state) {
      return this.permutation.getState(state);
    },
  });

  // Player methods
  Object.defineProperty(Player.prototype, "stopSound", {
    value: function (id) {
      this.runCommandAsync(`stopsound @s ${id}`);
    },
  });
  Object.defineProperty(Player.prototype, "doUseAnimation", {
    value: function () {
      runTimeout(() => {
        const slot = this.getEquipmentSlot(EquipmentSlot.Mainhand);
        const item = slot.getItem();
        slot.setItem(null);

        runTimeout(() => {
          slot.setItem(item);
        }, 2);
      });
    },
  });

  Object.defineProperty(Player.prototype, "gamemode", {
    get: function () {
      return this.getGameMode();
    },
    set: function (gamemode) {
      this.setGamemode(gamemode);
    },
    enumerable: true,
  });

  // Entity methods
  Object.defineProperty(Entity.prototype, "runCommand", {
    value: function (...commands) {
      return runCommand.call(this, Entity, ...commands);
    },
  });

  Object.defineProperty(Entity.prototype, "runCommandAsync", {
    value: function (...commands) {
      return runCommandAsync.call(this, Entity, ...commands);
    },
  });

  Object.defineProperty(Entity.prototype, "isPlayer", {
    get: function () {
      return this.typeId === "minecraft:player";
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "movementComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Movement);
      if (!component) throw new Error(errors.MOVEMENT_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "speed", {
    get: function () {
      return this.movementComponent.currentValue;
    },
    set: function (value) {
      return this.movementComponent.setCurrentValue(value);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "healthComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Health);
      if (!component) throw new Error(errors.INVALID_HEALTH);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "health", {
    get: function () {
      if (this.healthComponent) {
        return this.healthComponent.currentValue;
      } else return 0;
    },
    set: function (value) {
      if (this.healthComponent) {
        if (value < 0 || value > this.maxHealth) {
          throw new RangeError(`Health value must be between 0 and ${this.maxHealth}.`);
        }
        return this.healthComponent.setCurrentValue(value);
      }
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "maxHealth", {
    get: function () {
      return this.healthComponent.effectiveMax;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "missingHealth", {
    get: function () {
      return this.maxHealth - this.health;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "dispose", {
    value: function () {
      this.remove();
    },
  });

  Object.defineProperty(Entity.prototype, "rotation", {
    get: function () {
      return new Vector2(this.getRotation().x, this.getRotation().y);
    },
    set: function (rotation) {
      this.setRotation(rotation);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "equippableComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Equippable);
      if (!component) throw new Error(errors.EQUIPPABLE_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "getEntities", {
    value: function (filter) {
      if (typeof filter === "string") {
        filter = filter.toEQO();
      }
      filter.location = this.location;
      return this.dimension.getEntities(filter);
    },
  });

  Object.defineProperty(Entity.prototype, "getEquipment", {
    value: function (slot) {
      return this.equippableComponent.getEquipment(slot);
    },
  });

  Object.defineProperty(Entity.prototype, "getEquipmentSlot", {
    value: function (slot) {
      return this.equippableComponent.getEquipmentSlot(slot);
    },
  });

  Object.defineProperty(Entity.prototype, "setEquipment", {
    value: function (slot, item) {
      return this.equippableComponent.setEquipment(slot, item);
    },
  });

  Object.defineProperty(Entity.prototype, "variantComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Variant);
      if (!component) throw new Error(errors.VARIANT_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "getVariant", {
    value: function () {
      return this.variantComponent.value;
    },
  });

  Object.defineProperty(Entity.prototype, "typeFamilyComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.TypeFamily);
      if (!component) throw new Error(errors.TYPE_FAMILY_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "getTypeFamilies", {
    value: function () {
      return this.typeFamilyComponent.getTypeFamilies();
    },
  });
  Object.defineProperty(Entity.prototype, "hasTypeFamily", {
    value: function (typeFamily) {
      return this.typeFamilyComponent.hasTypeFamily(typeFamily);
    },
  });

  Object.defineProperty(Entity.prototype, "ridingComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Riding);
      if (!component) throw new Error(errors.RIDING_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "getRide", {
    value: function () {
      return this.ridingComponent.entityRidingOn;
    },
  });

  Object.defineProperty(Entity.prototype, "getRiders", {
    value: function () {
      return this.ridingComponent.getRiders();
    },
  });

  Object.defineProperty(Entity.prototype, "inventoryComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Inventory);
      if (!component) throw new Error(errors.INVENTORY_MISSING);
      return component;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "inventory", {
    get: function () {
      return this.inventoryComponent.container;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "isTamed", {
    get: function () {
      if (this.getComponent(EntityComponentTypes.IsTamed)) return true;
      else return false;
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "x", {
    get: function () {
      return this.location.x;
    },
    set: function (x) {
      const location = this.location;
      location.x += x;
      this.teleport(location);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "y", {
    get: function () {
      return this.location.y;
    },
    set: function (y) {
      const location = this.location;
      location.y += y;
      this.teleport(location);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "z", {
    get: function () {
      return this.location.z;
    },
    set: function (z) {
      const location = this.location;
      location.z += z;
      this.teleport(location);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "rx", {
    get: function () {
      return this.rotation.x;
    },
    set: function (rx) {
      this.setRotation({ x: rx, y: this.rotation.y });
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "ry", {
    get: function () {
      return this.rotation.y;
    },
    set: function (ry) {
      this.setRotation({ x: this.rotation.x, y: ry });
    },
    enumerable: true,
  });

  // Dimension methods
  const dimensionGetEntities = Dimension.prototype.getEntities;

  Object.defineProperty(Dimension.prototype, "runCommand", {
    value: function (...commands) {
      return runCommand.call(this, Dimension, ...commands);
    },
  });

  Object.defineProperty(Dimension.prototype, "runCommandAsync", {
    value: function (...commands) {
      return runCommandAsync.call(this, Dimension, ...commands);
    },
  });

  Object.defineProperty(Dimension.prototype, "getEntities", {
    value: function (filter) {
      if (typeof filter === "string") {
        return dimensionGetEntities.call(this, filter.toEQO());
      }
      return dimensionGetEntities.call(this, filter);
    },
  });

  // Container methods
  Object.defineProperty(Container.prototype, "forEachSlot", {
    value: function (cb) {
      for (let i = 0; i < this.size; i++) {
        const slot = this.getSlot(i);
        cb(slot, i);
      }
    },
  });

  // BlockPermutation methods
  Object.defineProperty(BlockPermutation.prototype, "setState", {
    value: function (state, value) {
      return BlockPermutation.resolve(this.type.id, {
        ...this.getAllStates(),
        [state]: value,
      });
    },
  });

  // ScriptEventCommandMessageAfterEvent methods
  Object.defineProperty(ScriptEventCommandMessageAfterEvent.prototype, "source", {
    get: function () {
      switch (this.sourceType) {
        case ScriptEventSource.Block:
          return this.sourceBlock;
        case ScriptEventSource.Entity:
          return this.sourceEntity;
        case ScriptEventSource.NPCDialogue:
          return this.initiator;
        default:
          return;
      }
    },
  });
});
