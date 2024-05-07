/* 
================================================================================================================================
  DISCLAIMER: 
    This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
    the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
    this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
    this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
    unless explicit permission is obtained from ReBo and any contributors.
================================================================================================================================= 
*/

import {
  EntityInventoryComponent,
  EntityEquippableComponent,
  Entity,
  world,
  system,
} from "@minecraft/server";

export const afterEvents = world.afterEvents;
export const beforeEvents = world.beforeEvents;
export const scoreboard = world.scoreboard;
export const overworld = world.getDimension("overworld");
export let players = getPlayers();
export let currentTick = 0;
export function getPlayers() {
  return overworld.getPlayers();
}

export function getBlock(vector3) {
  return this.overworld.getBlock(vector3);
}

export function getEntities(filter) {
  if (typeof filter === "string") {
    const regex = /^@(a|p|r|e|s|initiator)(?:\[(.+)\])?$/;
    const matches = filter.match(regex);
    if (matches) {
      return overworld.getEntities(filter.toEQO());
    }
    return [];
  }
  return overworld.getEntities(filter);
}

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
  value = JSON.stringify(value, null, 2);
  switch (type) {
    case "chat":
      commandRunAsync(`say ${value}`);
      break;
    case "error":
      console.error(value);
      break;
    case "log":
      console.log(value);
      break;
    default:
      commandRunAsync(`say ${value}`);
      break;
  }
}

export function runInterval(func, interval = 1) {
  return new RunInterval(func, interval);
}

export function runTimeout(func, timeOut = 1) {
  return new RunTimeOut(func, timeOut);
}

export function commandRun(...commands) {
  let successCount = 0;

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    if (overworld.runCommand(`${command}`).successCount > 0) {
      successCount++;
    }
  });
  return { successCount: successCount };
}

export async function commandRunAsync(...commands) {
  let successCount = 0;

  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    const result = await overworld.runCommandAsync(command);
    if (result.successCount > 0) {
      successCount++;
    }
  });

  await Promise.all(commandPromises);

  return { successCount: successCount };
}
/* 
================================================================================================================================ 
*/

afterEvents.playerJoin.subscribe(() => {
  players = getPlayers();
  if (!players[0]) {
    system.runTimeout(() => {
      players = getPlayers();
    }, 200);
  }
});

afterEvents.playerLeave.subscribe(() => {
  players = getPlayers();
});

system.runInterval(() => {
  currentTick = system.currentTick;
});

class RunInterval {
  constructor(func, interval) {
    this.process = system.runInterval(func, interval);
  }
  dispose() {
    system.clearRun(this.process);
  }
}

class RunTimeOut {
  constructor(func, timeOut) {
    this.process = system.runTimeout(func, timeOut);
  }
  dispose() {
    system.clearRun(this.process);
  }
}
/* 
================================================================================================================================ 
*/

Entity.prototype.getCheckpoint = function () {
  return new Checkpoint(
    this.location.x,
    this.location.y,
    this.location.z,
    this.getRotation().x,
    this.getRotation().y
  );
};

Entity.prototype.getInventory = function () {
  return this.getComponent(EntityInventoryComponent.componentId).container;
};

Entity.prototype.getEquipment = function (slot) {
  return this.getComponent(EntityEquippableComponent.componentId).getEquipment(
    slot
  );
};
/* 
================================================================================================================================ 
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
String.prototype.toEQO = function () {
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

    if (matches[1] === 'a' || matches[1] === 'p'|| matches[1] === 'r'|| matches[1] === 's' || matches[1] === 'initiator') {
      options.type = "minecraft:player";

      if (!(matches[1] === "a")) {
        options.closest = 1;
      }
    }
    


    return options;
  }
};



/* 
================================================================================================================================ 
*/
