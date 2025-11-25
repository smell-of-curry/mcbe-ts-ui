/**
 * Bedrock UI Generator - Factory Element Type
 *
 * Factories dynamically create UI elements based on data.
 * They're used when the UI structure depends on game state
 * (e.g., different form types, dynamic content).
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#factory
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Factory Properties
// ============================================================================

/**
 * Properties specific to factory elements.
 *
 * Factories are dynamic containers that:
 * - Create elements based on control_ids mapping
 * - Select which element to create from game data
 * - Useful for conditional UI structures
 *
 * The factory reads a control name from bindings and creates
 * the corresponding element from control_ids.
 *
 * @example Form type factory:
 * ```typescript
 * {
 *   type: "factory",
 *   control_ids: {
 *     "long_form": "@server_form.long_form_panel",
 *     "custom_form": "@server_form.custom_form_panel",
 *     "modal_form": "@server_form.modal_form_panel"
 *   }
 * }
 * ```
 *
 * @example Screen content factory:
 * ```typescript
 * {
 *   type: "factory",
 *   control_name: "screen_content",
 *   control_ids: {
 *     "inventory": "@inventory.main",
 *     "crafting": "@crafting.main",
 *     "settings": "@settings.main"
 *   }
 * }
 * ```
 */
export interface FactoryProperties extends BaseUIProperties {
  /**
   * Element type - must be "factory".
   */
  type?: "factory";

  /**
   * Name of the control/variable that determines which element to create.
   * The value is looked up in control_ids.
   *
   * @example "screen_content", "form_type"
   */
  control_name?: string;

  /**
   * Mapping of names to element references.
   * Keys are the possible values from control_name.
   * Values are element references to create.
   *
   * @example
   * ```typescript
   * {
   *   "option_a": "@my_namespace.panel_a",
   *   "option_b": "@my_namespace.panel_b"
   * }
   * ```
   */
  control_ids?: Record<string, string>;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a factory.
 */
export function isFactory(
  element: BaseUIProperties
): element is FactoryProperties {
  return element.type === "factory";
}
