
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

import {utils} from 'Utils';
import {TicksPerSecond, system} from '@minecraft/server';


export class ScoreboardDB {
  /**
   * @param {string} databaseName - Identifier of the database to add.
   */
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.databaseObjective = utils.scoreboard.getObjective(databaseName);
    if (!this.databaseObjective) {
      try {
        utils.addScoreObjective(databaseName, databaseName);
        this.databaseObjective = utils.scoreboard.getObjective(databaseName);
      } catch (error) {
        console.error("Error creating database objective:", error);
      }
    }
  }

  addEntry(player, score) {
    try {
      this.databaseObjective.setScore(player, score);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  addEntryIfHigher(player, score) {
    try {
      const currentScore = this.getScore(player);
      if (currentScore === undefined || score > currentScore) {
        this.addEntry(player, score);
        console.log(`Added entry for ${player} with score ${score}`);
      } else {
        console.log(
          `Score for ${player} (${currentScore}) is higher or equal. Not adding entry.`
        );
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  getScore(player) {
    try {
      const isParticipantExist = this.databaseObjective.hasParticipant(player);
      if (isParticipantExist) return this.databaseObjective.getScore(player);
      else return null;
    } catch (error) {
      console.error("Error getting score:", error);
      return null;
    }
  }

  removeEntry(player) {
    try {
      this.databaseObjective.removeParticipant(player);
    } catch (error) {
      console.error("Error removing entry:", error);
    }
  }

  getAllEntries() {
    try {
      const entries = this.databaseObjective.getParticipants();
      return entries.map((entry) => ({
        player: entry,
        score: this.getScore(entry),
      }));
    } catch (error) {
      console.error("Error getting all entries:", error);
      return [];
    }
  }

  getHighestEntry() {
    try {
      const allEntries = this.getAllEntries();
      if (allEntries.length === 0) {
        return null; // No entries, return null
      }

      // Find the entry with the highest score
      const highestEntry = allEntries.reduce((prev, current) => {
        return current.score > prev.score ? current : prev;
      });

      return highestEntry;
    } catch (error) {
      console.error("Error getting highest score:", error);
      return null;
    }
  }
}

export class Vector2 {
  /**
   * @param {float} x - X-coordinate.
   * @param {float} y - Y-coordinate.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `${this.x} ${this.y}`;
  }
}

export class Vector3 {
  /**
   * @param {float} x - X-coordinate.
   * @param {float} y - Y-coordinate.
   * @param {float} z - Z-coordinate.
   */
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

export class Music {
  /**
   * @param {string} track - Identifier of the sound/music defined in the 'sound_definitions.json'.
   * @param {string} selector - Selector for entities to music to play with.
   * @param {float} duration - Duration of the sound/music in seconds.
   * @param {Vector3} origin - Origin coordinates of the selector.
   * @param {float} volume - Volume of the sound/music. 
   * @param {float} pitch - Pitch of the sound/music. 
   */
  constructor(track, selector, duration, origin = new Vector3(), volume = defaultVolume, pitch = defaultPitch){
    this.track = track;
    this.selector = selector;
    this.duration = duration;
    this.durationTick = duration * TicksPerSecond;
    this.origin = origin;
    this.volume = volume;
    this.pitch = pitch;
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
      `teleport @s ${this.x} ${this.y} ${this.z} ${this.ry} ${this.rx}`
    );
  }
}

export class Fade {
  /**
   * @param {float} fadeIn - Fade in time in seconds.
   * @param {float} fadeHold - Fade hold time in seconds.
   * @param {float} fadeOut - Fade out time in seconds.
   */
  constructor(fadeIn, fadeHold, fadeOut) {
    this.fadeIn = fadeIn;
    this.fadeHold = fadeHold;
    this.fadeOut = fadeOut;
    this.duration = fadeIn + fadeHold + fadeOut;
    this.fadeInTick = fadeIn * TicksPerSecond;
    this.fadeHoldTick = fadeHold * TicksPerSecond;
    this.fadeOutTick = fadeOut * TicksPerSecond;
    this.durationTick = (fadeIn + fadeHold + fadeOut) * TicksPerSecond;
  }
}

export class Scene {
  /**
   * @param {Vector3|string} start - Starting point of the scene.
   * @param {Vector3|string} end - Ending point of the scene.
   * @param {string} facing - Coordinates or Selector of the subject of the scene.
   * @param {float} duration - Time in seconds for the camera to travel from start to end point.
   * @param {enum} ease - Ease type the scene will use.
   */
  constructor(start, end, facing, duration, ease = "linear", fade) {
    if (typeof start == "Vector3") {
      start = start.toString();
    }
    if (typeof end == "string") { 
      let location = end.split(' ');
      end = new Vector3(location[0], location[1], location[2])
    }
    if (typeof end == "Vector3") {
      end.y += 1.75; // Actual camera y-coordinate from player view.
      end = end.toString();
    }
    this.start = start;
    this.end = end;
    this.facing = facing;
    this.duration = duration;
    this.durationTick = duration * TicksPerSecond;
    this.ease = ease;
    this.fade = fade;
  }
}

export class TimedCommand {
  /**
   * @param {float} time - Time in seconds when to execute commands.
   * @param {string|string[]} command - Commands to run in specified time.
   */
  constructor(time, command) {
    this.time = time;
    this.timeTick = time * TicksPerSecond;
    this.command = command;
  }
}


export class Cutscene {
  /**
   * @param {string} name - Name and identifier of the cutscene.
   * @param {string} selector - The target entities to apply the scenes with.
   * @param {Scene[]} scenes - Scenes to play in order.
   * @param {bool} spectator - Option to use spectator mode in the cutscene.
   * @param {string[]} startFunction - Functions to run before playing the cutscene.
   * @param {string[]} endFunction - Functions to run after playing the cutscene.
   * @param {TimedCommand[]} timeline - Timeline of commands to be inserted.
   */

  checkpoints = [];
  constructor(
    name,
    selector,
    scenes,
    spectator = true,
    startFunction = ["testfor @s"],
    endFunction = ["testfor @s"],
    timeline
  ) {
    this.name = name;
    this.selector = selector;
    this.scenes = scenes;
    this.spectator = spectator;
    this.startFunction = startFunction;
    this.endFunction = endFunction;
    this.timeline = timeline;

    system.runInterval(() => {
      const runTrigger = utils.getEntities({
        type: "player",
        tags: [name],
      });

      if (runTrigger[0]) {
        this.run();
      }
    });
  }
  run() {
    if (this.spectator) {
      utils.serverCommandAsync(
        `execute as ${this.selector} if entity @s[m=adventure] run tag @s add adventure`,
        `execute as ${this.selector} if entity @s[m=creative] run tag @s add creative`,
        `execute as ${this.selector} if entity @s[m=survival] run tag @s add survival`,
        `gamemode spectator ${this.selector}`
      );
    }

    const entities = utils.getEntities(this.selector);
    entities.forEach((entity) => {
      this.checkpoints.push(new Checkpoint(entity));
    });

    utils.serverCommandAsync(`tag @a remove ${this.name}`, this.startFunction);
    // Execute Timed commands.
    this.timeline.forEach((timedCommand) => {
      system.runTimeout(() => {
        utils.serverCommandAsync(timedCommand.command)
      },timedCommand.timeTick )
    });
    // Execute scenes
    let delay = 0;
    this.scenes.forEach((scene, i) => {
      if (scene.fade) {
        system.runTimeout(() => {
          utils.serverCommandAsync(
            `camera ${this.selector} fade time ${scene.fade.fadeIn} ${scene.fade.fadeHold} ${scene.fade.fadeOut}`
          );
        }, delay);
      }

      delay += scene.fade ? scene.fade.fadeInTick : 0;

      system.runTimeout(() => {
        utils.serverCommandAsync(
          `camera ${this.selector} clear`,
          `teleport ${this.selector} ${scene.start} facing ${
            scene.facing
          }`,
        );
      }, delay);

      delay += 1 + (scene.fade ? scene.fade.fadeInTick + (scene.fade.fadeHoldTick - 20) : 0);

      system.runTimeout(() => {
        utils.serverCommandAsync(
          `camera ${this.selector} clear`,
          `camera ${this.selector} set minecraft:free ease ${scene.duration} ${
            scene.ease
          } pos ${scene.end} facing ${
            scene.facing
          }`
        );
      }, delay);

      delay += scene.durationTick;

      if (i + 1 === this.scenes.length) {
        system.runTimeout(() => {
          this.stop();
        }, delay + 1);
      }
    });
  }
  stop() {
    this.checkpoints.forEach((checkpoint) => {
      checkpoint.return();
    });
    if (this.spectator) {
      utils.serverCommandAsync(
        `execute as ${this.selector} if entity @s[tag=adventure] run gamemode adventure ${this.selector}`,
        `execute as ${this.selector} if entity @s[tag=adventure] run tag @s remove adventure`,
        `execute as ${this.selector} if entity @s[tag=creative] run gamemode creative ${this.selector}`,
        `execute as ${this.selector} if entity @s[tag=creative] run tag @s remove creative`,
        `execute as ${this.selector} if entity @s[tag=survival] run gamemode survival ${this.selector}`,
        `execute as ${this.selector} if entity @s[tag=survival] run tag @s remove survival`
      );
    }
    utils.serverCommandAsync(`camera ${this.selector} clear`, this.endFunction);
  }
}