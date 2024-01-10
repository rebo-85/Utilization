import { world, system } from "@minecraft/server";

export class reboDB {
  constructor() {
    this.database = ws.getObjective("rebo:database");
    if (this.database === undefined) {
      ws.addObjective("rebo:database", "Database List");
    }
  }
  /**
   * 
   * @param {string} tableName 
   */
  addTable(tableName) {
    this.checkIfTableExist(tableName).catch(() => {
      ws.getObjective("rebo:database").setScore(tableName, this.tables.length);
      this.database.setScore(tableName, this.tables.length);
      this.log(`${tableName} table is added to the database.`);
    });
  }
  /**
   * 
   * @param {string} tableName 
   * @param {string} fieldName 
   * @param {enum} fieldType 'string', 'bool', 'number'
   */
  addField(tableName, fieldName, fieldType) {
    this.checkIfTableExist(tableName)
      .then(() => {
        // const types = ['string', 'bool', 'number'] //                            << Ends here
        this.log(`${fieldName} field is added to ${tableName} table.`);
      })
      .catch(() => {
        this.logError(`${tableName} table does not exists.`);
      });
  }

  checkIfTableExist(tableName) {
    return new Promise((resolve, reject) => {
      this.tables = this.database.getParticipants();
      const tableExists = this.tables.some(
        (table) => table.displayName === tableName
      );
      if (tableExists) {
        resolve(tableName);
      } else {
        reject(tableName);
      }
    });
  }

  log(message) {
    console.warn(`§l[ReboDB]: §r§a( ✔ ) ${message}`);
  }
  logWarning(message) {
    console.warn(`§l[ReboDB]: §r§6( ! ) ${message}`);
  }
  logError(message) {
    console.warn(`§l[ReboDB]: §r§c( X ) ${message}`);
  }
}


// Utils
const ws = world.scoreboard;
const runCommandAsync = function (...commands) {
  commands.forEach(async (command) => {
    await world.getDimension("overworld") .runCommandAsync(`${command}`);
  });
};
