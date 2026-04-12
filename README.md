# smart-passphrase

A lightweight, secure, and memorable passphrase generator for Node.js and modern browsers. Built to work smoothly in React, Next.js, Vite, and plain Node projects.

## Features
- **Memorable**: Human‑readable passphrases that are easy to type and remember.
- **Secure**: Uses cryptographically secure randomness (via `crypto.getRandomValues`).
- **Versatile**: Works in React, Next.js, Vite, and Node 18+.
- **CLI Support**: Generate passwords directly from your terminal with `npx`.
- **Zero Dependencies**: Keeps your bundle size minimal.
- **Fully Typed**: Written in TypeScript with a complete API.

## Install
```bash
npm install smart-passphrase
```

## Quick Start (Terminal)
Generate a passphrase instantly without installing:
```bash
npx smart-passphrase
```

With options:
```bash
npx smart-passphrase --words 4 --no-symbols
```

## Quick Start (Code)
```ts
import { generatePassphrase } from "smart-passphrase";

const passphrase = generatePassphrase();
console.log(passphrase);
// Output: SilentGOOSE^mark324
```

## Example Output
```
SilentGOOSE^mark324
BrAveTiger#run891
quickROCKET=jump472
```

## API

### `generatePassphrase(options?)`
Generate a secure, readable passphrase.

```ts
generatePassphrase({
  words: 3,
  numbers: { digits: 3 },
  symbols: true,
  uppercaseStyle: "random",
  separator: ""
});
```

### `generatePassword(options?)`
Alias of `generatePassphrase`.

```ts
const password = generatePassword({ strength: "strong" });
```

### `entropyEstimate(options?)`
Estimate entropy in bits based on your options.

```ts
const bits = entropyEstimate({ words: 4, symbols: true, numbers: true });
```

## Options

### `words`
Number of word tokens in the passphrase. Default is `3` (for medium strength).

### `numbers`
- `true` (default): Adds digits.
- `{ digits: number }`: Controls the number of digits.
- `false`: Removes digits.

### `symbols`
- `true` (default): Includes one random symbol.
- `string[]`: Provide your own symbol list to pick from.
- `false`: Removes symbols.

### `uppercaseStyle`
Controls casing style for the words:
`"none" | "random" | "title" | "upper" | "lower"`

### `strength`
Preset security tiers that adjust words, symbols, and digits.

| Tier | Words | Symbols | Digits | Approx. Entropy |
| :--- | :--- | :--- | :--- | :--- |
| `medium` | 3 | Yes | 3 | ~45-50 bits |
| `strong` | 4 | Yes | 4 | ~60-70 bits |
| `ultra` | 5 | Yes | 5 | ~80+ bits |

```ts
generatePassphrase({ strength: "ultra" });
```

### `pattern`
Custom order of word types. Available kinds: `"adj" | "noun" | "verb"`
```ts
generatePassphrase({ pattern: ["adj", "noun", "verb"] });
```

### `dictionary`
Override the default word lists.
```ts
generatePassphrase({
  dictionary: {
    adjectives: ["silent", "rapid"],
    nouns: ["fox", "river"],
    verbs: ["glide", "spark"]
  }
});
```

## CLI Reference
You can use the package as a command-line tool via `npx` or by installing it globally.

| Option | Description |
| :--- | :--- |
| `--words <n>` | Set the number of words (default: 3) |
| `--no-numbers` | Disable numbers |
| `--no-symbols` | Disable symbols |

## Security Notes
- Uses `crypto.getRandomValues` for strong randomness.
- Requires Node 18+ or a modern browser runtime.
- The default wordlist is carefully curated to avoid offensive terms while maintaining distinctiveness.

## License
MIT