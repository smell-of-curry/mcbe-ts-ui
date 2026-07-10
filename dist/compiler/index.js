"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = exports.quickCompile = exports.compileUI = exports.UICompiler = void 0;
var compiler_1 = require("./compiler");
Object.defineProperty(exports, "UICompiler", { enumerable: true, get: function () { return compiler_1.UICompiler; } });
Object.defineProperty(exports, "compileUI", { enumerable: true, get: function () { return compiler_1.compileUI; } });
Object.defineProperty(exports, "quickCompile", { enumerable: true, get: function () { return compiler_1.quickCompile; } });
var types_1 = require("./types");
Object.defineProperty(exports, "DEFAULT_CONFIG", { enumerable: true, get: function () { return types_1.DEFAULT_CONFIG; } });
//# sourceMappingURL=index.js.map