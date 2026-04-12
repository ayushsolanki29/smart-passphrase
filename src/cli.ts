#!/usr/bin/env node

import { generatePassword } from "./generator.js";

// Simple argument parsing
const args = process.argv.slice(2);

const options = {
  words: args.includes("--words") ? Number(args[args.indexOf("--words") + 1]) : 3,
  numbers: !args.includes("--no-numbers"),
  symbols: !args.includes("--no-symbols"),
};

const password = generatePassword(options);

console.log(password);
