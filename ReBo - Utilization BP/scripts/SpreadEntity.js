import { system } from "@minecraft/server";
import { utils } from "Utils";

/* 
*******************************************************************************************************************************
DISCLAIMER: 
  This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
  the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
  this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
  this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
  unless explicit permission is obtained from ReBo and any contributors.
******************************************************************************************************************************* 
*/

class SpreadEntity {
  constructor(entityIdentifier) {
    system.runInterval(() => {
      const spreadTarget = utils.getEntities({
        type: entityIdentifier,
        tags: ["spreadEntity"],
      });
      spreadTarget.forEach((target) =>
        this.spreadEntity(target, [-97, -45], [73, 75], [-36, -18])
      );
    }, 1);
  }
  
  /**
   * Teleport entities in random location within the range.
   * @param {Entity} entity - The entity to teleport to.
   * @param {int[]} xRange - The range of the X where can teleport to.
   * @param {int[]} yRange - The range of the Y where can teleport to.
   * @param {int[]} zRange - The range of the Z where can teleport to.
   * @param {Vector3} entityDistanceRange - The minimun distance between entities.
   * @param {bool} checkForBlocks
   */

  spreadEntity(
    entity,
    xRange,
    yRange,
    zRange,
    entityDistanceRange = { x: 0, y: 0, z: 0 },
    checkForBlocks = true
  ) {
    // Function to get random position within a range
    const getRandomPosition = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate random coordinates for teleportation (adjust the range as needed)
    const randomX = getRandomPosition(xRange[0], xRange[1]);
    const randomY = getRandomPosition(yRange[0], yRange[1]);
    const randomZ = getRandomPosition(zRange[0], zRange[1]);

    const randomCoord = `${randomX} ${randomY} ${randomZ}`;

    // Check if there's already entity in the current coordinates
    const entityDistancePivotX = randomX - entityDistanceRange.x;
    const entityDistancePivotY = randomY - entityDistanceRange.y;
    const entityDistancePivotZ = randomZ - entityDistanceRange.z;
    const entityDistanceX = entityDistanceRange.x * 2;
    const entityDistanceY = entityDistanceRange.y * 2;
    const entityDistanceZ = entityDistanceRange.z * 2;

    const entityDistanceBox = `x=${entityDistancePivotX},y=${entityDistancePivotY},z=${entityDistancePivotZ},dx=${entityDistanceX},dy=${entityDistanceY},dz=${entityDistanceZ}`;

    // Modify entity to selector
    const spreadedTarget = `@e[type=${entity.typeId},${entityDistanceBox},tag=!spreadEntity]`;
    const commandRoot = `execute unless entity ${spreadedTarget} positioned ${randomCoord} ${
      checkForBlocks ? "if block ~~~ minecraft:air []" : ""
    }`;

    const mainCommand = `${commandRoot} run teleport @s ~~~`;

    entity.runCommand(mainCommand);

    if (entity.runCommand(mainCommand).successCount) {
      entity.runCommand(`tag @s remove spreadEntity`);
    }
  }
}

export const spreadEntity = new SpreadEntity();
