import { Scene, Fade, TimedCommand } from "Modules";

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
    this.fadeInTick = fadeIn * TicksPerSecond;
    this.fadeHoldTick = fadeHold * TicksPerSecond;
    this.fadeOutTick = fadeOut * TicksPerSecond;
    this.durationTick = (fadeIn + fadeHold + fadeOut) * TicksPerSecond;
  }
}

class Scene {
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
      let location = end.split(" ");
      end = new Vector3(location[0], location[1], location[2]);
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
  constructor(name, selector, scenes, spectator = true, startFunction = ["testfor @s"], endFunction = ["testfor @s"], timeline) {
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
        utils.serverCommandAsync(timedCommand.command);
      }, timedCommand.timeTick);
    });
    // Execute scenes
    let delay = 0;
    this.scenes.forEach((scene, i) => {
      if (scene.fade) {
        system.runTimeout(() => {
          utils.serverCommandAsync(`camera ${this.selector} fade time ${scene.fade.fadeIn} ${scene.fade.fadeHold} ${scene.fade.fadeOut}`);
        }, delay);
      }

      delay += scene.fade ? scene.fade.fadeInTick : 0;

      system.runTimeout(() => {
        utils.serverCommandAsync(`camera ${this.selector} clear`, `teleport ${this.selector} ${scene.start} facing ${scene.facing}`);
      }, delay);

      delay += 1 + (scene.fade ? scene.fade.fadeInTick + (scene.fade.fadeHoldTick - 20) : 0);

      system.runTimeout(() => {
        utils.serverCommandAsync(
          `camera ${this.selector} clear`,
          `camera ${this.selector} set minecraft:free ease ${scene.duration} ${scene.ease} pos ${scene.end} facing ${scene.facing}`
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
  new TimedCommand(0.0, ["effect @a blindness 0 0", "playsound eternal.jingle @a"]),
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
  new Scene("49951.94 171.28 -248.87", "49950.34 178.41 -260.84", "49943 195 -309", 7.0, "in_sine", new Fade(0.0, 4.0, 0.5)),
  new Scene("50094.03 123.56 271.57", "50050.95 166.77 286.06", "50080 163 357", 7.0, "in_out_sine", new Fade(0.5, 1.5, 0.5)),
  new Scene("49263.8 102.12 -180.28", "49226.62 147.87 -122.78", "49160.68 119.27 -177.89", 7.0, "in_sine", new Fade(0.5, 1.5, 0.5)),
  new Scene("49875.24 118.19 -776.02", "49857.2 183.81 -833.16", "49824.42 128.81 -937.28", 7.0, "in_sine", new Fade(0.5, 1.5, 0.5)),
  new Scene("50421.54 138.14 -406.23", "50457.87 147.52 -400.49", "50439.48 117.82 -447.68", 7.0, "in_sine", new Fade(0.5, 1.5, 0.5)),
];

class CutsceneController {
  constructor() {
    new Cutscene(
      "cutscene1",
      "@a",
      cutscene1,
      true,
      [
        "tag @a add stop_sequence",
        "title @a title eternal.cutscene.ui",
        "scoreboard players set @a s-intro 730",
        "inputpermission set @a camera disabled",
        "inputpermission set @a movement disabled",
        "title @a actionbar eternal.actionbar.hide",
        "event entity @e[type=eternal:pointer] e:add-instant_despawn",
        "event entity @e[type=eternal:theia_guide] e:add-instant_despawn",
      ],
      ["effect @a blindness 0 0", "inputpermission set @a camera enabled", "inputpermission set @a movement enabled", "tag @a remove stop_sequence"],
      cutscene1Timeline
    );
  }
}
export const cutsceneController = new CutsceneController();
