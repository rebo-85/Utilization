import { Vector3, Vector2, Checkpoint, CommandResult } from "./classes";
import { EquipmentSlot, ItemStack, ContainerSlot } from "@minecraft/server";

interface Player {
  /**
   * Move specified item in the slot to next available free space in inventory.
   * @param {EquipmentSlot} slot - The equipment slot to move.
   */
  moveEquipment(slot: EquipmentSlot): void;
}

interface Entity {
  /**
   * Teleports the entity to a specified location with an optional rotation.
   * @param {Vector3 | string} loc - The location to teleport to, either as a Vector3 or a string.
   * @param {Vector2 | string} [rot] - The rotation after teleporting, either as a Vector2 or a string.
   */
  tp(loc: Vector3 | string, rot?: Vector2 | string): void;

  /**
   * Removes the entity in the world.
   */
  dispose(): void;

  /**
   * Fetches the current rotation of the entity.
   * @returns The current rotation of the entity.
   */
  fetchRotation(): Vector2;

  /**
   * Gets the current location of the entity.
   * @returns The current location of the entity.
   */
  getLocation(): Vector3;

  /**
   * Gets the current checkpoint of the entity.
   * @returns The current checkpoint of the entity.
   */
  getCheckpoint(): Checkpoint;

  /**
   * Gets the inventory of the entity.
   * @returns The inventory of the entity.
   */
  getInventory(): EntityInventoryComponent;

  /**
   * Gets the equipment in the specified slot of the entity.
   * @param {number} slot - The slot to get the equipment from.
   * @returns The equipment in the specified slot.
   */
  getEquipment(slot: number): ItemStack;

  /**
   * Gets the equipment slot of the entity.
   * @param {number} slot - The slot to get.
   * @returns The equipment slot.
   */
  getEquipmentSlot(slot: number): ContainerSlot;

  /**
   * Sets the equipment in the specified slot of the entity.
   * @param {number} slot - The slot to set the equipment in.
   * @param {ItemStack} item - The item to set in the slot.
   */
  setEquipment(slot: number, item: ItemStack): void;

  /**
   * Runs a series of commands on the entity.
   * @param {...string[]} commands - The commands to run.
   */
  commandRun(...commands: string[]): CommandResult;

  /**
   * Runs a series of commands asynchronously on the entity.
   * @param {...string[]} commands - The commands to run.
   */
  commandRunAsync(...commands: string[]):  Promise<CommandResult>;

  /**
   * Run command to the Entity in specified time.
   * @param {number} time - Time in seconds when the commands get executed.
   * @param {string | string[]} commands - The commands to run.
   */
  timedCommand(time: number, commands: string | string[]): void;
}

interface Dimension {
  /**
   * Fetches entities in the dimension based on a filter.
   * @param {string | Object} filter - The filter to use for fetching entities.
   * @returns The fetched entities.
   */
  fetchEntities(filter: string | Object): Entity[];

  /**
   * Runs a series of commands in the dimension.
   * @param {...string[]} commands - The commands to run.
   */
  commandRun(...commands: string[]): CommandResult;

  /**
   * Runs a series of commands asynchronously in the dimension.
   * @param {...string[]} commands - The commands to run.
   */
  commandRunAsync(...commands: string[]):  Promise<CommandResult>;

  /**
   * Run command to the dimension in specified time.
   * @param {number} time - Time in seconds when the commands get executed.
   * @param {string | string[]} commands - The commands to run.
   */
  timedCommand(time: number, commands: string | string[]): void;
}