import {
  ItemStack,
  ScoreboardIdentity,
  ScoreboardObjective,
  EntityInventoryComponent,
  EntityEquippableComponent,
  world,
  system,
} from "@minecraft/server";

/* 
*******************************************************************************************************************************
DISCLAIMER: 
  This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
  the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
  this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
  this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
  unless explicit permission is obtained from ReBo and any contributors.
******************************************************************************************************************************* 
*/

 

class Utils {
  afterEvents = world.afterEvents;
  beforeEvents = world.beforeEvents;
  overworld = world.getDimension("overworld");
  players = this.overworld.getPlayers();
  scoreboard = world.scoreboard;

  constructor() {
      this.afterEvents.playerJoin.subscribe(() => {
      this.players = this.overworld.getPlayers();
      if (!this.players[0]) {
        system.runTimeout(() => {
          this.players = this.overworld.getPlayers();
        }, 200);
      }
    });
    
    this.afterEvents.playerLeave.subscribe(() => {
      this.players = this.overworld.getPlayers();
    });
  }

  /**
   * Gets the inventory of the entity.
   * @returns { Container } Entity inventory.
   */
  getInventory(entity) {
    try {
      return entity.getComponent(EntityInventoryComponent.componentId).container;
    } catch (error) {
      return console.error(error);
    }
  }
  /**
   * Gets the equipment of the entity in the specified slot.
   * @returns { ItemStack }
   */
  getEquipment(entity, slot) {
    try {
      return entity.getComponent(EntityEquippableComponent.componentId).getEquipment(slot);
    } catch (error) {
      return console.error(error);
    }
  }
  /**
   * Run commands synchronously from actor.
   * @param {...string} commands - The commands to be executed.
   * @param { Entity } entity - The executed entity.
   * @returns { int } The number of successful commands executed.
   */
  entityCommand(entity, ...commands) {
    try {
      let successCount = 0;

      const flattenedCommands = commands.flat();

      flattenedCommands.forEach((command) => {
        entity.runCommand(`${command}`);
        if (entity.runCommand(`${command}`).successCount > 0) {
          successCount++;
        }
      });
      return successCount;
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Run commands asynchronously from actor.
   * @param {...string} commands - The commands to be executed.
   * @param { Entity } entity - The executed entity.
   * @returns { int } The number of successful commands executed.
   */
  async entityCommandAsync(entity, ...commands) {
    try {
      let successCount = 0;

      const flattenedCommands = commands.flat();

      const commandPromises = flattenedCommands.map(async (command) => {
        const result = await entity.runCommandAsync(command);
        if (result.successCount > 0) {
          successCount++;
        }
      });

      await Promise.all(commandPromises);

      return successCount;
    } catch (error) {
      // Handle errors here
      console.error(error);
      return 0; // or return an appropriate value
    }
  }

  /**
   * Run commands synchronously from server.
   * @param { ..string } commands - The commands to be executed.
   * @param { Entity } entity - The executed entity.
   * @returns { int } The number of successful commands executed.
   */
  serverCommand(...commands) {
    try {
      let successCount = 0;

      const flattenedCommands = commands.flat();

      flattenedCommands.forEach((command) => {
        this.overworld.runCommand(`${command}`);
        if (this.overworld.runCommand(`${command}`).successCount > 0) {
          successCount++;
        }
      });

      return successCount;
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Run commands asynchronously from server.
   * @param { ...string } commands - The commands to be executed.
   * @param { Entity } entity - The executed entity.
   * @returns { int } The number of successful commands executed.
   */
  async serverCommandAsync(...commands) {
    try {
      let successCount = 0;

      const flattenedCommands = commands.flat();

      const commandPromises = flattenedCommands.map(async (command) => {
        const result = await this.overworld.runCommandAsync(command);
        if (result.successCount > 0) {
          successCount++;
        }
      });

      await Promise.all(commandPromises);

      return successCount;
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Get the block at a specific location in the overworld dimension.
   * @param { Vector3 } location - The location at which to return a block.
   * @returns { Block|null } Block at the specified location, or 'null' if asking for a block at an unloaded chunk.
   */
  getBlock(location) {
    try {
      return this.overworld.getBlock({
        x: location.x,
        y: location.y,
        z: location.z,
      });
    } catch (error) {
      console.error("Error getting block:", error);
      return null;
    }
  }
  /**
   * Returns a set of entities based on a set of conditions defined via the EntityQueryOptions set of filter criteria.
   * @param { EntityQueryOptions } option - Additional options that can be used to filter the set of entities returned.
   * @returns { Entity[]|null } The entities array matched with the options.
   */
  getEntities(option) {
    try {
      return this.overworld.getEntities(option);
    } catch (error) {
      console.error("Error getting entities:", error);
      return null;
    }
  }

  /**
   * Get the scoreboard objective by its identifier.
   * @param { string } objectiveID - Identifier of the objective.
   * @returns { ScoreboardObjective|null } The objective matched with the identifier provided.
   */
  getScoreObjective(objectiveID) {
    try {
      return this.scoreboard.getObjective(objectiveID);
    } catch (error) {
      console.error("Error getting objective:", error);
      return null;
    }
  }

  /**
   * Adds a new objective to the scoreboard.
   * @param { string } objectiveID - Identifier of the objective.
   * @param { string } displayName - The text to display in client scoreboard.
   */
  addScoreObjective(objectiveID, displayName) {
    try {
      const isObjectiveExist = this.getScoreObjective(objectiveID);
      if (isObjectiveExist) return;
      else return this.scoreboard.addObjective(objectiveID, displayName);
    } catch (error) {
      console.error("Error adding score objective:", error);
      return;
    }
  }

  /**
   * Adds a score to the given participant and objective.
   * @param { string } objectiveID - Identifier of the objective.
   * @param { string|Entity|ScoreboardIdentity } participant - Participant to apply scoreboard value addition to.
   * @param { int } score - The number value to add.
   */
  addScore(objectiveID, participant, score) {
    try {
      return this.scoreboard
        .getObjective(objectiveID)
        .addScore(participant, score);
    } catch (error) {
      console.error("Error adding score:", error);
      return;
    }
  }

  /**
   * Returns a specific score for a participant.
   * @param { string } objectiveID - Identifier of the objective.
   * @param { string|Entity|ScoreboardIdentity } participant - Identifier of the participant to retrieve a score for.
   */
  getScore(objectiveID, participant) {
    try {
      const isParticipantExist =
        this.getScoreObjective(objectiveID).hasParticipant(participant);
      if (isParticipantExist)
        return this.scoreboard.getObjective(objectiveID).getScore(participant);
      else return null;
    } catch (error) {
      console.error("Error getting score:", error);
      return null;
    }
  }
  /**
   * Sets a score for a participant.
   * @param { string } objectiveID - Identifier of the objective.
   * @param { string|Entity|ScoreboardIdentity } participant - Identifier of the participant to retrieve a score for.
   * @param { int } score - New value of the score.
   */
  setScore(objectiveID, participant, score) {
    try {
      return this.scoreboard
        .getObjective(objectiveID)
        .setScore(participant, score);
    } catch (error) {
      console.error("Error setting score:", error);
      return;
    }
  }

  /**
   * Removes a participant from this scoreboard objective.
   * @param { string } objectiveID - Identifier of the objective.
   * @param { string|Entity|ScoreboardIdentity } participant - Participant to remove from being tracked with this objective.
   */
  resetScore(objectiveID, participant) {
    try {
      return this.scoreboard
        .getObjective(objectiveID)
        .removeParticipant(participant);
    } catch (error) {
      console.error("Error resetting score:", error);
      return null;
    }
  }
  selectorToEntityQueryOptions(selector) {
    const options = {};
    const regex = /@([aeprs]|initiator)\[(.+)\]/;
    const matches = selector.match(regex);

    if (matches && matches.length === 3) {
      const entityType = matches[1];
      const attributes = matches[2].split(",");
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
    }

    if (
      selector.includes("@a") ||
      selector.includes("@p") ||
      selector.includes("@initiator")
    ) {
      options.type = "minecraft:player";
    }
    if (selector.includes("@p") || selector.includes("@initiator")) {
      options.closest = 1;
    }

    return options;
  }

  test(value = "test", type = "chat") {
    value = JSON.stringify(value, null, 2);
    switch (type) {
      case "chat":
        this.serverCommandAsync(`say ${value}`);
        break;
      case "error":
        console.error(value);
        break;
      case "log":
        console.log(value);
        break;
      default:
        this.serverCommandAsync(`say ${value}`);
        break;
    }
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

export const utils = new Utils();


export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }
}
export class Checkpoint {
  constructor(entity) {
    this.entity = entity;
    this.x = entity.location.x;
    this.y = entity.location.y;
    this.z = entity.location.z;
    this.rx = entity.getRotation().x;
    this.ry = entity.getRotation().y;
    this.fx = entity.getViewDirection().x;
    this.fy = entity.getViewDirection().y;
    this.fz = entity.getViewDirection().z;
  }
  return() {
    return utils.entityCommandAsync(
      this.entity, 
      `teleport @s ${this.x} ${this.y} ${this.z} ${this.ry} ${this.rx}`,
      );
  }
}
