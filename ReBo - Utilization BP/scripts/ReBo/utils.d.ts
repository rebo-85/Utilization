import { ScriptEventSource, ScoreboardObjective } from "@minecraft/server";
import { RunInterval, RunTimeOut, CommandResult } from "./classes";

/**
 * Runs synchronous commands on a source.
 * @param source The command source.
 * @param commands Commands to run.
 * @returns CommandResult object indicating success count.
 */
export function commandRun(source: Dimension|Entity, ...commands: string[][]): CommandResult;

/**
 * Runs asynchronous commands on a source.
 * @param source The command source.
 * @param commands Commands to run asynchronously.
 * @returns CommandResult object indicating success count.
 */
export function commandRunAsync(source: Dimension|Entity, ...commands: string[][]): Promise<CommandResult>;

/**
 * Prevents spawning of entities matching selectors across dimensions.
 * @param selectorList List of selectors.
 */
export function ForbidSpawn(selectorList: string[]): void;

/**
 * Creates and starts an interval that runs the provided callback repeatedly.
 * @param callback Callback to be executed.
 * @param interval Interval duration in milliseconds.
 * @returns RunInterval instance.
 */
export function runInterval(callback: () => void, interval: number): RunInterval;

/**
 * Creates a timeout that runs the provided callback after a specified time.
 * @param callback Callback to be executed.
 * @param timeOut Timeout duration in milliseconds.
 * @returns RunTimeOut instance.
 */
export function runTimeout(callback: () => void, timeOut: number): RunTimeOut;

/**
 * Retrieves an existing scoreboard objective by ID.
 * @param id Scoreboard objective ID.
 * @returns Scoreboard Objective instance.
 */
export function getScoreboard(id: string): ScoreboardObjective;

/**
 * Adds a new scoreboard objective if it does not already exist.
 * @param id Scoreboard objective ID.
 * @param displayName Display name of the scoreboard objective.
 */
export function addScoreboard(id: string, displayName?: string): void;

/**
 * Removes a scoreboard objective by ID.
 * @param id Scoreboard objective ID.
 */
export function removeScoreboard(id: string): bool;

/**
 * Adds score to a participant in a scoreboard.
 * @param id Scoreboard objective ID.
 * @param participant Participant name.
 * @param score Score to add.
 */
export function addScore(id: string, participant: string, score: number): void;

/**
 * Retrieves score of a participant from a scoreboard.
 * @param id Scoreboard objective ID.
 * @param participant Participant name.
 * @returns Participant's score.
 */
export function getScore(id: string, participant: string): number;

/**
 * Sets score of a participant in a scoreboard.
 * @param id Scoreboard objective ID.
 * @param participant Participant name.
 * @param score New score.
 */
export function setScore(id: string, participant: string, score: number): void;

/**
 * Removes a participant from a scoreboard.
 * @param id Scoreboard objective ID.
 * @param participant Participant name.
 */
export function removeParticipant(id: string, participant: string): void;

/**
 * Removes all participants from a scoreboard.
 * @param id Scoreboard objective ID.
 */
export function removeAllParticipant(id: string): void;

/**
 * Sends a message to the game world.
 * @param value Message content.
 * @param type Message type (default is 'chat').
 */
export function display(value: any, type?: "chat" | "error" | "log"): void;

/**
 * Retrieves the appropriate event source for a script event.
 * @param event Script event object.
 * @returns Event source entity.
 */
export function getScriptEventSource(event: ScriptEventCommandMessageAfterEvent): ScriptEventSource;

/**
 * Executes a callback when a player loads into the world.
 * @param callback Callback function.
 */
export function onPlayerLoad(callback: (player: Player) => void): void;

/**
 * Executes a callback when the world opens.
 * @param callback Callback function.
 */
export function onWorldOpen(callback: (player: Player) => void): void;

/**
 * Executes a callback when the world closes.
 * @param callback Callback function.
 */
export function onWorldClose(callback: (player: Player) => void): void;
