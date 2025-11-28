/**
 * Bedrock UI Generator - Compiler Types
 *
 * Type definitions for the UI compilation system.
 *
 * @module compiler/types
 */

import type { UINamespace, GlobalVariables, UIDefs } from "../types";
import type { NamespaceBuilder } from "../builders/namespace";

// ============================================================================
// Compiled File Types
// ============================================================================

/**
 * Result of compiling a single UI source file.
 *
 * Contains both the original source information and the
 * compiled output ready for writing to disk.
 */
export interface CompiledUIFile {
  /**
   * Original source file path (relative to workspace).
   *
   * @example "ui/my_hud.ts"
   */
  sourcePath: string;

  /**
   * Output file path (relative to workspace, in __generated__).
   *
   * @example "ui/__generated__/my_hud.json"
   */
  outputPath: string;

  /**
   * The compiled namespace object.
   */
  namespace: UINamespace;

  /**
   * The JSON string output ready for writing.
   */
  json: string;
}

// ============================================================================
// UI Definition Types
// ============================================================================

/**
 * A UI definition exported from a source file.
 *
 * This is the expected structure for the default export
 * of UI source files.
 *
 * @example Simple definition
 * ```typescript
 * export default {
 *   namespace: namespace("my_ui").add(panel("main").fullSize()).build()
 * };
 * ```
 *
 * @example With filename override
 * ```typescript
 * export default {
 *   namespace: namespace("my_ui").build(),
 *   filename: "custom_name"
 * };
 * ```
 */
export interface UIDefinition {
  /**
   * The compiled namespace object.
   */
  namespace: UINamespace;

  /**
   * Optional output filename override.
   *
   * If not provided, defaults to the source filename.
   *
   * @example "custom_hud" (produces custom_hud.json)
   */
  filename?: string | undefined;

  /**
   * Optional subdirectory within __generated__.
   *
   * Use this to organize generated files into folders.
   *
   * @example "phud" (produces ui/__generated__/phud/filename.json)
   */
  subdir?: string | undefined;

  /**
   * Indicates this definition overrides a vanilla Minecraft UI file.
   *
   * When true:
   * - File is output to ui/ root instead of ui/__generated__/
   * - File is NOT added to _ui_defs.json (vanilla files are already registered)
   *
   * @default false
   */
  isVanillaOverride?: boolean | undefined;
}

/**
 * Multiple UI definitions from a single source file.
 *
 * Source files can export:
 * - A NamespaceBuilder (from defineUI/redefineUI)
 * - A single UIDefinition (legacy format)
 * - An array of definitions
 */
export type UIExport =
  | NamespaceBuilder
  | UIDefinition
  | (NamespaceBuilder | UIDefinition)[];

// ============================================================================
// Compiler Configuration
// ============================================================================

/**
 * Configuration options for the UI compiler.
 *
 * @example Custom configuration
 * ```typescript
 * const config: CompilerConfig = {
 *   sourceDir: "src/ui",
 *   outputDir: "dist/ui",
 *   uiDefsPath: "dist/_ui_defs.json",
 *   prettyPrint: true,
 *   clean: true,
 *   sourcePattern: /\.ui\.ts$/,
 *   uiDefsPrefix: "dist/"
 * };
 * ```
 */
export interface CompilerConfig {
  /**
   * Source directory containing .ts UI files.
   *
   * @default "ui"
   */
  sourceDir: string;

  /**
   * Output directory for generated JSON files.
   *
   * @default "ui/__generated__"
   */
  outputDir: string;

  /**
   * Path for the _ui_defs.json file.
   *
   * @default "ui/_ui_defs.json"
   */
  uiDefsPath: string;

  /**
   * Path for the _global_variables.json file.
   *
   * Set to undefined to disable global variables file generation.
   *
   * @default "ui/_global_variables.json"
   */
  globalVariablesPath?: string;

  /**
   * Whether to format JSON output with indentation.
   *
   * @default true
   */
  prettyPrint: boolean;

  /**
   * Regular expression pattern to match source files.
   *
   * Only files matching this pattern will be compiled.
   * Files starting with underscore (_) are excluded by default.
   *
   * @default /^(?!_).*\.ts$/
   */
  sourcePattern: RegExp;

  /**
   * Whether to clean the output directory before generating.
   *
   * When true, all existing .json files in outputDir are deleted.
   *
   * @default false
   */
  clean: boolean;

  /**
   * Base path prefix for ui_defs entries.
   *
   * This prefix is added to file paths in _ui_defs.json.
   *
   * @default "ui/__generated__/"
   */
  uiDefsPrefix: string;
}

/**
 * Default compiler configuration.
 *
 * Used when no configuration is provided or to fill in
 * missing values from partial configurations.
 */
export const DEFAULT_CONFIG: CompilerConfig = {
  sourceDir: "ui",
  outputDir: "ui/__generated__",
  uiDefsPath: "ui/_ui_defs.json",
  globalVariablesPath: "ui/_global_variables.json",
  prettyPrint: true,
  sourcePattern: /^(?!_).*\.ts$/,
  clean: false,
  uiDefsPrefix: "ui/__generated__/",
};

// ============================================================================
// Compilation Result Types
// ============================================================================

/**
 * Result of a full compilation run.
 *
 * Contains all compiled files, generated definitions,
 * any errors encountered, and timing information.
 */
export interface CompilationResult {
  /**
   * Successfully compiled files.
   */
  files: CompiledUIFile[];

  /**
   * Generated _ui_defs.json content.
   */
  uiDefs: UIDefs;

  /**
   * Generated _global_variables.json content (if any).
   *
   * Only present if global variables were registered.
   */
  globalVariables?: GlobalVariables | undefined;

  /**
   * Errors encountered during compilation.
   *
   * Files with errors are skipped but compilation continues.
   */
  errors: CompilationError[];

  /**
   * Total compilation time in milliseconds.
   */
  duration: number;
}

/**
 * An error encountered during compilation.
 */
export interface CompilationError {
  /**
   * Source file that caused the error.
   */
  file: string;

  /**
   * Error message describing what went wrong.
   */
  message: string;

  /**
   * Stack trace if available.
   *
   * Useful for debugging compilation errors.
   */
  stack?: string | undefined;
}

// ============================================================================
// Compile Context Types
// ============================================================================

/**
 * Context passed to UI source files during compilation.
 *
 * @todo Implement context injection for source files.
 */
export interface CompileContext {
  /**
   * The configuration being used for compilation.
   */
  config: CompilerConfig;

  /**
   * Source file path being compiled.
   */
  sourcePath: string;

  /**
   * Registers a global variable.
   *
   * Global variables are written to _global_variables.json.
   *
   * @param name - Variable name ($ prefix added if missing).
   * @param value - Variable value.
   */
  addGlobalVariable: (name: string, value: unknown) => void;
}
