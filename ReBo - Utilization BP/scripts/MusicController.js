import { system } from "@minecraft/server";
import { utils, Vector3 } from "Utils";

const exceptionTag = 'music_stop';
const objID = 'music';
const objID2 = 'musicTick';
const defaultVolume = 0.5;
const defaultPitch = 1.0;


class musicData {
  /**
   * @param {string} track - Identifier of the sound/music defined in the 'sound_definitions.json'.
   * @param {string} selector - Selector for entities to music to play with.
   * @param {int} duration - Duration of the sound/music in ticks.
   * @param {Vector3} origin - Origin coordinates of the selector.
   * @param {float} volume - Volume of the sound/music. 
   * @param {float} pitch - Pitch of the sound/music. 
   */
  constructor(track, selector, duration, origin = new Vector3(), volume = defaultVolume, pitch = defaultPitch){
    this.track = track;
    this.selector = selector;
    this.duration = duration;
    this.origin = origin;
    this.volume = volume;
    this.pitch = pitch;
  }
}

const musicTrack = [
  new musicData(`music.main`, `@a`, 930),
  new musicData(`music.circus`, `@a[r=20]`, 730, new Vector3(-71, 72, -27)),
  new musicData(`music.circus`, `@a[tag=caroussel]`, 730),
  new musicData(`music.bumper_cars`, `@a[tag=bumperCars]`, 1220),
  new musicData(`music.race`, `@a[tag=race]`, 730),

  // new musicData(`music.circus`, `@a[r=20]`, 730, new Vector3(-71, 72, -27)),
  // new musicData(`music.race`, `@a[x=~,y=~,z=~,dx=41,dy=5,dz=60]`, 730, new Vector3(-37, 69, -54)),
  // new musicData(`music.bumper_cars`, `@a[x=~,y=~,z=~,dx=-24,dy=5,dz=-31]`, 1220, new Vector3(-89, 67, -86)),
  
];

class MusicController {
  constructor() {
    utils.serverCommandAsync(
      `scoreboard players reset @a ${objID}`,
      `scoreboard players reset @a ${objID2}`,
      `stopsound @a`
    )

    system.runInterval(async() => {
      utils.addScoreObjective(`${objID}`, ``);

      // Assign music
      musicTrack.forEach((music, i) => {
        utils.serverCommandAsync(
          `execute positioned ${music.origin.toString()} as ${ music.selector } if entity @s[tag=!${exceptionTag}] unless entity @s[scores={${objID}=${i}}] run scoreboard players set @s ${objID} ${i}`
        );
      });
      // Play music
      utils.serverCommandAsync(
        `scoreboard objectives add ${objID2} dummy`,
        `scoreboard players add @a[scores={${objID}=0..}] ${objID2} 1`
      );

      musicTrack.forEach((music, i) => {
        utils.serverCommandAsync(
          `execute as @a[scores={${objID}=${i},${objID2}=1}] at @s run playsound ${music.track} @s ~~~ ${music.volume} ${music.pitch}`,
          `execute as @a[scores={${objID}=${i},${objID2}=${Math.round(music.duration/music.pitch)}..}] run scoreboard players reset @s ${objID2}`
        );
      });

      // Stop music
      musicTrack.forEach((music, i) => {
        utils.serverCommandAsync(
          `execute positioned ${music.origin.toString()} as ${ music.selector } if entity @s[tag=!${exceptionTag},tag=!${music.track}${i},scores={${objID}=${i}}] run tag @s add ${music.track}${i}`,
          `execute as @a[tag=${music.track}${i},scores={${objID}=!${i}}] run stopsound @s ${music.track}`,
          `execute as @a[tag=${music.track}${i},scores={${objID}=!${i}}] run scoreboard players reset @s ${objID2}`,
          `execute as @a[tag=${music.track}${i},scores={${objID}=!${i}}] run tag @s remove ${music.track}${i}`,

          `execute as @a[tag=${exceptionTag}] run stopsound @s ${music.track}`,
        );
      });

      utils.serverCommandAsync(
        `scoreboard players reset @a[tag=${exceptionTag}] ${objID}`,
        `scoreboard players reset @a[tag=${exceptionTag}] ${objID2}`
      );
    });
  }
}

export const musicController = new MusicController();
