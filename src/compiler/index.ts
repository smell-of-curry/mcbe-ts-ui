/**
 * Bedrock UI Generator - Compiler Index
 *
 * Re-exports compiler functionality.
 *
 * @module compiler
 *
 * @example
 * ```typescript
 * import { compileUI, UICompiler, DEFAULT_CONFIG } from "./compiler";
 *
 * // Quick compile
 * const result = await compileUI();
 *
 * // Custom compile
 * const compiler = new UICompiler({ clean: true });
 * const result = await compiler.compile();
 * ```
 */

export { UICompiler, compileUI, quickCompile } from "./compiler";
export {
  DEFAULT_CONFIG,
  type CompilerConfig,
  type CompilationResult,
  type CompiledUIFile,
  type CompilationError,
  type UIDefinition,
  type UIExport,
  type CompileContext,
} from "./types";
