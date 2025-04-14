import { system, world, ScriptEventSource } from "@minecraft/server";
import content from "./Content";

function load() {
  // On script load
  for (const player of world.getAllPlayers()) {
    player.runCommand("camera @s clear");
    player.inputPermissions.cameraEnabled = true;
    player.inputPermissions.movementEnabled = true;

    // player.runCommand("camera @s set minecraft:free ease 10 linear pos 0 0 10");

    // system.runTimeout(() => {
    //   player.runCommand("camera @s set minecraft:free ease 10 linear pos 0 0 1");
    // }, 100);
  }
}
load();

function runScene(source) {
  const { positions, rotations, times } = content;
  const dimension = source.dimension;
  let previousPosition = positions[0].data_points;
  let previousRotation = rotations[0].data_points;

  let previousTime = 0;
  let completedTimeouts = 0;
  const cameraOffset = 1.62001; // Y-offset of the camera from the player's feet
  const players = dimension.getEntities(content.playerOption);
  const entities = dimension.getEntities(content.entityOption);

  if (entities.length === 0) {
    world.sendMessage("§cCannot find model entity, skipping the scene.");
    return;
  } else if (entities.length > 1) {
    world.sendMessage("§cMultiple model entities found, skipping the scene.");
    return;
  }

  const entity = entities[0];

  for (const player of players) {
    // On scene start
    player.runCommand("camera @s clear");
    player.runCommand("effect @s invisibility infinite 1 true");
    player.inputPermissions.cameraEnabled = false;
    player.inputPermissions.movementEnabled = false;

    entity.rotation = new Vector2(0, 0);
    entity.playAnimation(content.animationId);

    for (const time of times) {
      system.runTimeout(() => {
        if (player) {
          const position = positions.find((v) => v.time === time);
          const rotation = rotations.find((v) => v.time === time);

          if (position) {
            const newDataPoints = new Vector3(position.data_points).offset(entity.cx, entity.cy, -entity.cz);
            previousPosition = newDataPoints;
            previousPosition = previousPosition.offset(0, cameraOffset, 0);
            player.teleport(newDataPoints);
          }

          if (rotation) previousRotation = rotation.data_points;

          const { x, y, z } = previousPosition;
          const { x: rx, y: ry } = previousRotation;
          const addDecimal = (num) => (num % 1 === 0 ? `${num}.0` : `${num}`);

          const command = `camera @s set minecraft:free ease ${time - previousTime} linear pos ${addDecimal(
            x
          )} ${addDecimal(y)} ${addDecimal(-z)} rot ${rx} ${ry}`;

          console.log(command);

          player.runCommand(command);
          previousTime = time;
        }

        completedTimeouts++;
        if (completedTimeouts === times.length) {
          system.runTimeout(() => {
            // On scene end
            player.runCommand("camera @s clear");
            player.runCommand("effect @s invisibility 0");
            player.inputPermissions.cameraEnabled = true;
            player.inputPermissions.movementEnabled = true;

            previousPosition = positions[0].data_points;
            previousRotation = rotations[0].data_points;
            previousTime = 0;
            completedTimeouts = 0;
          }, time - previousTime + 1);
        }
      }, time * 20);
    }
  }
}

class Vector2 {
  constructor(x, y) {
    if (typeof x === "object" && x !== null && "x" in x && "y" in x) {
      this.x = x.x;
      this._y = x.y;
      this.z = x.z !== undefined ? x.z : x.y;
    } else {
      this.x = x;
      this._y = y;
      this.z = y;
    }
  }

  set y(value) {
    this._y = value;
    this.z = value;
  }

  get y() {
    return this._y;
  }
  toString() {
    return `${this.x} ${this.y}`;
  }

  offset(x, y) {
    if (typeof x === "object" && x !== null && "x" in x && "y" in x) {
      return new Vector2(this.x + x.x, this.y + x.y);
    }
    return new Vector2(this.x + x, this.y + y);
  }

  check(x, y) {
    return this.x === x && this.y === y;
  }
}

class Vector3 extends Vector2 {
  constructor(x, y, z) {
    if (typeof x === "object" && x !== null && "x" in x && "y" in x) {
      super(x.x, x.y);
      this.z = x.z !== undefined ? x.z : x.y; // Initialize z if provided, otherwise use y
    } else {
      super(x, y);
      this.z = z;
    }
  }

  offset(x, y, z) {
    if (typeof x === "object" && x !== null && "x" in x && "y" in x) {
      return new Vector3(this.x + x.x, this.y + x.y, this.z + (x.z !== undefined ? x.z : x.y));
    }
    return new Vector3(this.x + x, this.y + y, this.z + z);
  }

  check(x, y, z) {
    return this.x === x && this.y === y && this.z === z;
  }

  toVector2() {
    return new Vector2(this.x, this.y);
  }

  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }

  belowCenter() {
    const x = this._roundToNearestHalf(this.x);
    const y = this.y;
    const z = this._roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  center() {
    const x = this._roundToNearestHalf(this.x);
    const y = this._roundToNearestHalf(this.y);
    const z = this._roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  sizeCenter() {
    const x = Math.floor(this.x / 2);
    const y = Math.floor(this.z / 2);
    const z = Math.floor(this.z / 2);
    return new Vector3(x, y, z);
  }

  sizeBelowCenter() {
    const x = Math.floor(this.x / 2);
    const y = 0;
    const z = Math.floor(this.z / 2);
    return new Vector3(x, y, z);
  }

  _roundToNearestHalf(value) {
    return Math.round(value * 2) / 2;
  }
}

system.afterEvents.scriptEventReceive.subscribe((e) => {
  let source;
  switch (e.sourceType) {
    case ScriptEventSource.Block:
      source = e.sourceBlock;
      break;
    case ScriptEventSource.Entity:
      source = e.sourceEntity;
      break;
    case ScriptEventSource.NPCDialogue:
      source = e.initiator;
      break;
    default:
      return;
  }

  switch (e.id) {
    case content.sceneId:
      runScene(source);
      break;

    default:
      break;
  }
});
