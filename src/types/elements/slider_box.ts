/**
 * Bedrock UI Generator - Slider Box Element Type
 *
 * Slider boxes are the draggable handle/thumb of a slider.
 * They support multiple visual states and are typically used
 * as children of slider elements.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#slider-box
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Slider Box Properties
// ============================================================================

/**
 * Properties specific to slider box elements.
 *
 * Slider boxes are the interactive thumb/handle that:
 * - Can be dragged along the slider track
 * - Display different visuals for states
 * - Indicate the current slider value position
 *
 * @example Slider handle with states:
 * ```typescript
 * {
 *   type: "slider_box",
 *   size: [10, 16],
 *   default_control: "default",
 *   hover_control: "hover",
 *   controls: [
 *     {
 *       "default": {
 *         type: "image",
 *         texture: "textures/ui/slider_handle"
 *       }
 *     },
 *     {
 *       "hover": {
 *         type: "image",
 *         texture: "textures/ui/slider_handle_hover"
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export interface SliderBoxProperties extends BaseUIProperties {
  /**
   * Element type - must be "slider_box".
   */
  type?: "slider_box";

  /**
   * Name of the child control for default/idle state.
   *
   * @example "default", "idle"
   */
  default_control?: string;

  /**
   * Name of the child control for hover state.
   *
   * @example "hover", "highlighted"
   */
  hover_control?: string;

  /**
   * Name of the child control for locked/disabled state.
   *
   * @example "locked", "disabled"
   */
  locked_control?: string;

  /**
   * Name of the child control for indent state.
   * TODO: Figure out when indent state is used
   *
   * @example "indent"
   */
  indent_control?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a slider box.
 */
export function isSliderBox(
  element: BaseUIProperties
): element is SliderBoxProperties {
  return element.type === "slider_box";
}
