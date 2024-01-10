import { world } from "@minecraft/server";
import { reboDB } from "reboDB.js";

world.afterEvents.playerBreakBlock.subscribe((event) => {
  const db = new reboDB();
//   db.addTable(`table5`);
    db.addField(`table5`, 'wew');
});