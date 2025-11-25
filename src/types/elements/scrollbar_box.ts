/**
 * Bedrock UI Generator - Scrollbar Box Element Type
 * 
 * Scrollbar boxes are the draggable thumb/handle of a scrollbar.
 * They indicate scroll position and allow direct dragging.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#scrollbar-box
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Draggable Direction Type
// ============================================================================

/**
 * Directions the scrollbar can be dragged.
 * 
 * - `"horizontal"` - Only horizontal movement
 * - `"vertical"` - Only vertical movement
 * - `"both"` - Both directions (rare for scrollbars)
 */
export type DraggableDirection = "horizontal" | "vertical" | "both";

// ============================================================================
// Scrollbar Box Properties
// ============================================================================

/**
 * Properties specific to scrollbar box elements.
 * 
 * Scrollbar boxes are the draggable handle that:
 * - Can be dragged along the scroll track
 * - Indicates current scroll position
 * - Sizes based on content-to-viewport ratio
 * 
 * @example Vertical scrollbar thumb:
 * ```typescript
 * {
 *   type: "scrollbar_box",
 *   draggable: "vertical",
 *   size: [10, 20],
 *   controls: [
 *     {
 *       "bg": {
 *         type: "image",
 *         texture: "textures/ui/scrollbar_thumb",
 *         nineslice_size: 2
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export interface ScrollbarBoxProperties extends BaseUIProperties {
  /**
   * Element type - must be "scrollbar_box".
   */
  type?: "scrollbar_box";

  /**
   * Which direction(s) the scrollbar can be dragged.
   * 
   * @default "vertical"
   */
  draggable?: DraggableDirection;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a scrollbar box.
 */
export function isScrollbarBox(element: BaseUIProperties): element is ScrollbarBoxProperties {
  return element.type === "scrollbar_box";
}

