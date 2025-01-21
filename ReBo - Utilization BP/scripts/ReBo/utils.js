import { afterEvents, beforeEvents, world, overworld, nether, end, scoreboard } from "./constants";
import { Entity, Dimension, ScriptEventSource } from "@minecraft/server";
import { RunInterval, RunTimeOut, CommandResult } from "./classes";

const entityRunCommand = Entity.prototype.runCommand;
const dimensionRunCommand = Dimension.prototype.runCommand;
const entityRunCommandAsync = Entity.prototype.runCommandAsync;
const dimensionRunCommandAsync = Dimension.prototype.runCommandAsync;

export function idTranslate(id) {
  return id
    .split(":")[1]
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export function forceSpawn(dimension, id, location, teleportOptions) {
  return new Promise((resolve, reject) => {
    const ec = runInterval(() => {
      const entity = dimension.spawnEntity(id, location);

      if (entity) {
        entity.teleport(location, teleportOptions);
        ec.dispose();
        resolve(entity);
      }
    });
  });
}

export function runCommand(source, ...commands) {
  const result = new CommandResult();

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    if (source === Entity) {
      const cr = entityRunCommand.call(this, command);
      if (cr.successCount > 0) {
        result.successCount++;
      }
    } else if (source === Dimension) {
      const cr = dimensionRunCommand.call(this, command);
      if (cr.successCount > 0) {
        result.successCount++;
      }
    }
  });
  return result;
}

export async function runCommandAsync(source, ...commands) {
  const result = new CommandResult();

  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    if (source === Entity) {
      const cr = await entityRunCommandAsync.call(this, command);
      if (cr.successCount > 0) {
        result.successCount++;
      }
    } else if (source === Dimension) {
      const cr = await dimensionRunCommandAsync.call(this, command);
      if (cr.successCount > 0) {
        result.successCount++;
      }
    }
  });

  await Promise.all(commandPromises);

  return result;
}

export function runInterval(callback, interval) {
  return new RunInterval(callback, interval);
}

export function runTimeout(callback, timeOut) {
  return new RunTimeOut(callback, timeOut);
}

export function getScoreboard(id) {
  return scoreboard.getObjective(id);
}

export function addScoreboard(id, displayName) {
  const isObjectiveExist = getScoreboard(id);
  if (isObjectiveExist) return;

  if (!displayName) displayName = id;
  scoreboard.addObjective(id, displayName);
}

export function removeScoreboard(id) {
  scoreboard.removeObjective(id);
}

export function addScore(id, participant, score) {
  getScoreboard(id).addScore(participant, score);
}

export function getScore(id, participant) {
  return getScoreboard(id).getScore(participant);
}

export function setScore(id, participant, score) {
  getScoreboard(id).setScore(participant, score);
}

export function removeParticipant(id, participant) {
  return getScoreboard(id).removeParticipant(participant);
}

export function removeAllParticipant(id) {
  const scoreboard = getScoreboard(id);
  if (!scoreboard) return;
  for (const participant of scoreboard.getParticipants()) {
    removeParticipant(id, participant);
  }
}

export function display(value, type = "chat") {
  value = JSON.stringify(value, null, 0);
  switch (type) {
    case "chat":
      world.sendMessage(`${value}`);
      break;
    case "error":
      console.error(value);
      break;
    case "log":
      console.log(value);
      break;
    default:
      world.sendMessage(`${value}`);
      break;
  }
}
