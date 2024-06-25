import { world } from "../constants";

const displayType = "chat";
export class WorldDB {
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

  set(key, value) {
    const id = `${this.name}:${key}`;
    world.setDynamicProperty(id, JSON.stringify(value, null, 0));

    if (!this.propertyIds.includes(id)) this.propertyIds.push(id);
  }

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

  remove(key) {
    const id = `${this.name}:${key}`;
    const index = this.propertyIds.indexOf(id);

    if (index !== -1) {
      world.setDynamicProperty(id, undefined);
      this.propertyIds.splice(index, 1);
    } else console.log("Property not found");
  }

  displayAll() {
    this.propertyIds.forEach((id) => {
      const key = id.split(":")[1];
      const value = this.get(key);
      test(`${id} = ${value}`, displayType);
    });
  }

  removeAll() {
    this.propertyIds.forEach((id) => {
      world.setDynamicProperty(id, undefined);
    });
    this.propertyIds = [];
  }

  static displayAllProperties() {
    const allPropertyIds = world.getDynamicPropertyIds();
    allPropertyIds.forEach((id) => {
      const value = JSON.parse(world.getDynamicProperty(id));
      test(`${id} = ${value}`, displayType);
    });
  }

  static removeAllProperties() {
    const allPropertyIds = world.getDynamicPropertyIds();
    allPropertyIds.forEach((id) => world.setDynamicProperty(id, undefined));
  }
}
