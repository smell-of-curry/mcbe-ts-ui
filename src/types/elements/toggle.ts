/**
 * Bedrock UI Generator - Toggle Element Type
 *
 * Toggles are checkbox/radio button style elements that maintain
 * an on/off state. They can function independently or as part
 * of a radio group where only one can be selected.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#toggle
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Toggle Properties
// ============================================================================

/**
 * Properties specific to toggle elements.
 *
 * Toggles are interactive elements that:
 * - Maintain a checked/unchecked state
 * - Can function as checkboxes (independent)
 * - Can function as radio buttons (grouped)
 * - Support multiple visual states for each combination
 *
 * State combinations:
 * - Checked + Default
 * - Checked + Hover
 * - Checked + Locked
 * - Unchecked + Default
 * - Unchecked + Hover
 * - Unchecked + Locked
 *
 * @example Simple checkbox:
 * ```typescript
 * {
 *   type: "toggle",
 *   toggle_name: "my_checkbox",
 *   toggle_default_state: false,
 *   checked_control: "checked",
 *   unchecked_control: "unchecked",
 *   controls: [
 *     { "checked": { type: "image", texture: "textures/ui/check_on" } },
 *     { "unchecked": { type: "image", texture: "textures/ui/check_off" } }
 *   ]
 * }
 * ```
 *
 * @example Radio button group:
 * ```typescript
 * // Each toggle in the group has the same toggle_name
 * {
 *   type: "toggle",
 *   toggle_name: "difficulty_selection",
 *   radio_toggle_group: true,
 *   toggle_group_default_selected: 0,  // First option selected
 *   toggle_group_forced_index: 0,       // This is option 0
 *   checked_control: "selected",
 *   unchecked_control: "unselected"
 * }
 * ```
 */
export interface ToggleProperties extends BaseUIProperties {
  /**
   * Element type - must be "toggle".
   */
  type?: "toggle";

  /**
   * Unique name for this toggle or toggle group.
   * For radio groups, all toggles share the same name.
   *
   * @example "enable_sounds", "difficulty_selection"
   */
  toggle_name?: string;

  /**
   * Default checked state when first created.
   *
   * @default false
   */
  toggle_default_state?: boolean;

  /**
   * Index of this toggle within a radio group.
   * Required for radio button behavior.
   *
   * @example 0, 1, 2 for three options
   */
  toggle_group_forced_index?: number;

  /**
   * Which toggle index is selected by default in a radio group.
   *
   * @default 0
   */
  toggle_group_default_selected?: number;

  /**
   * Whether to reset toggle state when focus is lost.
   * Useful for temporary hover-activated toggles.
   *
   * @default false
   */
  reset_on_focus_lost?: boolean;

  /**
   * Control to show/enable on hover when checked.
   * TODO: Figure out exact behavior
   */
  toggle_on_hover?: string;

  /**
   * Control to show/enable on hover when unchecked.
   * TODO: Figure out exact behavior
   */
  toggle_off_hover?: string;

  /**
   * Button name to trigger when toggling on.
   */
  toggle_on_button?: string;

  /**
   * Button name to trigger when toggling off.
   */
  toggle_off_button?: string;

  /**
   * Whether directional input can toggle the state.
   * When true, pressing directions can cycle through options.
   *
   * @default false
   */
  enable_directional_toggling?: boolean;

  /**
   * Whether this toggle is part of a radio group.
   * Radio groups allow only one selection at a time.
   *
   * @default false
   */
  radio_toggle_group?: boolean;

  // -------------------------------------------------------------------------
  // State Controls
  // -------------------------------------------------------------------------

  /**
   * Child control to show when checked (default/idle state).
   *
   * @example "checked", "on_default"
   */
  checked_control?: string;

  /**
   * Child control to show when unchecked (default/idle state).
   *
   * @example "unchecked", "off_default"
   */
  unchecked_control?: string;

  /**
   * Child control to show when checked and hovered.
   *
   * @example "checked_hover", "on_hover"
   */
  checked_hover_control?: string;

  /**
   * Child control to show when unchecked and hovered.
   *
   * @example "unchecked_hover", "off_hover"
   */
  unchecked_hover_control?: string;

  /**
   * Child control to show when checked and locked/disabled.
   *
   * @example "checked_locked", "on_disabled"
   */
  checked_locked_control?: string;

  /**
   * Child control to show when unchecked and locked/disabled.
   *
   * @example "unchecked_locked", "off_disabled"
   */
  unchecked_locked_control?: string;

  /**
   * Child control to show when checked, locked, and hovered.
   *
   * @example "checked_locked_hover"
   */
  checked_locked_hover_control?: string;

  /**
   * Child control to show when unchecked, locked, and hovered.
   *
   * @example "unchecked_locked_hover"
   */
  unchecked_locked_hover_control?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a toggle.
 */
export function isToggle(
  element: BaseUIProperties
): element is ToggleProperties {
  return element.type === "toggle";
}
