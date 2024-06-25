import { afterEvents, beforeEvents, world, overworld, nether, end } from "./constants";
import { ScriptEventSource } from "@minecraft/server";
import { RunInterval, RunTimeOut, CommandResult } from "./classes";
import { scoreboard } from "./constants";

export function commandRun(source, ...commands) {
  const result = new CommandResult();

  const flattenedCommands = commands.flat();

  flattenedCommands.forEach((command) => {
    const cr = source.runCommand(`${command}`);
    if (cr.successCount > 0) {
      result.successCount++;
    }
  });
  return result;
}

export async function commandRunAsync(source, ...commands) {
  const result = new CommandResult();

  const flattenedCommands = commands.flat();

  const commandPromises = flattenedCommands.map(async (command) => {
    const cr = await source.runCommandAsync(command);
    if (cr.successCount > 0) {
      result.successCount++;
    }
  });

  await Promise.all(commandPromises);

  return result;
}

export function ForbidSpawn(selectorList) {
  runInterval(() => {
    let entities = new Set([]);
    selectorList.forEach((selector) => {
      overworld.fetchEntities(selector).forEach((entity) => {
        entities.add(entity);
      });
      nether.fetchEntities(selector).forEach((entity) => {
        entities.add(entity);
      });
      end.fetchEntities(selector).forEach((entity) => {
        entities.add(entity);
      });
    });

    for (let entity of entities) {
      try {
        entity.remove();
      } catch (error) {}
    }
  });
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

export function getScriptEventSource(event) {
  switch (event.sourceType) {
    case ScriptEventSource.Block:
      return event.sourceBlock;
    case ScriptEventSource.Entity:
      return event.sourceEntity;
    case ScriptEventSource.NPCDialogue:
      return event.initiator;
    default:
      return;
  }
}

export function onPlayerLoad(callback) {
  afterEvents.playerJoin.subscribe((event) => {
    const sys = runInterval(() => {
      const players = world.getAllPlayers();
      if (players.length > 0) {
        const player = world.getEntity(event.playerId);
        callback(player);
        sys.dispose();
      }
    }, 1);
  });
}

export function onWorldOpen(callback) {
  onPlayerLoad((player) => {
    const players = world.getAllPlayers();
    if (players.length === 1) {
      callback(player);
    }
  });
}

export function onWorldClose(callback) {
  beforeEvents.playerLeave.subscribe((event) => {
    const players = world.getAllPlayers();
    if (players.length === 1) {
      callback(event.player);
    }
  });
}
