/**
 * Bedrock UI Generator - Panel Element Type
 *
 * Panel is the most basic and commonly used UI element type.
 * It serves as a container for other elements and can be styled
 * with backgrounds, borders, and other visual properties.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#element-types
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Panel Properties
// ============================================================================

/**
 * Properties specific to panel elements.
 *
 * Panels are generic containers that:
 * - Hold and organize child elements
 * - Can be styled with backgrounds/borders via images
 * - Support all base layout and binding properties
 * - Are the default type when no type is specified
 *
 * @example Basic panel:
 * ```typescript
 * {
 *   type: "panel",
 *   size: ["100%", "100%"],
 *   controls: [
 *     { "child@namespace.child_element": {} }
 *   ]
 * }
 * ```
 *
 * @example Panel with background (using child image):
 * ```typescript
 * {
 *   type: "panel",
 *   size: [200, 100],
 *   controls: [
 *     {
 *       "background": {
 *         type: "image",
 *         texture: "textures/ui/Black",
 *         size: ["100%", "100%"],
 *         alpha: 0.8
 *       }
 *     },
 *     { "content@my.content": {} }
 *   ]
 * }
 * ```
 */
export interface PanelProperties extends BaseUIProperties {
  /**
   * Element type - "panel" for panel elements.
   * Can be omitted as panel is the default type.
   */
  type?: "panel";
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a panel.
 * Note: Elements without a type are also panels (default type).
 */
export function isPanel(element: BaseUIProperties): element is PanelProperties {
  return element.type === "panel" || element.type === undefined;
}
