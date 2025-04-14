import { Vector2, Vector3, lerpVector, applyEasing } from "./Utils";
import { system, world, ScriptEventSource } from "@minecraft/server";
import content from "./Content";

function load() {
  // On script load

  for (const player of world.getAllPlayers()) {
    player.runCommand("camera @s clear");
    player.inputPermissions.cameraEnabled = true;
    player.inputPermissions.movementEnabled = true;
  }
}
load();

function runScene(source) {
  const { positions, rotations } = content;
  const dimension = source.dimension;
  const players = dimension.getEntities(content.playerOption);
  const entities = dimension.getEntities(content.entityOption);

  if (entities.length !== 1) {
    world.sendMessage(`§cExpected 1 model entity, found ${entities.length}. Skipping scene.`);
    return;
  }

  const entity = entities[0];
  const cameraOffset = 1.62001;

  for (const player of players) {
    player.runCommand("camera @s clear");
    player.runCommand("effect @s invisibility infinite 1 true");
    player.inputPermissions.cameraEnabled = false;
    player.inputPermissions.movementEnabled = false;

    entity.playAnimation(content.animationId);

    let time = 0;
    const tps = 20;
    const intervalId = system.runInterval(() => {
      time += 1 / tps;

      const getKeyframePair = (frames, t) => {
        let left = 0,
          right = frames.length - 1;
        while (left < right) {
          const mid = Math.floor((left + right) / 2);
          if (frames[mid].time < t) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return [frames[left - 1] || frames[left], frames[left]];
      };

      // -- POSITION INTERPOLATION --
      const [posA, posB] = getKeyframePair(positions, time);
      const posT = (time - posA.time) / (posB.time - posA.time);
      const easedPosT = applyEasing(Math.min(posT, 1), posA.interpolation);

      const { x: cx, y: cy, z: cz } = entity.coordinates;
      const posStart = new Vector3(posA.data_points).offset(cx, cy, -cz).offset(0, cameraOffset, 0);
      const posEnd = new Vector3(posB.data_points).offset(cx, cy, -cz).offset(0, cameraOffset, 0);

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

      const cmd = `camera @s set minecraft:free ease 0.05 linear pos ${finalPos.x} ${finalPos.y} ${-finalPos.z} rot ${
        finalRot.x
      } ${finalRot.y}`;
      player.runCommand(cmd);

      // -- END --
      if (time > positions.at(-1).time && time > rotations.at(-1).time) {
        system.runTimeout(() => {
          system.clearRun(intervalId);
          player.runCommand("camera @s clear");
          player.runCommand("effect @s invisibility 0");
          player.inputPermissions.cameraEnabled = true;
          player.inputPermissions.movementEnabled = true;
        }, 1);
      }
    }, 1); // 1 tick = 20 FPS
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
