import { addScoreboard, getScoreboard, removeParticipant, setScore, removeScoreboard } from "../utils";
export class ScoreboardDB {
  constructor(id) {
    this.id = id;
    addScoreboard(id);
    this.sb = getScoreboard(id);
    this.participants = [];
  }

  set(key, value) {
    const displayName = `${key} = ${JSON.stringify(value, null, 0)}`;

    const existingParticipant = this.#getParticipant(key);
    if (existingParticipant) removeParticipant(this.id, existingParticipant);

    setScore(this.id, displayName, 0);
  }
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

  remove(key) {
    const participant = this.#getParticipant(key);
    if (participant) {
      removeParticipant(this.id, participant);
    }
  }

  dispose() {
    removeScoreboard(this.id);
  }

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
