/**
 * Common UI Pattern Helpers
 *
 * Pre-built binding patterns for common Bedrock UI scenarios.
 * These patterns encapsulate complex binding logic into simple functions.
 *
 * @module helpers/ui-patterns
 */

import type { Binding } from "../types";
import type { BoundLabelBuilder } from "../builders/element";
import {
  collectionBinding,
  collectionDetailsBinding,
  viewBinding,
  globalBinding,
  visibilityBinding,
  enabledBinding,
  siblingViewBinding,
  collectionBindingNone,
} from "./bindings";
import { notEmpty, contains, strip } from "./expressions";

// ============================================================================
// PHUD (Pokemon HUD) Pattern Helpers
// ============================================================================

/**
 * Creates standard PHUD visibility bindings.
 *
 * This pattern:
 * 1. Fetches a property value from the "elements" sibling control
 * 2. Shows the element only when the property is not empty
 * 3. Enables the element only when the property is not empty
 *
 * @param propertyName - The property name to bind (e.g., "#fake_actionbar")
 * @returns Array of bindings for visibility control
 *
 * @example
 * ```typescript
 * panel("main")
 *   .bindings(...phudVisibility("#fake_actionbar"))
 * ```
 */
export function phudVisibility(propertyName: string): Binding[] {
  const visibilityExpr = notEmpty(propertyName);
  return [
    {
      binding_name: "#null",
      binding_type: "view",
      source_control_name: "elements",
      source_property_name: propertyName,
      target_property_name: propertyName,
    },
    viewBinding(visibilityExpr, "#visible"),
    viewBinding(visibilityExpr, "#enabled"),
  ];
}

/**
 * Creates a binding that reads from the "elements" control.
 *
 * @param sourceProperty - The source property on elements
 * @param targetProperty - The target property on this element
 * @param transform - Optional transformation expression (use ${prop} placeholder)
 * @returns A single binding object
 */
export function phudRead(
  sourceProperty: string,
  targetProperty: string,
  transform?: string
): Binding {
  const sourceExpr = transform
    ? transform.replace(/\$\{prop\}/g, sourceProperty)
    : sourceProperty;

  return {
    binding_name: "#null",
    binding_type: "view",
    source_control_name: "elements",
    source_property_name: sourceExpr,
    target_property_name: targetProperty,
  };
}

/**
 * Creates a binding to read #phone from the elements control.
 *
 * @param targetProperty - Target property (default: "#value")
 * @returns Binding for phone value
 */
export function phudPhoneBinding(targetProperty: string = "#value"): Binding {
  return {
    binding_name: "#null",
    binding_type: "view",
    source_control_name: "elements",
    source_property_name: "#phone",
    target_property_name: targetProperty,
  };
}

/**
 * Creates conditional visibility and enabled bindings from a $condition variable.
 *
 * @returns Array of visibility and enabled bindings using $condition
 */
export function conditionalBindings(): Binding[] {
  return [
    viewBinding("$condition", "#visible"),
    viewBinding("$condition", "#enabled"),
  ];
}

/**
 * Creates phone element bindings (value read + conditional visibility).
 *
 * @returns Array of bindings for phone conditional elements
 */
export function phudPhoneConditionalBindings(): Binding[] {
  return [phudPhoneBinding("#value"), ...conditionalBindings()];
}

/**
 * Configures a label to display PHUD text from a binding property.
 *
 * This is a shorthand that:
 * 1. Sets `.text("#text")` to use the bound value
 * 2. Adds the binding to fetch and strip underscore from the property
 *
 * @param labelBuilder - The label builder to configure
 * @param propertyName - The PHUD property to bind (e.g., "#fake_actionbar")
 * @returns The label builder for chaining
 *
 * @example
 * ```typescript
 * phudText(
 *   label("display"),
 *   "#player_ping_text"
 * )
 * ```
 */
export function phudText<N extends string>(
  labelBuilder: BoundLabelBuilder<N>,
  propertyName: N
): BoundLabelBuilder<N> {
  return labelBuilder.bindings(
    phudRead(propertyName, labelBuilder.bindingName, strip("${prop}"))
  );
}

/**
 * Creates a binding for HUD subtitle text.
 *
 * @returns A global binding for subtitle text
 */
export function hudSubtitleBinding(): Binding {
  return {
    binding_name: "#hud_subtitle_text_string",
    binding_name_override: "#text",
    binding_type: "global",
  };
}

// ============================================================================
// Form Pattern Helpers
// ============================================================================

/**
 * Creates visibility bindings for server forms based on title flags.
 *
 * @param flag - The flag string to check for in title text
 * @returns Array of bindings
 */
export function formVisibility(flag: string): Binding[] {
  const flagExpr = contains("#title_text", flag);
  return [
    globalBinding("#title_text"),
    viewBinding(flagExpr, "#visible"),
    viewBinding(flagExpr, "#enabled"),
  ];
}

/**
 * Creates a form text binding.
 *
 * @param targetProperty - The target property (default: "#form_text")
 * @returns A global binding for form text
 */
export function formRead(targetProperty: string = "#form_text"): Binding {
  return globalBinding("#form_text", targetProperty);
}

/**
 * Creates bindings for form button collection items.
 *
 * @param textExpr - Expression for text transformation
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for button text
 */
export function formButtonBindings(
  textExpr?: string,
  collectionName: string = "form_buttons"
): Binding[] {
  const bindings: Binding[] = [
    collectionDetailsBinding(collectionName),
    collectionBinding("#form_button_text", collectionName),
  ];

  if (textExpr) {
    bindings.push(viewBinding(textExpr, "#text"));
  }

  return bindings;
}

// ============================================================================
// Button Factory Pattern Helpers
// ============================================================================

/**
 * Creates factory bindings for button collections.
 *
 * Standard pattern for stack panels that generate buttons from a collection.
 *
 * @returns Binding for collection length
 */
export function factoryBindings(): Binding[] {
  return [
    {
      binding_name: "#form_button_length",
      binding_name_override: "#collection_length",
    },
  ];
}

/**
 * Creates visibility bindings for buttons based on text flags.
 *
 * @param flag - The flag to check for in button text
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export function buttonFlagVisibility(
  flag: string,
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionBinding("#form_button_text", collectionName),
    viewBinding(contains("#form_button_text", flag), "#visible"),
  ];
}

/**
 * Creates standard button bindings with collection details.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export function standardButtonBindings(
  collectionName: string = "form_buttons"
): Binding[] {
  return [collectionDetailsBinding(collectionName)];
}

/**
 * Creates button enabled binding based on prefix check.
 *
 * @param enabledExpression - Expression for enabled state
 * @returns Enabled binding
 */
export function buttonEnabledBinding(enabledExpression: string): Binding {
  return enabledBinding(enabledExpression);
}

/**
 * Creates full button bindings with visibility and enabled based on text.
 *
 * @param visibleExpression - Expression for visibility
 * @param enabledExpression - Expression for enabled state
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export function fullButtonBindings(
  visibleExpression: string,
  enabledExpression: string,
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionDetailsBinding(collectionName),
    collectionBindingNone(collectionName),
    collectionBinding("#form_button_text", collectionName),
    visibilityBinding(visibleExpression),
    enabledBinding(enabledExpression),
  ];
}

// ============================================================================
// Chest UI Pattern Helpers
// ============================================================================

/**
 * Creates visibility bindings for chest UI types based on title flags.
 *
 * @param flag - The flag string identifying the chest type
 * @returns Array of bindings
 */
export function chestVisibility(flag: string): Binding[] {
  return [
    { binding_name: "#title_text" },
    viewBinding(contains("#title_text", flag), "#visible"),
  ];
}

// ============================================================================
// Item Renderer Pattern Helpers
// ============================================================================

/**
 * Standard texture bindings for item renderers in forms.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for texture loading
 */
export function itemTextureBindings(
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionBinding("#form_button_texture", collectionName),
    viewBinding(
      "(not (('%.8s' * #form_button_texture) = 'textures'))",
      "#visible"
    ),
    viewBinding(
      "(not ((#form_button_texture = '') or (#form_button_texture = 'loading')))",
      "#visible"
    ),
    viewBinding("(#form_button_texture * 1)", "#item_id_aux"),
  ];
}

/**
 * Creates texture bindings for image display from collection.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export function imageTextureBindings(
  collectionName: string = "form_buttons"
): Binding[] {
  return [
    collectionBinding("#form_button_texture", collectionName, "#texture"),
    collectionBinding(
      "#form_button_texture_file_system",
      collectionName,
      "#texture_file_system"
    ),
    viewBinding(
      "(not ((#texture = '') or (#texture = 'loading')))",
      "#visible"
    ),
  ];
}

/**
 * Creates bindings for checking if image texture is present from sibling.
 *
 * @returns Binding for sibling image visibility check
 */
export function siblingImageVisibilityBinding(): Binding {
  return siblingViewBinding("image", "(not (#texture = ''))", "#visible");
}

// Note: variableParserBindings is now exported from "./bindings"
