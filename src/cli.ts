#!/usr/bin/env node
/**
 * Bedrock UI Generator - CLI
 *
 * Command-line interface for compiling UI source files.
 *
 * @example
 * ```bash
 * # Compile with defaults
 * npx mcbe-ts-ui
 *
 * # Compile from custom source
 * npx mcbe-ts-ui -s scripts/ui -o ui/__generated__
 *
 * # Clean and compile
 * npx mcbe-ts-ui --clean
 * ```
 */

import { compileUI, type CompilerConfig } from "./compiler";
import * as path from "path";

// ============================================================================
// Types
// ============================================================================

interface CLIOptions {
  source: string;
  output: string;
  uiDefs: string;
  clean: boolean;
  watch: boolean;
  help: boolean;
}

// ============================================================================
// Argument Parsing
// ============================================================================

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    source: "scripts/ui",
    output: "ui/__generated__",
    uiDefs: "ui/_ui_defs.json",
    clean: false,
    watch: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--source":
      case "-s":
        if (nextArg) {
          options.source = nextArg;
          i++;
        }
        break;
      case "--output":
      case "-o":
        if (nextArg) {
          options.output = nextArg;
          i++;
        }
        break;
      case "--ui-defs":
      case "-d":
        if (nextArg) {
          options.uiDefs = nextArg;
          i++;
        }
        break;
      case "--clean":
      case "-c":
        options.clean = true;
        break;
      case "--watch":
      case "-w":
        options.watch = true;
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
    }
  }

  return options;
}

function showHelp(): void {
  console.log(`
Bedrock UI Generator - CLI

Usage:
  npx mcbe-ts-ui [options]

Options:
  --source, -s <dir>    Source directory containing .ts UI files
                        (default: "scripts/ui")
  --output, -o <dir>    Output directory for generated JSON
                        (default: "ui/__generated__")
  --ui-defs, -d <file>  Path to _ui_defs.json file
                        (default: "ui/_ui_defs.json")
  --clean, -c           Clean output directory before generating
  --watch, -w           Watch mode (recompile on changes) [not yet implemented]
  --help, -h            Show this help message

Examples:
  # Compile with defaults
  npx mcbe-ts-ui

  # Compile with custom directories
  npx mcbe-ts-ui -s src/ui -o dist/ui

  # Clean and compile
  npx mcbe-ts-ui --clean
`);
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  console.log("🎮 Bedrock UI Generator");
  console.log("=======================\n");

  const config: Partial<CompilerConfig> = {
    sourceDir: options.source,
    outputDir: options.output,
    uiDefsPath: options.uiDefs,
    clean: options.clean,
  };

  console.log(`Source:  ${path.resolve(options.source)}`);
  console.log(`Output:  ${path.resolve(options.output)}`);
  console.log(`UI Defs: ${path.resolve(options.uiDefs)}`);
  console.log();

  try {
    const result = await compileUI(config);

    console.log();
    console.log("=======================");
    console.log(
      `✅ Compiled ${result.files.length} file(s) in ${result.duration}ms`
    );

    if (result.errors.length > 0) {
      console.log();
      console.log(`⚠️  ${result.errors.length} error(s):`);
      for (const error of result.errors) {
        console.log(`  - ${error.file}: ${error.message}`);
        if (error.stack)
          console.log(
            `    ${error.stack.split("\n").slice(1, 3).join("\n    ")}`
          );
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Compilation failed:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
