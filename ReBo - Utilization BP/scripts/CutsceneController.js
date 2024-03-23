import { utils, Vector3, Checkpoint } from "Utils";
import { Entity, Player, system } from "@minecraft/server";

class Scene {
  /**
   * @param {Vector3} start - Starting point of the scene.
   * @param {Vector3} end - Ending point of the scene.
   * @param {string} facing - Coordinates or Selector of the subject of the scene.
   * @param {float} duration - Time in seconds for the camera to travel from start to end point.
   * @param {enum} ease - Ease type the scene will use.
   */
  constructor(start, end, facing, duration, ease = 'linear') {
    this.start = start;
    this.end = end;
    this.facing = facing;
    this.duration = duration;
    this.ease = ease;
  }
}

class Cutscene {
  /**
   * @param {string} name - Name and identifier of the cutscene.
   * @param {string} selector - The target entities to apply the scenes with.
   * @param {Scene[]} scenes - Scenes to play in order.
   * @param {bool} spectator - Option to use spectator mode in the cutscene.
   * @param {string[]} startFunction - Functions to run before playing the cutscene.
   * @param {string[]} endFunction - Functions to run after playing the cutscene.
   */

  checkpoints = [];
  constructor(
    name,
    selector,
    scenes,
    spectator = true,
    startFunction = ["testfor @s"],
    endFunction = ["testfor @s"]
  ) {
    this.name = name;
    this.selector = selector;
    this.scenes = scenes;
    this.spectator = spectator;
    this.startFunction = startFunction;
    this.endFunction = endFunction;

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

    const entities = utils.getEntities(utils.selectorToEntityQueryOptions(this.selector));
    entities.forEach(entity => {
      this.checkpoints.push(new Checkpoint(entity));
    });

    utils.serverCommandAsync(
      `tag @a remove ${this.name}`, 
      this.startFunction
      );

    let delay = 0;
    this.scenes.forEach((scene, i) => {
      system.runTimeout(() => {
        utils.serverCommandAsync(
          `teleport ${this.selector} ${scene.start.toString()} facing ${
            scene.facing
          }`
        );
      }, delay);

      system.runTimeout(() => {
        utils.serverCommandAsync(
          `camera ${this.selector} clear`,
          `camera ${this.selector} set minecraft:free ease ${scene.duration} ${
            scene.ease
          } pos ${scene.end.x} ${scene.end.y + 1.75} ${scene.end.z} facing ${
            scene.facing
          }`
        );
      }, delay + 1);
      delay += scene.duration * 20;

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
    })
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
    utils.serverCommandAsync(
      `camera ${this.selector} clear`,
      this.endFunction
    );
  }
}


const cutscene1 = [
  new Scene(
    new Vector3(-90, 68, -98),
    new Vector3(-90, 68, -109),
    new Vector3(-81, 66, -103).toString(),
    2.0
  ),
  new Scene(
    new Vector3(-90, 68, -109),
    new Vector3(-90, 68, -98),
    new Vector3(-81, 66, -103).toString(),
    2.0
  ),
  new Scene(
    new Vector3(-75, 68, -116),
    new Vector3(-90, 68, -98),
    new Vector3(-81, 66, -103).toString(),
    2.0
  ),
];

class CutsceneController {
  constructor() {

    new Cutscene('cutscene1', '@a', cutscene1)
    
  }
}
export const cutsceneController = new CutsceneController();
