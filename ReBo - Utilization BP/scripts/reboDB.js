import { world, system } from "@minecraft/server";

export class reboDB {
  constructor() {
    system.runInterval(() => {
      this.database = ws.getObjective("rebo:database");
      if (this.database === undefined) {
        ws.addObjective("rebo:database", "rebo:database");
      }
      this.tables = this.database.getParticipants();
    });
  }
  
  /**
   * 
   * @param {string} tableName 
   */
  async addTable(tableName) {
    await this.checkIfTableExists(tableName).catch((error) => {
      if (!error) {
        const tableObjective = ws.getObjective("rebo:database");
        tableObjective.setScore( tableName, tableObjective.getParticipants().length );
        this.database = tableObjective;

        ws.addObjective(`database:${tableName}`, `database:${tableName}`);
        
        this.log(`${tableName} table is added to the database.`);
      }
    });
  }
  /**
   * 
   * @param {string} tableName 
   * @param {string} fieldName 
   * @param {enum} fieldType 'string', 'bool', 'number'
   */
  async addField(tableName, fieldName, fieldType) {
    await this.checkIfFieldExists(tableName, fieldName)
      .then((field) => {
        this.logWarning(`${field.displayName} field already exists in ${tableName} table.`);
      })
      .catch((error) => {
        if (!error) {
          const fieldObjective = ws.getObjective(`database:${tableName}`);
          fieldObjective.setScore( fieldName, fieldObjective.getParticipants().length );
          this.log(`${fieldName} field is added to ${tableName} table.`);
        }
      });
  }

  async checkIfTableExists(tableName) {
    return new Promise((resolve, reject) => {
      try {
        const table = this.tables.find( (table) => table.displayName === tableName );
        if (table) {
          resolve(table);
        }
        else {
          reject();
        }
      } catch (error) {
        this.logError(error)
      }
    });
  }
  
  async checkIfFieldExists(tableName, fieldName) {
    return new Promise(async (resolve, reject) => {
      await this.checkIfTableExists(tableName)
        .then((table) => {
          try {
            const field = ws.getObjective(`database:${tableName}`).getParticipants() .find((field) => field.displayName === fieldName);
            if (field) resolve(field);
            else reject();
          } catch (error) {
            this.logError(error);
          }
        })
        .catch((error) => { if (!error) this.logWarning(`${tableName} table does not exists.`); });
    });
  }

  log(message) {
    console.log(`[ReboDB] - ( ✔ ) ${message}`);
  }
  logWarning(message) {
    console.warn(`[ReboDB] - ( ! ) ${message}`);
  }
  logError(message) {
    console.error(`[ReboDB] - ( X ) ${message}`);
  }
}


// Utils
const ws = world.scoreboard;
const runCommandAsync = function (...commands) {
  commands.forEach(async (command) => {
    await world.getDimension("overworld") .runCommandAsync(`${command}`);
  });
};
