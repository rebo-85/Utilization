import { world, tps } from "../Constants";
import { Cutscene, Scene, Transform, Vector2, Vector3 } from "../Classes";
import { runInterval, runTimeout } from "../Utils";
// <startPos: x y z> <startRot: x y> <endPos: x y z> <focus: x y z>
const cutscene1 = new Cutscene("play_cutscene1", [
  new Scene(
    new Transform(new Vector3(0, 0, 0), new Vector2(0, 0)),
    new Transform(new Vector3(10, 10, 10), new Vector2(30, 30)),
    1.0
  ),
  new Scene(
    new Transform(new Vector3(10, 10, 10), new Vector2(30, 30)),
    new Transform(new Vector3(0, 0, 0), new Vector2(0, 0)),
    2.0
  ),
]);

const cutscenes = [cutscene1];
runInterval(() => {
  for (const player of world.getAllPlayers()) {
    cutscenes.forEach((cutscene) => {
      if (player.hasTag(cutscene.trigger_tag)) {
        playCutscene(cutscene, player);
      }
    });
  }
});

function playCutscene(cutscene, player) {
  // Cutscene start
  player.commandRunAsync(
    `tag @s remove ${cutscene.trigger_tag}`,
    `inputpermission set @s camera disabled`,
    `inputpermission set @s movement disabled`
  );
  let gamemode = null;
  if (cutscene.is_spectator) {
    gamemode = player.getGamemode();
    player.commandRunAsync(`gamemode spectator @s`);
  }
  if (cutscene.is_invisible) player.commandRunAsync(`effect @s invisibility 999999 0 true`);

  // Play all scenes
  let timeline = 0;
  cutscene.scenes.forEach((scene, i) => {
    const endTime = scene.duration * tps + 1;
    runTimeout(() => {
      player.commandRunAsync(`camera @s clear`);
      scene.start.dimension.commandRunAsync(`teleport ${player.name} ${scene.start.position} ${scene.start.rotation}`);

      runTimeout(() => {
        player.commandRunAsync(
          `camera @s set minecraft:free ease ${scene.duration} ${scene.ease_type} pos ${scene.end.position} rot ${scene.end.rotation}`
        );
      }, 1);

      runTimeout(() => {
        player.commandRunAsync(`camera @s clear`);
        if (i === cutscene.scenes.length - 1) {
          // Cutscene complete, do any necessary cleanup
          if (cutscene.is_spectator && gamemode) player.commandRunAsync(`gamemode ${gamemode} @s`);
          if (cutscene.is_invisible) player.commandRunAsync(`effect @s invisibility 0`);

          player.commandRunAsync(`inputpermission set @s camera enabled`, `inputpermission set @s movement enabled`);
        }
      }, endTime);
    }, timeline);

    timeline += endTime;
  });
}
