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
  EquipmentSlot,
  GameMode,
  DimensionTypes,
  BlockComponentTypes,
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
import { runTimeout, runCommand, runCommandAsync, arraysEqual, addVectors } from "./utils";

const errors = {
  DURABILITY_MISSING: `Item must have 'minecraft:durability' component.`,
  INVALID_HEALTH: `Entity has no valid health component.`,
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
    const dimensionTypes = DimensionTypes.getAll();

    const entities = new Set();
    for (const type of dimensionTypes) {
      const dimension = this.getDimension(type.typeId);
      if (dimension) {
        dimension.getEntities(selector).forEach((entity) => {
          entities.add(entity);
        });
      }
    }

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
  // ContainerSlot methods
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
      return this.getComponent(ItemComponentTypes.Enchantable);
    },
    enumerable: true,
  });

  Object.defineProperty(ItemStack.prototype, "enchantmentSlots", {
    get: function () {
      return this.enchantableComponent?.slots;
    },
    enumerable: true,
  });

  Object.defineProperty(ItemStack.prototype, "addEnchantments", {
    value: function (...enchantments) {
      const enchantmentList = enchantments.flat();

      enchantmentList.forEach((ench) => this.enchantableComponent?.addEnchantments(ench));
    },
  });

  Object.defineProperty(ItemStack.prototype, "canAddEnchantment", {
    value: function (enchantment) {
      return this.enchantableComponent?.canAddEnchantment(enchantment);
    },
  });

  Object.defineProperty(ItemStack.prototype, "getEnchantment", {
    value: function (enchantmentType) {
      return this.enchantableComponent?.getEnchantment(enchantmentType);
    },
  });
  Object.defineProperty(ItemStack.prototype, "hasEnchantment", {
    value: function (enchantmentType) {
      try {
        return this.enchantableComponent?.hasEnchantment(enchantmentType);
      } catch (e) {
        return false;
      }
    },
  });

  Object.defineProperty(ItemStack.prototype, "removeEnchantment", {
    value: function (enchantmentType) {
      return this.enchantableComponent?.removeEnchantment(enchantmentType);
    },
  });

  Object.defineProperty(ItemStack.prototype, "removeEnchantments", {
    value: function () {
      return this.enchantableComponent?.removeAllEnchantments();
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
      let newDamage = this.durabilityComponent.maxDurability - durability;
      if (newDamage < 0) {
        newDamage = 0;
      } else if (newDamage > this.durabilityComponent.maxDurability) {
        newDamage = this.durabilityComponent.maxDurability;
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

  Object.defineProperty(Block.prototype, "inventoryComponent", {
    get: function () {
      return this.getComponent(BlockComponentTypes.Inventory);
    },
    enumerable: true,
  });

  Object.defineProperty(Block.prototype, "inventory", {
    get: function () {
      return this.inventoryComponent.container;
    },
  });

  Object.defineProperty(Block.prototype, "getItems", {
    value: function (typeId) {
      const map = new Map();
      const inv = this.inventory;
      for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item) {
          if (typeId) {
            if (item.typeId === typeId) map.set(i, item);
          } else map.set(i, item);
        }
      }

      return map;
    },
  });

  // Player methods
  Object.defineProperty(Player.prototype, "getItems", {
    value: function (typeId) {
      const eMap = new Map();
      const equipmentSlots = Object.values(EquipmentSlot).filter((value) => typeof value === "string");

      for (const slot of equipmentSlots) {
        const item = this.getEquipment(slot);
        if (item) {
          if (typeId) {
            if (item.typeId === typeId) eMap.set(slot, item);
          } else eMap.set(slot, item);
        }
      }

      const iMap = new Map();

      const inv = this.inventory;
      for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item) {
          if (typeId) {
            if (item.typeId === typeId) iMap.set(i, item);
          } else iMap.set(i, item);
        }
      }

      return { equipments: eMap, inventory: iMap };
    },
  });
  Object.defineProperty(Player.prototype, "damageItem", {
    value: function (slot, damage = 1) {
      const eqSlot = this.getEquipmentSlot(slot);
      const item = eqSlot.getItem();
      if (!item) return;

      const unbreaking = item.getEnchantment("unbreaking");
      const unbreakingLevel = unbreaking ? unbreaking.level : 0;
      const unbreakingChance = 1 / (unbreakingLevel + 1);

      if (Math.random() < unbreakingChance && this.gamemode !== GameMode.creative) {
        item.durability -= damage;
        if (item.durability <= 0) {
          eqSlot.setItem(null);
          this.dimension.playSound("random.break", this.location);
        } else {
          eqSlot.setItem(item);
        }
      }
      return item;
    },
  });

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

  Object.defineProperty(Entity.prototype, "getFacingOffset", {
    value: function (offsetValue) {
      const vd = this.viewDirection;
      const offset = { x: vd.x * offsetValue, y: vd.y * offsetValue, z: vd.z * offsetValue };
      return addVectors(this.location, offset);
    },
  });
  Object.defineProperty(Entity.prototype, "viewDirection", {
    get: function () {
      return this.getViewDirection();
    },
    set: function (direction) {
      this.rotation = { x: direction.x, y: direction.y };
    },
    enumerable: true,
  });
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

  Object.defineProperty(Entity.prototype, "equippableComponent", {
    get: function () {
      const component = this.getComponent(EntityComponentTypes.Equippable);
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
      return this.equippableComponent?.getEquipment(slot);
    },
  });

  Object.defineProperty(Entity.prototype, "getEquipmentSlot", {
    value: function (slot) {
      return this.equippableComponent?.getEquipmentSlot(slot);
    },
  });

  Object.defineProperty(Entity.prototype, "setEquipment", {
    value: function (slot, item) {
      return this.equippableComponent?.setEquipment(slot, item);
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
      return this.getComponent(EntityComponentTypes.Inventory);
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

  Object.defineProperty(Entity.prototype, "rotation", {
    get: function () {
      return new Vector2(this.getRotation().x, this.getRotation().y);
    },
    set: function (rotation) {
      this.setRotation(rotation);
    },
    enumerable: true,
  });

  Object.defineProperty(Entity.prototype, "velocity", {
    get: function () {
      return this.getVelocity();
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

  Object.defineProperty(Entity.prototype, "vx", {
    get: function () {
      return this.velocity.x;
    },
    enumerable: true,
  });
  Object.defineProperty(Entity.prototype, "vy", {
    get: function () {
      return this.velocity.y;
    },
    enumerable: true,
  });
  Object.defineProperty(Entity.prototype, "vz", {
    get: function () {
      return this.velocity.z;
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
      for (let slotId = 0; slotId < this.size; slotId++) {
        const slotObj = this.getSlot(slotId);
        cb(slotObj, slotId);
      }
    },
  });

  Object.defineProperty(Container.prototype, "sort", {
    value: function (cb) {
      // Retrieve all items from the container
      const items = [];
      for (let i = 0; i < this.size; i++) {
        const item = this.getItem(i);
        if (item) {
          items.push({ slot: i, item });
        }
      }

      // Sort the items based on the provided callback function
      items.sort((a, b) => cb(a.item, b.item));

      // Clear the container
      for (let i = 0; i < this.size; i++) {
        this.setItem(i, null);
      }

      // Reinsert the sorted items
      items.forEach(({ slot, item }, index) => {
        this.setItem(index, item);
      });
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
