"use strict";
/**
 * Bedrock UI Generator - Binding Types
 *
 * Data bindings connect UI elements to game state and enable
 * dynamic content and conditional visibility.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#data-binding
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalBinding = createGlobalBinding;
exports.createViewBinding = createViewBinding;
exports.createCollectionBinding = createCollectionBinding;
exports.createVisibilityBinding = createVisibilityBinding;
exports.createEnabledBinding = createEnabledBinding;
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
function createGlobalBinding(bindingName, condition = "none") {
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
function createViewBinding(sourceExpression, targetProperty) {
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
function createCollectionBinding(bindingName, collectionName, override) {
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
function createVisibilityBinding(condition) {
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
function createEnabledBinding(condition) {
    return createViewBinding(condition, "#enabled");
}
//# sourceMappingURL=bindings.js.map