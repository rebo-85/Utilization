import { scriptEvent, world, namespace as ns } from "./ReBo/Constants";
import { system } from "@minecraft/server";
import {} from "./ReBo/Server";
import keyframes from "./Keyframes";
import { Vector2, Vector3 } from "./ReBo/Classes";

function load() {
  for (const player of world.players) {
    player.commandRunAsync(
      "camera @s clear",
      "inputpermission set @s camera enabled",
      "inputpermission set @s movement enabled"
    );
  }
}

load();

function runScene() {
  const { positions, rotations, times } = keyframes;
  let previousPosition = positions[0].data_points;
  let previousRotation = rotations[0].data_points;

  let previousTime = 0;
  let completedTimeouts = 0;
  const cameraOffset = 1.62001; // Y-offset of the camera from the player's feet
  const player = world.getAllPlayers()[0]; // Assuming there's only one player
  const entity = player.dimension.getEntities({ type: "rebo:forest_teaser" })[0]; // Assuming there's only one entity

  player.commandRunAsync(
    "camera @s clear",
    "inputpermission set @s camera disabled",
    "inputpermission set @s movement disabled",
    "effect @s invisibility infinite 1 true",
    "teleport @s 0 0 0"
  );
  entity.rotation = new Vector2(0, 0);
  entity.playAnimation("animation.player.forest_teaser_animation");

  for (const time of times) {
    system.runTimeout(() => {
      if (player) {
        const position = positions.find((v) => v.time === time);
        const rotation = rotations.find((v) => v.time === time);

        if (position) {
          const newDataPoints = new Vector3(position.data_points).offset(entity.cx, entity.cy, -entity.cz);
          previousPosition = newDataPoints;
          previousPosition = previousPosition.offset(0, cameraOffset, 0);
          player.teleport(newDataPoints);
        }

        if (rotation) previousRotation = rotation.data_points;

        const { x, y, z } = previousPosition;
        const { x: rx, y: ry } = previousRotation;
        const command = `camera @s set minecraft:free ease ${time - previousTime} linear pos ${addDecimal(
          x
        )} ${addDecimal(y)} ${addDecimal(-z)} rot ${rx} ${ry}`;

        player.commandRunAsync(command);
        previousTime = time;
      }

      completedTimeouts++;
      if (completedTimeouts === times.length) {
        system.runTimeout(() => {
          player.commandRunAsync(
            "camera @s clear",
            "inputpermission set @s camera enabled",
            "inputpermission set @s movement enabled",
            "effect @s invisibility 0 1 true"
          );

          previousPosition = positions[0].data_points;
          previousRotation = rotations[0].data_points;
          previousTime = 0;
          completedTimeouts = 0;
        }, time - previousTime + 1);
      }
    }, time * 20);
  }
}

function addDecimal(num) {
  return num % 1 === 0 ? `${num}.0` : `${num}`;
}

scriptEvent.subscribe(({ id }) => {
  switch (id) {
    case `${ns}:start_scene`:
      runScene();
      break;

    default:
      break;
  }
});
