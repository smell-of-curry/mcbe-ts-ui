/**
 * Binding Helper Functions
 *
 * Utility functions for creating common binding patterns in Bedrock UI.
 * These helpers reduce boilerplate and ensure type safety.
 *
 * @module helpers/bindings
 */

import type { Binding, BindingType, BindingCondition } from "../types";

// ============================================================================
// Collection Binding Helpers
// ============================================================================

/**
 * Creates a collection binding for reading from a data collection.
 *
 * Collection bindings are used in grids and factory elements to
 * read properties from items in collections like "form_buttons",
 * "hotbar_items", or "inventory_items".
 *
 * @param bindingName - The property to read from the collection (e.g., "#form_button_text")
 * @param collectionName - The collection name (default: "form_buttons")
 * @param override - Optional override for the target property name
 * @returns A properly typed binding object
 *
 * @example Basic collection binding
 * ```typescript
 * collectionBinding("#form_button_text")
 * // { binding_name: "#form_button_text", binding_type: "collection", binding_collection_name: "form_buttons" }
 * ```
 *
 * @example With override
 * ```typescript
 * collectionBinding("#form_button_texture", "form_buttons", "#texture")
 * // { binding_name: "#form_button_texture", binding_name_override: "#texture", ... }
 * ```
 */
export function collectionBinding(
  bindingName: string,
  collectionName: string = "form_buttons",
  override?: string
): Binding {
  return {
    binding_name: bindingName,
    binding_name_override: override ?? bindingName,
    binding_type: "collection" as BindingType,
    binding_collection_name: collectionName,
  };
}

/**
 * Creates a collection details binding.
 *
 * Collection details bindings provide metadata about the current
 * collection item, such as its index.
 *
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns A collection details binding
 */
export function collectionDetailsBinding(
  collectionName: string = "form_buttons"
): Binding {
  return {
    binding_name: "#null",
    binding_type: "collection_details" as BindingType,
    binding_collection_name: collectionName,
  };
}

/**
 * Creates a collection binding with condition none.
 *
 * Used when you need to ensure the binding is always evaluated.
 *
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns A collection binding with condition none
 */
export function collectionBindingNone(
  collectionName: string = "form_buttons"
): Binding {
  return {
    binding_name: "#null",
    binding_type: "collection" as BindingType,
    binding_condition: "none" as BindingCondition,
    binding_collection_name: collectionName,
  };
}

// ============================================================================
// View Binding Helpers
// ============================================================================

/**
 * Creates a view binding that computes a property from a Molang expression.
 *
 * View bindings evaluate expressions and write the result to a target property.
 * Common targets include "#visible", "#enabled", "#text", and "#texture".
 *
 * @param sourceExpression - Molang expression to evaluate
 * @param targetProperty - Property to write the result to
 * @param sourceControl - Optional control to read source properties from
 * @returns A view binding object
 *
 * @example Visibility binding
 * ```typescript
 * viewBinding("(#health > 0)", "#visible")
 * ```
 *
 * @example Text binding
 * ```typescript
 * viewBinding("('HP: ' + #health)", "#text")
 * ```
 *
 * @example Cross-control binding
 * ```typescript
 * viewBinding("#texture", "#visible", "sibling_element")
 * ```
 */
export function viewBinding(
  sourceExpression: string,
  targetProperty: string,
  sourceControl?: string
): Binding {
  const binding: Binding = {
    binding_name: "#null",
    binding_type: "view" as BindingType,
    source_property_name: sourceExpression,
    target_property_name: targetProperty,
  };
  if (sourceControl) {
    binding.source_control_name = sourceControl;
  }
  return binding;
}

/**
 * Creates a view binding that reads from a sibling control.
 *
 * This pattern is used when you need to read properties from another control
 * at the same level in the hierarchy.
 *
 * @param sourceControl - The sibling control name to read from
 * @param sourceExpression - Expression to evaluate using sibling's properties
 * @param targetProperty - Property to write the result to
 * @returns A view binding with resolve_sibling_scope enabled
 *
 * @example Check if sibling image has texture
 * ```typescript
 * siblingViewBinding("image", "(not (#texture = ''))", "#visible")
 * ```
 */
export function siblingViewBinding(
  sourceControl: string,
  sourceExpression: string,
  targetProperty: string
): Binding {
  return {
    binding_name: "#null",
    binding_type: "view" as BindingType,
    source_control_name: sourceControl,
    resolve_sibling_scope: true,
    source_property_name: sourceExpression,
    target_property_name: targetProperty,
  };
}

/**
 * Creates a view binding that reads from a named source control.
 *
 * This pattern is commonly used in PHUD elements to read parsed data
 * from a central "elements" control that provides binding data.
 *
 * @param sourceControl - The control name to read from (e.g., "elements")
 * @param sourceProperty - The property to read (e.g., "#sidebar")
 * @param targetProperty - The property to write to (e.g., "#string")
 * @returns A view binding that reads from the named control
 *
 * @example Read sidebar data from elements control
 * ```typescript
 * sourceControlBinding("elements", "#sidebar", "#string")
 * // { binding_name: "#null", binding_type: "view", source_control_name: "elements", ... }
 * ```
 */
export function sourceControlBinding(
  sourceControl: string,
  sourceProperty: string,
  targetProperty: string
): Binding {
  return {
    binding_name: "#null",
    binding_type: "view" as BindingType,
    source_control_name: sourceControl,
    source_property_name: sourceProperty,
    target_property_name: targetProperty,
  };
}

/**
 * Creates a set of bindings for a variable parser element.
 *
 * This is a common pattern in PHUD for parsing string data from
 * a source control using indexed variable positions.
 *
 * @param sourceControl - The control to read from (default: "elements")
 * @param sourceProperty - The property containing the string data (default: "#sidebar")
 * @returns Array of bindings for string parsing, variable extraction, and visibility
 *
 * @example Standard variable parser bindings
 * ```typescript
 * panel("my_parser")
 *   .variableDefault("visible", "true")
 *   .bindings(...variableParserBindings())
 * ```
 */
export function variableParserBindings(
  sourceControl: string = "elements",
  sourceProperty: string = "#sidebar"
): Binding[] {
  return [
    sourceControlBinding(sourceControl, sourceProperty, "#string"),
    viewBinding("$string_parser", "#var"),
    viewBinding("$visible", "#visible"),
  ];
}

/**
 * Creates bindings for an element that reads a parsed variable and uses it as texture.
 *
 * @param sourceControl - The control to read from (default: "elements")
 * @param sourceProperty - The property containing the string data (default: "#sidebar")
 * @param textureBasePath - Base path for texture (e.g., "textures/ui/icons/")
 * @param varName - The variable name to store parsed value (default: "#texture_var")
 * @returns Array of bindings for texture parsing
 */
export function textureParserBindings(
  sourceControl: string,
  sourceProperty: string,
  textureBasePath: string,
  varName: string = "#texture_var"
): Binding[] {
  return [
    sourceControlBinding(sourceControl, sourceProperty, "#string"),
    viewBinding("$string_parser", varName),
    viewBinding(`('${textureBasePath}' + ${varName})`, "#texture"),
  ];
}

/**
 * Creates a visibility binding from a condition expression.
 *
 * @param condition - Molang expression that evaluates to true/false
 * @returns A view binding targeting "#visible"
 *
 * @example
 * ```typescript
 * visibilityBinding("(#is_active)")
 * visibilityBinding("(not (#text = ''))")
 * ```
 */
export function visibilityBinding(condition: string): Binding {
  return viewBinding(condition, "#visible");
}

/**
 * Creates an enabled binding from a condition expression.
 *
 * @param condition - Molang expression that evaluates to true/false
 * @returns A view binding targeting "#enabled"
 */
export function enabledBinding(condition: string): Binding {
  return viewBinding(condition, "#enabled");
}

/**
 * Creates a text binding from an expression.
 *
 * @param expression - Molang expression that produces text
 * @returns A view binding targeting "#text"
 */
export function textBinding(expression: string): Binding {
  return viewBinding(expression, "#text");
}

/**
 * Creates a texture binding from an expression.
 *
 * @param expression - Molang expression that produces a texture path
 * @returns A view binding targeting "#texture"
 */
export function textureBinding(expression: string): Binding {
  return viewBinding(expression, "#texture");
}

// ============================================================================
// Global Binding Helpers
// ============================================================================

/**
 * Creates a global binding that passes through a value.
 *
 * Global bindings read from hardcoded game properties like
 * "#title_text", "#form_text", "#player_health", etc.
 *
 * @param bindingName - The global binding name (starts with #)
 * @param override - Optional override for target property (defaults to bindingName)
 * @param condition - When to evaluate (default: "none")
 * @returns A global binding object
 *
 * @example
 * ```typescript
 * globalBinding("#title_text")
 * globalBinding("#form_text", "#text")
 * ```
 */
export function globalBinding(
  bindingName: string,
  override?: string,
  condition: BindingCondition = "none"
): Binding {
  return {
    binding_type: "global" as BindingType,
    binding_name: bindingName,
    binding_name_override: override ?? bindingName,
    binding_condition: condition,
  };
}

/**
 * Creates a global binding for #title_text.
 *
 * Shorthand for the common pattern of binding to the form title.
 *
 * @returns A global binding for #title_text
 */
export function titleTextBinding(): Binding {
  return globalBinding("#title_text");
}

/**
 * Creates a global binding for #hud_title_text_string.
 *
 * @returns A global binding for HUD title text
 */
export function hudTitleBinding(): Binding {
  return {
    binding_name: "#hud_title_text_string",
  };
}

/**
 * Creates a preserved text binding for HUD title updates.
 *
 * @returns A binding that preserves text on visibility change
 */
export function preservedTextBinding(): Binding {
  return {
    binding_name: "#hud_title_text_string",
    binding_name_override: "#preserved_text",
    binding_condition: "visibility_changed" as BindingCondition,
  };
}

// ============================================================================
// Factory Binding Helpers
// ============================================================================

/**
 * Creates a factory collection length binding.
 *
 * Used in factory and grid elements to set the number of items
 * based on a collection's length.
 *
 * @param collectionLengthBinding - The binding that provides collection length (default: "#form_button_length")
 * @returns A binding for collection length
 */
export function factoryLengthBinding(
  collectionLengthBinding: string = "#form_button_length"
): Binding {
  return {
    binding_name: collectionLengthBinding,
    binding_name_override: "#collection_length",
  };
}

// ============================================================================
// Visibility Pattern Helpers
// ============================================================================

/**
 * Creates a set of bindings for visibility based on a control name lookup.
 *
 * This pattern is used when visibility depends on reading a property
 * from a sibling control (usually for conditional displays).
 *
 * @param controlName - The sibling control to read from
 * @param sourceProperty - The property to read
 * @param targetProperty - The property to write to (default: "#visible")
 * @returns Array of bindings
 */
export function siblingVisibilityBindings(
  controlName: string,
  sourceProperty: string,
  targetProperty: string = "#visible"
): Binding[] {
  return [siblingViewBinding(controlName, sourceProperty, targetProperty)];
}

// ============================================================================
// Combined Pattern Helpers
// ============================================================================

/**
 * Creates bindings for form button visibility based on a flag check.
 *
 * Common pattern for server forms where buttons are filtered by
 * checking if their text contains a specific flag string.
 *
 * @param flagExpression - Expression that checks for the flag (e.g., contains check)
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns Array of bindings for collection + visibility
 */
export function buttonVisibilityBindings(
  flagExpression: string,
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionBinding("#form_button_text", collectionName),
    visibilityBinding(flagExpression),
  ];
}

/**
 * Creates bindings for an element that shows based on title text containing a flag.
 *
 * @param flagExpression - Expression to check (e.g., "(not ((#title_text - 'flag') = #title_text))")
 * @returns Array of bindings for global title + visibility + enabled
 */
export function titleFlagBindings(flagExpression: string): Binding[] {
  return [
    globalBinding("#title_text"),
    visibilityBinding(flagExpression),
    enabledBinding(flagExpression),
  ];
}

/**
 * Creates bindings for image texture from a collection (basic).
 *
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns Array of bindings for texture and texture_file_system
 */
export function basicTextureBindings(
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionBinding("#form_button_texture", collectionName, "#texture"),
    collectionBinding(
      "#form_button_texture_file_system",
      collectionName,
      "#texture_file_system"
    ),
  ];
}

/**
 * Creates bindings for image texture visibility (not empty/loading).
 *
 * @returns A view binding that checks texture is valid
 */
export function textureVisibilityBinding(): Binding {
  return visibilityBinding("(not ((#texture = '') or (#texture = 'loading')))");
}

/**
 * Creates the full set of bindings for displaying an image texture.
 *
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns Array of bindings for texture + file system + visibility
 */
export function fullTextureBindings(
  collectionName: string = "form_buttons"
): Binding[] {
  return [...basicTextureBindings(collectionName), textureVisibilityBinding()];
}

/**
 * Creates bindings for button enabled state based on text prefix.
 *
 * @param enabledExpression - Expression for enabled state
 * @param collectionName - The collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export function buttonEnabledBindings(
  enabledExpression: string,
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionDetailsBinding(collectionName),
    collectionBindingNone(collectionName),
    collectionBinding("#form_button_text", collectionName),
    enabledBinding(enabledExpression),
  ];
}
