# smart-passphrase

A lightweight, secure, and memorable passphrase generator for Node.js and modern browsers. Built to work smoothly in React, Next.js, Vite, and plain Node projects.

## Features
- Human‑readable passphrases with strong randomness
- Cryptographically secure randomness (via `crypto.getRandomValues`)
- Works in React, Next.js, Vite, and Node 18+
- Fully typed TypeScript API
- Configurable casing, symbols, numbers, and word patterns
- Custom dictionary support

## Install
```bash
npm install smart-passphrase
```

## Quick Start
```ts
import { generatePassphrase } from "smart-passphrase";

const passphrase = generatePassphrase();
console.log(passphrase);
```

## Example Output
```
SilentGOOSE^mark324
BrAveTiger#run891
quickROCKET=jump472
```

## Usage in React / Next.js / Vite
```tsx
import { generatePassphrase } from "smart-passphrase";

export default function App() {
  return <h2>{generatePassphrase()}</h2>;
}
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
Number of word tokens in the passphrase.

```ts
generatePassphrase({ words: 4 });
```

### `numbers`
- `true` (default) to add digits
- `{ digits: number }` to control length

```ts
generatePassphrase({ numbers: { digits: 4 } });
```

### `symbols`
- `true` (default) to include symbols
- `string[]` to provide your own symbol list

```ts
generatePassphrase({ symbols: ["$", "-", "_"] });
```

### `uppercaseStyle`
Controls casing:

```ts
"none" | "random" | "title" | "upper" | "lower"
```

Example:
```ts
generatePassphrase({ uppercaseStyle: "title" });
```

### `separator`
String inserted between all parts.

```ts
generatePassphrase({ separator: "-" });
```

### `unique`
Avoid repeating words within the same passphrase.

```ts
generatePassphrase({ unique: true });
```

### `strength`
Preset security tiers:

```ts
"medium" | "strong" | "ultra"
```

Each tier increases words, digits, and entropy.

```ts
generatePassphrase({ strength: "ultra" });
```

### `pattern`
Custom order of word types.

```ts
generatePassphrase({ pattern: ["adj", "noun", "verb"] });
```

Available word kinds:
```ts
"adj" | "noun" | "verb"
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

## Security Notes
- Uses `crypto.getRandomValues` for strong randomness.
- Requires Node 18+ or a modern browser runtime.
- For even higher entropy, increase `words`, `digits`, or use `strength: "ultra"`.

## License
MIT
```

If you want, I can also add:
1. A `COPY` helper utility example
2. A CLI usage snippet
3. A comparison table for `strength` presets