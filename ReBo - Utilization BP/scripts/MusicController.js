import { system } from "@minecraft/server";
import { utils, Vector3 } from "Utils";
import { Music } from "Modules";

/* 
================================================================================================================================
  DISCLAIMER: 
    This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
    the implied warranties of merchantability and fitness for a particular purpose. The contributors provide 
    this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
    this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
    unless explicit permission is obtained from the contributors.
================================================================================================================================= 
*/

const exceptionTag = 'music_stop';
const objID = 'music';
const objID2 = 'musicTick';
const defaultVolume = 0.5;
const defaultPitch = 1.0;


const musicTrack = [
  new Music(`music.main`, `@a`, 930),
  new Music(`music.circus`, `@a[r=20]`, 730, new Vector3(-71, 72, -27)),
  new Music(`music.circus`, `@a[tag=caroussel]`, 730),
  new Music(`music.bumper_cars`, `@a[tag=bumperCars]`, 1220),
  new Music(`music.race`, `@a[tag=race]`, 730),
  
];

class MusicController {
  constructor() {
    utils.serverCommandAsync(
      `scoreboard players reset @a ${objID}`,
      `scoreboard players reset @a ${objID2}`,
      `stopsound @a`
    )

    utils.afterEvents.playerJoin.subscribe((e) => {
      const playerName = e.playerName;

      const runInterval1 = system.runInterval(async () => {
        const successCount = await utils.serverCommandAsync(
          `testfor ${playerName}`
        )
        if (successCount > 0) {
          system.runTimeout(() => {
            utils.serverCommandAsync(
              `scoreboard players reset ${playerName} ${objID}`,
              `scoreboard players reset ${playerName} ${objID2}`
            );
          }, 40);

          system.clearRun(runInterval1);
        }
      })
    });

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
