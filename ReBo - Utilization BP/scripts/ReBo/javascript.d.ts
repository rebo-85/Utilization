import { Vector2, Vector3 } from "./classes";

interface Math {
  /**
   * Generate random integer within the set range.
   * @param {number} min - The minimun number to be generated.
   * @param {number} max - The maximum number to be generated.
   * @returns The generated number.
   */
  randomInt(min: number, max: number): number;
}

interface String {
  
/**
 * Converts a string to a Vector2.
 * @returns The Vector2 representation of the string if valid.
 */
  toVector2(): Vector2 | undefined;

/**
 * Converts a string to EntityQueryOptions.
 * @returns The EntityQueryOptions representation of the string if valid.
 */
  toEQO(): EntityQueryOptions | undefined;
  
/**
 * Converts a string to a Vector3.
 * @returns The Vector3 representation of the string if valid.
 */
  toVector3(): Vector3 | undefined;
}