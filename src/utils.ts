export const defaultSymbols = ["@", "#", "^", "=", ")", "!", "*", "%"];

export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error("maxExclusive must be a positive integer");
  }

  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || typeof cryptoObj.getRandomValues !== "function") {
    throw new Error("Secure crypto is not available in this environment");
  }

  const range = 0x100000000;
  const limit = range - (range % maxExclusive);
  const buf = new Uint32Array(1);
  let value = 0;

  do {
    cryptoObj.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);

  return value % maxExclusive;
}

export function randomItem<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("Cannot choose from an empty list");
  }
  return items[secureRandomInt(items.length)];
}

export function randomBool(): boolean {
  return secureRandomInt(2) === 1;
}

export function applyCase(word: string, style: "none" | "random" | "title" | "upper" | "lower"): string {
  if (style === "none") return word;
  if (style === "upper") return word.toUpperCase();
  if (style === "lower") return word.toLowerCase();
  if (style === "title") return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return word
    .split("")
    .map((ch) => (randomBool() ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

export function randomNumberByDigits(digits: number): number {
  if (!Number.isInteger(digits) || digits <= 0) {
    throw new Error("digits must be a positive integer");
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const span = max - min + 1;
  return min + secureRandomInt(span);
}
