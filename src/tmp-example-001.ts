// src/concept.ts
// my concept is based on encapsulating
// into an array to do the stuf as a map() even
// if one item is transformed
// EXAMPLE:

const [example]: number[] = ['chocolate']
  .map(stringLength)
  .map(isEven)
  .map(boolToNumber);

/**
 * Increments a number by 1.
 * @param n - A number
 * @returns The number incremented by 1
 */
export function increment(n: number): number {
  return n + 1;
}

/**
 * Converts a string to uppercase.
 * @param s - A string
 * @returns The uppercase version of the string
 */
export function toUpperCase(s: string): string {
  return s.toUpperCase();
}

/**
 * Checks if a number is even.
 * @param n - A number
 * @returns True if the number is even, false otherwise
 */
export function isEven(n: number): boolean {
  return n % 2 === 0;
}

/**
 * Converts a boolean to a number (true → 1, false → 0).
 * @param b - A boolean
 * @returns 1 if true, 0 if false
 */
export function boolToNumber(b: boolean): number {
  return b ? 1 : 0;
}

/**
 * Repeats a string a given number of times.
 * @param s - The string to repeat
 * @param count - Number of repetitions
 * @returns The repeated string
 */
export function repeatString(s: string, count: number): string {
  return s.repeat(count);
}

/**
 * Returns the length of a string.
 * @param s - A string
 * @returns The number of characters in the string
 */
export function stringLength(s: string): number {
  return s.length;
}

/**
 * Converts a number to a string.
 * @param n - A number
 * @returns The number as a string
 */
export function numberToString(n: number): string {
  return n.toString();
}

/**
 * Encapsulates a value and allows chained transformations.
 * Use `.then(fn)` to apply transformations.
 * Use `.unbox()` to extract the final value.
 * @param value - The initial value to encapsulate
 * @returns A chainable object supporting transformation and unboxing
 * @example
 * ```ts
 * const result = processWrapper('chocolate')(stringLength)(isEven)(boolToNumber).unbox();
 * // result: 0
 * ```
 */
export function processWrapper<T>(value: T): {
  <U>(fn: (x: T) => U): ReturnType<typeof processWrapper<U>> & { unbox: () => U };
  unbox: () => T;
} {
  function chain<U>(fn: (x: T) => U) {
    const nextValue = fn(value);
    const nextChain = processWrapper(nextValue);
    return Object.assign(nextChain, { unbox: () => nextValue });
  }
  return Object.assign(chain, { unbox: () => value });
}

/**
 * Unboxing helper, only works at end of the chain.
 */
export function unbox<T>(x: { unbox: () => T }): T {
  return x.unbox();
}

const result =
  processWrapper('chocolate')(stringLength)(isEven)(boolToNumber).unbox();

console.dir({ result, example });
