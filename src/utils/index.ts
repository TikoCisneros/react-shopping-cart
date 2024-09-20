/**
 * Counts the number of keys in an object.
 *
 * @param {object} obj - The object whose keys are to be counted.
 * @returns {number} The number of keys in the object.
 */
export function countObjectKeys(obj: Record<string, unknown>): number {
  return Object.keys(obj).length;
}

/**
 * Checks if a key exists in an object.
 *
 * @param {object} obj - The object to check.
 * @param {string} key - The key to look for in the object.
 * @returns {boolean} True if the key exists, false otherwise.
 */
export function hasKeyInObject(obj: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
