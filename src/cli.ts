#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import clipboardy from "clipboardy";
import gradient from "gradient-string";
import { generatePassword } from "./generator.js";
import { Strength } from "./types.js";

const program = new Command();

program
  .name("smart-passphrase")
  .description("Generate secure and memorable passphrases with style")
  .version("2.0.0")
  .option("-w, --words <number>", "number of words", (val) => parseInt(val), 3)
  .option("-s, --strength <tier>", "security tier (medium, strong, ultra)", "medium")
  .option("-n, --no-numbers", "do not include numbers")
  .option("-S, --no-symbols", "do not include symbols")
  .option("-c, --copy", "copy to clipboard")
  .action(async (options) => {
    console.log("");
    const spinner = ora({
      text: chalk.cyan("Locking the gears..."),
      color: "cyan"
    }).start();

    // Small delay for "fancy" feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const password = generatePassword({
        words: options.words,
        strength: options.strength as Strength,
        numbers: options.numbers,
        symbols: options.symbols,
      });

      spinner.succeed(chalk.green("Secure passphrase ready!"));
      console.log("");
      
      const styledPassword = gradient.pastel.multiline(password);
      console.log("  " + chalk.bold(styledPassword));
      console.log("");

      if (options.copy) {
        clipboardy.writeSync(password);
        console.log(chalk.dim("  📋 Copied to clipboard!"));
        console.log("");
      }
    } catch (error: any) {
      spinner.fail(chalk.red("Generation failed"));
      console.error(chalk.red(`  Error: ${error.message}`));
      process.exit(1);
    }
  });

// Handle the "copy" as a shorthand command too
program
  .command("copy")
  .description("Generate and copy to clipboard immediately")
  .action(async () => {
    const spinner = ora(chalk.cyan("Generating and copying...")).start();
    await new Promise((resolve) => setTimeout(resolve, 400));
    const password = generatePassword();
    clipboardy.writeSync(password);
    spinner.succeed(chalk.green("Generated and copied to clipboard!"));
    console.log("");
    console.log("  " + gradient.pastel(password));
    console.log("");
  });

program.parse();
