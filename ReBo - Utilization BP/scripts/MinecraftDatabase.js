// MinecraftDatabase.js

import { world } from "@minecraft/server";

export class MinecraftDatabase {
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.databaseObjective = world.scoreboard.getObjective(databaseName);
    if (!this.databaseObjective) {
      world.scoreboard.addObjective(databaseName, databaseName);
      this.databaseObjective = world.scoreboard.getObjective(databaseName);
    }
  }

  addEntry(player, value) {
    // Convert the value to a string and store it as a score
    const stringValue = JSON.stringify(value);
    const numericValue = parseFloat(stringValue);
    
    if (!isNaN(numericValue)) {
      this.databaseObjective.setScore(player, numericValue);
    } else {
      console.error(`Failed to add entry for player ${player}. Value must be a number.`);
    }
  }

  getEntry(player) {
    // Retrieve the stored value, convert it back to a string, and then deserialize
    const rawValue = this.databaseObjective.getScore(player);
    try {
      return rawValue !== null ? JSON.parse(rawValue.toString()) : null;
    } catch (error) {
      console.error(`Failed to parse entry for player ${player}.`, error);
      return null;
    }
  } 

  removeEntry(player) {
    this.databaseObjective.resetScore(player);
  }

  getAllEntries() {
    const entries = this.databaseObjective.getParticipants();
    return entries.map((entry) => ({
      player: entry,
      value: this.getEntry(entry),
    }));
  }
}
  