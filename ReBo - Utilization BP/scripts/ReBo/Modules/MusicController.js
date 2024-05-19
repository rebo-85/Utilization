import { Music } from "../Classes";
import { world } from "../Constants";
import { onPlayerLoad, runInterval, runTimeout, test } from "../Utils";

const musicTrack = [new Music("eternal.jetski_rally.bgm", "jetski_rally", 88)];

onPlayerLoad((player) => {
  const sys1 = runInterval(() => {
    const vel = player.getVelocity();
    if (vel.x !== 0 || vel.y !== 0 || vel.z !== 0) {
      player.removeTag("music");
      sys1.dispose();
    }
  });
});

const players = world.getAllPlayers();
players.forEach((player) => {
  player.commandRunAsync(`stopsound @s`);
  player.removeTag("music");
});

runInterval(() => {
  musicTrack.forEach((music) => {
    const players = world.getAllPlayers();

    let noMusicPlayers = players.filter((player) => !player.hasTag("music") && player.hasTag(music.tag));

    noMusicPlayers.forEach((player) => {
      player.commandRunAsync(`stopsound @s ${music.track}`, `playsound ${music.track}`);
      player.addTag("music");

      const sys1 = runTimeout(() => {
        player.removeTag("music");
      }, music.durationTick);

      const sys2 = runInterval(() => {
        if (!player.hasTag(music.tag)) {
          player.removeTag("music");
          player.commandRunAsync(`stopsound @s ${music.track}`);
          sys1.dispose();
          sys2.dispose();
        }
      });
    });
  });
});
