import { runInterval, test, afterEvents, beforeEvents, world } from "./Minecraft";
import { ScriptEventSource } from "@minecraft/server";

const namespace = "rebo";

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

export function timer(player, durationInSeconds, func) {
  let timer = durationInSeconds;
  const process = runInterval(() => {
    const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    // Add leading zero to seconds if less than 10
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the countdown
    player.commandRunAsync(`title @s actionbar ${namespace}.timer.${seconds < 10 && seconds % 2 == 1 ? "§c" : "§r"}${minutes}:${seconds}`);

    // Check if the timer has reached 0
    if (--timer < -1) {
      func();
      process.dispose();
      return;
    }
  }, 20);
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
