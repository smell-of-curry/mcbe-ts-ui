/**
 * Bedrock UI Generator - Namespace Types
 * 
 * Types for UI namespace files and definitions.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */

import type { UIElement } from "./elements";

// ============================================================================
// Namespace File Types
// ============================================================================

/**
 * A complete UI namespace file structure.
 * 
 * Each JSON UI file defines a namespace containing multiple
 * named elements. Elements can reference each other within
 * the namespace or from other namespaces.
 * 
 * @example
 * ```json
 * {
 *   "namespace": "my_ui",
 *   "main_panel": {
 *     "type": "panel",
 *     "size": ["100%", "100%"]
 *   },
 *   "title_label": {
 *     "type": "label",
 *     "text": "Hello"
 *   }
 * }
 * ```
 */
export interface UINamespace {
  /**
   * The namespace name for this file.
   * Other files reference elements as "namespace.element_name".
   * 
   * @example "my_ui", "common", "hud"
   */
  namespace: string;

  /**
   * Named element definitions.
   * Keys are element names, values are element properties.
   */
  [elementName: string]: string | UIElement | undefined;
}

// ============================================================================
// UI Defs File
// ============================================================================

/**
 * Structure of the _ui_defs.json file.
 * 
 * This file lists all UI JSON files that should be loaded.
 * Paths are relative to the resource pack root.
 * 
 * @example
 * ```json
 * {
 *   "ui_defs": [
 *     "ui/my_screen.json",
 *     "ui/common/buttons.json",
 *     "ui/__generated__/custom_hud.json"
 *   ]
 * }
 * ```
 */
export interface UIDefs {
  /**
   * Array of paths to UI JSON files.
   * Paths are relative to resource pack root.
   * 
   * @example ["ui/my_screen.json", "ui/hud.json"]
   */
  ui_defs: string[];
}

// ============================================================================
// Global Variables File
// ============================================================================

/**
 * Structure of the _global_variables.json file.
 * 
 * Global variables can be used across all UI files.
 * Variable names must start with $.
 * 
 * @example
 * ```json
 * {
 *   "$primary_color": [0.2, 0.6, 1.0],
 *   "$button_height": 30,
 *   "$default_font": "default"
 * }
 * ```
 */
export interface GlobalVariables {
  /**
   * Variable definitions with $ prefix.
   */
  [key: `$${string}`]: unknown;
}

// ============================================================================
// Element Reference Types
// ============================================================================

/**
 * Reference string to an element in another namespace.
 * Format: "namespace.element_name"
 * 
 * @example "common.button", "hud.health_bar", "my_ui.main_panel"
 */
export type ElementRef = `${string}.${string}`;

/**
 * Extension reference using @ syntax.
 * Format: "new_name@base_reference"
 * 
 * @example "my_button@common.button", "custom_label@hud.title"
 */
export type ExtensionRef = `${string}@${ElementRef}`;

