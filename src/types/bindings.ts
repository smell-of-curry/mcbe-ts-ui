/**
 * Bedrock UI Generator - Binding Types
 *
 * Data bindings connect UI elements to game state and enable
 * dynamic content and conditional visibility.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#data-binding
 */

// ============================================================================
// Binding Type Enum
// ============================================================================

/**
 * The source type for a binding - where the data comes from.
 *
 * - `"global"` - Global game state (player health, title text, etc.)
 * - `"view"` - Computed property from Molang expression
 * - `"collection"` - Data from a collection (inventory items, buttons, etc.)
 * - `"collection_details"` - Metadata about the collection item
 * - `"none"` - No specific binding type (rarely used)
 */
export type BindingType =
  | "global"
  | "view"
  | "collection"
  | "collection_details"
  | "none";

// ============================================================================
// Binding Condition Enum
// ============================================================================

/**
 * When the binding should be evaluated/updated.
 *
 * - `"none"` - Always evaluate (most common)
 * - `"always"` - Continuously evaluate every frame
 * - `"visible"` - Only evaluate when element is visible
 * - `"once"` - Evaluate only once when created
 * - `"always_when_visible"` - Evaluate every frame while visible
 * - `"visibility_changed"` - Evaluate when visibility changes
 */
export type BindingCondition =
  | "none"
  | "always"
  | "visible"
  | "once"
  | "always_when_visible"
  | "visibility_changed";

// ============================================================================
// Binding Interface
// ============================================================================

/**
 * A data binding that connects UI properties to game state.
 *
 * Bindings are the primary way to make UI elements dynamic.
 * They can read game data, transform it with Molang expressions,
 * and apply it to element properties.
 *
 * @example Global binding for title text:
 * ```typescript
 * {
 *   binding_type: "global",
 *   binding_name: "#title_text",
 *   binding_name_override: "#title_text",
 *   binding_condition: "none"
 * }
 * ```
 *
 * @example View binding for computed visibility:
 * ```typescript
 * {
 *   binding_type: "view",
 *   binding_name: "#null",
 *   source_property_name: "(#health > 50)",
 *   target_property_name: "#visible"
 * }
 * ```
 *
 * @example Collection binding for item data:
 * ```typescript
 * {
 *   binding_type: "collection",
 *   binding_collection_name: "hotbar_items",
 *   binding_name: "#item_id_aux",
 *   binding_name_override: "#item_id_aux"
 * }
 * ```
 */
export interface Binding {
  /**
   * The type/source of the binding.
   * Determines where the data comes from.
   */
  binding_type?: BindingType;

  /**
   * The name of the binding to read from.
   * Usually starts with # for hardcoded bindings.
   * Use "#null" for view bindings that don't read a specific value.
   *
   * @example "#title_text", "#player_health", "#null"
   */
  binding_name?: string;

  /**
   * Override the property name this binding writes to.
   * Often the same as binding_name for pass-through bindings.
   *
   * @example "#title_text", "#text", "#visible"
   */
  binding_name_override?: string;

  /**
   * The collection name for collection bindings.
   * Used with binding_type: "collection".
   *
   * @example "form_buttons", "hotbar_items", "inventory_items"
   */
  binding_collection_name?: string;

  /**
   * When this binding should be evaluated.
   * @default "none" (always evaluate)
   */
  binding_condition?: BindingCondition;

  /**
   * Molang expression to compute the source value.
   * Used with binding_type: "view" to create computed properties.
   *
   * @example "(#health > 50)", "(not (#title_text = ''))"
   */
  source_property_name?: string;

  /**
   * The target property to write the computed value to.
   * Common targets: "#visible", "#enabled", "#alpha", "#color"
   *
   * @example "#visible", "#enabled", "#text"
   */
  target_property_name?: string;

  /**
   * Name of another control to read properties from.
   * Allows cross-control bindings within the same parent.
   *
   * @example "my_other_control"
   */
  source_control_name?: string;

  /**
   * When true, source_control_name looks for siblings
   * rather than children of the current control.
   * @default false
   */
  resolve_sibling_scope?: boolean;
}

// ============================================================================
// Common Binding Patterns
// ============================================================================

/**
 * Creates a standard global binding that passes through a value.
 *
 * @example
 * ```typescript
 * const titleBinding = createGlobalBinding("#title_text");
 * // Result:
 * // {
 * //   binding_type: "global",
 * //   binding_condition: "none",
 * //   binding_name: "#title_text",
 * //   binding_name_override: "#title_text"
 * // }
 * ```
 */
export function createGlobalBinding(
  bindingName: string,
  condition: BindingCondition = "none"
): Binding {
  return {
    binding_type: "global",
    binding_condition: condition,
    binding_name: bindingName,
    binding_name_override: bindingName,
  };
}

/**
 * Creates a view binding that computes a property from a Molang expression.
 *
 * @example
 * ```typescript
 * const visibilityBinding = createViewBinding(
 *   "(#health > 0)",
 *   "#visible"
 * );
 * ```
 */
export function createViewBinding(
  sourceExpression: string,
  targetProperty: string
): Binding {
  return {
    binding_type: "view",
    binding_name: "#null",
    source_property_name: sourceExpression,
    target_property_name: targetProperty,
  };
}

/**
 * Creates a collection binding for reading from a data collection.
 *
 * @example
 * ```typescript
 * const itemBinding = createCollectionBinding(
 *   "#item_id_aux",
 *   "hotbar_items"
 * );
 * ```
 */
export function createCollectionBinding(
  bindingName: string,
  collectionName: string,
  override?: string
): Binding {
  return {
    binding_type: "collection",
    binding_collection_name: collectionName,
    binding_name: bindingName,
    ...(override ? { binding_name_override: override } : {}),
  };
}

/**
 * Creates a visibility binding based on a Molang condition.
 *
 * @example
 * ```typescript
 * const showWhenAlive = createVisibilityBinding("(#health > 0)");
 * ```
 */
export function createVisibilityBinding(condition: string): Binding {
  return createViewBinding(condition, "#visible");
}

/**
 * Creates an enabled binding based on a Molang condition.
 *
 * @example
 * ```typescript
 * const enableWhenReady = createEnabledBinding("(#is_ready)");
 * ```
 */
export function createEnabledBinding(condition: string): Binding {
  return createViewBinding(condition, "#enabled");
}
