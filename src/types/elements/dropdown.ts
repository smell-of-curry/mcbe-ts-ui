/**
 * Bedrock UI Generator - Dropdown Element Type
 *
 * Dropdowns display a collapsible list of options.
 * When clicked, they expand to show selectable items.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#dropdown
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Dropdown Properties
// ============================================================================

/**
 * Properties specific to dropdown elements.
 *
 * Dropdowns are interactive elements that:
 * - Show a button that expands into a list
 * - Allow selection from multiple options
 * - Can display the selected value
 * - Support scrollable option lists
 *
 * @example Basic dropdown:
 * ```typescript
 * {
 *   type: "dropdown",
 *   dropdown_name: "difficulty_dropdown",
 *   dropdown_content_control: "content",
 *   dropdown_area: "dropdown_panel"
 * }
 * ```
 *
 * TODO: Add more detailed examples once behavior is verified
 */
export interface DropdownProperties extends BaseUIProperties {
  /**
   * Element type - must be "dropdown".
   */
  type?: "dropdown";

  /**
   * Unique name for this dropdown.
   * Used for identifying the dropdown in bindings and events.
   *
   * @example "difficulty_dropdown", "language_select"
   */
  dropdown_name?: string;

  /**
   * Name of the child control that contains dropdown content.
   * This is the expandable area with options.
   *
   * @example "content", "options_panel"
   */
  dropdown_content_control?: string;

  /**
   * Name of the child control that defines the dropdown area.
   * TODO: Figure out exact purpose vs dropdown_content_control
   *
   * @example "dropdown_panel"
   */
  dropdown_area?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a dropdown.
 */
export function isDropdown(
  element: BaseUIProperties
): element is DropdownProperties {
  return element.type === "dropdown";
}
