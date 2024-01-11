// main.js

import { world } from " ";
import { MinecraftDatabase } from './MinecraftDatabase';

const myDatabase = new MinecraftDatabase("my_database");

world.afterEvents.playerBreakBlock.subscribe((event) => {
  const player1Data = { score: 100, status: "active" };
  const player2Data = { score: 150, status: "inactive" };

  // Convert objects to strings before storing them
  myDatabase.addEntry("Player1", JSON.stringify(player1Data));
  myDatabase.addEntry("Player2", JSON.stringify(player2Data));

  const allEntries = myDatabase.getAllEntries();

  console.log("All Entries:");
  allEntries.forEach(entry => {
    // Parse the stored string back to an object
    const parsedValue = JSON.parse(entry.value);
    console.log(`Player: ${entry.player}, Value: ${JSON.stringify(parsedValue)}`);
  });
});
