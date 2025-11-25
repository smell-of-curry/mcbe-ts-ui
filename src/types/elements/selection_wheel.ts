/**
 * Bedrock UI Generator - Selection Wheel Element Type
 * 
 * Selection wheels display radial menus where users select
 * options by pointing in different directions.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#selection-wheel
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Selection Wheel Properties
// ============================================================================

/**
 * Properties specific to selection wheel elements.
 * 
 * Selection wheels are radial menus that:
 * - Arrange options in a circle
 * - Select based on pointer/stick direction
 * - Support multiple slices/segments
 * - Common for emote wheels and quick menus
 * 
 * @example Basic selection wheel:
 * ```typescript
 * {
 *   type: "selection_wheel",
 *   inner_radius: 30,
 *   outer_radius: 80,
 *   slice_count: 8,
 *   button_name: "button.wheel_select",
 *   state_controls: [
 *     "slice_0", "slice_1", "slice_2", "slice_3",
 *     "slice_4", "slice_5", "slice_6", "slice_7"
 *   ]
 * }
 * ```
 * 
 * @example Emote wheel:
 * ```typescript
 * {
 *   type: "selection_wheel",
 *   inner_radius: 40,
 *   outer_radius: 100,
 *   slice_count: 6,
 *   initial_button_slice: 0,
 *   iterate_left_button_name: "button.wheel_left",
 *   iterate_right_button_name: "button.wheel_right"
 * }
 * ```
 */
export interface SelectionWheelProperties extends BaseUIProperties {
  /**
   * Element type - must be "selection_wheel".
   */
  type?: "selection_wheel";

  /**
   * Inner radius of the wheel in pixels.
   * The dead zone where no selection occurs.
   * 
   * @example 30, 40
   */
  inner_radius?: number;

  /**
   * Outer radius of the wheel in pixels.
   * The maximum distance for selection.
   * 
   * @example 80, 100
   */
  outer_radius?: number;

  /**
   * Names of child controls for each slice state.
   * Index corresponds to slice number.
   * 
   * @example ["slice_0", "slice_1", "slice_2", "slice_3"]
   */
  state_controls?: string[];

  /**
   * Number of slices/segments in the wheel.
   * Divides 360 degrees evenly.
   * 
   * @example 4, 6, 8
   */
  slice_count?: number;

  /**
   * Button ID triggered when a slice is selected.
   * 
   * @example "button.wheel_select"
   */
  button_name?: string;

  /**
   * Button ID for iterating left through options.
   * Used for non-directional navigation.
   * 
   * @example "button.wheel_left"
   */
  iterate_left_button_name?: string;

  /**
   * Button ID for iterating right through options.
   * Used for non-directional navigation.
   * 
   * @example "button.wheel_right"
   */
  iterate_right_button_name?: string;

  /**
   * Initial slice to highlight/select.
   * 0-indexed slice number.
   * 
   * @default 0
   */
  initial_button_slice?: number;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a selection wheel.
 */
export function isSelectionWheel(element: BaseUIProperties): element is SelectionWheelProperties {
  return element.type === "selection_wheel";
}

