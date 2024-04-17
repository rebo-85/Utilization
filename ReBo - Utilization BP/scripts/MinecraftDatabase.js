import { world } from "@minecraft/server";
import { utils } from "Utils";

/* 
*******************************************************************************************************************************
DISCLAIMER: 
  This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
  the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
  this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
  this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
  unless explicit permission is obtained from ReBo and any contributors.
******************************************************************************************************************************* 
*/


export class MinecraftDatabase {
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.databaseObjective = world.scoreboard.getObjective(databaseName);
    if (!this.databaseObjective) {
      try {
        utils.addScoreObjective(databaseName, databaseName);
        this.databaseObjective = world.scoreboard.getObjective(databaseName);
      } catch (error) {
        console.error("Error creating database objective:", error);
      }
    }
  }

  addEntry(player, score) {
    try {
      this.databaseObjective.setScore(player, score);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  addEntryIfHigher(player, score) {
    try {
      const currentScore = this.getScore(player);
      if (currentScore === undefined || score > currentScore) {
        this.addEntry(player, score);
        console.log(`Added entry for ${player} with score ${score}`);
      } else {
        console.log(
          `Score for ${player} (${currentScore}) is higher or equal. Not adding entry.`
        );
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  getScore(player) {
    try {
      const isParticipantExist = this.databaseObjective.hasParticipant(player);
      if (isParticipantExist) return this.databaseObjective.getScore(player);
      else return null;
    } catch (error) {
      console.error("Error getting score:", error);
      return null;
    }
  }

  removeEntry(player) {
    try {
      this.databaseObjective.removeParticipant(player);
    } catch (error) {
      console.error("Error removing entry:", error);
    }
  }

  getAllEntries() {
    try {
      const entries = this.databaseObjective.getParticipants();
      return entries.map((entry) => ({
        player: entry,
        score: this.getScore(entry),
      }));
    } catch (error) {
      console.error("Error getting all entries:", error);
      return [];
    }
  }

  getHighestEntry() {
    try {
      const allEntries = this.getAllEntries();
      if (allEntries.length === 0) {
        return null; // No entries, return null
      }

      // Find the entry with the highest score
      const highestEntry = allEntries.reduce((prev, current) => {
        return current.score > prev.score ? current : prev;
      });

      return highestEntry;
    } catch (error) {
      console.error("Error getting highest score:", error);
      return null;
    }
  }
}
