import { EntityInventoryComponent, EntityEquippableComponent, Dimension, Entity, Player } from "@minecraft/server";
import { Vector3, Checkpoint, Vector2 } from "./Classes";
import { tps } from "./Constants";
import { runTimeout } from "./Utils";

/**
 * Get the current gamemode of the player
 */
Player.prototype.getGamemode = function () {
  this.commandRunAsync(
    `tag @s[m=adventure] add adventure`,
    `tag @s[m=creative] add creative`,
    `tag @s[m=spectator] add spectator`,
    `tag @s[m=survival] add survival`
  );
  let gamemode = null;
  if (this.hasTag(`adventure`)) gamemode = `adventure`;
  if (this.hasTag(`creative`)) gamemode = `creative`;
  if (this.hasTag(`spectator`)) gamemode = `spectator`;
  if (this.hasTag(`survival`)) gamemode = `survival`;

  this.removeTag(gamemode);
  return gamemode;
};

/**
 * Move specified item in the slot to next available free space in inventory.
 * @param {EquipmentSlot} slot
 */
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

/**
 * Teleports the entity to a specified location with an optional rotation.
 * @param {(Vector3|string)} loc - The location to teleport to, either as a Vector3 or a string.
 * @param {(Vector2|string)} [rot] - The rotation after teleporting, either as a Vector2 or a string.
 */
Entity.prototype.tp = function (loc, rot) {
  if (typeof loc === "string") loc = loc.toVector3();

  if (!rot) rot = this.fetchRotation();
  else if (typeof rot === "string") rot = rot.toVector2();
  this.teleport(loc, { rotation: rot });
};

/**
 * Removes the entity in the world.
 */
Entity.prototype.dispose = function () {
  this.remove();
};

/**
 * Fetches the current rotation of the entity.
 * @returns {Vector2} The current rotation of the entity.
 */
Entity.prototype.fetchRotation = function () {
  return new Vector2(this.getRotation().x, this.getRotation().y);
};

/**
 * Gets the current location of the entity.
 * @returns {Vector3} The current location of the entity.
 */
Entity.prototype.getLocation = function () {
  return new Vector3(this.location.x, this.location.y, this.location.z);
};

/**
 * Gets the current checkpoint of the entity.
 * @returns {Checkpoint} The current checkpoint of the entity.
 */
Entity.prototype.getCheckpoint = function () {
  return new Checkpoint(this);
};

/**
 * Gets the inventory of the entity.
 * @returns {EntityInventoryComponent} The inventory of the entity.
 */
Entity.prototype.getInventory = function () {
  return this.getComponent(EntityInventoryComponent.componentId).container;
};

/**
 * Gets the equipment in the specified slot of the entity.
 * @param {number} slot - The slot to get the equipment from.
 * @returns {ItemStack} The equipment in the specified slot.
 */
Entity.prototype.getEquipment = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipment(slot);
};

Entity.prototype.getEquipmentSlot = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(slot);
};

Entity.prototype.setEquipment = function (slot, item) {
  return this.getComponent(EntityEquippableComponent.componentId).setEquipment(slot, item);
};

/**
 * Runs a series of commands on the entity.
 * @param {...string[]} commands - The commands to run.
 */
Entity.prototype.commandRun = function (...commands) {
  let successCount = 0;

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    this.runCommand(`${command}`);
    if (this.runCommand(`${command}`).successCount > 0) {
      successCount++;
    }
  });
  this.successCount = successCount;
};

/**
 * Runs a series of commands asynchronously on the entity.
 * @param {...string[]} commands - The commands to run.
 * @returns {Promise<void>}
 */
Entity.prototype.commandRunAsync = async function (...commands) {
  let successCount = 0;
  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    const result = await this.runCommandAsync(command);
    if (result.successCount > 0) {
      successCount++;
    }
  });

  await Promise.all(commandPromises);

  this.successCount = successCount;
};

/**
 * Run command to the Entity in specified time.
 * @param {float} time - Time in seconds when the commands get executed.
 * @param {string|string[]} commands
 */
Entity.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.commandRunAsync(commands);
  }, time * tps);
};

/**
 * Fetches entities in the dimension based on a filter.
 * @param {(string|Object)} filter - The filter to use for fetching entities.
 * @returns {Entity[]} The fetched entities.
 */
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

/**
 * Runs a series of commands in the dimension.
 * @param {...string[]} commands - The commands to run.
 * @returns {{ successCount: number }} The result of running the commands.
 */
Dimension.prototype.commandRun = function (...commands) {
  let successCount = 0;

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    if (this.runCommand(`${command}`).successCount > 0) {
      successCount++;
    }
  });
  return { successCount: successCount };
};

/**
 * Runs a series of commands asynchronously in the dimension.
 * @param {...string[]} commands - The commands to run.
 * @returns {Promise<{ successCount: number }>} The result of running the commands.
 */
Dimension.prototype.commandRunAsync = async function (...commands) {
  let successCount = 0;
  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    const result = await this.runCommandAsync(command);
    if (result.successCount > 0) {
      successCount++;
    }
  });

  await Promise.all(commandPromises);

  return { successCount: successCount };
};

/**
 * Run command to the Dimension in specified time.
 * @param {float} time - Time in seconds when the commands get executed.
 * @param {string|string[]} commands
 */
Dimension.prototype.timedCommand = async function (time, commands) {
  runTimeout(() => {
    this.commandRunAsync(commands);
  }, time * tps);
};
