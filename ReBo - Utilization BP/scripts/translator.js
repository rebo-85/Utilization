import { system, world, ScriptEventSource, Player, Entity } from "@minecraft/server";
import content from "./Content";

function load() {
  for (const player of world.getAllPlayers()) {
    player.commandRun(
      "camera @s clear",
      "hud @s reset",
      "inputpermission set @s camera enabled",
      "inputpermission set @s movement enabled"
    );
  }
}

function runScene(source) {
  const { positions, rotations } = content;
  const dimension = source.dimension;
  const players = dimension.getEntities(content.playerOption);
  const entities = dimension.getEntities(content.entityOption);

  if (entities.length !== 1) {
    world.sendMessage(
      `§cExpected 1 model entity: '${content.entityOption.type}', found ${entities.length}. Skipping scene.`
    );
    return;
  }

  const entity = entities[0];

  const gamemodes = new Map();
  for (const player of players) {
    gamemodes.set(player.id, player.gamemode);
    player.commandRun(
      "camera @s clear",
      "effect @s invisibility infinite 1 true",
      "hud @s hide all",
      "inputpermission set @s camera disabled",
      "inputpermission set @s movement disabled",
      "gamemode spectator @s"
    );

    entity.playAnimation(content.animationId);

    let time = 0;
    const tps = 20;
    const intervalId = system.runInterval(() => {
      time += 1 / tps;

      // -- POSITION INTERPOLATION --
      const [posA, posB] = getKeyframePair(positions, time);
      const posT = (time - posA.time) / (posB.time - posA.time);
      const easedPosT = applyEasing(Math.min(posT, 1), posA.interpolation);

      const coords = entity.coordinates;
      const posStart = new Vector3(posA.data_points).offset(coords);
      const posEnd = new Vector3(posB.data_points).offset(coords);

      const finalPos = posA.interpolation === "step" ? posStart : lerpVector(posStart, posEnd, easedPosT);

      // -- ROTATION INTERPOLATION --
      const [rotA, rotB] = getKeyframePair(rotations, time);
      const rotT = (time - rotA.time) / (rotB.time - rotA.time);
      const easedRotT = applyEasing(Math.min(rotT, 1), rotA.interpolation);

      const rotStart = new Vector2(+rotA.data_points.x, +rotA.data_points.y);
      const rotEnd = new Vector2(+rotB.data_points.x, +rotB.data_points.y);
      let finalRot = rotA.interpolation === "step" ? rotStart : lerpVector(rotStart, rotEnd, easedRotT);

      const threshold = 1e-6; // Small threshold for rounding
      finalRot.x = Math.abs(finalRot.x) < threshold ? 0 : finalRot.x;
      finalRot.y = Math.abs(finalRot.y) < threshold ? 0 : finalRot.y;

      if (Math.abs(finalRot.x) < threshold) finalRot.x = 0;
      if (Math.abs(finalRot.y) < threshold) finalRot.y = 0;

      // -- APPLY TO PLAYER --
      player.teleport(finalPos);

      const toCommandDecimal = (value) => {
        const num = Number(value);
        return num % 1 === 0 ? num.toFixed(1) : num.toFixed(4);
      };

      const cmd = `camera @s set minecraft:free ease 0.05 linear pos ${toCommandDecimal(finalPos.x)} ${toCommandDecimal(
        finalPos.y
      )} ${toCommandDecimal(finalPos.z)} rot ${finalRot.x} ${finalRot.y}`;

      player.runCommand(cmd);

      // -- END --
      if (time > positions.at(-1).time && time > rotations.at(-1).time) {
        system.runTimeout(() => {
          system.clearRun(intervalId);
          const gamemode = gamemodes.get(player.id);
          player.commandRun(
            "camera @s clear",
            "effect @s invisibility 0",
            "hud @s reset",
            "inputpermission set @s camera enabled",
            "inputpermission set @s movement enabled",
            `gamemode ${gamemode} @s`
          );
        }, 1);
      }
    }, 1);
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

// -- UTILITY FUNCTIONS --
function getKeyframePair(frames, t) {
  let left = 0,
    right = frames.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (frames[mid].time < t) left = mid + 1;
    else right = mid;
  }
  return [frames[left - 1] || frames[left], frames[left]];
}

function lerpVector(a, b, t) {
  if (a instanceof Vector3 && b instanceof Vector3) {
    return lerpVector3(a, b, t); // Use 3D lerp
  } else if (a instanceof Vector2 && b instanceof Vector2) {
    return lerpVector2(a, b, t); // Use 2D lerp
  }
  throw new Error("Vectors must be either Vector2 or Vector3");
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpVector3(a, b, t) {
  const x = lerp(a.x, b.x, t);
  const y = lerp(a.y, b.y, t);
  const z = lerp(a.z, b.z, t);
  return new Vector3(x, y, z);
}

function lerpVector2(a, b, t) {
  const x = lerp(a.x, b.x, t);
  const y = lerp(a.y, b.y, t);
  return new Vector2(x, y);
}

function applyEasing(t, mode = "linear") {
  switch (mode) {
    case "easeIn":
      return t * t;
    case "easeOut":
      return t * (2 - t);
    case "easeInOut":
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t;
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

  normalized() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Vector2(this.x / length, this.y / length);
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

  normalized() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }
}

Object.defineProperty(Entity.prototype, "coordinates", {
  get: function () {
    return new Vector3(Math.floor(this.location.x), Math.floor(this.location.y), Math.floor(this.location.z));
  },
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "commandRun", {
  value: function (...commands) {
    const flattenedCommands = commands.flat(); // Still works if nested arrays or single list

    const result = { successCount: 0 };

    for (const command of flattenedCommands) {
      const cr = this.runCommand(command);
      if (cr.successCount > 0) result.successCount++;
    }

    return result;
  },
  enumerable: true,
});

Object.defineProperty(Player.prototype, "gamemode", {
  get: function () {
    return this.getGameMode();
  },
  set: function (gamemode) {
    this.setGamemode(gamemode);
  },
  enumerable: true,
});

load();
