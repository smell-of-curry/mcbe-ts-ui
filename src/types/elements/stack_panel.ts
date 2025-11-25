/**
 * Bedrock UI Generator - Stack Panel Element Type
 *
 * Stack panels automatically arrange child elements in a line,
 * either horizontally or vertically. Children are positioned
 * one after another without overlapping.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#stack-panel
 */

import type { BaseUIProperties } from "./base";
import type { Orientation } from "../common";

// ============================================================================
// Stack Panel Properties
// ============================================================================

/**
 * Properties specific to stack panel elements.
 *
 * Stack panels are layout containers that:
 * - Arrange children sequentially (no overlap)
 * - Support horizontal or vertical orientation
 * - Children can use "fill" size to take remaining space
 * - Useful for toolbars, lists, and form layouts
 *
 * @example Vertical stack (default):
 * ```typescript
 * {
 *   type: "stack_panel",
 *   size: [200, "100%"],
 *   orientation: "vertical",
 *   controls: [
 *     { "header": { type: "panel", size: ["100%", 30] } },
 *     { "content": { type: "panel", size: ["100%", "fill"] } },
 *     { "footer": { type: "panel", size: ["100%", 30] } }
 *   ]
 * }
 * ```
 *
 * @example Horizontal toolbar:
 * ```typescript
 * {
 *   type: "stack_panel",
 *   orientation: "horizontal",
 *   size: ["100%", 32],
 *   controls: [
 *     { "btn1@common.button": { size: [32, 32] } },
 *     { "spacer": { type: "panel", size: ["fill", "100%"] } },
 *     { "btn2@common.button": { size: [32, 32] } }
 *   ]
 * }
 * ```
 */
export interface StackPanelProperties extends BaseUIProperties {
  /**
   * Element type - must be "stack_panel".
   */
  type?: "stack_panel";

  /**
   * Direction to stack children.
   *
   * - `"vertical"` - Stack top to bottom (default)
   * - `"horizontal"` - Stack left to right
   *
   * @default "vertical"
   */
  orientation?: Orientation;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a stack panel.
 */
export function isStackPanel(
  element: BaseUIProperties
): element is StackPanelProperties {
  return element.type === "stack_panel";
}
