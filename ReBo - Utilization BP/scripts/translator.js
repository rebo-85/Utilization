import { system, world, ScriptEventSource, Player, Entity, Dimension } from "@minecraft/server";
import content from "./content.js";

const offset = { x: 0, y: 0, z: 0, rx: 0, ry: 0 };

function initializePlayers(players) {
  players.forEach((player) => {
    player.commandRunAsync(
      "camera @s clear",
      "hud @s reset",
      "inputpermission set @s camera enabled",
      "inputpermission set @s movement enabled"
    );
  });
}
initializePlayers(world.getPlayers());

function handleCommand(dimension, command, completedCommands, time, epsilon) {
  if (Math.abs(command.time - time) <= epsilon && !completedCommands.has(command.time)) {
    try {
      dimension.commandRunAsync(...command.data_points);
      completedCommands.add(command.time);
    } catch (error) {
      world.sendMessage(`§6Error in command at time ${command.time}:\n§c${error.message}`);
    }
  }
}

function handleSound(content, time, completedSounds, epsilon) {
  for (const sound of content.sounds) {
    if (Math.abs(sound.time - time) <= epsilon && !completedSounds.has(sound.time)) {
      completedSounds.add(sound.time);
      return sound;
    }
  }
  return null;
}

function applyPlayerCamera(player, entity, finalPos, finalRot, tick) {
  const relativePos = finalPos.offset(-entity.location.x, -entity.location.y, -entity.location.z);

  const rotatedPos = rotatePosition(relativePos, entity.ry);

  const finalRotatedPos = rotatedPos.offset(entity.location);

  const adjustedRotX = finalRot.x + offset.rx;
  const adjustedRotY = normalizeRotation(finalRot.y + entity.ry + offset.ry);

  const cmd = `camera @s set minecraft:free ease ${tick} linear pos ${toCommandDecimal(
    finalRotatedPos.x + offset.x
  )} ${toCommandDecimal(finalRotatedPos.y + offset.y)} ${toCommandDecimal(
    finalRotatedPos.z + offset.z
  )} rot ${toCommandDecimal(adjustedRotX)} ${toCommandDecimal(adjustedRotY)}`;

  player.commandRun(cmd);
}
function restorePlayerState(player, gamemode, checkpoint) {
  player.commandRunAsync(
    "camera @s clear",
    "effect @s invisibility 0",
    "hud @s reset",
    "inputpermission set @s camera enabled",
    "inputpermission set @s movement enabled",
    `gamemode ${gamemode} @s`,
    `teleport @s ${checkpoint.location.x} ${checkpoint.location.y} ${checkpoint.location.z} ${checkpoint.rotation.y} ${checkpoint.rotation.x}`
  );
}

function runScene(source) {
  const dimension = source.dimension;
  const players = dimension.getEntities(content.playerOption);
  const entities = dimension.getEntities(content.entityOption);

  if (entities.length !== 1) {
    world.sendMessage(`§cExpected 1 model entity, found ${entities.length}. Skipping scene.`);
    return;
  }

  const entity = entities[0];
  const gamemodes = new Map();
  const checkpoints = new Map();
  const completedCommands = new Set();
  const completedSounds = new Set();

  entity.playAnimation(content.animationId);

  players.forEach((player) => {
    gamemodes.set(player.id, player.gamemode);
    checkpoints.set(player.id, { location: player.location, rotation: player.rotation });
    player.commandRunAsync(
      "camera @s clear",
      "effect @s invisibility infinite 1 true",
      "hud @s hide all",
      "inputpermission set @s camera disabled",
      "inputpermission set @s movement disabled",
      "gamemode spectator @s"
    );
  });

  let time = 0;
  let tps = 20;
  let lastUpdateTime = null;

  function updateScene() {
    const currentTime = Date.now();

    let elapsedTime;
    if (lastUpdateTime === null) {
      elapsedTime = 1 / tps;
    } else {
      elapsedTime = (currentTime - lastUpdateTime) / 1000;
    }
    lastUpdateTime = currentTime;

    tps = 1 / elapsedTime;
    const tick = 1 / tps;
    time += tick;

    // Interpolation logic (position and rotation)
    const finalPos = calculateFinalPosition(entity, time);
    const finalRot = calculateFinalRotation(entity, time);

    // Handle commands and sounds
    content.commands.forEach((command) => handleCommand(dimension, command, completedCommands, time, 0.05));
    const currentSound = handleSound(content, time, completedSounds, 0.05);

    // Apply camera and sound to players
    players.forEach((player) => {
      const playerPos = finalPos.offset(0.0, -1.62, 0.0);
      player.teleport(playerPos, { rotation: { x: finalRot.x, y: finalRot.y } });
      applyPlayerCamera(player, entity, finalPos, finalRot, tick);

      if (currentSound) currentSound.data_points.forEach((sound) => player.playSound(sound));
    });

    // Restore player state if the scene is finished
    if (time >= content.length) {
      players.forEach((player) => {
        restorePlayerState(player, gamemodes.get(player.id), checkpoints.get(player.id));
      });
      console.warn("end of scene reached, restoring player states");
      console.warn(tick);
      system.runTimeout(() => system.clearRun(scene), 1);
    } else {
      scene = system.run(updateScene);
    }
  }

  let scene = system.run(updateScene);
}

system.afterEvents.scriptEventReceive.subscribe((e) => {
  const source = e.sourceType === ScriptEventSource.Entity ? e.sourceEntity : e.initiator;
  if (e.id === content.sceneId) runScene(source);
});
// -- UTILITY FUNCTIONS --
function toCommandDecimal(value) {
  const num = Number(value);
  return num % 1 === 0 ? num.toFixed(1) : num.toFixed(16);
}

function rotatePosition(pos, angleDegrees) {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);

  const rotatedX = pos.x * cos - pos.z * sin;
  const rotatedZ = pos.x * sin + pos.z * cos;

  return new Vector3(rotatedX, pos.y, rotatedZ);
}
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

function normalizeRotation(rotation) {
  return ((rotation + 180) % 360) - 180;
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

function calculateFinalPosition(entity, time) {
  const keyframes = content.positions || []; // Use 'positions' from content.js
  const coords = entity.coordinates;

  if (keyframes.length === 0) return entity.location; // No keyframes, return current location

  const [startFrame, endFrame] = getKeyframePair(keyframes, time);
  const posStart = new Vector3(startFrame.data_points).offset(coords);
  const posEnd = new Vector3(endFrame.data_points).offset(coords);
  if (!startFrame || !endFrame) return entity.location;

  const t = (time - startFrame.time) / (endFrame.time - startFrame.time);
  const easedT = applyEasing(t, startFrame.interpolation || "linear");

  return lerpVector3(posStart, posEnd, easedT);
}

function calculateFinalRotation(entity, time) {
  const keyframes = content.rotations || []; // Use 'rotations' from content.js
  if (keyframes.length === 0) return entity.rotation; // No keyframes, return current rotation

  const [startFrame, endFrame] = getKeyframePair(keyframes, time);
  if (!startFrame || !endFrame) return entity.rotation;

  const t = (time - startFrame.time) / (endFrame.time - startFrame.time);
  const easedT = applyEasing(t, startFrame.interpolation || "linear");

  return {
    x: lerp(startFrame.data_points.x, endFrame.data_points.x, easedT),
    y: lerp(startFrame.data_points.y, endFrame.data_points.y, easedT),
  };
}

async function runCommandAsync(context, commands) {
  const result = { successCount: 0 };

  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    const cr = await context.runCommandAsync(command);
    if (cr.successCount > 0) {
      result.successCount++;
    }
  });

  await Promise.all(commandPromises);

  return result;
}
function runCommand(context, commands) {
  const result = { successCount: 0 };

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    const cr = context.runCommand(command);
    if (cr.successCount > 0) {
      result.successCount++;
    }
  });

  return result;
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
  configurable: true,
});
Object.defineProperty(Entity.prototype, "commandRun", {
  value: async function (...commands) {
    return runCommand(this, commands);
  },
  configurable: true,
});

Object.defineProperty(Dimension.prototype, "commandRun", {
  value: async function (...commands) {
    return runCommand(this, commands);
  },
  configurable: true,
});

Object.defineProperty(Entity.prototype, "commandRunAsync", {
  value: async function (...commands) {
    return await runCommandAsync(this, commands);
  },
  configurable: true,
});

Object.defineProperty(Dimension.prototype, "commandRunAsync", {
  value: async function (...commands) {
    return await runCommandAsync(this, commands);
  },
  configurable: true,
});

Object.defineProperty(Player.prototype, "gamemode", {
  get: function () {
    return this.getGameMode();
  },
  set: function (gamemode) {
    this.setGamemode(gamemode);
  },
  enumerable: true,
  configurable: true,
});

Object.defineProperty(Entity.prototype, "rotation", {
  get: function () {
    return new Vector2(this.getRotation().x, this.getRotation().y);
  },
  set: function (rotation) {
    this.setRotation(rotation);
  },
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "rx", {
  get: function () {
    return this.rotation.x;
  },
  set: function (rx) {
    this.setRotation({ x: rx, y: this.rotation.y });
  },
  enumerable: true,
});

Object.defineProperty(Entity.prototype, "ry", {
  get: function () {
    return this.rotation.y;
  },
  set: function (ry) {
    this.setRotation({ x: this.rotation.x, y: ry });
  },
  enumerable: true,
});
