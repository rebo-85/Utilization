import { Music } from "../Classes";
import { world } from "../Constants";
import { onPlayerLoad, runInterval, runTimeout } from "../Utils";

const musicTrack = [new Music("eternal.jetski_rally.bgm", "jetski_rally", 88)];

function getCurrentMusic(player) {
  for (let i = musicTrack.length - 1; i >= 0; i--) {
    if (player.hasTag(musicTrack[i].tag)) {
      return musicTrack[i];
    }
  }
  return null;
}

onPlayerLoad((player) => {
  const checkMovement = runInterval(() => {
    const { x, y, z } = player.getVelocity();
    if (x !== 0 || y !== 0 || z !== 0) {
      const currentMusic = getCurrentMusic(player);
      if (currentMusic) {
        player.removeTag(`playing_${currentMusic.tag}`);
        checkMovement.dispose();
      }
    }
  });
});

function stopAllMusic(player) {
  player.commandRunAsync(`stopsound @s`);
  musicTrack.forEach((music) => {
    player.removeTag(`playing_${music.tag}`);
  });
}

function playMusic(player, music) {
  player.commandRunAsync(`playsound ${music.track}`);
  player.addTag(`playing_${music.tag}`);

  const stopMusicTimeout = runTimeout(() => {
    player.removeTag(`playing_${music.tag}`);
  }, music.durationTick);

  const checkTagInterval = runInterval(() => {
    if (!player.hasTag(music.tag)) {
      player.removeTag(`playing_${music.tag}`);
      player.commandRunAsync(`stopsound @s ${music.track}`);
      stopMusicTimeout.dispose();
      checkTagInterval.dispose();
    }
  });
}

const initialPlayers = world.getAllPlayers();
initialPlayers.forEach((player) => {
  stopAllMusic(player);
});

runInterval(() => {
  const players = world.getAllPlayers();

  players.forEach((player) => {
    const currentMusic = getCurrentMusic(player);

    if (currentMusic && !player.hasTag(`playing_${currentMusic.tag}`)) {
      stopAllMusic(player);
      playMusic(player, currentMusic);
    }
  });
});
