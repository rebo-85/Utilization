import { Vector3, Vector2 } from "./Classes";

Math.randomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Converts a string to a Vector2.
 * @returns {Vector2} The Vector2 representation of the string.
 */
String.prototype.toVector2 = function () {
  const pattern = this.match(/^(\d+)\s(\d+)$/);
  if (pattern) {
    const x = parseInt(pattern[1]);
    const y = parseInt(pattern[2]);
    return new Vector2(x, y);
  }

  switch (this.toLowerCase()) {
    case "north":
      return new Vector2(0, 180);
    case "east":
      return new Vector2(0, -90);
    case "south":
      return new Vector2(0, 0);
    case "west":
      return new Vector2(0, 90);
    default:
      return this;
  }
};

/**
 * Gets selector matches from the string.
 * @returns {Array<string>|undefined} The matches if valid, otherwise an error is logged.
 */
String.prototype.getSelectorMatches = function () {
  const regex = /^@(a|p|r|e|s|initiator)(?:\[(.+)\])?$/;
  const matches = this.match(regex);
  if (matches) {
    return matches;
  } else {
    return console.error(`"${this}" is not a valid selector.`);
  }
};

/**
 * Converts a string to EntityQueryOptions.
 * @returns {Object} The EntityQueryOptions representation of the string.
 */
String.prototype.toEQO = function () {
  const options = {};
  const matches = this.getSelectorMatches();
  if (matches && matches.length >= 2) {
    const attributes = matches[2] ? matches[2].split(",") : [];
    let excludeFamilies = [];
    let excludeGameModes = [];
    let excludeTags = [];
    let excludeTypes = [];
    let families = [];
    let tags = [];
    options.location = { x: 0, y: 0, z: 0 }; // Initialize location object with default values

    attributes.forEach((attribute) => {
      const [key, value] = attribute.split("=");
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();

      switch (trimmedKey) {
        case "c":
          options.closest = parseInt(trimmedValue, 10);

          // If @p, @s, @r, or @initiator is present, override closest to 1
          if (matches[1] === "p" || matches[1] === "r" || matches[1] === "s" || matches[1] === "initiator") {
            options.closest = 1;
          }
          break;
        case "family":
          if (trimmedValue.includes("!")) {
            excludeFamilies.push(trimmedValue.replace(/!/g, ""));
            options.excludeFamilies = excludeFamilies;
          } else {
            families.push(trimmedValue);
            options.families = families;
          }
          break;
        case "l":
          options.maxLevel = parseInt(trimmedValue, 10);
          break;
        case "lm":
          options.minLevel = parseInt(trimmedValue, 10);
          break;
        case "m":
          if (trimmedValue.includes("!")) {
            if (!isNaN(trimmedValue.replace(/!/g, ""))) {
              excludeGameModes.push(parseInt(trimmedValue.replace(/!/g, ""), 10));
              options.excludeGameModes = excludeGameModes;
            } else {
              excludeGameModes.push(trimmedValue);
              options.excludeGameModes = excludeGameModes;
            }
          } else {
            if (!isNaN(trimmedValue)) {
              options.gameMode = parseInt(trimmedValue, 10);
            } else {
              options.gameMode = trimmedValue;
            }
          }
          break;
        case "name":
          options.name = trimmedValue;
          break;
        case "r":
          options.maxDistance = parseInt(trimmedValue, 10);
          break;
        case "rm":
          options.minDistance = parseInt(trimmedValue, 10);
          break;
        case "rx":
          options.location.x = parseInt(trimmedValue, 10);
          break;
        case "rxm":
          options.minHorizontalRotation = parseInt(trimmedValue, 10);
          break;
        case "ry":
          options.location.y = parseInt(trimmedValue, 10);
          break;
        case "rym":
          options.minVerticalRotation = parseInt(trimmedValue, 10);
          break;
        case "tag":
          if (trimmedValue.includes("!")) {
            excludeTags.push(trimmedValue.replace(/!/g, ""));
            options.excludeTags = excludeTags;
          } else {
            tags.push(trimmedValue);
            options.tags = tags;
          }
          break;
        case "type":
          if (trimmedValue.includes("!")) {
            excludeTypes.push(trimmedValue.replace(/!/g, ""));
            options.excludeTypes = excludeTypes;
          } else {
            options.type = trimmedValue;
          }
          // If @a, @p, @s, @r, or @initiator is present, override type to 'minecraft:player'
          if (
            matches[1] === "a" ||
            matches[1] === "p" ||
            matches[1] === "r" ||
            matches[1] === "s" ||
            matches[1] === "initiator"
          ) {
            options.type = "minecraft:player";
          }
          break;
        case "x":
          options.location.x = parseInt(trimmedValue, 10);
          break;
        case "y":
          options.location.y = parseInt(trimmedValue, 10);
          break;
        case "z":
          options.location.z = parseInt(trimmedValue, 10);
          break;
        default:
          // Handle unknown keys
          console.warn(`'${trimmedKey}' cannot be converted to EntityQueryOptions property.`);
          break;
      }
    });

    if (
      matches[1] === "a" ||
      matches[1] === "p" ||
      matches[1] === "r" ||
      matches[1] === "s" ||
      matches[1] === "initiator"
    ) {
      options.type = "minecraft:player";

      if (!(matches[1] === "a")) {
        options.closest = 1;
      }
    }

    return options;
  }
};

/**
 * Converts a string to a Vector3.
 * @returns {Vector3|null} The Vector3 representation of the string or null if the format is invalid.
 */
String.prototype.toVector3 = function () {
  const coordinates = this.split(" ").map(parseFloat);
  if (coordinates.some(isNaN) || coordinates.length !== 3) {
    console.error('Invalid string format. It should be "x y z"');
    return this; // Returning null to indicate failure
  }
  return new Vector3(coordinates[0], coordinates[1], coordinates[2]);
};
