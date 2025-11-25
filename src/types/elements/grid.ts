/**
 * Bedrock UI Generator - Grid Element Type
 *
 * Grids arrange children in a 2D grid layout with rows and columns.
 * They're commonly used for inventory slots, button arrays, and
 * any repeated UI elements.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#grid
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Grid Rescaling Type
// ============================================================================

/**
 * How the grid resizes based on content.
 *
 * - `"none"` - Fixed dimensions, no rescaling
 * - `"horizontal"` - Adjust columns based on content
 * - `"vertical"` - Adjust rows based on content
 */
export type GridRescalingType = "horizontal" | "vertical" | "none";

/**
 * Direction to fill grid items.
 *
 * - `"horizontal"` - Fill left to right, then next row
 * - `"vertical"` - Fill top to bottom, then next column
 */
export type GridFillDirection = "horizontal" | "vertical";

// ============================================================================
// Grid Properties
// ============================================================================

/**
 * Properties specific to grid elements.
 *
 * Grids are layout containers that:
 * - Arrange items in rows and columns
 * - Can bind to data collections (inventory, buttons)
 * - Support templates for repeated items
 * - Handle dynamic item counts
 *
 * @example Fixed 9x4 inventory grid:
 * ```typescript
 * {
 *   type: "grid",
 *   grid_dimensions: [9, 4],
 *   size: [162, 72],  // 9*18, 4*18
 *   grid_item_template: "inventory.slot_template",
 *   collection_name: "inventory_items"
 * }
 * ```
 *
 * @example Button grid with maximum items:
 * ```typescript
 * {
 *   type: "grid",
 *   grid_dimensions: [4, 2],
 *   grid_item_template: "my_ns.button_template",
 *   collection_name: "form_buttons",
 *   maximum_grid_items: 8
 * }
 * ```
 */
export interface GridProperties extends BaseUIProperties {
  /**
   * Element type - must be "grid".
   */
  type?: "grid";

  /**
   * Grid size as [columns, rows].
   * Defines the maximum grid layout.
   *
   * @example [9, 4] - 9 columns, 4 rows (36 slots)
   */
  grid_dimensions?: [number, number];

  /**
   * Template element to use for each grid item.
   * Reference to an element definition in format "namespace.element".
   *
   * @example "inventory.slot_template", "my_ns.button_item"
   */
  grid_item_template?: string;

  /**
   * Binding for dynamic grid dimensions.
   * Allows grid size to be controlled by data.
   *
   * @example "#grid_size"
   */
  grid_dimension_binding?: string;

  /**
   * How the grid rescales based on content.
   *
   * @default "none"
   */
  grid_rescaling_type?: GridRescalingType;

  /**
   * Direction to fill grid items.
   *
   * @default "horizontal"
   */
  grid_fill_direction?: GridFillDirection;

  /**
   * Maximum number of items to display.
   * Items beyond this count are not rendered.
   */
  maximum_grid_items?: number;

  /**
   * Data collection to bind grid items to.
   * Each item in the collection creates one grid cell.
   *
   * Common collections:
   * - `"inventory_items"` - Player inventory
   * - `"hotbar_items"` - Hotbar slots
   * - `"form_buttons"` - Server form buttons
   * - `"armor_items"` - Armor slots
   *
   * @example "form_buttons", "inventory_items"
   */
  collection_name?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a grid.
 */
export function isGrid(element: BaseUIProperties): element is GridProperties {
  return element.type === "grid";
}
