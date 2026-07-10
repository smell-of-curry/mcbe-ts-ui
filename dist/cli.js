#!/usr/bin/env node
"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
const path = __importStar(require("path"));
// ============================================================================
// Argument Parsing
// ============================================================================
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        source: "scripts/ui",
        output: "ui/__generated__",
        uiDefs: "ui/_ui_defs.json",
        clean: true, // Clean output directory by default
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
            case "--no-clean":
                options.clean = false;
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
function showHelp() {
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
  --clean, -c           Clean output directory before generating (default: true)
  --no-clean            Skip cleaning output directory
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
async function main() {
    const options = parseArgs();
    if (options.help) {
        showHelp();
        process.exit(0);
    }
    console.log("🎮 Bedrock UI Generator");
    console.log("=======================\n");
    const config = {
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
        const result = await (0, compiler_1.compileUI)(config);
        console.log();
        console.log("=======================");
        console.log(`✅ Compiled ${result.files.length} file(s) in ${result.duration}ms`);
        if (result.errors.length > 0) {
            console.log();
            console.log(`⚠️  ${result.errors.length} error(s):`);
            for (const error of result.errors) {
                console.log(`  - ${error.file}: ${error.message}`);
                if (error.stack)
                    console.log(`    ${error.stack.split("\n").slice(1, 3).join("\n    ")}`);
            }
            process.exit(1);
        }
    }
    catch (error) {
        console.error("❌ Compilation failed:", error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map