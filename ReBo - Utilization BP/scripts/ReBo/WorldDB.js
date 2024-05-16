import { world } from "@minecraft/server";
import { test } from "./Utils";
const displayType = "chat";
/**
 * WorldDB class to handle dynamic properties in the Minecraft world.
 *
 * @class WorldDB
 * @param {string} name - The name of the database.
 *
 * @method set(key: string, value: any): void
 * Sets a dynamic property in the world with the given key and value.
 *
 * @method get(key: string): any
 * Gets the value of a dynamic property from the world.
 *
 * @method diplay(key: string): void
 * Display a specific dynamic property from the world.
 *
 * @method delete(key: string): void
 * Deletes a specific dynamic property from the world.
 *
 * @method displayAll(): void
 * Display all properties specific to this database from the world.
 *
 * @method deleteAll(): void
 * Delete all properties specific to this database from the world.
 *
 * @static
 * @method displayAllProperties(): void
 * Clears all dynamic properties from the world.
 *
 * @static
 * @static @method deleteAllProperties(): void
 * Delete all dynamic properties from the world.
 *
 * @example
 * const db = new WorldDB("myDatabase");
 * db.set("key", { foo: "bar" });
 * const value = db.get("key");
 * db.delete("key");
 * db.clearAll();
 * db.clearAllProperties();
 */
export class WorldDB {
  /**
   * Creates an instance of WorldDB.
   * @param {string} name - The name of the database.
   * @throws {TypeError} If the name is not a string.
   */
  constructor(name) {
    if (typeof name !== "string") throw new TypeError("Database name must be a string");

    this.name = name;
    this.propertyIds = [];

    const worldPropertiesIds = world.getDynamicPropertyIds();
    if (worldPropertiesIds) {
      worldPropertiesIds.forEach((id) => {
        const [name] = id.split(":");
        if (name === this.name) this.propertyIds.push(id);
      });
    }
  }

  /**
   * Sets a dynamic property in the world with the given name and value.
   * @param {string} key - The key of the property.
   * @param {*} value - The value to set.
   */
  set(key, value) {
    const id = `${this.name}:${key}`;
    world.setDynamicProperty(id, JSON.stringify(value, null, 0));

    if (!this.propertyIds.includes(id)) this.propertyIds.push(id);
  }

  /**
   * Gets the value of a dynamic property from the world.
   * @param {string} key - The key of the property to retrieve.
   * @returns {*} The value of the property, or undefined if not found.
   */
  get(key) {
    const id = `${this.name}:${key}`;
    const value = world.getDynamicProperty(id);
    return value !== undefined ? JSON.parse(value) : undefined;
  }

  display(key) {
    const id = `${this.name}:${key}`;
    const value = this.get(key);
    test(`${id} = ${value}`, displayType);
  }

  /**
   * Deletes a specific dynamic property from the world.
   * @param {string} key - The key of the property to delete.
   */
  delete(key) {
    const id = `${this.name}:${key}`;
    const index = this.propertyIds.indexOf(id);

    if (index !== -1) {
      world.setDynamicProperty(id, undefined);
      this.propertyIds.splice(index, 1);
    } else console.log("Property not found");
  }

  /**
   * Display all properties specific to this database from the world.
   */
  displayAll() {
    this.propertyIds.forEach((id) => {
      const key = id.split(":")[1];
      const value = this.get(key);
      test(`${id} = ${value}`, displayType);
    });
  }

  /**
   * Delete all properties specific to this database from the world.
   */
  deleteAll() {
    this.propertyIds.forEach((id) => {
      world.setDynamicProperty(id, undefined);
    });
    this.propertyIds = [];
  }

  /**
   * Display all dynamic properties from the world.
   */
  static displayAllProperties() {
    const allPropertyIds = world.getDynamicPropertyIds();
    allPropertyIds.forEach((id) => {
      const value = JSON.parse(world.getDynamicProperty(id));
      test(`${id} = ${value}`, displayType);
    });
  }

  /**
   * Delete all dynamic properties from the world.
   */
  static deleteAllProperties() {
    const allPropertyIds = world.getDynamicPropertyIds();
    allPropertyIds.forEach((id) => world.setDynamicProperty(id, undefined));
  }
}
