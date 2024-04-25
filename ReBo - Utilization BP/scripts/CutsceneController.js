import { utils, Vector3, Checkpoint } from "Utils";
import { Entity, Player, system } from "@minecraft/server";

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

class Fade {
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
    this.fadeInTick = fadeIn * 20;
    this.fadeHoldTick = fadeHold * 20;
    this.fadeOutTick = fadeOut * 20;
    this.durationTick = (fadeIn + fadeHold + fadeOut) * 20;
  }
}

class Scene {
  /**
   * @param {Vector3} start - Starting point of the scene.
   * @param {Vector3} end - Ending point of the scene.
   * @param {string} facing - Coordinates or Selector of the subject of the scene.
   * @param {float} duration - Time in seconds for the camera to travel from start to end point.
   * @param {enum} ease - Ease type the scene will use.
   */
  constructor(start, end, facing, duration, ease = 'linear', fade) {
    this.start = start;
    this.end = end;
    this.facing = facing;
    this.duration = duration;
    this.durationTick = duration * 20;
    this.ease = ease;
    this.fade = fade;
  }
}

class TimedCommand {
  /**
   * @param {float} time - Time in seconds when to execute commands.
   * @param {String|String[]} command - Commands to run in specified time.
   */
  constructor(time, command) {
    this.time = time;
    this.timeTick = time * 20;
    this.command = command;
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

    const entities = utils.getEntities(
      utils.selectorToEntityQueryOptions(this.selector)
    );
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
          `teleport ${this.selector} ${scene.start.toString()} facing ${
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
          } pos ${scene.end.x} ${scene.end.y + 1.75} ${scene.end.z} facing ${
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

const cutscene1Timeline = [
  new TimedCommand(4.0, [
    "event entity @e[family=cinematic] e:add-instant_despawn",
    "playsound music.intro @a",
    "summon eternal:fawk_cinematic 49962 181 -267 facing @p",
  ]),
  new TimedCommand(12.1, [
    "event entity @e[family=cinematic] e:add-instant_despawn",
    "execute as @p positioned 50080 135 288 run event entity @e[type=eternal:snail,r=20] e:add-instant_despawn",
    "execute as @p positioned 50080 135 288 run summon eternal:snail",
    "execute as @p positioned 50069.32 166.62 300.47 run event entity @e[type=eternal:pixie,r=20] e:add-instant_despawn",
    "execute as @p positioned 50069.32 166.62 300.47 run summon eternal:pixie",
    "execute as @p positioned 50057.74 168.27 301.34 run event entity @e[type=eternal:butterfly,r=20] e:add-instant_despawn",
    "execute as @p positioned 50057.74 168.27 301.34 run summon eternal:butterfly",
    "execute as @p positioned 50057.74 168.27 301.34 run summon eternal:butterfly",
  ]),
  new TimedCommand(23.1, [
    "execute as @p positioned 49217 133 -130 run event entity @e[type=eternal:golden_pony,r=20] e:add-instant_despawn",
    "execute as @p positioned 49217 133 -130 run summon eternal:golden_pony",
    "execute as @p positioned 49217 133 -130 run summon eternal:golden_pony",
  ]),
  new TimedCommand(29.1, [
    "execute as @p positioned 49871 130 -797 run event entity @e[family=white_deer,r=20] e:add-instant_despawn",
    "execute as @p positioned 49870 130 -797 run summon eternal:female_white_deer",
    "execute as @p positioned 49871 130 -797 run summon eternal:male_white_deer",
  ]),

  new TimedCommand(37.1, [
    "execute as @p positioned 50432 142 -417 run event entity @e[type=eternal:rhino,r=20] e:add-instant_despawn",
    "execute as @p positioned 50432 142 -417 run summon eternal:rhino",
  ]),
];

const cutscene1 = [
    new Scene(
      new Vector3(49951.94, 171.28, -248.87),
      new Vector3(49950.34, 178.41, -260.84),
      new Vector3(49943, 195, -309).toString(),
      7.0,
    "in_sine",
    new Fade(0.5, 3.5, 0.5)
    ),
  new Scene(
    new Vector3(50094.03, 123.56, 271.57),
    new Vector3(50050.95, 166.77, 286.06),
    new Vector3(50080, 163, 357).toString(),
    7.0,
    "in_out_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    new Vector3(49263.8, 102.12, -180.28),
    new Vector3(49226.62, 147.87, -122.78),
    new Vector3(49160.68, 119.27, -177.89).toString(),
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    new Vector3(49875.24, 118.19, -776.02),
    new Vector3(49857.2, 183.81, -833.16),
    new Vector3(49824.42, 128.81, -937.28).toString(),
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    new Vector3(50421.54, 138.14, -406.23),
    new Vector3(50457.87, 147.52, -400.49),
    new Vector3(50439.48, 117.82, -447.68).toString(),
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
];

class CutsceneController {
  constructor() {
    new Cutscene(
      "cutscene1",
      "@a",
      cutscene1,
      true,
      [
        "title @a title eternal.cutscene.ui",
        "scoreboard players set @a s-intro 730",
        "tag @a add stop_sequence",
        "inputpermission set @a camera disabled",
        "inputpermission set @a movement disabled",
      ],
      [
        "inputpermission set @a camera enabled",
        "inputpermission set @a movement enabled",
        "tag @a remove stop_sequence",
      ],
      cutscene1Timeline
    );
  }
}
export const cutsceneController = new CutsceneController();
