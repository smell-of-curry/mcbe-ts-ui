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
export declare function phudVisibility(propertyName: string): Binding[];
/**
 * Creates a binding that reads from the "elements" control.
 *
 * @param sourceProperty - The source property on elements
 * @param targetProperty - The target property on this element
 * @param transform - Optional transformation expression (use ${prop} placeholder)
 * @returns A single binding object
 */
export declare function phudRead(sourceProperty: string, targetProperty: string, transform?: string): Binding;
/**
 * Creates a binding to read #phone from the elements control.
 *
 * @param targetProperty - Target property (default: "#value")
 * @returns Binding for phone value
 */
export declare function phudPhoneBinding(targetProperty?: string): Binding;
/**
 * Creates conditional visibility and enabled bindings from a $condition variable.
 *
 * @returns Array of visibility and enabled bindings using $condition
 */
export declare function conditionalBindings(): Binding[];
/**
 * Creates phone element bindings (value read + conditional visibility).
 *
 * @returns Array of bindings for phone conditional elements
 */
export declare function phudPhoneConditionalBindings(): Binding[];
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
export declare function phudText<N extends string>(labelBuilder: BoundLabelBuilder<N>, propertyName: N): BoundLabelBuilder<N>;
/**
 * Creates a binding for HUD subtitle text.
 *
 * @returns A global binding for subtitle text
 */
export declare function hudSubtitleBinding(): Binding;
/**
 * Creates visibility bindings for server forms based on title flags.
 *
 * @param flag - The flag string to check for in title text
 * @returns Array of bindings
 */
export declare function formVisibility(flag: string): Binding[];
/**
 * Creates a form text binding.
 *
 * @param targetProperty - The target property (default: "#form_text")
 * @returns A global binding for form text
 */
export declare function formRead(targetProperty?: string): Binding;
/**
 * Creates bindings for form button collection items.
 *
 * @param textExpr - Expression for text transformation
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for button text
 */
export declare function formButtonBindings(textExpr?: string, collectionName?: string): Binding[];
/**
 * Creates factory bindings for button collections.
 *
 * Standard pattern for stack panels that generate buttons from a collection.
 *
 * @returns Binding for collection length
 */
export declare function factoryBindings(): Binding[];
/**
 * Creates visibility bindings for buttons based on text flags.
 *
 * @param flag - The flag to check for in button text
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export declare function buttonFlagVisibility(flag: string, collectionName?: string): Binding[];
/**
 * Creates standard button bindings with collection details.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export declare function standardButtonBindings(collectionName?: string): Binding[];
/**
 * Creates button enabled binding based on prefix check.
 *
 * @param enabledExpression - Expression for enabled state
 * @returns Enabled binding
 */
export declare function buttonEnabledBinding(enabledExpression: string): Binding;
/**
 * Creates full button bindings with visibility and enabled based on text.
 *
 * @param visibleExpression - Expression for visibility
 * @param enabledExpression - Expression for enabled state
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export declare function fullButtonBindings(visibleExpression: string, enabledExpression: string, collectionName?: string): Binding[];
/**
 * Creates visibility bindings for chest UI types based on title flags.
 *
 * @param flag - The flag string identifying the chest type
 * @returns Array of bindings
 */
export declare function chestVisibility(flag: string): Binding[];
/**
 * Options for {@link itemTextureBindings}.
 */
export interface ItemTextureBindingsOptions {
    /**
     * When true, strip a trailing `]` from `#form_button_texture` before
     * coercing to `#item_id_aux` (chest form aux payloads).
     *
     * @default false
     */
    stripBracketSuffix?: boolean;
}
/**
 * Standard texture bindings for item renderers in forms.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @param options - Optional aux-expression tweaks
 * @returns Array of bindings for texture loading
 */
export declare function itemTextureBindings(collectionName?: string, options?: ItemTextureBindingsOptions): Binding[];
/**
 * Bindings for custom texture icons (path starts with `textures`).
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for non-item-renderer images
 */
export declare function nonRendererItemBindings(collectionName?: string): Binding[];
/**
 * Collection + visibility when `#form_button_text` starts with a prefix.
 *
 * @param prefix - Prefix to match (e.g. `"cht:"`, `"inv:"`)
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export declare function formButtonPrefixVisibility(prefix: string, collectionName?: string): Binding[];
/**
 * Hover-text renderer bindings that strip a fixed prefix length.
 *
 * @param stripLen - Characters to strip from the start of `#form_button_text`
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings writing `#hover_text`
 */
export declare function hoverTextBindings(stripLen?: number, collectionName?: string): Binding[];
/**
 * Creates texture bindings for image display from collection.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
export declare function imageTextureBindings(collectionName?: string): Binding[];
/**
 * Creates bindings for checking if image texture is present from sibling.
 *
 * @returns Binding for sibling image visibility check
 */
export declare function siblingImageVisibilityBinding(): Binding;
//# sourceMappingURL=ui-patterns.d.ts.map