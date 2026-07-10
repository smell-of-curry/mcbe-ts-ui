"use strict";
/**
 * Bedrock UI Generator - Namespace Builder
 *
 * Provides a fluent API for building complete UI namespace files.
 * A namespace groups related UI elements together and is the root
 * structure for JSON UI files.
 *
 * @module builders/namespace
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceBuilder = void 0;
exports.namespace = namespace;
exports.ref = ref;
exports.extend = extend;
exports.extendExternal = extendExternal;
exports.extendRaw = extendRaw;
exports.fromBuilder = fromBuilder;
exports.nsRef = nsRef;
exports.animRef = animRef;
class NamespaceBuilder {
    /**
     * Creates a new namespace builder.
     *
     * @param namespace - The unique name for this namespace.
     *   Other files reference elements as "namespace.element_name".
     *
     * @example
     * ```typescript
     * const builder = new NamespaceBuilder("my_custom_ui");
     * ```
     */
    constructor(namespace, options = {}, elements = {}) {
        /** Internal storage for builders - keyed by full name (for JSON output) */
        this.builders = new Map();
        /** Raw element definitions added directly */
        this.rawElements = new Map();
        /** Animations added via builders */
        this.animations = new Map();
        /** Variable definitions with defaults ($name|default: value) */
        this.variables = new Map();
        this.namespaceName = namespace;
        this.filename = options.filename;
        this.subdir = options.subdir;
        this.elements = elements;
    }
    /**
     * Gets the namespace name.
     *
     * @returns The namespace name string.
     *
     * @example
     * ```typescript
     * const builder = new NamespaceBuilder("my_ui");
     * console.log(builder.getName()); // "my_ui"
     * ```
     */
    getName() {
        return this.namespaceName;
    }
    /**
     * Internal method called by ElementBuilder.addToNamespace().
     * Stores the builder for JSON generation.
     * @internal
     */
    _addInternal(builder) {
        this.builders.set(builder.getFullName(), builder);
    }
    /**
     * Adds an element to this namespace.
     *
     * Returns a tuple of [element, updatedNamespace] for both immediate use
     * and type-safe element tracking for cross-file imports.
     *
     * @example
     * ```typescript
     * let ns = new NamespaceBuilder("my_ui");
     * const [base, ns1] = ns.add(panel("base").size(100, 100));
     * const [derived, ns2] = ns1.add(panel("derived").extendsFrom(base));
     * // ns2.elements.base and ns2.elements.derived are typed
     * ```
     *
     * @param builder - The element builder to add.
     * @returns Tuple of [NamespaceElement, UpdatedNamespaceBuilder]
     */
    add(builder) {
        const nsElement = builder.addToNamespace(this);
        const name = builder.getName();
        const newElements = { ...this.elements, [name]: nsElement };
        // Return element and namespace with updated type (same instance, just retyped)
        this.elements =
            newElements;
        return [
            nsElement,
            this,
        ];
    }
    /**
     * Adds an element to this namespace and returns only the updated namespace.
     *
     * This is a convenience method for the common pattern where you add the final
     * "main" element and only need the namespace back (not the element reference).
     * Simplifies the syntax from:
     *
     * ```typescript
     * const [, finalNs] = ns.add(panel("main").fullSize().controls(...));
     * return finalNs;
     * ```
     *
     * To:
     *
     * ```typescript
     * return ns.setMain(panel("main").fullSize().controls(...));
     * ```
     *
     * @param builder - The element builder to add (typically the main/root element).
     * @returns The updated namespace builder with the element registered.
     *
     * @example
     * ```typescript
     * export default defineUI("my_ui", (ns) => {
     *   const [header, ns1] = ns.add(panel("header").size("100%", 50));
     *   const content = panel("content").fullSize().controls(header);
     *   return ns1.setMain(content);
     * });
     * ```
     */
    setMain(builder) {
        const [, updatedNs] = this.add(builder);
        return updatedNs;
    }
    /**
     * Adds an animation to this namespace.
     *
     * Animations are referenced by elements via `uv` or `anims` properties.
     *
     * @param anim - The animation builder to add.
     * @returns This builder for method chaining.
     *
     * @example Adding animations
     * ```typescript
     * namespace("my_ui")
     *   .addAnimation(
     *     animation("anim__fade_in")
     *       .alpha(0, 1)
     *       .duration(0.5)
     *   )
     *   .addAnimation(
     *     animation("anim__flip")
     *       .flipBook()
     *       .initialUV(0, 0)
     *       .frameCount(8)
     *       .fps(12)
     *       .frameStep(64)
     *   )
     *   .build();
     * ```
     */
    addAnimation(anim) {
        this.animations.set(anim.getName(), anim.build());
        return this;
    }
    /**
     * Adds multiple animations from builders to this namespace.
     *
     * @param anims - The animation builders to add.
     * @returns This builder for method chaining.
     */
    addAnimations(...anims) {
        for (const anim of anims) {
            this.addAnimation(anim);
        }
        return this;
    }
    /**
     * Adds a raw element definition directly to the namespace.
     *
     * Use this when you need to add element properties that aren't
     * supported by the builder API, or when copying existing JSON
     * definitions.
     *
     * @param name - The element name (can include `@base` for extension).
     * @param element - The raw element properties object.
     * @returns This builder for method chaining.
     *
     * @example Adding a raw element
     * ```typescript
     * namespace("my_ui")
     *   .addRaw("custom_element", {
     *     type: "panel",
     *     size: ["100%", "100%"],
     *     some_unsupported_property: "value"
     *   })
     *   .build();
     * ```
     *
     * @example Adding modifications to vanilla UI
     * ```typescript
     * namespace("hud")
     *   .addRaw("root_panel", {
     *     modifications: [{
     *       array_name: "controls",
     *       operation: "insert_back",
     *       value: [{ "my_hud@my_ns.hud": {} }]
     *     }]
     *   })
     *   .build();
     * ```
     */
    addRaw(name, element) {
        this.rawElements.set(name, element);
        return this;
    }
    /**
     * Adds a namespace-level variable definition with a default value.
     *
     * Variables defined this way can be overridden when elements extend
     * templates that use them. This is the cleanest way to define
     * reusable template variables.
     *
     * @param name - The variable name ($ prefix optional, will be added).
     * @param defaultValue - The default value for the variable.
     * @returns This builder for method chaining.
     *
     * @example Defining variables
     * ```typescript
     * namespace("my_template")
     *   .addVariable("button_color", [0.2, 0.4, 0.8])
     *   .addVariable("padding", 10)
     *   .addVariable("visible", true)
     *   .addVariable("text", "Default Text")
     *   .addRaw("button", {
     *     type: "panel",
     *     color: "$button_color",
     *     size: ["100%", "$padding"]
     *   })
     *   .build();
     * // Produces:
     * // {
     * //   "$button_color|default": [0.2, 0.4, 0.8],
     * //   "$padding|default": 10,
     * //   "$visible|default": true,
     * //   "$text|default": "Default Text",
     * //   "button": { type: "panel", ... }
     * // }
     * ```
     *
     * @example Using with element builder
     * ```typescript
     * namespace("my_ui")
     *   .addVariable("title_text", "Hello")
     *   .add(
     *     label("title")
     *       .text("$title_text")
     *       .color([1, 1, 1])
     *   )
     * ```
     */
    addVariable(name, defaultValue) {
        const varName = name.startsWith("$") ? name.slice(1) : name;
        this.variables.set(`$${varName}|default`, defaultValue);
        return this;
    }
    /**
     * Adds multiple namespace-level variable definitions at once.
     *
     * Convenience method for defining several variables in one call.
     *
     * @param vars - Object mapping variable names to default values.
     * @returns This builder for method chaining.
     *
     * @example
     * ```typescript
     * namespace("my_template")
     *   .addVariables({
     *     button_color: [0.2, 0.4, 0.8],
     *     padding: 10,
     *     visible: true,
     *     text: "Default Text"
     *   })
     *   .addRaw("button", { type: "panel" })
     *   .build();
     * ```
     */
    addVariables(vars) {
        for (const [name, value] of Object.entries(vars)) {
            this.addVariable(name, value);
        }
        return this;
    }
    /**
     * Adds a modification to an existing vanilla UI element.
     *
     * This is a convenience method for modifying vanilla UI elements
     * by their path (e.g., "root_panel", "hud_title_text/title_frame").
     *
     * @param elementPath - The path to the element to modify.
     *   Can use `/` to target nested elements.
     * @param modifications - The modifications to apply.
     * @returns This builder for method chaining.
     *
     * @example Modifying the HUD root panel
     * ```typescript
     * namespace("hud")
     *   .modify("root_panel", {
     *     modifications: [{
     *       array_name: "controls",
     *       operation: "insert_back",
     *       value: [{ "custom@my_ns.element": {} }]
     *     }]
     *   })
     *   .build();
     * ```
     *
     * @example Modifying a nested element
     * ```typescript
     * namespace("hud")
     *   .modify("hud_title_text/title_frame/title", {
     *     font_scale_factor: 0.5,
     *     anchor_from: "bottom_middle"
     *   })
     *   .build();
     * ```
     */
    modify(elementPath, modifications) {
        this.rawElements.set(elementPath, modifications);
        return this;
    }
    /**
     * Builds and returns the complete namespace object.
     *
     * The returned object can be serialized to JSON and written
     * to a `.json` file for use as a Bedrock UI definition.
     *
     * @returns The complete namespace object with all elements.
     *
     * @example
     * ```typescript
     * const ui = namespace("my_ui")
     *   .add(panel("main").fullSize())
     *   .build();
     *
     * // ui = {
     * //   namespace: "my_ui",
     * //   main: { type: "panel", size: ["100%", "100%"] }
     * // }
     * ```
     */
    build() {
        const result = {
            namespace: this.namespaceName,
        };
        // Add variables first (they're typically defined at the top)
        for (const [name, value] of this.variables) {
            result[name] = value;
        }
        // Add animations
        for (const [name, anim] of this.animations) {
            result[name] = anim;
        }
        // Add built elements
        for (const [fullName, builder] of this.builders) {
            result[fullName] = builder.build();
        }
        // Add raw elements
        for (const [name, element] of this.rawElements) {
            result[name] = element;
        }
        return result;
    }
    /**
     * Builds the namespace and returns it as a JSON string.
     *
     * @param pretty - Whether to format with indentation (default: true).
     * @returns The JSON string representation.
     *
     * @example Pretty-printed JSON
     * ```typescript
     * const json = namespace("my_ui")
     *   .add(panel("main").fullSize())
     *   .toJSON();
     * // Returns formatted JSON with 2-space indentation
     * ```
     *
     * @example Minified JSON
     * ```typescript
     * const json = namespace("my_ui")
     *   .add(panel("main").fullSize())
     *   .toJSON(false);
     * // Returns compact JSON without whitespace
     * ```
     */
    toJSON(pretty = true) {
        const obj = this.build();
        return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
    }
}
exports.NamespaceBuilder = NamespaceBuilder;
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Creates a new namespace builder.
 *
 * Factory function for creating NamespaceBuilder instances.
 * This is the recommended way to start building a namespace.
 *
 * @param name - The unique namespace name.
 * @returns A new NamespaceBuilder instance.
 *
 * @example
 * ```typescript
 * const ui = namespace("my_ui")
 *   .add(panel("main").fullSize())
 *   .build();
 * ```
 */
function namespace(name) {
    return new NamespaceBuilder(name);
}
/**
 * Creates a control reference for use in `controls` arrays.
 *
 * Control references specify child elements within a parent.
 * The name can include `@` syntax for element extension.
 *
 * @param name - The control name or reference (e.g., "my_panel" or "btn@common.button").
 * @param overrides - Optional property overrides for this instance.
 * @returns A control reference object for use in controls arrays.
 *
 * @example Simple reference
 * ```typescript
 * panel("parent")
 *   .controls(
 *     ref("child_panel"),
 *     ref("title_label")
 *   )
 * ```
 *
 * @example Reference with extension
 * ```typescript
 * panel("parent")
 *   .controls(
 *     ref("my_button@common.button"),
 *     ref("custom_label@hud.title_label")
 *   )
 * ```
 *
 * @example Reference with overrides
 * ```typescript
 * panel("parent")
 *   .controls(
 *     ref("child@template.panel", { size: [100, 50], alpha: 0.8 })
 *   )
 * ```
 */
function ref(name, overrides = {}) {
    return { [name]: overrides };
}
/**
 * Extends a registered namespace element from the SAME namespace.
 * with a different name that extends the original.
 *
 * Use this when you need to create multiple instances of a template
 * with different names but the same base.
 *
 * @param name - The new element name.
 * @param element - The registered namespace element to extend.
 * @returns A new builder of the same type but with the new name.
 *
 * @example
 * ```typescript
 * const baseButton = panel("button_base").size(100, 30).addToNamespace(ns);
 * const okButton = extend("ok_button", baseButton).addToNamespace(ns);
 * const cancelButton = extend("cancel_button", baseButton).addToNamespace(ns);
 * ```
 */
function extend(name, element) {
    return element.builder
        ._createForExtension(name)
        .extendsFrom(element);
}
/**
 * Extends a registered namespace element from ANOTHER namespace.
 *
 * Use this when extending elements across namespace boundaries.
 * Generates fully qualified references like "my_element@other_namespace.base_element".
 *
 * @param name - The new element name.
 * @param element - The registered namespace element to extend (from another namespace).
 * @returns A new builder of the same type but with the new name.
 *
 * @example
 * ```typescript
 * // In pokemon.ts
 * export default defineUI("pokemon", ns => { ... });
 *
 * // In serverForm.ts
 * import PokemonForm from "./pokemon";
 * const pokemonPanel = extendExternal("pokemon_form", PokemonForm.elements["main"]!);
 * // Generates: "pokemon_form@pokemon.main"
 * ```
 */
function extendExternal(name, element) {
    return element.builder
        ._createForExtension(name)
        .extendsExternallyFrom(element);
}
/**
 * Creates a control reference with explicit extension syntax.
 *
 * This is a more explicit alternative to including `@` in the ref name.
 * Useful when the base name is computed or comes from a variable.
 *
 * @param name - The name for this control instance.
 * @param base - The base element to extend (namespace.element format).
 * @param overrides - Optional property overrides for this instance.
 * @returns A control reference object with extension syntax.
 *
 * @example
 * ```typescript
 * panel("parent")
 *   .controls(
 *     extend("my_button", "common.button", { size: [100, 30] }),
 *     extend("custom_panel", "templates.base_panel")
 *   )
 * ```
 *
 * @example With dynamic base
 * ```typescript
 * const baseElement = isLarge ? "large_template" : "small_template";
 * panel("parent")
 *   .controls(
 *     extend("my_element", `templates.${baseElement}`)
 *   )
 * ```
 */
function extendRaw(name, base, overrides = {}) {
    return { [`${name}@${base}`]: overrides };
}
/**
 * Creates a control reference from an ElementBuilder.
 *
 * Converts a builder into a control reference, using the builder's
 * full name (including any extension). Useful when you've already
 * created a builder and want to reference it.
 *
 * @param builder - The element builder to create a reference from.
 * @param overrides - Optional property overrides for this instance.
 * @returns A control reference object.
 *
 * @example
 * ```typescript
 * const buttonBuilder = panel("my_button")
 *   .extends("common.button")
 *   .size(100, 30);
 *
 * panel("parent")
 *   .controls(
 *     fromBuilder(buttonBuilder),
 *     fromBuilder(buttonBuilder, { alpha: 0.5 }) // Second instance with override
 *   )
 * ```
 */
function fromBuilder(builder, overrides = {}) {
    return { [builder.getFullName()]: overrides };
}
/**
 * Creates a fully-qualified element reference string.
 *
 * Returns a string in "namespace.element" format for referencing
 * elements across namespaces in bindings, extensions, etc.
 *
 * @param namespace - The namespace name.
 * @param element - The element name within that namespace.
 * @returns The fully-qualified reference string.
 *
 * @example
 * ```typescript
 * const commonButton = nsRef("common", "button");
 * // Returns: "common.button"
 *
 * panel("my_button")
 *   .extends(nsRef("common", "light_text_button"))
 * ```
 *
 * @example Dynamic namespace reference
 * ```typescript
 * const ns = "my_templates";
 * const basePanel = nsRef(ns, "base_panel");
 * // Returns: "my_templates.base_panel"
 * ```
 */
function nsRef(namespace, element) {
    return `${namespace}.${element}`;
}
/**
 * Creates an animation reference string.
 *
 * Returns a string in "@namespace.animation_name" format for referencing
 * animations in the `anims` or `uv` properties.
 *
 * @param namespace - The namespace name.
 * @param animationName - The animation name within that namespace.
 * @returns The animation reference string.
 *
 * @example
 * ```typescript
 * const fadeAnim = animRef("my_ui", "anim__fade_in");
 * // Returns: "@my_ui.anim__fade_in"
 *
 * image("my_image")
 *   .rawProp("anims", [animRef("my_ui", "anim__fade_in")])
 * ```
 */
function animRef(namespace, animationName) {
    return `@${namespace}.${animationName}`;
}
//# sourceMappingURL=namespace.js.map