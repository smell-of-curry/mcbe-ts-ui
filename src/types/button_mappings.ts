/**
 * Bedrock UI Generator - Button Mapping Types
 *
 * Button mappings handle input from controllers, keyboard,
 * and other input devices to trigger UI actions.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#input
 */

// ============================================================================
// Mapping Type Enum
// ============================================================================

/**
 * The type of button mapping - when the mapping is active.
 *
 * - `"global"` - Always active regardless of focus
 * - `"pressed"` - Active when button is pressed
 * - `"double_pressed"` - Active on double-press
 * - `"focused"` - Active when element has focus
 */
export type MappingType = "global" | "pressed" | "double_pressed" | "focused";

// ============================================================================
// Input Mode Condition
// ============================================================================

/**
 * Condition based on the current input mode.
 *
 * - `"gamepad_and_not_gaze"` - Controller without gaze controls
 * - `"not_gaze"` - Any input except gaze controls
 */
export type InputModeCondition = "gamepad_and_not_gaze" | "not_gaze";

// ============================================================================
// Mapping Scope
// ============================================================================

/**
 * Scope of the button mapping.
 *
 * - `"view"` - Scoped to the current view/element
 * - `"controller"` - Scoped to controller input globally
 */
export type MappingScope = "view" | "controller";

// ============================================================================
// Button Mapping Interface
// ============================================================================

/**
 * A button mapping that connects input to UI actions.
 *
 * Button mappings translate hardware inputs (controller buttons,
 * keyboard keys) into UI actions (button clicks, menu navigation).
 *
 * @example Global escape mapping:
 * ```typescript
 * {
 *   from_button_id: "button.menu_cancel",
 *   to_button_id: "button.menu_exit",
 *   mapping_type: "global"
 * }
 * ```
 *
 * @example Focused button press:
 * ```typescript
 * {
 *   from_button_id: "button.menu_select",
 *   to_button_id: "button.form_button_click",
 *   mapping_type: "focused"
 * }
 * ```
 */
export interface ButtonMapping {
  /**
   * The source button/input to listen for.
   *
   * Common values:
   * - `"button.menu_select"` - Confirm/Select
   * - `"button.menu_cancel"` - Cancel/Back
   * - `"button.menu_ok"` - OK button
   * - `"button.menu_exit"` - Exit menu
   * - `"button.controller_select"` - Controller A button
   * - `"button.controller_back"` - Controller B button
   *
   * @example "button.menu_cancel"
   */
  from_button_id: string;

  /**
   * The target action to trigger.
   *
   * Common values:
   * - `"button.menu_exit"` - Close the menu
   * - `"button.form_button_click"` - Click a form button
   * - `"button.menu_tab_left"` - Navigate tabs left
   * - `"button.menu_tab_right"` - Navigate tabs right
   *
   * @example "button.menu_exit"
   */
  to_button_id: string;

  /**
   * When this mapping should be active.
   * @default "focused"
   */
  mapping_type?: MappingType;

  /**
   * Additional condition based on input mode.
   * Useful for controller-specific mappings.
   */
  input_mode_condition?: InputModeCondition;

  /**
   * Whether this mapping is currently ignored/disabled.
   * @default false
   */
  ignored?: boolean;

  /**
   * The scope of this mapping.
   */
  scope?: MappingScope;
}

// ============================================================================
// Common Button IDs
// ============================================================================

/**
 * Common button IDs used in from_button_id.
 * These represent hardware/input buttons.
 */
export const FROM_BUTTONS = {
  /** Menu select/confirm button */
  MENU_SELECT: "button.menu_select",
  /** Menu cancel/back button */
  MENU_CANCEL: "button.menu_cancel",
  /** Menu OK button */
  MENU_OK: "button.menu_ok",
  /** Menu exit button */
  MENU_EXIT: "button.menu_exit",
  /** Controller A/Select */
  CONTROLLER_SELECT: "button.controller_select",
  /** Controller B/Back */
  CONTROLLER_BACK: "button.controller_back",
  /** Controller X */
  CONTROLLER_SECONDARY_SELECT: "button.controller_secondary_select",
  /** Controller Y */
  CONTROLLER_SECONDARY_BACK: "button.controller_secondary_back",
  /** Tab left (LB) */
  MENU_TAB_LEFT: "button.menu_tab_left",
  /** Tab right (RB) */
  MENU_TAB_RIGHT: "button.menu_tab_right",
} as const;

/**
 * Common button IDs used in to_button_id.
 * These represent UI actions.
 */
export const TO_BUTTONS = {
  /** Exit/close the menu */
  MENU_EXIT: "button.menu_exit",
  /** Click a form button */
  FORM_BUTTON_CLICK: "button.form_button_click",
  /** Navigate tabs left */
  TAB_LEFT: "button.menu_tab_left",
  /** Navigate tabs right */
  TAB_RIGHT: "button.menu_tab_right",
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a global button mapping.
 *
 * @example
 * ```typescript
 * const escapeMapping = globalMapping(
 *   "button.menu_cancel",
 *   "button.menu_exit"
 * );
 * ```
 */
export function globalMapping(
  fromButton: string,
  toButton: string
): ButtonMapping {
  return {
    from_button_id: fromButton,
    to_button_id: toButton,
    mapping_type: "global",
  };
}

/**
 * Create a focused button mapping (active when element has focus).
 *
 * @example
 * ```typescript
 * const selectMapping = focusedMapping(
 *   "button.menu_select",
 *   "button.form_button_click"
 * );
 * ```
 */
export function focusedMapping(
  fromButton: string,
  toButton: string
): ButtonMapping {
  return {
    from_button_id: fromButton,
    to_button_id: toButton,
    mapping_type: "focused",
  };
}
