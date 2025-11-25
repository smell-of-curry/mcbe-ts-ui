/**
 * Bedrock UI Generator - Slider Element Type
 *
 * Sliders allow users to select a value within a range by
 * dragging a handle along a track.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#slider
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Slider Direction Type
// ============================================================================

/**
 * Direction of the slider track.
 *
 * - `"horizontal"` - Slides left to right
 * - `"vertical"` - Slides top to bottom
 */
export type SliderDirection = "horizontal" | "vertical";

// ============================================================================
// Slider Properties
// ============================================================================

/**
 * Properties specific to slider elements.
 *
 * Sliders are interactive elements that:
 * - Select values within a continuous or stepped range
 * - Support horizontal or vertical orientation
 * - Display a track and draggable handle
 * - Can show progress indication
 *
 * @example Basic horizontal slider:
 * ```typescript
 * {
 *   type: "slider",
 *   slider_name: "volume_slider",
 *   slider_direction: "horizontal",
 *   slider_steps: 10,
 *   slider_box_control: "slider_handle",
 *   background_control: "track_background",
 *   progress_control: "track_progress"
 * }
 * ```
 *
 * @example Settings slider:
 * ```typescript
 * {
 *   type: "slider",
 *   slider_name: "gamma",
 *   slider_collection_name: "gamma_slider",
 *   slider_track_button: "button.slider_track",
 *   slider_select_on_hover: true
 * }
 * ```
 */
export interface SliderProperties extends BaseUIProperties {
  /**
   * Element type - must be "slider".
   */
  type?: "slider";

  /**
   * Button ID for clicking on the track to jump to position.
   *
   * @example "button.slider_track"
   */
  slider_track_button?: string;

  /**
   * Button ID for small decrease (e.g., left arrow).
   *
   * @example "button.slider_small_decrease"
   */
  slider_small_decrease_button?: string;

  /**
   * Button ID for small increase (e.g., right arrow).
   *
   * @example "button.slider_small_increase"
   */
  slider_small_increase_button?: string;

  /**
   * Number of discrete steps in the slider.
   * 0 or omitted means continuous sliding.
   *
   * @example 10 - Slider has 10 positions (0-9 or 0-100%)
   */
  slider_steps?: number;

  /**
   * Direction of the slider track.
   *
   * @default "horizontal"
   */
  slider_direction?: SliderDirection;

  /**
   * Timeout in milliseconds for slider input.
   * TODO: Figure out exact behavior
   */
  slider_timeout?: number;

  /**
   * Collection name for slider data binding.
   * Used with settings sliders.
   *
   * @example "gamma_slider", "volume_slider"
   */
  slider_collection_name?: string;

  /**
   * Unique name for this slider.
   * Used for bindings and state management.
   *
   * @example "master_volume", "brightness"
   */
  slider_name?: string;

  /**
   * Whether to select the slider on hover.
   * When true, hovering activates the slider for input.
   *
   * @default false
   */
  slider_select_on_hover?: boolean;

  /**
   * Button ID when slider is selected.
   * TODO: Figure out exact behavior
   */
  slider_selected_button?: string;

  /**
   * Button ID when slider is deselected.
   * TODO: Figure out exact behavior
   */
  slider_deselected_button?: string;

  /**
   * Name of the child control for the slider handle/thumb.
   * This is the draggable part of the slider.
   *
   * @example "slider_handle", "thumb"
   */
  slider_box_control?: string;

  /**
   * Name of the child control for the track background.
   * Shown behind the progress/handle.
   *
   * @example "track_bg", "background"
   */
  background_control?: string;

  /**
   * Name of the child control for track background on hover.
   *
   * @example "track_bg_hover"
   */
  background_hover_control?: string;

  /**
   * Name of the child control for the progress fill.
   * Shows the current value visually.
   *
   * @example "progress_fill", "fill"
   */
  progress_control?: string;

  /**
   * Name of the child control for progress fill on hover.
   *
   * @example "progress_fill_hover"
   */
  progress_hover_control?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a slider.
 */
export function isSlider(
  element: BaseUIProperties
): element is SliderProperties {
  return element.type === "slider";
}
