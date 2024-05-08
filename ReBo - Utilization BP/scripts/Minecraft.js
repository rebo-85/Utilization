/* 
================================================================================================================================
  DISCLAIMER: 
    This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
    the implied warranties of merchantability and fitness for a particular purpose. The contributors provide 
    this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
    this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
    unless explicit permission is obtained from the contributors.
================================================================================================================================= 
*/

import {
  EntityInventoryComponent,
  EntityEquippableComponent,
  MinecraftDimensionTypes,
  Dimension,
  Entity,
  world as w,
  system as s,
} from "@minecraft/server";

export const world = w;
export const system = s;
export const afterEvents = w.afterEvents;
export const beforeEvents = w.beforeEvents;
export const scoreboard = w.scoreboard;
export const overworld = w.getDimension(MinecraftDimensionTypes.overworld);
export const nether = w.getDimension(MinecraftDimensionTypes.nether);
export const end = w.getDimension(MinecraftDimensionTypes.theEnd);

export function getScoreboard(id) {
  return scoreboard.getObjective(id);
}

export function addScoreboard(id, displayName) {
  const isObjectiveExist = getScoreboard(id);
  if (isObjectiveExist) return;
  else return scoreboard.addObjective(id, displayName);
}

export function addScore(id, participant, score) {
  return getScoreboard(id).addScore(participant, score);
}

export function getScore(id, participant) {
  return getScoreboard(id).getScore(participant);
}

export function setScore(id, participant, score) {
  return getScoreboard(id).setScore(participant, score);
}

export function removeParticipant(id, participant) {
  return getScoreboard(id).removeParticipant(participant);
}

export function test(value, type = "chat") {
  value = JSON.stringify(value, null, 0);
  switch (type) {
    case "chat":
      overworld.RunCommandAsync(`say ${value}`);
      break;
    case "error":
      console.error(value);
      break;
    case "log":
      console.log(value);
      break;
    default:
      overworld.RunCommandAsync(`say ${value}`);
      break;
  }
}

export class RunInterval {
  constructor(func, interval) {
    this.process = system.runInterval(func, interval);
  }
  dispose() {
    system.clearRun(this.process);
  }
}

export class RunTimeOut {
  constructor(func, timeOut) {
    this.process = system.runTimeout(func, timeOut);
  }
  dispose() {
    system.clearRun(this.process);
  }
}

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `${this.x} ${this.y}`;
  }
}

export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toVector2() {
    return new Vector2(this.x, this.y);
  }
  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }
}

export class Checkpoint {
  constructor(entity) {
    this.entity = entity;
    this.save();
  }
  save() {
    this.location = this.entity.GetLocation();
    this.rotation = this.entity.GetRotation();
  }
  return() {
    this.entity.RunCommandAsync(`teleport @s ${this.location.toString()} ${this.rotation.y} ${this.rotation.x}`)
  }
}

/* 
================================================================================================================================ 
*/



Entity.prototype.GetRotation = function () {
  return new Vector2(this.getRotation().x, this.getRotation().y);
}

Entity.prototype.GetLocation = function () {
  return new Vector3(this.location.x, this.location.y, this.location.z);
}

Entity.prototype.GetCheckpoint = function () {
  return new Checkpoint(this);
};

Entity.prototype.GetInventory = function () {
  return this.getComponent(EntityInventoryComponent.componentId).container;

};

Entity.prototype.GetEquipment = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipment(
    slot
  );
};

Entity.prototype.RunCommand = function (...commands) {
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

Entity.prototype.RunCommandAsync = async function (...commands) {
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

Dimension.prototype.GetEntities = function (filter) {
  if (typeof filter === "string") {
    const regex = /^@(a|p|r|e|s|initiator)(?:\[(.+)\])?$/;
    const matches = filter.match(regex);
    if (matches) {
      return this.getEntities(filter.ToEQO());
    }
    return [];
  }
  return this.getEntities(filter);
}

Dimension.prototype.RunCommand = function (...commands) {
    let successCount = 0;
  
    const flattenedCommands = commands.flat();
  
    flattenedCommands.forEach((command) => {
      if (this.runCommand(`${command}`).successCount > 0) {
        successCount++;
      }
    });
    return { successCount: successCount };
}

Dimension.prototype.RunCommandAsync = async function (...commands) {
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
}

String.prototype.ToEQO = function () {
  const options = {};
  const regex = /^@(a|p|r|e|s|initiator)(?:\[(.+)\])?$/; // Updated regex to validate selectors
  const matches = this.match(regex);

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
          if (
            matches[1] === "p" ||
            matches[1] === "r" ||
            matches[1] === "s" ||
            matches[1] === "initiator"
          ) {
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
          console.warn(
            `'${trimmedKey}' cannot be converted to EntityQueryOptions property.`
          );
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
              excludeGameModes.push(
                parseInt(trimmedValue.replace(/!/g, ""), 10)
              );
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
          if (
            matches[1] === "a" ||
            matches[1] === "p" ||
            matches[1] === "r" ||
            matches[1] === "s" ||
            matches[1] === "initiator"
          ) {
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

    if (
      matches[1] === "a" ||
      matches[1] === "p" ||
      matches[1] === "r" ||
      matches[1] === "s" ||
      matches[1] === "initiator"
    ) {
      options.type = "minecraft:player";

      if (!(matches[1] === "a")) {
        options.closest = 1;
      }
    }

    return options;
  }
};
