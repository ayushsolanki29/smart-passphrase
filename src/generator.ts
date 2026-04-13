import { adjectives, nouns, verbs, simpleAdjectives, simpleNouns, simpleVerbs } from "./wordlist.js";
import { applyCase, defaultSymbols, randomItem, randomNumberByDigits, secureRandomInt } from "./utils.js";
import type { Dictionary, GenerateOptions, WordKind } from "./types.js";

const strengthDefaults: Record<string, { words: number; symbols: boolean; numbers: boolean; digits: number; uppercaseStyle?: any; separator?: string }> = {
  easy: { words: 3, symbols: false, numbers: true, digits: 2, uppercaseStyle: "title", separator: "-" },
  medium: { words: 3, symbols: true, numbers: true, digits: 3 },
  strong: { words: 4, symbols: true, numbers: true, digits: 4 },
  ultra: { words: 5, symbols: true, numbers: true, digits: 5 }
};

function buildDictionary(overrides?: Partial<Dictionary>, strength?: string): Dictionary {
  if (strength === "easy") {
    return {
      adjectives: overrides?.adjectives ?? simpleAdjectives,
      nouns: overrides?.nouns ?? simpleNouns,
      verbs: overrides?.verbs ?? simpleVerbs
    };
  }
  return {
    adjectives: overrides?.adjectives ?? adjectives,
    nouns: overrides?.nouns ?? nouns,
    verbs: overrides?.verbs ?? verbs
  };
}

function chooseWords(dictionary: Dictionary, kinds: WordKind[], unique: boolean): string[] {
  const used = new Set<string>();
  const output: string[] = [];

  for (const kind of kinds) {
    const list = kind === "adj" ? dictionary.adjectives : kind === "noun" ? dictionary.nouns : dictionary.verbs;
    if (list.length === 0) {
      throw new Error(`Dictionary list for ${kind} is empty`);
    }

    let picked = randomItem(list);
    if (unique) {
      let attempts = 0;
      while (used.has(picked) && attempts < 25) {
        picked = randomItem(list);
        attempts += 1;
      }
    }

    used.add(picked);
    output.push(picked);
  }

  return output;
}

function defaultPattern(words: number): WordKind[] {
  const pool: WordKind[] = ["adj", "noun", "verb"];
  const output: WordKind[] = [];
  for (let i = 0; i < words; i += 1) {
    output.push(pool[i % pool.length]);
  }
  return output;
}

export function generatePassphrase(options: GenerateOptions = {}): string {
  const defaults = options.strength ? strengthDefaults[options.strength] : strengthDefaults.medium;
  const wordCount = options.words ?? defaults.words;
  const useSymbols = options.symbols ?? defaults.symbols;
  const numbersOption = options.numbers ?? defaults.numbers;
  const digits = typeof numbersOption === "object" ? (numbersOption as any).digits ?? defaults.digits : defaults.digits;
  const separator = options.separator ?? defaults.separator ?? "";
  const uppercaseStyle = options.uppercaseStyle ?? defaults.uppercaseStyle ?? "random";
  const unique = options.unique ?? true;

  const dictionary = buildDictionary(options.dictionary, options.strength);
  const pattern = options.pattern ?? defaultPattern(wordCount);
  if (pattern.length !== wordCount) {
    throw new Error("pattern length must match words");
  }

  const words = chooseWords(dictionary, pattern, unique).map((word) => applyCase(word, uppercaseStyle));

  const parts: string[] = [];
  for (const word of words) {
    parts.push(word);
  }

  if (useSymbols) {
    const symbols = Array.isArray(useSymbols) ? useSymbols : defaultSymbols;
    parts.push(randomItem(symbols));
  }

  if (numbersOption) {
    parts.push(String(randomNumberByDigits(digits)));
  }

  if (separator) {
    return parts.join(separator);
  }

  return parts.join("");
}

export function generatePassword(options: GenerateOptions = {}): string {
  return generatePassphrase(options);
}

export function entropyEstimate(options: GenerateOptions = {}): number {
  const defaults = options.strength ? strengthDefaults[options.strength] : strengthDefaults.medium;
  const wordCount = options.words ?? defaults.words;
  const useSymbols = options.symbols ?? defaults.symbols;
  const numbersOption = options.numbers ?? true;
  const digits = typeof numbersOption === "object" ? numbersOption.digits ?? defaults.digits : defaults.digits;
  const dictionary = buildDictionary(options.dictionary, options.strength);
  const pattern = options.pattern ?? defaultPattern(wordCount);

  const sizes = pattern.map((kind) => {
    const list = kind === "adj" ? dictionary.adjectives : kind === "noun" ? dictionary.nouns : dictionary.verbs;
    return list.length || 1;
  });

  const wordSpace = sizes.reduce((acc, size) => acc * size, 1);
  const symbolSpace = useSymbols ? (Array.isArray(useSymbols) ? useSymbols.length : defaultSymbols.length) : 1;
  const numberSpace = numbersOption ? Math.pow(10, digits) : 1;
  const total = wordSpace * symbolSpace * numberSpace;

  return Math.log2(total);
}
