import { EntityInventoryComponent, EntityEquippableComponent, MinecraftDimensionTypes, Dimension, Entity, world as w, system as s } from "@minecraft/server";

export const world = w;
export const system = s;
export const afterEvents = w.afterEvents;
export const beforeEvents = w.beforeEvents;
export const scoreboard = w.scoreboard;
export const scriptEvent = s.afterEvents.scriptEventReceive;
export const overworld = w.getDimension(MinecraftDimensionTypes.overworld);
export const nether = w.getDimension(MinecraftDimensionTypes.nether);
export const end = w.getDimension(MinecraftDimensionTypes.theEnd);

export function getScoreboard(id) {
  return scoreboard.getObjective(id);
}

export function addScoreboard(id, displayName) {
  const isObjectiveExist = getScoreboard(id);
  if (isObjectiveExist) return;

  if (!displayName) displayName = id;
  return scoreboard.addObjective(id, displayName);
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
      w.sendMessage(`${value}`);
      break;
    case "error":
      console.error(value);
      break;
    case "log":
      console.log(value);
      break;
    default:
      w.sendMessage(`${value}`);
      break;
  }
}
export function runInterval(func, interval) {
  return new RunInterval(func, interval);
}

export function runTimeout(func, timeOut) {
  return new RunTimeOut(func, timeOut);
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
  /**
   * Creates an instance of Vector2.
   * @param {number} [x=0] - The x-coordinate.
   * @param {number} [y=0] - The y-coordinate.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a string representation of the vector.
   * @returns {string} A string in the format "x y".
   */
  toString() {
    return `${this.x} ${this.y}`;
  }

  /**
   * Returns a new Vector2 instance with the y-coordinate opposite.
   * The y-coordinate is considered an angle in the range -180 to 180 degrees.
   * @returns {Vector2} A new Vector2 instance with the opposite y-coordinate.
   * @throws {Error} If the y-coordinate is not in the range -180 to 180 degrees.
   */
  toOppositeY() {
    if (this.y < -180 || this.y > 180) {
      throw new Error("Angle must be in the range -180 to 180 degrees.");
    }

    // Calculate the opposite angle within the range -180 to 180 degrees
    let y = (this.y + 180) % 360;
    if (y > 180) y -= 360;

    return new Vector2(this.x, y);
  }
}
export class Vector3 {
  /**
   * Creates an instance of Vector3.
   * @param {number} [x=0] - The x-coordinate.
   * @param {number} [y=0] - The y-coordinate.
   * @param {number} [z=0] - The z-coordinate.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = this.#validateNumber(x);
    this.y = this.#validateNumber(y);
    this.z = this.#validateNumber(z);
  }

  /**
   * Converts this vector to a Vector2 instance.
   * @returns {Vector2} A new Vector2 instance with the same x and y coordinates.
   */
  toVector2() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Returns a string representation of the vector.
   * @returns {string} A string in the format "x y z".
   */
  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }

  /**
   * Returns a new Vector3 instance with x and z coordinates rounded to the nearest half.
   * @returns {Vector3} A new Vector3 instance with centered x and z coordinates.
   */
  toCenterXZ() {
    const x = this.#roundToNearestHalf(this.x);
    const y = this.y;
    const z = this.#roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  /**
   * Returns a new Vector3 instance with x, y, and z coordinates rounded to the nearest half.
   * @returns {Vector3} A new Vector3 instance with centered x, y, and z coordinates.
   */
  toCenterXYZ() {
    const x = this.#roundToNearestHalf(this.x);
    const y = this.#roundToNearestHalf(this.y);
    const z = this.#roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  /**
   * Rounds a value to the nearest half.
   * @private
   * @param {number} value - The value to round.
   * @returns {number} The value rounded to the nearest half.
   */
  #roundToNearestHalf(value) {
    return Math.round(value * 2) / 2;
  }

  /**
   * Validates if a value is a number.
   * @private
   * @param {number} value - The value to validate.
   * @returns {number} The validated number.
   * @throws {TypeError} If the value is not a number.
   */
  #validateNumber(value) {
    if (typeof value !== "number") {
      throw new TypeError("Value must be a number");
    }
    return value;
  }
}

export class Checkpoint {
  constructor(entity) {
    this.entity = entity;
    this.save();
  }
  save() {
    this.location = this.entity.getLocation();
    this.rotation = this.entity.fetchRotation();
  }
  return() {
    this.entity.commandRunAsync(`teleport @s ${this.location.toString()} ${this.rotation.y} ${this.rotation.x}`);
  }
}

export class ScoreboardDB {
  constructor(sbId) {
    this.sbId = sbId;
    addScoreboard(sbId);
    this.sb = getScoreboard(sbId);
    this.sbIdens = [];
    this.#update();
  }

  save(varName, value) {
    // Convert value to a string in the format "varName = value"
    const scoreEntry = `${varName} = ${JSON.stringify(value, null, 0)}`;

    // Find the existing score entry and remove it if it exists
    const existingSbIden = this.#getSbIden(varName);
    if (existingSbIden) removeParticipant(this.sbId, existingSbIden);

    // Save the new score entry
    setScore(this.sbId, scoreEntry, 0);
  }

  get(varName) {
    const sbIden = this.#getSbIden(varName);

    if (!sbIden) return null;

    const match = sbIden.displayName.match(/^\s*[\w$]+\s*=\s*(.*)\s*$/);
    if (match) {
      let valueStr = match[1].trim();
      try {
        return JSON.parse(valueStr);
      } catch {
        return valueStr;
      }
    }
    return null;
  }

  #getSbIden(varName) {
    this.#update();

    return this.sbIdens.find((sbIden) => {
      const str = sbIden.displayName;
      if (typeof str !== "string") return false;

      const extractedVarName = this.#getVarName(str);
      return extractedVarName === varName;
    });
  }

  #update() {
    this.sbIdens = this.sb.getParticipants();
  }

  #getVarName(str) {
    const match = str.match(/^\s*([\w$]+)\s*=/);
    return match ? match[1] : null;
  }
}

/* 
================================================================================================================================ 
*/

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

/* 
================================================================================================================================ 
*/
