/**
 *
 * @param {string} string
 * @param {number} index
 * @param {string} replacement
 * @returns {string} newString
 */
export function replaceAt(string, index, replacement) {
  return `${string.substring(0, index)}${replacement}${string.substring(
    index + replacement.length
  )}`;
}

/**
 * @description Generate a random index
 * Based on provided max and min values
 * if min is not provided, 0 is used
 * @param {number} max
 * @param {number} min
 * @returns {number} index
 */
 export function generatePlayer() {
    return Math.floor(Math.random() * 2) ? 'o' : 'x';
  }