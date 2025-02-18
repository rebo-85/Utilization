import { EquipmentSlot, ItemComponentTypes, system, world } from "@minecraft/server";
import {} from "./server";
import {} from "./javascript";
import { runInterval, runTimeout } from "./utils";
import { overworld, tps, namespace as ns } from "./constants";

export class CommandResult {
  constructor() {
    this.successCount = 0;
  }
}

export class Fade {
  /**
   * Creates an instance of a Fade.
   * @param {float} fadeIn
   * @param {float} fadeHold
   * @param {float} fadeOut
   */
  constructor(fadeIn, fadeHold, fadeOut) {
    this.fadeIn = fadeIn;
    this.fadeHold = fadeHold;
    this.fadeOut = fadeOut;
  }
}

export class Event {
  constructor() {}
}

export class AfterEvent extends Event {
  constructor() {
    super();
  }
}

export class BeforeEvent extends Event {
  constructor() {
    super();
    this.cancel = false;
  }
}
export class EntityAfterEvent extends AfterEvent {
  constructor(entity) {
    super();
    this.entity = entity;
  }
}
export class EntityOnAirAfterEvent extends EntityAfterEvent {
  constructor(entity) {
    super(entity);
  }
}

export class EntityOnGroundAfterEvent extends EntityAfterEvent {
  constructor(entity) {
    super(entity);
  }
}
export class PlayerAfterEvent extends AfterEvent {
  constructor(player) {
    super();
    this.player = player;
  }
}
export class PlayerJumpAfterEvent extends PlayerAfterEvent {
  constructor(player) {
    super(player);
  }
}
export class PlayerStartJumpingAfterEvent extends PlayerJumpAfterEvent {
  constructor(player) {
    super(player);
  }
}

export class PlayerStopJumpingAfterEvent extends PlayerJumpAfterEvent {
  constructor(player) {
    super(player);
  }
}
export class PlayerOnAirJumpAfterEvent extends PlayerJumpAfterEvent {
  constructor(player) {
    super(player);
  }
}

export class PlayerOnLandAfterEvent extends PlayerAfterEvent {
  constructor(player) {
    super(player);
  }
}

export class ItemAfterEvent extends PlayerAfterEvent {
  constructor(player, itemStack) {
    super(player);
    this.itemStack = itemStack;
  }
}
export class PlayerOnEquipAfterEvent extends ItemAfterEvent {
  constructor(player, itemStack) {
    super(player, itemStack);
  }
}

export class PlayerOnUnequipAfterEvent extends ItemAfterEvent {
  constructor(player, itemStack) {
    super(player, itemStack);
  }
}

export class playerCollectItemAfterEvent extends ItemAfterEvent {
  constructor(player, itemStack) {
    super(player, itemStack);
  }
}

export class EventSignal {
  constructor() {
    this._events = new Map();
    this._process = null;
  }
  subscribe(cb) {
    cb();
  }
  unsubscribe() {
    this._process.dispose();
  }
}

export class EntityEventSignal extends EventSignal {
  constructor() {
    super();
    this._entityIds = new Set();
  }
}

export class EntityItemEventSignal extends EntityEventSignal {
  constructor() {
    super();
    this._items = new Set();
  }
}

export class EntityOnAirAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }
  subscribe(cb) {
    this._process = runInterval(() => {
      for (const entity of world.getEntities()) {
        if (!entity.isOnGround && !this._entityIds.has(entity.id)) {
          this._entityIds.add(entity.id);
          this._events.set(entity.id, new EntityOnAirAfterEvent(entity));
          cb(this._events.get(entity.id));
        } else if (entity.isOnGround && this._entityIds.has(entity.id)) {
          this._events.delete(entity.id);
          this._entityIds.delete(entity);
        }
      }
    });
  }
}

export class EntityOnGroundAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }
  subscribe(cb) {
    this._process = runInterval(() => {
      for (const entity of world.getEntities()) {
        if (entity.isOnGround && !this._entityIds.has(entity.id)) {
          this._entityIds.add(entity);
        } else if (!entity.isJumping && this._entityIds.has(entity.id)) {
          this._events.set(entity.id, new EntityOnGroundAfterEvent(entity));
          cb(this._events.get(entity.id));
          this._events.delete(entity.id);
          this._entityIds.delete(entity.id);
        }
      }
    });
  }
}

export class PlayerJumpAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }
  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        if (player.isJumping && !player.isOnGround && !this._entityIds.has(player.id)) {
          this._entityIds.add(player.id);
          this._events.set(player.id, new PlayerJumpAfterEvent(player));
          cb(this._events.get(player.id));
        } else if (player.isOnGround && this._entityIds.has(player.id)) {
          this._entityIds.delete(player.id);
          this._events.delete(player.id);
        }
      }
    });
  }
}

export class PlayerStartJumpingAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }
  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        if (player.isJumping && !player.isOnGround && !this._entityIds.has(player.id)) {
          this._entityIds.add(player.id);
          this._events.set(player.id, new PlayerJumpAfterEvent(player));
          cb(this._events.get(player.id));
        } else if (!player.isJumping && this._entityIds.has(player.id)) {
          this._entityIds.delete(player.id);
          this._events.delete(player.id);
        }
      }
    });
  }
}

export class PlayerStopJumpingAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }
  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        if (player.isJumping && !player.isOnGround && !this._entityIds.has(player.id)) {
          this._entityIds.add(player.id);
        } else if (!player.isJumping && this._entityIds.has(player.id)) {
          this._events.set(player.id, new PlayerJumpAfterEvent(player));
          cb(this._events.get(player.id));
          this._events.delete(player.id);
          this._entityIds.delete(player.id);
        }
      }
    });
  }
}

export class PlayerOnAirJumpAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
    this._onAir = new Set();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        if (!player.isJumping && !player.isOnGround) {
          if (this._onAir.has(player.id)) {
            this._entityIds.add(player.id);
          } else this._onAir.add(player.id);
        } else if (player.isJumping && !player.isOnGround && this._entityIds.has(player.id) && !this._events.has(player.id)) {
          this._events.set(player.id, new PlayerOnAirJumpAfterEvent(player));
          cb(this._events.get(player.id));
        } else {
          this._events.delete(player.id);
          this._entityIds.delete(player.id);
          this._onAir.delete(player.id);
        }
      }
    });
  }
}

export class PlayerOnEquipAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
    this._previousEquipments = new Map();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        const currentEquipments = {
          mainHand: player.getEquipment(EquipmentSlot.Mainhand),
          offHand: player.getEquipment(EquipmentSlot.Offhand),
          head: player.getEquipment(EquipmentSlot.Head),
          chest: player.getEquipment(EquipmentSlot.Chest),
          legs: player.getEquipment(EquipmentSlot.Legs),
          feet: player.getEquipment(EquipmentSlot.Feet),
        };

        const previousEquipments = this._previousEquipments.get(player.id) || currentEquipments;
        for (const slot in currentEquipments) {
          const itemStack = currentEquipments[slot];
          const prevItemStack = previousEquipments[slot];
          if (itemStack) {
            if (!itemStack.compare(prevItemStack) && !this._entityIds.has(player.id)) {
              this._entityIds.add(player.id);
              this._events.set(player.id, new PlayerOnEquipAfterEvent(player, itemStack));
              cb(this._events.get(player.id));
            } else if (itemStack.compare(prevItemStack) && this._entityIds.has(player.id)) {
              this._events.delete(player.id);
              this._entityIds.delete(player.id);
            }
          }
        }

        this._previousEquipments.set(player.id, currentEquipments);
      }
    });
  }
}

export class PlayerOnUnequipAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
    this._previousEquipments = new Map();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        const currentEquipments = {
          mainHand: player.getEquipment(EquipmentSlot.Mainhand),
          offHand: player.getEquipment(EquipmentSlot.Offhand),
          head: player.getEquipment(EquipmentSlot.Head),
          chest: player.getEquipment(EquipmentSlot.Chest),
          legs: player.getEquipment(EquipmentSlot.Legs),
          feet: player.getEquipment(EquipmentSlot.Feet),
        };

        const previousEquipments = this._previousEquipments.get(player.id) || currentEquipments;
        for (const slot in currentEquipments) {
          const itemStack = currentEquipments[slot];
          const prevItemStack = previousEquipments[slot];
          if (prevItemStack) {
            if (!prevItemStack.compare(itemStack) && !this._entityIds.has(player.id)) {
              this._entityIds.add(player.id);
              this._events.set(player.id, new PlayerOnUnequipAfterEvent(player, prevItemStack));
              cb(this._events.get(player.id));
            } else if (prevItemStack.compare(itemStack) && this._entityIds.has(player.id)) {
              this._events.delete(player.id);
              this._entityIds.delete(player.id);
            }
          }
        }

        this._previousEquipments.set(player.id, currentEquipments);
      }
    });
  }
}

export class PlayerOnLandAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        if (!player.isOnGround && !this._entityIds.has(player.id)) {
          this._entityIds.add(player.id);
        } else if (player.isOnGround && this._entityIds.has(player.id)) {
          this._events.set(player.id, new PlayerOnLandAfterEvent(player));
          cb(this._events.get(player.id));
          this._events.delete(player.id);
          this._entityIds.delete(player.id);
        }
      }
    });
  }
}

export class PlayerCollectItemAfterEventSignal extends EntityEventSignal {
  constructor() {
    super();
    this._previousInventories = new Map();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      for (const player of world.players) {
        const itemEntities = player.dimension.getEntities({ type: "minecraft:item", maxDistance: 3, location: player.location });

        for (const itemEntity of itemEntities) {
          runTimeout(() => {
            const newItemEntity = world.getEntity(itemEntity.id);

            const currentInventory = this._getInventory(player);
            const previousInventory = this._previousInventories.get(player.id) || currentInventory;

            if (!newItemEntity) {
              for (const [slot, itemStack] of currentInventory.entries()) {
                const prevItemStack = previousInventory.get(slot);
                if (!prevItemStack || !itemStack.compare(prevItemStack)) {
                  this._events.set(player.id, new playerCollectItemAfterEvent(player, itemStack));
                  cb(this._events.get(player.id));
                  this._entityIds;
                }
              }
            }
            this._previousInventories.set(player.id, currentInventory);
          }, 1);
        }
      }
    });
  }

  _getInventory(player) {
    const inventory = new Map();
    for (let i = 0; i < player.inventory.size; i++) {
      const itemStack = player.inventory.getItem(i);
      if (itemStack) {
        inventory.set(i, itemStack);
      }
    }
    return inventory;
  }
}

export class PlayerDropItemAfterEventSignal extends PlayerCollectItemAfterEventSignal {
  constructor() {
    super();
  }

  subscribe(cb) {
    this._process = runInterval(() => {
      const currentInventory = this._getInventory(player);
      const previousInventory = this._previousInventories.get(player.id) || currentInventory;

      for (const [slot, itemStack] of currentInventory.entries()) {
        const prevItemStack = previousInventory.get(slot);
        if (!prevItemStack || !itemStack.compare(prevItemStack)) {
          const itemEntities = player.dimension.getEntities({ type: "minecraft:item", maxDistance: 3, location: player.location });

          // this._events.set(player.id, new playerCollectItemAfterEvent(player, itemStack));
          // cb(this._events.get(player.id));
        }
      }

      this._previousInventories.set(player.id, currentInventory);

      for (const player of world.players) {
        const itemEntities = player.dimension.getEntities({ type: "minecraft:item", maxDistance: 3, location: player.location });

        for (const itemEntity of itemEntities) {
          runTimeout(() => {
            const newItemEntity = world.getEntity(itemEntity.id);

            const currentInventory = this._getInventory(player);
            const previousInventory = this._previousInventories.get(player.id) || currentInventory;

            if (!newItemEntity) {
              for (const [slot, itemStack] of currentInventory.entries()) {
                const prevItemStack = previousInventory.get(slot);
                if (!prevItemStack || !itemStack.compare(prevItemStack)) {
                  this._events.set(player.id, new playerCollectItemAfterEvent(player, itemStack));
                  cb(this._events.get(player.id));
                }
              }
            }
            this._previousInventories.set(player.id, currentInventory);
          }, 1);
        }
      }
    });
  }
}

export class Transform {
  /**
   * Creates an instance of a Transform.
   * @param {Vector3|string} [position = `~ ~ ~`]
   * @param {Vector2|string} [position = `~ ~`]
   * @param {Dimension} [dimension = overworld]
   */
  constructor(position = `~ ~ ~`, rotation = `~ ~`, dimension = overworld) {
    if (position instanceof Vector3) this.position = position.toString();
    else this.position = position;

    if (rotation instanceof Vector2) this.rotation = rotation.toString();
    else this.rotation = rotation;

    this.dimension = dimension;
  }
}
export class Scene {
  /**
   * Creates an instance of Scene.
   * @param {string} start - starting position and rotation. <x y z>
   * @param {string} end - ending position and rotation <x y z>.
   * @param {string} focus - the subject of which the scene will focus on. <x y z|selector>
   * @param {float} duration
   * @param {enum} [ease_type = 'linear']
   */
  constructor(start, end, focus, duration, fade, ease_type = "linear") {
    this.start = start;
    this.end = end;
    this.focus = focus;
    this.duration = duration;
    this.fade = fade;
    this.ease_type = ease_type;
  }
}
export class Cutscene {
  /**
   * Creates an instance of Cutscene.
   * @param {string} trigger_tag - Tag that starts the cutscene.
   * @param {Scene[]} scenes - Scenes to play in order.
   * @param {TimedCommand[]} timedCommands - Commands to play along the cutscene.
   * @param {bool} [is_spectator = true] - Define if cutscene should be played in spectator mode.
   * @param {bool} [is_invisible = true] - Define if cutscene should hide the player while playing.
   */
  constructor(trigger_tag, scenes, timedCommands, is_spectator = true, is_invisible = true) {
    this.trigger_tag = trigger_tag;
    this.scenes = scenes;
    this.timedCommands = timedCommands;
    this.is_spectator = is_spectator;
    this.is_invisible = is_invisible;
  }
}

export class Run {
  constructor() {
    this._process = null;
  }
  dispose() {
    system.clearRun(this._process);
  }
}
export class RunInterval extends Run {
  constructor(cb, interval) {
    super();
    this._process = system.runInterval(cb, interval);
  }
}

export class RunTimeOut extends Run {
  constructor(cb, timeOut) {
    super();
    this._process = system.runTimeout(cb, timeOut);
  }
}

export class Vector2 {
  /**
   * Creates an instance of Vector2.
   * @param {number} [x=0] - The x-coordinate.
   * @param {number} [y=0] - The y-coordinate.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a string representation of the vector.
   * @returns {string} A string in the format "x y".
   */
  toString() {
    return `${this.x} ${this.y}`;
  }

  /**
   * Returns a new Vector2 instance with the y-coordinate opposite.
   * The y-coordinate is considered an angle in the range -180 to 180 degrees.
   * @returns {Vector2} A new Vector2 instance with the opposite y-coordinate.
   * @throws {Error} If the y-coordinate is not in the range -180 to 180 degrees.
   */
  toOppositeY() {
    if (this.y < -180 || this.y > 180) {
      console.log("Angle must be in the range -180 to 180 degrees.");
    }

    // Calculate the opposite angle within the range -180 to 180 degrees
    let y = (this.y + 180) % 360;
    if (y > 180) y -= 360;

    return new Vector2(this.x, y);
  }
}

export class Vector3 {
  /**
   * Creates an instance of Vector3.
   * @param {number} [x=0] - The x-coordinate.
   * @param {number} [y=0] - The y-coordinate.
   * @param {number} [z=0] - The z-coordinate.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = this._validateNumber(x);
    this.y = this._validateNumber(y);
    this.z = this._validateNumber(z);
  }

  /**
   * Converts this vector to a Vector2 instance.
   * @returns {Vector2} A new Vector2 instance with the same x and y coordinates.
   */
  toVector2() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Returns a string representation of the vector.
   * @returns {string} A string in the format "x y z".
   */
  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }

  /**
   * Returns a new Vector3 instance with x and z coordinates rounded to the nearest half.
   * @returns {Vector3} A new Vector3 instance with centered x and z coordinates.
   */
  toCenterXZ() {
    const x = this._roundToNearestHalf(this.x);
    const y = this.y;
    const z = this._roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  /**
   * Returns a new Vector3 instance with x, y, and z coordinates rounded to the nearest half.
   * @returns {Vector3} A new Vector3 instance with centered x, y, and z coordinates.
   */
  toCenterXYZ() {
    const x = this._roundToNearestHalf(this.x);
    const y = this._roundToNearestHalf(this.y);
    const z = this._roundToNearestHalf(this.z);
    return new Vector3(x, y, z);
  }

  /**
   * Rounds a value to the nearest half.
   * @private
   * @param {number} value - The value to round.
   * @returns {number} The value rounded to the nearest half.
   */
  _roundToNearestHalf(value) {
    return Math.round(value * 2) / 2;
  }

  /**
   * Validates if a value is a number.
   * @private
   * @param {number} value - The value to validate.
   * @returns {number} The validated number.
   * @throws {TypeError} If the value is not a number.
   */
  _validateNumber(value) {
    if (typeof value !== "number") {
      console.error("Value must be a number");
    }
    return value;
  }
}

export class Checkpoint {
  /**
   * Creates an instance of Checkpoint.
   * @param {Entity} entity - The entity to create a checkpoint for.
   */
  constructor(entity) {
    this.entity = entity;
    this.save();
  }

  /**
   * Saves the current location and rotation of the entity.
   */
  save() {
    this.location = this.entity.getLocation();
    this.rotation = this.entity.fetchRotation();
  }

  /**
   * Returns the entity to the saved location and rotation.
   */
  return() {
    this.entity.teleport(this.location, { rotation: this.rotation });
  }
}

export class Music {
  /**
   * Creates an instance of Music.
   * @param {string} track - Identifier of the sound/music defined in the 'sound_definitions.json'.
   * @param {string} tag - tag of players to play the music.
   * @param {number} duration - Duration of the sound/music in seconds.
   * @param {Vector3} [origin=new Vector3()] - Origin coordinates of the selector.
   * @param {number} [volume=1] - Volume of the sound/music.
   * @param {number} [pitch=1] - Pitch of the sound/music.
   */
  constructor(track, tag, duration, origin = new Vector3(), volume = 1, pitch = 1) {
    this.track = track;
    this.tag = tag;
    this.duration = duration;
    this.durationTick = duration * tps;
    this.origin = origin;
    this.volume = volume;
    this.pitch = pitch;
  }
}

export class TimedCommand {
  /**
   * Creates an instance of TimedCommand.
   * @param {number} time - Time in seconds when to execute commands.
   * @param {string|string[]} commands - Commands to run at the specified time.
   */
  constructor(time, commands) {
    this.time = time;
    this.timeTick = time * tps;
    this.commands = commands;
  }
}

export class CountDownTimer {
  constructor(durationInSeconds = 10, onEnd = () => {}, onUpdate = () => {}) {
    this.timer = durationInSeconds;
    this.process = runInterval(() => {
      this.minutes = Math.floor(this.timer / 60);
      this.seconds = this.timer % 60;

      // Add leading zero to seconds if less than 10
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      // Display
      onUpdate(this.minutes, this.seconds);

      // Check if the timer has reached 0
      if (--this.timer < -1) {
        onEnd();
        this.process.dispose();
        return;
      }
    }, 20);
  }
  dispose() {
    this.process.dispose();
  }
}
