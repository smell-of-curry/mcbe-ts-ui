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
import type { CompilerConfig, CompilationResult } from "./types";
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
export declare class UICompiler {
    /** Merged compiler configuration */
    private config;
    /** Accumulated global variables */
    private globalVariables;
    /** Successfully compiled files */
    private compiledFiles;
    /** Vanilla override files (not added to _ui_defs.json) */
    private vanillaOverrideFiles;
    /** Errors encountered during compilation */
    private errors;
    /** Existing ui_defs entries to preserve */
    private existingUiDefs;
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
    constructor(config?: Partial<CompilerConfig>);
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
    compile(): Promise<CompilationResult>;
    /**
     * Loads existing _ui_defs.json to preserve manual entries.
     *
     * Filters out entries from __generated__ (we'll regenerate those).
     *
     * @private
     */
    private loadExistingUiDefs;
    /**
     * Ensures the output directory exists.
     *
     * Creates the directory and any parent directories if needed.
     *
     * @private
     */
    private ensureOutputDir;
    /**
     * Cleans the output directory.
     *
     * Removes all .json files and subdirectories.
     *
     * @private
     */
    private cleanOutputDir;
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
    private findSourceFiles;
    /**
     * Recursively finds source files in a directory.
     *
     * @param dir - Directory to scan.
     * @param files - Array to accumulate found files.
     * @private
     */
    private findSourceFilesRecursive;
    /**
     * Compiles a single source file.
     *
     * Dynamically imports the TypeScript file using jiti and processes
     * its default export as UI definitions.
     *
     * @param sourcePath - Absolute path to the source file.
     * @private
     */
    private compileFile;
    /**
     * Checks if an object is a NamespaceBuilder using duck-typing.
     *
     * We can't use instanceof because jiti loads modules separately,
     * causing different class identities across module boundaries.
     *
     * @param obj - The object to check.
     * @returns True if the object quacks like a NamespaceBuilder.
     * @private
     */
    private isNamespaceBuilder;
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
    private processDefinition;
    /**
     * Writes all compiled files to disk.
     *
     * Creates subdirectories as needed.
     *
     * @private
     */
    private writeOutputFiles;
    /**
     * Generates and writes the _ui_defs.json file.
     *
     * Combines existing manual entries with generated file entries.
     * Vanilla override files are excluded (they're already registered by the game).
     *
     * @returns The generated UIDefs object.
     * @private
     */
    private generateUiDefs;
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
    addGlobalVariable(name: string, value: unknown): void;
    /**
     * Writes the global variables file if there are any.
     *
     * @todo Call this from compile() when global variables exist.
     */
    writeGlobalVariables(): void;
}
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
export declare function compileUI(config?: Partial<CompilerConfig>): Promise<CompilationResult>;
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
export declare function quickCompile(): Promise<CompilationResult>;
//# sourceMappingURL=compiler.d.ts.map