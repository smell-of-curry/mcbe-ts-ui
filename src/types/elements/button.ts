/**
 * Bedrock UI Generator - Button Element Type
 *
 * Buttons are interactive elements that respond to clicks/taps.
 * They support multiple visual states (default, hover, pressed, locked)
 * and can trigger actions via button mappings.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#button
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Button Properties
// ============================================================================

/**
 * Properties specific to button elements.
 *
 * Buttons are interactive elements that:
 * - Respond to mouse clicks, touch, and controller input
 * - Display different visuals for each state
 * - Can trigger actions and events
 * - Support focus navigation
 *
 * Each state (default, hover, pressed, locked) references a child
 * control by name that defines the visual appearance.
 *
 * @example Basic button with states:
 * ```typescript
 * {
 *   type: "button",
 *   size: [100, 30],
 *   default_control: "default",
 *   hover_control: "hover",
 *   pressed_control: "pressed",
 *   controls: [
 *     {
 *       "default": {
 *         type: "image",
 *         texture: "textures/ui/button_default"
 *       }
 *     },
 *     {
 *       "hover": {
 *         type: "image",
 *         texture: "textures/ui/button_hover"
 *       }
 *     },
 *     {
 *       "pressed": {
 *         type: "image",
 *         texture: "textures/ui/button_pressed"
 *       }
 *     }
 *   ]
 * }
 * ```
 *
 * @example Button with action:
 * ```typescript
 * {
 *   type: "button",
 *   "$pressed_button_name": "button.menu_exit",
 *   default_control: "default",
 *   hover_control: "hover",
 *   pressed_control: "pressed"
 * }
 * ```
 */
export interface ButtonProperties extends BaseUIProperties {
  /**
   * Element type - must be "button".
   */
  type?: "button";

  /**
   * Name of the child control to show in default state.
   * This is the normal/idle appearance.
   *
   * @example "default", "idle_state"
   */
  default_control?: string;

  /**
   * Name of the child control to show on hover/focus.
   * Displayed when mouse hovers or element has focus.
   *
   * @example "hover", "highlighted_state"
   */
  hover_control?: string;

  /**
   * Name of the child control to show when pressed.
   * Displayed during the click/tap action.
   *
   * @example "pressed", "active_state"
   */
  pressed_control?: string;

  /**
   * Name of the child control to show when locked/disabled.
   * Displayed when the button is not interactive.
   *
   * @example "locked", "disabled_state"
   */
  locked_control?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a button.
 */
export function isButton(
  element: BaseUIProperties
): element is ButtonProperties {
  return element.type === "button";
}
