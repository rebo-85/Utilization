import { scriptEvent, world, namespace as ns } from "./ReBo/constants";
import {} from "./ReBo/server";
import { runTimeout } from "./ReBo/utils";
import keyframes from "./exportedCameraKeyframes";

keyframes.sort((a, b) => a.time - b.time);

const positions = [];
const rotations = [];
for (const keyframe of keyframes) {
  const obj = { time: keyframe.time, interpolation: keyframe.interpolation, points: keyframe.data_points[0] };
  if (keyframe.channel === "position") {
    positions.push(obj);
  } else if (keyframe.channel === "rotation") {
    rotations.push(obj);
  }
}

positions.sort((a, b) => a.time - b.time);
rotations.sort((a, b) => a.time - b.time);

scriptEvent.subscribe(({ id }) => {
  switch (id) {
    case `${ns}:start_scene`:
      runScene();
      break;

    default:
      break;
  }
});

for (const player of world.players) {
  player.runCommandAsync("camera @s clear", "inputpermission set @s camera enabled", "inputpermission set @s movement enabled");
}

function runScene() {
  for (const player of world.players) {
    player.runCommandAsync("inputpermission set @s camera disabled", "inputpermission set @s movement disabled");
    let prevPos = positions[0].points;
    let prevRot = rotations[0].points;
    let prevTime = 0;
    for (const keyframe of keyframes) {
      const { x, y, z } = prevPos;
      const { x: rx, y: ry } = prevRot;
      runTimeout(() => {
        const command = `camera @s set minecraft:free ease ${parseFloat((keyframe.time - prevTime).toFixed(4))} linear pos ${x} ${y} ${z} rot ${rx} ${ry}`;
        console.warn(JSON.stringify(command, null, 0));
        player.runCommandAsync(command);
        prevTime = keyframe.time;
      }, keyframe.time * 20);

      if (keyframe.interpolation === "position") {
        prevPos = keyframe.data_points[0];
      } else if (keyframe.interpolation === "rotation") {
        prevRot = keyframe.data_points[0];
      }
    }
  }
}
