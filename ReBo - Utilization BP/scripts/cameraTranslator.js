import { scriptEvent, world, namespace as ns } from "./ReBo/constants";
import {} from "./ReBo/server";
import { runTimeout } from "./ReBo/utils";
import keyframes from "./exportedCameraKeyframes";

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
    let prevPosTime = 0;
    for (const position of positions) {
      const { x, y, z } = position.points;
      runTimeout(() => {
        console.warn(JSON.stringify(position.time, null, 0));
        player.runCommandAsync(`camera @s set minecraft:free ease ${position.time - prevPosTime} linear pos ${x} ${y} ${z}`);
        prevPosTime = position.time;
      }, position.time * 20);
    }
  }
}
