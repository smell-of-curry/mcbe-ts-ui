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

import type { UIElement, UINamespace, ControlReference } from "../types";
import type { ElementBuilder } from "./element";

// ============================================================================
// Namespace Builder
// ============================================================================

/**
 * Builder class for creating UI namespace files.
 *
 * A namespace is the root container for UI elements in a JSON UI file.
 * Each namespace has a unique name and contains named element definitions
 * that can reference each other or elements from other namespaces.
 *
 * @example Basic usage
 * ```typescript
 * const ns = new NamespaceBuilder("my_ui")
 *   .add(panel("main").fullSize())
 *   .add(label("title").text("Hello"));
 *
 * const json = ns.toJSON();
 * ```
 *
 * @example Using the factory function
 * ```typescript
 * const ui = namespace("my_ui")
 *   .add(panel("main").fullSize())
 *   .build();
 * ```
 */
export class NamespaceBuilder {
  /** The namespace name used for element references */
  private namespaceName: string;

  /** Elements added via builders */
  private elements: Map<string, Record<string, unknown>> = new Map();

  /** Raw element definitions added directly */
  private rawElements: Map<string, Record<string, unknown>> = new Map();

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
  constructor(namespace: string) {
    this.namespaceName = namespace;
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
  getName(): string {
    return this.namespaceName;
  }

  /**
   * Adds an element from an ElementBuilder to this namespace.
   *
   * The element will be added using its full name (including any
   * extension reference from the `@` syntax).
   *
   * @param builder - The element builder to add.
   * @returns This builder for method chaining.
   *
   * @example Adding a simple panel
   * ```typescript
   * namespace("my_ui")
   *   .add(panel("main_panel").fullSize())
   *   .add(label("title").text("Hello"))
   *   .build();
   * ```
   *
   * @example Adding an element that extends another
   * ```typescript
   * namespace("my_ui")
   *   .add(
   *     panel("my_button")
   *       .extends("common.button")
   *       .size(100, 30)
   *   )
   *   .build();
   * ```
   */
  add(builder: ElementBuilder): this {
    const fullName = builder.getFullName();
    this.elements.set(fullName, builder.build() as Record<string, unknown>);
    return this;
  }

  /**
   * Adds multiple elements from builders to this namespace.
   *
   * Convenience method for adding several elements at once.
   *
   * @param builders - The element builders to add.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * const mainPanel = panel("main").fullSize();
   * const titleLabel = label("title").text("Hello");
   * const contentPanel = panel("content").size("100%", "fill");
   *
   * namespace("my_ui")
   *   .addAll(mainPanel, titleLabel, contentPanel)
   *   .build();
   * ```
   */
  addAll(...builders: ElementBuilder[]): this {
    for (const builder of builders) {
      this.add(builder);
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
  addRaw(
    name: string,
    element: Partial<UIElement> | Record<string, unknown>
  ): this {
    this.rawElements.set(name, element);
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
  modify(
    elementPath: string,
    modifications: Partial<UIElement> | Record<string, unknown>
  ): this {
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
  build(): UINamespace {
    const result: UINamespace = {
      namespace: this.namespaceName,
    };

    // Add built elements
    for (const [name, element] of this.elements) {
      result[name] = element;
    }

    // Add raw elements
    for (const [name, element] of this.rawElements) {
      result[name] = element as UIElement;
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
  toJSON(pretty: boolean = true): string {
    const obj = this.build();
    return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
  }
}

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
export function namespace(name: string): NamespaceBuilder {
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
export function ref(
  name: string,
  overrides: Partial<UIElement> = {}
): ControlReference {
  return { [name]: overrides };
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
export function extend(
  name: string,
  base: string,
  overrides: Partial<UIElement> = {}
): ControlReference {
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
export function fromBuilder(
  builder: ElementBuilder,
  overrides: Partial<UIElement> = {}
): ControlReference {
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
export function nsRef(namespace: string, element: string): string {
  return `${namespace}.${element}`;
}
