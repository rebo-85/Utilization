import {} from "./ReBo/server";
import {} from "./devTools";
import { world } from "./ReBo/constants";
import { runInterval } from "./ReBo/utils";

const customMinecartIDs = ["rebo:custom_minecart"];

// Utility to normalize yaw (-180 to 180)
const normalizeYaw = (yaw) => {
  while (yaw > 180) yaw -= 360;
  while (yaw < -180) yaw += 360;
  return yaw;
};

// Utility to calculate the closest rotation
const calculateClosestRotation = (currentRotation, targetRotations) => {
  currentRotation = normalizeYaw(currentRotation);
  let closestRotation = targetRotations[0];
  let smallestDiff = Math.abs(currentRotation - closestRotation);

  for (const target of targetRotations) {
    const normalizedTarget = normalizeYaw(target);
    let diff = Math.abs(currentRotation - normalizedTarget);
    if (diff > 180) {
      diff = 360 - diff;
    }

    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestRotation = normalizedTarget;
    }
  }

  return closestRotation;
};

// Move the entity along the rail and prevent it from going off the rail
const moveAlongRail = (entity, block, direction, speed) => {
  const location = entity.location;
  const moveDistance = 0.9 * 0.1; // Multiply speed by a constant to control movement rate

  // Adjust movement based on velocity sign and rail direction
  const velocity = entity.getVelocity();
  const velocityX = velocity.x;
  const velocityZ = velocity.z;

  switch (direction) {
    case 0: {
      // North-South (Z-axis movement)
      if (block.getState("rail_direction") === 0) {
        // Move towards Z+ (South) if velocity is positive, Z- (North) if negative
        location.z += velocityZ >= 0 ? moveDistance : -moveDistance;
      } else {
        // Reverse direction for reverse rails (Z-axis)
        location.z += velocityZ >= 0 ? -moveDistance : moveDistance;
      }
      break;
    }
    case 1: {
      // East-West (X-axis movement)
      if (block.getState("rail_direction") === 1) {
        // Move towards X+ (East) if velocity is positive, X- (West) if negative
        location.x += velocityX >= 0 ? moveDistance : -moveDistance;
      } else {
        // Reverse direction for reverse rails (X-axis)
        location.x += velocityX >= 0 ? -moveDistance : moveDistance;
      }
      break;
    }
    default:
      break;
  }

  // Teleport the entity to the new location
  entity.teleport(location);
};

const getCustomMinecarts = () => {
  const entities = [];
  for (const id of customMinecartIDs) {
    entities.push(...world.getEntities({ type: id }));
  }
  return entities;
};

const getSpeedFromVelocity = (velocity) => {
  const { x, y, z } = velocity;
  return Math.sqrt(x * x + y * y + z * z); // Speed is the magnitude of the velocity vector
};

runInterval(() => {
  const entities = getCustomMinecarts();

  for (const entity of entities) {
    // Get the current velocity of the entity
    const velocity = entity.getVelocity();

    // Calculate the speed (magnitude) from the velocity vector
    const speed = getSpeedFromVelocity(velocity);

    const block = entity.dimension.getBlock(entity.location);

    if (block && block.typeId === "minecraft:rail") {
      const direction = block.getState("rail_direction");

      // Update the rotation to match rail direction (similar to your previous logic)
      switch (direction) {
        case 0:
          // North-South rail
          entity.rotation = { x: entity.rotation.x, y: calculateClosestRotation(entity.rotation.y, [0, 180]) };
          break;
        case 1:
          // East-West rail
          entity.rotation = { x: entity.rotation.x, y: calculateClosestRotation(entity.rotation.y, [90, -90]) };
          break;
        default:
          break;
      }

      // Move the entity along the rail based on its velocity and speed
      moveAlongRail(entity, block, direction, speed);
    }
  }
});
