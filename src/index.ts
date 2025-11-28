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

// ============================================================================
// Quick Start Helpers
// ============================================================================

import { NamespaceBuilder } from "./builders/namespace";
import type { ElementBuilder } from "./builders/element";
import type { UIDefinition } from "./compiler/types";
import type { ControlReference } from "./types";
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
export function defineUI(
  namespaceName: string,
  builder: (ns: NamespaceBuilder) => void,
  options: {
    filename?: string;
    subdir?: string;
  } = {}
): UIDefinition {
  const ns = new NamespaceBuilder(namespaceName);
  builder(ns);
  const result: UIDefinition = {
    namespace: ns.build(),
    filename: options.filename,
    subdir: options.subdir,
  };
  return result;
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
 * @returns A UIDefinition with isVanillaOverride set to true.
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
export function redefineUI(
  screen: VanillaScreen,
  builder: (ns: NamespaceBuilder) => void
): UIDefinition {
  // Get the screen info (namespace and optional subdir)
  const screenInfo = VANILLA_SCREEN_INFO[screen];
  const ns = new NamespaceBuilder(screenInfo.namespace);
  builder(ns);

  // Extract filename from screen path (e.g., "settings_sections/general_section" -> "general_section")
  const filename = screen.includes("/") ? screen.split("/").pop()! : screen;

  return {
    namespace: ns.build(),
    filename,
    subdir: screenInfo.subdir, // Pass subdirectory for proper output path
    isVanillaOverride: true,
  };
}

/**
 * Defines a UI namespace with just a main element.
 *
 * This is the simplest way to define a UI namespace. Since most namespaces
 * only export a `main` element, this eliminates the need for `ns.add()`.
 * Child elements are embedded directly in the main element's controls.
 *
 * @param namespaceName - The unique namespace name.
 * @param mainElement - The main element builder (will be named "main").
 * @param options - Optional configuration.
 * @returns A UIDefinition ready for default export.
 *
 * @example Simple main element
 * ```typescript
 * const title = label("title").text("Hello");
 * const content = panel("content").size("100%", "fill");
 *
 * export default defineMain("my_ui",
 *   panel("main")
 *     .fullSize()
 *     .controls(title, content)
 * );
 * ```
 *
 * @example With subdirectory
 * ```typescript
 * export default defineMain("player_ping",
 *   image("main")
 *     .texture("textures/ui/Black")
 *     .controls(playerPositionText),
 *   { subdir: "phud" }
 * );
 * ```
 */
export function defineMain(
  namespaceName: string,
  mainElement: ElementBuilder
): UIDefinition {
  const ns = new NamespaceBuilder(namespaceName);
  // Force the element name to "main" and add it
  ns.add(mainElement);
  const result: UIDefinition = {
    namespace: ns.build(),
  };
  return result;
}

/**
 * Creates a reference to an element from another namespace.
 *
 * Use this when you want to reference an exported element without
 * embedding its full definition. The element will be defined in its
 * home namespace and referenced here.
 *
 * @param namespace - The namespace where the element is defined.
 * @param element - The element builder (uses its name for the reference).
 * @param overrides - Optional property overrides for this instance.
 * @returns A control reference object.
 *
 * @example Reference an exported element
 * ```typescript
 * // In shared.ts
 * export const sharedButton = button("action_btn").size(100, 30);
 *
 * // In my_ui.ts
 * import { sharedButton } from "./shared";
 *
 * export default defineMain("my_ui",
 *   panel("main")
 *     .controls(
 *       nsRef("shared", sharedButton),
 *       nsRef("shared", sharedButton, { offset: [0, 40] })  // With overrides
 *     )
 * );
 * // Generates: { "action_btn@shared.action_btn": {} }
 * ```
 */
export function nsRef(
  namespace: string,
  element: ElementBuilder,
  overrides: Record<string, unknown> = {}
): ControlReference {
  const elementName = element.getName();
  return { [`${elementName}@${namespace}.${elementName}`]: overrides };
}

/**
 * Defines multiple UI namespaces from a single source file.
 *
 * Use this when you need to export multiple namespaces from
 * one TypeScript file. Each definition can have its own
 * filename and subdirectory.
 *
 * @param definitions - Array of namespace definitions.
 * @returns Array of UIDefinitions ready for default export.
 *
 * @example Multiple namespaces
 * ```typescript
 * export default defineMultiUI([
 *   {
 *     name: "main_ui",
 *     builder: (ns) => {
 *       ns.add(panel("main").fullSize());
 *     }
 *   },
 *   {
 *     name: "overlay_ui",
 *     builder: (ns) => {
 *       ns.add(panel("overlay").fullSize().alpha(0.5));
 *     },
 *     filename: "overlay"
 *   }
 * ]);
 * ```
 *
 * @example With subdirectories
 * ```typescript
 * export default defineMultiUI([
 *   { name: "panel1", builder: (ns) => { ... }, subdir: "panels" },
 *   { name: "panel2", builder: (ns) => { ... }, subdir: "panels" }
 * ]);
 * // Outputs to:
 * // ui/__generated__/panels/panel1.json
 * // ui/__generated__/panels/panel2.json
 * ```
 */
export function defineMultiUI(
  definitions: Array<{
    /** The namespace name */
    name: string;
    /** Builder callback function */
    builder: (ns: NamespaceBuilder) => void;
  }>
): UIDefinition[] {
  return definitions.map(({ name, builder }) => {
    return defineUI(name, builder);
  });
}
