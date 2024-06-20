import { afterEvents, beforeEvents, world, overworld, nether, end } from "./Constants";
import { ScriptEventSource } from "@minecraft/server";
import { RunInterval, RunTimeOut } from "./Classes";
import { scoreboard } from "./Constants";

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

export function runInterval(func, interval) {
  return new RunInterval(func, interval);
}

export function runTimeout(func, timeOut) {
  return new RunTimeOut(func, timeOut);
}

export function getScoreboard(id) {
  return scoreboard.getObjective(id);
}

export function addScoreboard(id, displayName) {
  const isObjectiveExist = getScoreboard(id);
  if (isObjectiveExist) return;

  if (!displayName) displayName = id;
  return scoreboard.addObjective(id, displayName);
}

export function removeScoreboard(id) {
  return scoreboard.removeObjective(id);
}

export function addScore(id, participant, score) {
  return getScoreboard(id).addScore(participant, score);
}

export function getScore(id, participant) {
  return getScoreboard(id).getScore(participant);
}

export function setScore(id, participant, score) {
  return getScoreboard(id).setScore(participant, score);
}

export function removeParticipant(id, participant) {
  try {
    return getScoreboard(id).removeParticipant(participant);
  } catch (error) {}
}

export function removeAllParticipant(id) {
  const allParticipants = getScoreboard(id)?.getParticipants();
  allParticipants?.forEach((participant) => {
    removeParticipant(id, participant);
  });
}

export function test(value, type = "chat") {
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

export function onPlayerLoad(func) {
  afterEvents.playerJoin.subscribe((event) => {
    const sys = runInterval(() => {
      const players = world.getAllPlayers();
      if (players.length > 0) {
        const player = world.getEntity(event.playerId);
        func(player);
        sys.dispose();
      }
    }, 1);
  });
}

export function onWorldOpen(func) {
  onPlayerLoad((player) => {
    const players = world.getAllPlayers();
    if (players.length === 1) {
      func(player);
    }
  });
}

export function onWorldClose(func) {
  beforeEvents.playerLeave.subscribe((event) => {
    const players = world.getAllPlayers();
    if (players.length === 1) {
      func(event.player);
    }
  });
}
