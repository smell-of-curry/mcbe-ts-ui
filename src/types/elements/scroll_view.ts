/**
 * Bedrock UI Generator - Scroll View Element Type
 * 
 * Scroll views display scrollable content that exceeds the
 * visible area. They support touch/mouse scrolling and
 * optional scrollbars.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#scroll-view
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Scroll View Properties
// ============================================================================

/**
 * Properties specific to scroll view elements.
 * 
 * Scroll views are container elements that:
 * - Allow content larger than the viewport
 * - Support vertical and/or horizontal scrolling
 * - Can display scrollbars
 * - Handle touch/drag gestures
 * 
 * Structure typically includes:
 * - Viewport (visible area)
 * - Content (scrollable area, can be larger)
 * - Scrollbar track and box (optional)
 * 
 * @example Basic scroll view:
 * ```typescript
 * {
 *   type: "scroll_view",
 *   size: ["100%", 200],
 *   scroll_view_port: "viewport",
 *   scroll_content: "content",
 *   scrollbar_box: "scrollbar_thumb",
 *   controls: [
 *     { "viewport": { type: "panel", size: ["100%", "100%"] } },
 *     { "content": { type: "stack_panel", size: ["100%", "100%c"] } },
 *     { "scrollbar_thumb": { type: "scrollbar_box" } }
 *   ]
 * }
 * ```
 * 
 * @example Chat-style scroll (auto-scroll to bottom):
 * ```typescript
 * {
 *   type: "scroll_view",
 *   jump_to_bottom_on_update: true,
 *   touch_mode: true,
 *   scroll_speed: 2
 * }
 * ```
 */
export interface ScrollViewProperties extends BaseUIProperties {
  /**
   * Element type - must be "scroll_view".
   */
  type?: "scroll_view";

  /**
   * Scroll speed multiplier.
   * Higher values scroll faster per input.
   * 
   * @default 1.0
   */
  scroll_speed?: number;

  /**
   * Name of the child control that is the visible viewport.
   * Content is clipped to this area.
   * 
   * @example "viewport", "scroll_panel"
   */
  scroll_view_port?: string;

  /**
   * Name of the child control containing scrollable content.
   * This element can be larger than the viewport.
   * 
   * @example "content", "scroll_content"
   */
  scroll_content?: string;

  /**
   * Name of the panel containing scrollbar elements.
   * Contains the track and box controls.
   * 
   * @example "scrollbar_panel"
   */
  scroll_box_and_track_panel?: string;

  /**
   * Button ID for clicking the scrollbar track.
   * Allows jumping to clicked position.
   * 
   * @example "button.scrollbar_track"
   */
  scrollbar_track_button?: string;

  /**
   * Button ID for touch scrollbar interaction.
   * 
   * @example "button.scrollbar_touch"
   */
  scrollbar_touch_button?: string;

  /**
   * Name of the child control for the scrollbar thumb.
   * The draggable part of the scrollbar.
   * 
   * @example "scrollbar_box", "thumb"
   */
  scrollbar_box?: string;

  /**
   * Whether to auto-scroll to bottom when content updates.
   * Useful for chat windows and logs.
   * 
   * @default false
   */
  jump_to_bottom_on_update?: boolean;

  /**
   * Whether to enable touch/drag scrolling mode.
   * When true, content can be dragged directly.
   * 
   * @default false
   */
  touch_mode?: boolean;

  /**
   * Whether scrollbar is contained within the viewport.
   * TODO: Figure out exact behavior
   * 
   * @default false
   */
  scroll_bar_contained?: boolean;

  /**
   * Whether to always handle scrolling input.
   * When true, captures scroll even without focus.
   * 
   * @default false
   */
  always_handle_scrolling?: boolean;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a scroll view.
 */
export function isScrollView(element: BaseUIProperties): element is ScrollViewProperties {
  return element.type === "scroll_view";
}

