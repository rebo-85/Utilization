import { addScoreboard, getScoreboard, removeParticipant, setScore, removeScoreboard } from "../Utils";

/**
 * ScoreboardDB class to handle key-value pairs stored in a Minecraft scoreboard.
 *
 * @class ScoreboardDB
 * @param {string} id - The ID of the scoreboard.
 *
 * @method set(key: string, value: any): void
 * Sets a key-value pair in the scoreboard.
 *
 * @method get(key: string): any
 * Gets the value associated with a key from the scoreboard.
 *
 * @method remove(key: string): void
 * Removes a key-value pair from the scoreboard.
 *
 * @method dispose(): void
 * Disposes of the scoreboard.
 *
 * @example
 * const db = new ScoreboardDB("myScoreboard");
 * db.set("key", { foo: "bar" });
 * const value = db.get("key");
 * db.remove("key");
 * db.dispose();
 */
export class ScoreboardDB {
  constructor(id) {
    this.id = id;
    addScoreboard(id);
    this.sb = getScoreboard(id);
    this.participants = [];
  }

  /**
   * Sets a key-value pair in the scoreboard.
   * @param {string} key - The key to set.
   * @param {*} value - The value to set.
   */
  set(key, value) {
    const displayName = `${key} = ${JSON.stringify(value, null, 0)}`;

    const existingParticipant = this.#getParticipant(key);
    if (existingParticipant) removeParticipant(this.id, existingParticipant);

    setScore(this.id, displayName, 0);
  }

  /**
   * Gets the value associated with a key from the scoreboard.
   * @param {string} key - The key to retrieve the value for.
   * @returns {*} The value associated with the key, or null if not found.
   */
  get(key) {
    const participant = this.#getParticipant(key);

    if (!participant) return null;

    const match = participant.displayName.match(/^\s*[\w$]+\s*=\s*(.*)\s*$/);
    if (match) {
      let valueStr = match[1].trim();
      try {
        return JSON.parse(valueStr);
      } catch {
        return valueStr;
      }
    }
    return null;
  }

  /**
   * Removes a key-value pair from the scoreboard.
   * @param {string} key - The key to remove.
   */
  remove(key) {
    const participant = this.#getParticipant(key);
    if (participant) {
      removeParticipant(this.id, participant);
    }
  }

  /**
   * Disposes of the scoreboard.
   */
  dispose() {
    removeScoreboard(this.id);
  }

  /**
   * Gets a participant from the scoreboard by key.
   * @private
   * @param {string} key - The key to search for.
   * @returns {object|null} The participant object if found, otherwise null.
   */
  #getParticipant(key) {
    this.participants = this.sb.getParticipants();

    return this.participants.find((participant) => {
      const displayName = participant.displayName;
      if (typeof displayName !== "string") return false;

      const match = displayName.match(/^\s*([\w$]+)\s*=/);
      const fetchedKey = match ? match[1] : null;
      return fetchedKey === key;
    });
  }
}
