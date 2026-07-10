"use strict";
/**
 * Bedrock UI Generator - Compiler Types
 *
 * Type definitions for the UI compilation system.
 *
 * @module compiler/types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
/**
 * Default compiler configuration.
 *
 * Used when no configuration is provided or to fill in
 * missing values from partial configurations.
 */
exports.DEFAULT_CONFIG = {
    sourceDir: "ui",
    outputDir: "ui/__generated__",
    uiDefsPath: "ui/_ui_defs.json",
    globalVariablesPath: "ui/_global_variables.json",
    prettyPrint: true,
    sourcePattern: /^(?!_).*\.ts$/,
    clean: false,
    uiDefsPrefix: "ui/__generated__/",
};
//# sourceMappingURL=types.js.map