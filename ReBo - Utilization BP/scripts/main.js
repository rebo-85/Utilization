import { system, world } from "@minecraft/server";
import "./translator";

let dis = 0;
// system.runInterval(() => {
//   const player = world.getPlayers()[0];

//   player.runCommandAsync(`execute at @s run camera @s set minecraft:free ease 0.05 linear pos ${-dis * 2} -59 0`);
//   dis += 1;
// }, 1); // Run every second
