export type UppercaseStyle = "none" | "random" | "title" | "upper" | "lower";
export type Strength = "easy" | "medium" | "strong" | "ultra";
export type WordKind = "adj" | "noun" | "verb";

export interface Dictionary {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
}

export interface GenerateOptions {
  words?: number;
  numbers?: boolean | { digits?: number };
  symbols?: boolean | string[];
  uppercaseStyle?: UppercaseStyle;
  separator?: string;
  unique?: boolean;
  strength?: Strength;
  pattern?: WordKind[];
  dictionary?: Partial<Dictionary>;
}
