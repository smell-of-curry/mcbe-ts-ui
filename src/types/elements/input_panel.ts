/**
 * Bedrock UI Generator - Input Panel Element Type
 * 
 * Input panels are specialized panels that handle input events
 * like touch, mouse, and gestures. They can capture or pass
 * through input to elements behind them.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#input
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Input Panel Properties
// ============================================================================

/**
 * Properties specific to input panel elements.
 * 
 * Input panels are containers that:
 * - Capture or pass through input events
 * - Handle touch and mouse gestures
 * - Can block input from reaching elements behind
 * - Support modal behavior
 * 
 * @example Modal background:
 * ```typescript
 * {
 *   type: "input_panel",
 *   size: ["100%", "100%"],
 *   modal: true,
 *   consume_event: true
 * }
 * ```
 * 
 * @example Touch capture area:
 * ```typescript
 * {
 *   type: "input_panel",
 *   size: [200, 200],
 *   hover_enabled: true,
 *   gesture_tracking_button: "button.touch_drag",
 *   always_handle_pointer: true
 * }
 * ```
 * 
 * @example Pass-through overlay:
 * ```typescript
 * {
 *   type: "input_panel",
 *   size: ["100%", "100%"],
 *   consume_event: false,
 *   prevent_touch_input: false
 * }
 * ```
 */
export interface InputPanelProperties extends BaseUIProperties {
  /**
   * Element type - must be "input_panel".
   */
  type?: "input_panel";

  /**
   * Whether this panel is modal.
   * Modal panels block interaction with elements behind.
   * 
   * @default false
   */
  modal?: boolean;

  /**
   * Whether this is an inline modal.
   * TODO: Figure out difference from regular modal
   * 
   * @default false
   */
  inline_modal?: boolean;

  /**
   * Whether hover detection is enabled.
   * Required for hover-based interactions.
   * 
   * @default false
   */
  hover_enabled?: boolean;

  /**
   * Whether to block touch input from reaching elements behind.
   * 
   * @default false
   */
  prevent_touch_input?: boolean;

  /**
   * Button ID for gesture tracking/dragging.
   * Used for drag-to-scroll or swipe gestures.
   * 
   * @example "button.drag_gesture"
   */
  gesture_tracking_button?: string;

  /**
   * Whether to always handle pointer/mouse input.
   * When true, captures all pointer events.
   * 
   * @default false
   */
  always_handle_pointer?: boolean;

  /**
   * Whether to always handle controller direction input.
   * 
   * @default false
   */
  always_handle_controller_direction?: boolean;

  /**
   * Whether to always listen for input.
   * When true, receives input even without focus.
   * 
   * @default false
   */
  always_listen_to_input?: boolean;

  /**
   * Whether to consume (stop propagation) of input events.
   * When true, events don't reach elements behind.
   * 
   * @default false
   */
  consume_event?: boolean;

  /**
   * Whether to consume hover events.
   * When true, hover doesn't propagate.
   * 
   * @default false
   */
  consume_hover_events?: boolean;

  /**
   * Whether to always handle scrolling input.
   * Useful for scroll views that should capture scroll.
   * 
   * @default false
   */
  always_handle_scrolling?: boolean;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is an input panel.
 */
export function isInputPanel(element: BaseUIProperties): element is InputPanelProperties {
  return element.type === "input_panel";
}

