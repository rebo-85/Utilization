import { EntityInventoryComponent, EntityEquippableComponent, MinecraftDimensionTypes, Dimension, Entity, world as w, system as s } from "@minecraft/server";
import { afterEvents } from "./Constants";

Entity.prototype.tp = function (loc, rot) {
  if (typeof loc === "string") loc = loc.toVector3();

  if (!rot) rot = this.fetchRotation();
  else if (typeof rot === "string") rot = rot.toVector2();
  this.teleport(loc, { rotation: rot });
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
  let successCount = 0;

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    if (this.runCommand(`${command}`).successCount > 0) {
      successCount++;
    }
  });
  return { successCount: successCount };
};

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
String.prototype.toVector2 = function () {
  const pattern = this.match(/^(\d+)\s(\d+)$/);
  if (pattern) {
    const x = parseInt(pattern[1]);
    const y = parseInt(pattern[2]);
    return new Vector2(x, y);
  }

  switch (this.toLowerCase()) {
    case "north":
      return new Vector2(0, 180);
    case "east":
      return new Vector2(0, -90);
    case "south":
      return new Vector2(0, 0);
    case "west":
      return new Vector2(0, 90);
    default:
      return this;
  }
};

String.prototype.getSelectorMatches = function () {
  const regex = /^@(a|p|r|e|s|initiator)(?:\[(.+)\])?$/;
  const matches = this.match(regex);
  if (matches) {
    return matches;
  } else {
    return console.error(`"${this}" is not a valid selector.`);
  }
};

String.prototype.toEQO = function () {
  const options = {};
  const matches = this.getSelectorMatches();
  if (matches && matches.length >= 2) {
    const attributes = matches[2] ? matches[2].split(",") : [];
    let excludeFamilies = [];
    let excludeGameModes = [];
    let excludeTags = [];
    let excludeTypes = [];
    let families = [];
    let tags = [];
    options.location = { x: 0, y: 0, z: 0 }; // Initialize location object with default values

    attributes.forEach((attribute) => {
      const [key, value] = attribute.split("=");
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();

      switch (trimmedKey) {
        case "c":
          options.closest = parseInt(trimmedValue, 10);

          // If @p, @s, @r, or @initiator is present, override closest to 1
          if (matches[1] === "p" || matches[1] === "r" || matches[1] === "s" || matches[1] === "initiator") {
            options.closest = 1;
          }
          break;
        case "family":
          if (trimmedValue.includes("!")) {
            excludeFamilies.push(trimmedValue.replace(/!/g, ""));
            options.excludeFamilies = excludeFamilies;
          } else {
            families.push(trimmedValue);
            options.families = families;
          }
          break;
        case "dx":
        case "dy":
        case "dz":
          console.warn(`'${trimmedKey}' cannot be converted to EntityQueryOptions property.`);
          break;
        case "l":
          options.maxLevel = parseInt(trimmedValue, 10);
          break;
        case "lm":
          options.minLevel = parseInt(trimmedValue, 10);
          break;
        case "m":
          if (trimmedValue.includes("!")) {
            if (!isNaN(trimmedValue.replace(/!/g, ""))) {
              excludeGameModes.push(parseInt(trimmedValue.replace(/!/g, ""), 10));
              options.excludeGameModes = excludeGameModes;
            } else {
              excludeGameModes.push(trimmedValue);
              options.excludeGameModes = excludeGameModes;
            }
          } else {
            if (!isNaN(trimmedValue)) {
              options.gameMode = parseInt(trimmedValue, 10);
            } else {
              options.gameMode = trimmedValue;
            }
          }
          break;
        case "name":
          options.name = trimmedValue;
          break;
        case "r":
          options.maxDistance = parseInt(trimmedValue, 10);
          break;
        case "rm":
          options.minDistance = parseInt(trimmedValue, 10);
          break;
        case "rx":
          options.location.x = parseInt(trimmedValue, 10);
          break;
        case "rxm":
          options.minHorizontalRotation = parseInt(trimmedValue, 10);
          break;
        case "ry":
          options.location.y = parseInt(trimmedValue, 10);
          break;
        case "rym":
          options.minVerticalRotation = parseInt(trimmedValue, 10);
          break;
        case "tag":
          if (trimmedValue.includes("!")) {
            excludeTags.push(trimmedValue.replace(/!/g, ""));
            options.excludeTags = excludeTags;
          } else {
            tags.push(trimmedValue);
            options.tags = tags;
          }
          break;
        case "type":
          if (trimmedValue.includes("!")) {
            excludeTypes.push(trimmedValue.replace(/!/g, ""));
            options.excludeTypes = excludeTypes;
          } else {
            options.type = trimmedValue;
          }
          // If @a, @p, @s, @r, or @initiator is present, override type to 'minecraft:player'
          if (matches[1] === "a" || matches[1] === "p" || matches[1] === "r" || matches[1] === "s" || matches[1] === "initiator") {
            options.type = "minecraft:player";
          }
          break;
        case "x":
          options.location.x = parseInt(trimmedValue, 10);
          break;
        case "y":
          options.location.y = parseInt(trimmedValue, 10);
          break;
        case "z":
          options.location.z = parseInt(trimmedValue, 10);
          break;
        default:
          // Handle unknown keys
          console.warn(`Unknown key: ${trimmedKey}`);
          break;
      }
    });

    if (matches[1] === "a" || matches[1] === "p" || matches[1] === "r" || matches[1] === "s" || matches[1] === "initiator") {
      options.type = "minecraft:player";

      if (!(matches[1] === "a")) {
        options.closest = 1;
      }
    }

    return options;
  }
};

String.prototype.toVector3 = function () {
  const coordinates = this.split(" ").map(parseFloat);
  if (coordinates.some(isNaN) || coordinates.length !== 3) {
    console.error('Invalid string format. It should be "x y z"');
    return null; // Returning null to indicate failure
  }
  return new Vector3(coordinates[0], coordinates[1], coordinates[2]);
};
