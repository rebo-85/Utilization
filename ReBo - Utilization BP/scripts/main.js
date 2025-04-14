import { system, world } from "@minecraft/server";
import "./CameraTranslator";
import "./ReBo/modules/DevTools";

// /**
//  * Linearly interpolates between two Vector3 points over a given duration.
//  * @param {Vector3} start - The starting Vector3.
//  * @param {Vector3} end - The target Vector3.
//  * @param {number} duration - The total duration in milliseconds.
//  * @returns {(deltaTime: number) => Vector3|null} - A function that takes elapsed time and returns the interpolated position or null if completed.
//  */
// function createVector3Lerp(start, end, duration) {
//   let elapsed = 0;

//   return (deltaTime) => {
//     elapsed += deltaTime;

//     if (elapsed >= duration) return null;

//     const t = elapsed / duration;

//     return {
//       x: start.x + (end.x - start.x) * t,
//       y: start.y + (end.y - start.y) * t,
//       z: start.z + (end.z - start.z) * t,
//     };
//   };
// }

// const start = { x: 0, y: 0, z: 0 };
// const end = { x: 10, y: 0, z: 10 };
// const duration = 2000; // 2 seconds

// const lerpFunc = createVector3Lerp(start, end, duration);

// let lastTick = Date.now();

// function tick() {
//   const now = Date.now();
//   const delta = now - lastTick;
//   lastTick = now;

//   const position = lerpFunc(delta);
//   if (position) {
//     console.log(JSON.stringify(position, null, 2));
//     const player = world.getPlayers()[0]; // Get the first player in the world
//     player.runCommand(`camera @s set minecraft:free ease 0.5 linear pos ${position.x} ${position.y} ${position.z}`); // Teleport the player to the new position
//     system.run(tick);
//   } else {
//     console.log("Lerp complete.");
//   }
// }

// tick();
