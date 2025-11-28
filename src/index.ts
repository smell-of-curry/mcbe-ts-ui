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

// Types
export * from "./types";
export * from "./types/vanilla-screens";

// Builders
export * from "./builders";

// Compiler
export * from "./compiler";

// Helpers
export * from "./helpers";

import { ElementBuilder } from "./builders";
// ============================================================================
// Quick Start Helpers
// ============================================================================

import { NamespaceBuilder } from "./builders/namespace";
import {
  type VanillaScreen,
  VANILLA_SCREEN_INFO,
} from "./types/vanilla-screens";

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
export function defineUI<NS extends NamespaceBuilder>(
  namespaceName: string,
  builder: ((ns: NamespaceBuilder) => NS) | ElementBuilder<string>,
  options: {
    filename?: string;
    subdir?: string;
  } = {}
): NS {
  let ns = new NamespaceBuilder(namespaceName, options);
  if (builder instanceof ElementBuilder) {
    const mainElement = builder;
    // Verify main element is named "main"
    if (mainElement.getName() !== "main")
      throw new Error(
        `Main element must be named 'main', got '${mainElement.getName()}'`
      );
    const [, finalNs] = ns.add(mainElement);
    ns = finalNs;
  } else ns = builder(ns);
  return ns as NS;
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
export function redefineUI<NS extends NamespaceBuilder>(
  screen: VanillaScreen,
  builder: (ns: NamespaceBuilder) => NS
): NS {
  // Get the screen info (namespace and optional subdir)
  const screenInfo = VANILLA_SCREEN_INFO[screen];

  // Extract filename from screen path (e.g., "settings_sections/general_section" -> "general_section")
  const filename = screen.includes("/") ? screen.split("/").pop()! : screen;

  // TODO: Load the returned namespace with all vanilla Minecraft element maps
  // so that users can reference vanilla elements in a type-safe way, e.g.:
  // ns.elements.root_panel, ns.elements.hud_title_text, etc.
  const ns = new NamespaceBuilder(screenInfo.namespace, {
    filename,
    subdir: screenInfo.subdir,
  });
  ns.isVanillaOverride = true;

  return builder(ns);
}
