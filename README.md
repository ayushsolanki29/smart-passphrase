Human-readable, secure password generator for developers and CLI usage.
# smart-passphrase

A lightweight, secure, and memorable passphrase generator for Node.js and modern browsers. Built to work smoothly in React, Next.js, Vite, and plain Node projects.

## Features
- **Memorable**: Human‑readable passphrases that are easy to type and remember.
- **Secure**: Uses cryptographically secure randomness (via `crypto.getRandomValues`).
- **Versatile**: Works in React, Next.js, Vite, and Node 18+.
- **Premium CLI**: Beautifully styled terminal output with colors and animations.
- **Clipboard Support**: Copy passphrases instantly from the CLI.
- **Zero Dependencies (Core)**: Only adds dependencies for the CLI tool.
- **Fully Typed**: Written in TypeScript with a complete API.

## Install
```bash
npm install smart-passphrase
```

## Quick Start (Terminal)
Generate a passphrase instantly with a premium experience:
```bash
npx smart-passphrase
```

**Pro Tip (Copy to clipboard):**
```bash
npx smart-passphrase copy
# or
npx smart-passphrase -c
```

**Custom Strength:**
```bash
npx smart-passphrase --strength ultra
```

## Quick Start (Code)
```ts
import { generatePassphrase } from "smart-passphrase";

const passphrase = generatePassphrase();
console.log(passphrase);
// Output: SilentGOOSE^mark324
```

## Example Output
The CLI provides a vibrant, gradient-colored output that stands out!

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
Number of word tokens in the passphrase. Default is `3`.

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

| Tier | Words | Symbols | Digits | Formatting | Approx. Entropy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `easy` | 3 | No | 2 | Title-Case-99 | ~30-35 bits |
| `medium` | 3 | Yes | 3 | raNDomSYmb=123 | ~45-50 bits |
| `strong` | 4 | Yes | 4 | rAndOMWordS#5432 | ~60-70 bits |
| `ultra` | 5 | Yes | 5 | vErYStrONgWOrDs%12345 | ~80+ bits |

## CLI Reference
Run `npx smart-passphrase [command] [options]` or install globally.

### Commands
- `[default]` - Generate a passphrase.
- `copy` - Generate and copy to clipboard immediately.

### Options
- `-w, --words <n>` - Set the number of words (default: 3).
- `-s, --strength <tier>` - Set tier (easy, medium, strong, ultra).
- `-c, --copy` - Copy generated passphrase to clipboard.
- `-n, --numbers` - Include numbers.
- `-N, --no-numbers` - Disable numbers.
- `-S, --symbols` - Include symbols.
- `-X, --no-symbols` - Disable symbols.

## Security Notes
- Uses `crypto.getRandomValues` for strong randomness.
- Requires Node 18+ or a modern browser runtime.

## License
MIT