import { addScoreboard, getScoreboard, removeParticipant, setScore } from "./Minecraft";

export class ScoreboardDB {
  constructor(sbId) {
    this.sbId = sbId;
    addScoreboard(sbId);
    this.sb = getScoreboard(sbId);
    this.sbIdens = [];
    this.#update();
  }

  save(varName, value) {
    // Convert value to a string in the format "varName = value"
    const scoreEntry = `${varName} = ${JSON.stringify(value, null, 0)}`;

    // Find the existing score entry and remove it if it exists
    const existingSbIden = this.#getSbIden(varName);
    if (existingSbIden) removeParticipant(this.sbId, existingSbIden);

    // Save the new score entry
    setScore(this.sbId, scoreEntry, 0);
  }

  get(varName) {
    const sbIden = this.#getSbIden(varName);

    if (!sbIden) return null;

    const match = sbIden.displayName.match(/^\s*[\w$]+\s*=\s*(.*)\s*$/);
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

  #getSbIden(varName) {
    this.#update();

    return this.sbIdens.find((sbIden) => {
      const str = sbIden.displayName;
      if (typeof str !== "string") return false;

      const extractedVarName = this.#getVarName(str);
      return extractedVarName === varName;
    });
  }

  #update() {
    this.sbIdens = this.sb.getParticipants();
  }

  #getVarName(str) {
    const match = str.match(/^\s*([\w$]+)\s*=/);
    return match ? match[1] : null;
  }
}
