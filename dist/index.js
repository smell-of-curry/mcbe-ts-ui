"use strict";
/**
 * Bedrock UI Generator
 *
 * A TypeScript library for generating Minecraft Bedrock JSON UI files.
 *
 * This library provides a fluent builder API for creating UI definitions
 * that compile to valid Bedrock JSON UI files. It handles type safety,
 * code organization, and automatic _ui_defs.json management.
 *
 * @packageDocumentation
 * @module bedrock-ui-generator
 *
 * @example Basic usage
 * ```typescript
 * import { defineUI, panel, label, ref } from "./ui";
 *
 * export default defineUI("my_ui", (ns) => {
 *   ns.add(panel("main").fullSize().controls(ref("title@my_ui.title_label")));
 *   ns.add(label("title_label").text("Hello World").color([1, 1, 0]));
 * });
 * ```
 *
 * @example Building namespace directly
 * ```typescript
 * import { namespace, panel, label } from "./ui";
 *
 * export default {
 *   namespace: namespace("my_ui")
 *     .add(panel("main").fullSize())
 *     .add(label("title").text("Hello"))
 *     .build()
 * };
 * ```
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUI = defineUI;
exports.redefineUI = redefineUI;
// Types
__exportStar(require("./types"), exports);
__exportStar(require("./types/vanilla-screens"), exports);
// Builders
__exportStar(require("./builders"), exports);
// Compiler
__exportStar(require("./compiler"), exports);
// Helpers
__exportStar(require("./helpers"), exports);
const builders_1 = require("./builders");
// ============================================================================
// Quick Start Helpers
// ============================================================================
const namespace_1 = require("./builders/namespace");
const vanilla_screens_1 = require("./types/vanilla-screens");
/**
 * Defines a UI namespace and returns it as a UIDefinition ready for export.
 *
 * This is the recommended way to define UI namespaces in source files.
 * The callback function receives a NamespaceBuilder that you can use
 * to add elements.
 *
 * @param namespaceName - The unique namespace name.
 * @param builder - Callback function that receives the namespace builder.
 * @param options - Optional configuration.
 * @param options.filename - Override the output filename.
 * @param options.subdir - Subdirectory within __generated__.
 * @returns A UIDefinition ready for default export.
 *
 * @example Basic definition
 * ```typescript
 * export default defineUI("my_ui", (ns) => {
 *   ns.add(panel("main").fullSize());
 *   ns.add(label("title").text("Hello"));
 * });
 * ```
 *
 */
function defineUI(namespaceName, builder, options = {}) {
    let ns = new namespace_1.NamespaceBuilder(namespaceName, options);
    if (builder instanceof builders_1.ElementBuilder) {
        const mainElement = builder;
        // Verify main element is named "main"
        if (mainElement.getName() !== "main")
            throw new Error(`Main element must be named 'main', got '${mainElement.getName()}'`);
        const [, finalNs] = ns.add(mainElement);
        ns = finalNs;
    }
    else
        ns = builder(ns);
    return ns;
}
/**
 * Redefines (modifies) a vanilla Minecraft UI screen.
 *
 * Use this function to modify existing Minecraft UI files. The output:
 * - Goes to ui/ root directory (not ui/__generated__)
 * - Is NOT added to _ui_defs.json (vanilla screens are already registered)
 * - Supports subdirectory screens (e.g., "settings_sections/general_section")
 *
 * This works by creating a JSON file that overlays/modifies the vanilla
 * Minecraft UI definition. The namespace name must match the vanilla
 * namespace exactly.
 *
 * @param screen - The vanilla screen to modify (type-safe autocomplete).
 * @param builder - Callback function to modify the namespace.
 * @returns The typed NamespaceBuilder with all added elements.
 *
 * @example Modify the HUD screen
 * ```typescript
 * export default redefineUI("hud_screen", (ns) => {
 *   // Hide the subtitle text
 *   ns.addRaw("hud_title_text/subtitle_frame/subtitle", {
 *     visible: false,
 *   });
 *
 *   // Add custom HUD element to root_panel
 *   ns.addRaw("root_panel", {
 *     modifications: [
 *       {
 *         array_name: "controls",
 *         operation: "insert_back",
 *         value: [{ "custom_hud@my_hud.main": {} }],
 *       },
 *     ],
 *   });
 * });
 * ```
 *
 * @example Modify a subdirectory screen
 * ```typescript
 * export default redefineUI("settings_sections/general_section", (ns) => {
 *   ns.addRaw("some_element", {
 *     visible: false,
 *   });
 * });
 * // Outputs to: ui/settings_sections/general_section.json
 * ```
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-intro
 * @see https://github.com/ZtechNetwork/MCBVanillaResourcePack/tree/master/ui
 */
function redefineUI(screen, builder) {
    // Get the screen info (namespace and optional subdir)
    const screenInfo = vanilla_screens_1.VANILLA_SCREEN_INFO[screen];
    // Extract filename from screen path (e.g., "settings_sections/general_section" -> "general_section")
    const filename = screen.includes("/") ? screen.split("/").pop() : screen;
    // TODO: Load the returned namespace with all vanilla Minecraft element maps
    // so that users can reference vanilla elements in a type-safe way, e.g.:
    // ns.elements.root_panel, ns.elements.hud_title_text, etc.
    const ns = new namespace_1.NamespaceBuilder(screenInfo.namespace, {
        filename,
        subdir: screenInfo.subdir,
    });
    ns.isVanillaOverride = true;
    return builder(ns);
}
//# sourceMappingURL=index.js.map