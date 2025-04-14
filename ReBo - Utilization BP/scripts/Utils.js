import { Entity, world } from "@minecraft/server";

export function lerpVector(a, b, t) {
  if (a instanceof Vector3 && b instanceof Vector3) {
    return lerpVector3(a, b, t); // Use 3D lerp
  } else if (a instanceof Vector2 && b instanceof Vector2) {
    return lerpVector2(a, b, t); // Use 2D lerp
  }
  throw new Error("Vectors must be either Vector2 or Vector3");
}

function lerpVector3(a, b, t) {
  return new Vector3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
}

function lerpVector2(a, b, t) {
  return new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
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
}

Object.defineProperty(Entity.prototype, "coordinates", {
  get: function () {
    return new Vector3(Math.floor(this.location.x), Math.floor(this.location.y), Math.floor(this.location.z));
  },
  enumerable: true,
});
