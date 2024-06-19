/**
 * @description
 * Ensure that the length of the str is always equal to the length.
 * If it's long, cut it from the back, and if it's short, fill in the space.
 */
export function ensureStringLength(str: string, length: number) {
  const slicedStr = str.slice(0, length);
  const paddedStr = slicedStr.padStart(length, ' ');
  return paddedStr;
}
