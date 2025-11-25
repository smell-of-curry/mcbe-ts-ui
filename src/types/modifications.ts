/**
 * Bedrock UI Generator - Modification Types
 *
 * Modifications allow you to alter existing vanilla UI elements
 * by inserting, removing, or replacing controls.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#control
 */

import type { ControlReference } from "./elements/base";

// ============================================================================
// Array Operation Types
// ============================================================================

/**
 * Operations that can be performed on control arrays.
 *
 * - `"insert_front"` - Add controls at the beginning of the array
 * - `"insert_back"` - Add controls at the end of the array
 * - `"insert_before"` - Add controls before a specific control
 * - `"insert_after"` - Add controls after a specific control
 * - `"remove"` - Remove a specific control
 * - `"replace"` - Replace a specific control with new ones
 * - `"swap"` - Swap positions of two controls
 */
export type ArrayOperation =
  | "insert_front"
  | "insert_back"
  | "insert_before"
  | "insert_after"
  | "remove"
  | "replace"
  | "swap";

// ============================================================================
// Modification Interface
// ============================================================================

/**
 * A modification to an existing UI element's controls array.
 *
 * Modifications are used to alter vanilla UI without completely
 * replacing the file. This allows for compatibility with other
 * resource packs and game updates.
 *
 * @example Insert at back of controls:
 * ```typescript
 * {
 *   array_name: "controls",
 *   operation: "insert_back",
 *   value: [{ "my_element@my_ns.element": {} }]
 * }
 * ```
 *
 * @example Insert after a specific control:
 * ```typescript
 * {
 *   control_name: "player_position",
 *   operation: "insert_after",
 *   value: [{ "my_hud@my_ns.hud": {} }]
 * }
 * ```
 *
 * @example Remove a control:
 * ```typescript
 * {
 *   control_name: "unwanted_element",
 *   operation: "remove"
 * }
 * ```
 */
export interface Modification {
  /**
   * Name of the array to modify.
   * Usually "controls" for the children array.
   * Required for insert_front and insert_back operations.
   */
  array_name?: string;

  /**
   * Name of a specific control to target.
   * Required for insert_before, insert_after, remove, replace, and swap.
   */
  control_name?: string;

  /**
   * The operation to perform.
   */
  operation: ArrayOperation;

  /**
   * The controls to insert (for insert operations).
   * Not required for remove operation.
   */
  value?: ControlReference[];

  /**
   * The target control for swap operations.
   * The control_name and target_control will swap positions.
   */
  target_control?: string;

  /**
   * Alternative way to specify target control.
   * TODO: Verify exact usage and differences from control_name
   */
  where?: {
    control_name: string;
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create an insert_back modification.
 *
 * @example
 * ```typescript
 * const mod = insertBack("controls", { "my_el@ns.el": {} });
 * ```
 */
export function insertBack(
  arrayName: string,
  ...controls: ControlReference[]
): Modification {
  return {
    array_name: arrayName,
    operation: "insert_back",
    value: controls,
  };
}

/**
 * Create an insert_front modification.
 *
 * @example
 * ```typescript
 * const mod = insertFront("controls", { "my_el@ns.el": {} });
 * ```
 */
export function insertFront(
  arrayName: string,
  ...controls: ControlReference[]
): Modification {
  return {
    array_name: arrayName,
    operation: "insert_front",
    value: controls,
  };
}

/**
 * Create an insert_after modification.
 *
 * @example
 * ```typescript
 * const mod = insertAfter("existing_control", { "my_el@ns.el": {} });
 * ```
 */
export function insertAfter(
  controlName: string,
  ...controls: ControlReference[]
): Modification {
  return {
    control_name: controlName,
    operation: "insert_after",
    value: controls,
  };
}

/**
 * Create an insert_before modification.
 *
 * @example
 * ```typescript
 * const mod = insertBefore("existing_control", { "my_el@ns.el": {} });
 * ```
 */
export function insertBefore(
  controlName: string,
  ...controls: ControlReference[]
): Modification {
  return {
    control_name: controlName,
    operation: "insert_before",
    value: controls,
  };
}

/**
 * Create a remove modification.
 *
 * @example
 * ```typescript
 * const mod = removeControl("unwanted_element");
 * ```
 */
export function removeControl(controlName: string): Modification {
  return {
    control_name: controlName,
    operation: "remove",
  };
}

/**
 * Create a replace modification.
 *
 * @example
 * ```typescript
 * const mod = replaceControl("old_element", { "new_el@ns.el": {} });
 * ```
 */
export function replaceControl(
  controlName: string,
  ...controls: ControlReference[]
): Modification {
  return {
    control_name: controlName,
    operation: "replace",
    value: controls,
  };
}
