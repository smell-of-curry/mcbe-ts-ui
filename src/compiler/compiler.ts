/**
 * Bedrock UI Generator - Compiler
 *
 * Compiles TypeScript UI source files to JSON UI files.
 *
 * @module compiler/compiler
 *
 * @example Basic usage
 * ```typescript
 * import { compileUI } from "./compiler";
 *
 * const result = await compileUI();
 * console.log(`Compiled ${result.files.length} files`);
 * ```
 *
 * @example Custom configuration
 * ```typescript
 * const result = await compileUI({
 *   sourceDir: "src/ui",
 *   outputDir: "dist/ui",
 *   clean: true
 * });
 * ```
 */

import * as fs from "fs";
import * as path from "path";
import { createJiti } from "jiti";
import type {
  CompilerConfig,
  CompilationResult,
  CompiledUIFile,
  CompilationError,
  UIDefinition,
  UIExport,
} from "./types";
import { DEFAULT_CONFIG } from "./types";
import type { UIDefs, GlobalVariables } from "../types";

// Create jiti instance for importing TypeScript files at runtime
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const jiti = createJiti(__filename, {
  interopDefault: true,
  extensions: [".ts", ".tsx", ".js", ".jsx"],
});

// ============================================================================
// Compiler Class
// ============================================================================

/**
 * Compiler for UI source files.
 *
 * Handles discovery, compilation, and output of UI JSON files
 * from TypeScript source definitions.
 *
 * @example
 * ```typescript
 * const compiler = new UICompiler({ clean: true });
 * const result = await compiler.compile();
 * ```
 */
export class UICompiler {
  /** Merged compiler configuration */
  private config: CompilerConfig;

  /** Accumulated global variables */
  private globalVariables: GlobalVariables = {};

  /** Successfully compiled files */
  private compiledFiles: CompiledUIFile[] = [];

  /** Errors encountered during compilation */
  private errors: CompilationError[] = [];

  /** Existing ui_defs entries to preserve */
  private existingUiDefs: string[] = [];

  /**
   * Creates a new compiler instance.
   *
   * @param config - Partial configuration (merged with defaults).
   *
   * @example
   * ```typescript
   * const compiler = new UICompiler({
   *   sourceDir: "src/ui",
   *   clean: true
   * });
   * ```
   */
  constructor(config: Partial<CompilerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Runs the full compilation process.
   *
   * 1. Loads existing _ui_defs.json
   * 2. Ensures output directory exists
   * 3. Optionally cleans output directory
   * 4. Finds and compiles all source files
   * 5. Writes output files
   * 6. Updates _ui_defs.json
   *
   * @returns Compilation result with files, errors, and timing.
   *
   * @example
   * ```typescript
   * const compiler = new UICompiler();
   * const result = await compiler.compile();
   *
   * if (result.errors.length > 0) {
   *   console.error("Compilation errors:", result.errors);
   * }
   * ```
   */
  async compile(): Promise<CompilationResult> {
    const startTime = Date.now();

    // Reset state
    this.compiledFiles = [];
    this.errors = [];
    this.globalVariables = {};

    // Load existing _ui_defs.json to preserve manual entries
    this.loadExistingUiDefs();

    // Ensure output directory exists
    this.ensureOutputDir();

    // Clean output directory if configured
    if (this.config.clean) this.cleanOutputDir();

    // Find all source files
    const sourceFiles = this.findSourceFiles();

    // Compile each source file
    for (const sourceFile of sourceFiles) {
      await this.compileFile(sourceFile);
    }

    // Write output files
    this.writeOutputFiles();

    // Generate ui_defs
    const uiDefs = this.generateUiDefs();

    return {
      files: this.compiledFiles,
      uiDefs,
      globalVariables:
        Object.keys(this.globalVariables).length > 0
          ? this.globalVariables
          : undefined,
      errors: this.errors,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Loads existing _ui_defs.json to preserve manual entries.
   *
   * Filters out entries from __generated__ (we'll regenerate those).
   *
   * @private
   */
  private loadExistingUiDefs(): void {
    const uiDefsPath = path.resolve(this.config.uiDefsPath);

    if (!fs.existsSync(uiDefsPath)) {
      this.existingUiDefs = [];
      return;
    }

    try {
      const content = fs.readFileSync(uiDefsPath, "utf-8");
      const parsed = JSON.parse(content) as UIDefs;
      // Filter out entries from __generated__ (we'll regenerate those)
      this.existingUiDefs = (parsed.ui_defs || []).filter(
        (entry) => !entry.includes("__generated__")
      );
    } catch {
      console.warn("Warning: Could not parse existing _ui_defs.json");
      this.existingUiDefs = [];
    }
  }

  /**
   * Ensures the output directory exists.
   *
   * Creates the directory and any parent directories if needed.
   *
   * @private
   */
  private ensureOutputDir(): void {
    const outputDir = path.resolve(this.config.outputDir);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  }

  /**
   * Cleans the output directory.
   *
   * Removes all .json files and subdirectories.
   *
   * @private
   */
  private cleanOutputDir(): void {
    const outputDir = path.resolve(this.config.outputDir);
    if (!fs.existsSync(outputDir)) return;

    const files = fs.readdirSync(outputDir);
    for (const file of files) {
      const filePath = path.join(outputDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile() && file.endsWith(".json")) fs.unlinkSync(filePath);
      else if (stat.isDirectory()) fs.rmSync(filePath, { recursive: true });
    }
  }

  /**
   * Finds all source files matching the configured pattern.
   *
   * Handles both single files and directories. If sourceDir points to
   * a file (with or without .ts extension), compiles just that file.
   * Otherwise recursively scans the directory.
   *
   * @returns Array of absolute paths to source files.
   * @private
   */
  private findSourceFiles(): string[] {
    const sourceDir = path.resolve(this.config.sourceDir);
    const files: string[] = [];

    // Check if source is a single file (with .ts extension)
    if (fs.existsSync(sourceDir) && fs.statSync(sourceDir).isFile()) {
      if (this.config.sourcePattern.test(path.basename(sourceDir))) {
        files.push(sourceDir);
      }
      return files;
    }

    // Check if source without extension + .ts exists (user specified file without extension)
    const sourceWithTs = sourceDir + ".ts";
    if (fs.existsSync(sourceWithTs) && fs.statSync(sourceWithTs).isFile()) {
      files.push(sourceWithTs);
      return files;
    }

    // Otherwise treat as directory
    if (!fs.existsSync(sourceDir)) return files;

    this.findSourceFilesRecursive(sourceDir, files);
    return files;
  }

  /**
   * Recursively finds source files in a directory.
   *
   * @param dir - Directory to scan.
   * @param files - Array to accumulate found files.
   * @private
   */
  private findSourceFilesRecursive(dir: string, files: string[]): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recurse into subdirectories
        this.findSourceFilesRecursive(fullPath, files);
      } else if (entry.isFile() && this.config.sourcePattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  /**
   * Compiles a single source file.
   *
   * Dynamically imports the TypeScript file using jiti and processes
   * its default export as UI definitions.
   *
   * @param sourcePath - Absolute path to the source file.
   * @private
   */
  private async compileFile(sourcePath: string): Promise<void> {
    const relativePath = path.relative(process.cwd(), sourcePath);
    console.log(`Compiling: ${relativePath}`);

    try {
      const absolutePath = path.resolve(sourcePath);

      // Use jiti to import TypeScript files at runtime
      // jiti handles TypeScript compilation and module resolution
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const module: UIExport | { default?: UIExport } = await jiti.import(
        absolutePath,
        {
          default: true,
        }
      );

      // Get the default export (jiti may return it directly or as .default)
      const exported =
        module && typeof module === "object" && "default" in module
          ? module.default
          : (module as UIExport | undefined);

      // Skip files without default exports (likely utility/shared files)
      if (!exported) {
        console.log(`  Skipped: ${relativePath} (no default export)`);
        return;
      }

      // Handle single definition or array of definitions
      const definitions = Array.isArray(exported) ? exported : [exported];

      for (const def of definitions) {
        this.processDefinition(def, relativePath);
      }
    } catch (error) {
      const err = error as Error;
      this.errors.push({
        file: relativePath,
        message: err.message,
        stack: err.stack,
      });
    }
  }

  /**
   * Processes a single UI definition.
   *
   * Generates JSON and adds to compiled files list.
   * Preserves the source file's directory structure in output.
   *
   * @param def - The UI definition to process.
   * @param sourcePath - Source file path for reference.
   * @private
   */
  private processDefinition(def: UIDefinition, sourcePath: string): void {
    const sourceDir = path.resolve(this.config.sourceDir);
    const sourceBasename = path.basename(sourcePath, ".ts");
    const filename = def.filename || sourceBasename;

    // Get the relative directory from source dir (preserves subdirectory structure)
    const sourceRelativeDir = path.relative(
      sourceDir,
      path.dirname(path.resolve(sourcePath))
    );

    // Use explicit subdir from definition, or derive from source path
    const subdir = def.subdir ?? sourceRelativeDir;

    // Build output path
    let outputPath: string;
    if (subdir) {
      outputPath = path.join(this.config.outputDir, subdir, `${filename}.json`);
    } else {
      outputPath = path.join(this.config.outputDir, `${filename}.json`);
    }

    // Generate JSON
    const json = this.config.prettyPrint
      ? JSON.stringify(def.namespace, null, 2)
      : JSON.stringify(def.namespace);

    this.compiledFiles.push({
      sourcePath,
      outputPath,
      namespace: def.namespace,
      json,
    });
  }

  /**
   * Writes all compiled files to disk.
   *
   * Creates subdirectories as needed.
   *
   * @private
   */
  private writeOutputFiles(): void {
    for (const file of this.compiledFiles) {
      const outputPath = path.resolve(file.outputPath);
      const outputDir = path.dirname(outputPath);

      // Ensure directory exists
      if (!fs.existsSync(outputDir))
        fs.mkdirSync(outputDir, { recursive: true });

      // Write the file
      fs.writeFileSync(outputPath, file.json, "utf-8");
      console.log(`  Generated: ${file.outputPath}`);
    }
  }

  /**
   * Generates and writes the _ui_defs.json file.
   *
   * Combines existing manual entries with generated file entries.
   *
   * @returns The generated UIDefs object.
   * @private
   */
  private generateUiDefs(): UIDefs {
    // Start with existing non-generated entries
    const uiDefEntries = [...this.existingUiDefs];

    // Add generated file entries
    for (const file of this.compiledFiles) {
      // Convert Windows paths to forward slashes and make relative
      const entry = file.outputPath.replace(/\\/g, "/");
      if (!uiDefEntries.includes(entry)) uiDefEntries.push(entry);
    }

    const uiDefs: UIDefs = { ui_defs: uiDefEntries };

    // Write _ui_defs.json
    const uiDefsPath = path.resolve(this.config.uiDefsPath);
    const json = this.config.prettyPrint
      ? JSON.stringify(uiDefs, null, 2)
      : JSON.stringify(uiDefs);
    fs.writeFileSync(uiDefsPath, json, "utf-8");
    console.log(`Updated: ${this.config.uiDefsPath}`);

    return uiDefs;
  }

  /**
   * Registers a global variable.
   *
   * Global variables are written to _global_variables.json.
   *
   * @param name - Variable name ($ prefix added if missing).
   * @param value - Variable value.
   *
   * @example
   * ```typescript
   * compiler.addGlobalVariable("primary_color", [0.2, 0.6, 1.0]);
   * compiler.addGlobalVariable("$padding", 10);
   * ```
   */
  addGlobalVariable(name: string, value: unknown): void {
    const key = name.startsWith("$") ? name : `$${name}`;
    this.globalVariables[key as `$${string}`] = value;
  }

  /**
   * Writes the global variables file if there are any.
   *
   * @todo Call this from compile() when global variables exist.
   */
  writeGlobalVariables(): void {
    if (
      Object.keys(this.globalVariables).length === 0 ||
      !this.config.globalVariablesPath
    )
      return;

    const globalVarsPath = path.resolve(this.config.globalVariablesPath);
    const json = this.config.prettyPrint
      ? JSON.stringify(this.globalVariables, null, 2)
      : JSON.stringify(this.globalVariables);
    fs.writeFileSync(globalVarsPath, json, "utf-8");
    console.log(`Updated: ${this.config.globalVariablesPath}`);
  }
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Creates and runs a compiler with the given configuration.
 *
 * This is the primary entry point for programmatic compilation.
 *
 * @param config - Partial configuration (merged with defaults).
 * @returns Compilation result.
 *
 * @example Basic compilation
 * ```typescript
 * const result = await compileUI();
 * console.log(`Compiled ${result.files.length} files in ${result.duration}ms`);
 * ```
 *
 * @example Custom configuration
 * ```typescript
 * const result = await compileUI({
 *   sourceDir: "src/ui",
 *   outputDir: "dist/ui",
 *   clean: true
 * });
 * ```
 */
export async function compileUI(
  config: Partial<CompilerConfig> = {}
): Promise<CompilationResult> {
  const compiler = new UICompiler(config);
  return compiler.compile();
}

/**
 * Quick compile with default settings.
 *
 * Convenience function for simple use cases.
 *
 * @returns Compilation result.
 *
 * @example
 * ```typescript
 * const result = await quickCompile();
 * ```
 */
export async function quickCompile(): Promise<CompilationResult> {
  return compileUI();
}
