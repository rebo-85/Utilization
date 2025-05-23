import { Entity, Player } from "@minecraft/server";

export function getKeyframePair(frames, t) {
  let left = 0,
    right = frames.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (frames[mid].time < t) left = mid + 1;
    else right = mid;
  }
  return [frames[left - 1] || frames[left], frames[left]];
}

export function lerpVector(a, b, t) {
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

function normalizeVector3(vec) {
  const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  if (length === 0) return { x: 0, y: 0, z: 0 };
  return {
    x: vec.x / length,
    y: vec.y / length,
    z: vec.z / length,
  };
}

export function directionToYawPitch(vec) {
  const dir = normalizeVector3(vec);

  const yaw = Math.atan2(-dir.x, -dir.z) * (180 / Math.PI);
  const pitch = Math.asin(-dir.y) * (180 / Math.PI);

  return new Vector2(pitch, yaw); // x = pitch, y = yaw
}

export function applyEasing(t, mode = "linear") {
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

export class Vector2 {
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

export class Vector3 extends Vector2 {
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
