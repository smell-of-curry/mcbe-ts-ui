/**
 * Bedrock UI Generator - Element Builder
 *
 * Provides a fluent API for building UI elements with type-safe methods.
 * Each builder method returns `this` for method chaining, allowing
 * concise element definitions.
 *
 * @module builders/element
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */

import type {
  ElementType,
  SizeValue,
  OffsetValue,
  Anchor,
  Orientation,
  Color,
  Binding,
  BindingCondition,
  ButtonMapping,
  Modification,
  ControlReference,
  UIElement,
  BaseUIProperties,
  TextAlignment,
  FontType,
  ClipDirection,
  NinesliceInfo,
  CustomRenderer,
  ColorWithAlpha,
} from "../types";
import type { INamespaceBuilder } from "./namespace";
// ============================================================================
// Helper type for setting properties via bracket notation
// ============================================================================

/** Internal type for property access */
type AnyProps = Record<string, unknown>;

// ============================================================================
// Namespace Element Wrapper
// ============================================================================

/**
 * Represents an element that has been registered to a namespace.
 *
 * This wrapper provides type-safe extension references. Elements MUST
 * be added to a namespace before they can be extended by other elements.
 * This ensures compile-time safety for element references.
 *
 * @typeParam TBuilder - The specific ElementBuilder type being wrapped.
 *
 * @example Adding and extending elements
 * ```typescript
 * const basePanel = panel("base").size(100, 100).addToNamespace(ns);
 * const derived = panel("derived").extendsFrom(basePanel);
 * derived.addToNamespace(ns);
 * ```
 */
export class NamespaceElement<
  TBuilder extends ElementBuilder<string> = ElementBuilder<string>,
> {
  /**
   * Creates a new NamespaceElement wrapper.
   *
   * @param builder - The element builder being wrapped.
   * @param namespaceName - The namespace this element belongs to.
   * @internal Use `builder.addToNamespace(ns)` instead of calling directly.
   */
  constructor(
    public readonly builder: TBuilder,
    public readonly namespaceName: string
  ) {}

  /**
   * Gets the element's base name (without namespace).
   *
   * @returns The element name.
   *
   * @example
   * ```typescript
   * const element = panel("my_panel").addToNamespace(ns);
   * element.getName(); // "my_panel"
   * ```
   */
  getName(): string {
    return this.builder.getName();
  }

  /**
   * Gets the element's full name including any extension reference.
   *
   * @returns The full name (e.g., "my_panel@base_panel").
   */
  getFullName(): string {
    return this.builder.getFullName();
  }

  /**
   * Gets the fully qualified reference for this element.
   *
   * This is used when extending from another namespace.
   *
   * @returns The qualified name (e.g., "my_namespace.my_panel").
   *
   * @example
   * ```typescript
   * const element = panel("my_panel").addToNamespace(ns);
   * element.getQualifiedName(); // "my_namespace.my_panel"
   * ```
   */
  getQualifiedName(): string {
    return `${this.namespaceName}.${this.builder.getName()}`;
  }

  /**
   * Access the underlying builder's properties.
   * Use this when you need to read builder configuration.
   */
  getBuilder(): TBuilder {
    return this.builder;
  }
}

// ============================================================================
// Base Element Builder
// ============================================================================

/**
 * Base builder class for creating UI elements.
 *
 * Provides common functionality for all element types including
 * layout, positioning, bindings, and state management. Specialized
 * builders extend this class to add type-specific properties.
 *
 * @typeParam T - The specific UI properties type (defaults to BaseUIProperties).
 *
 * @example Basic panel
 * ```typescript
 * const panel = new ElementBuilder("my_panel", "panel")
 *   .size(100, 50)
 *   .anchor("center")
 *   .build();
 * ```
 *
 * @example Element with extension
 * ```typescript
 * const button = new ElementBuilder("my_button")
 *   .extends("common.button")
 *   .size(100, 30)
 *   .build();
 * ```
 */
export class ElementBuilder<
  N extends string,
  T extends BaseUIProperties = BaseUIProperties,
> {
  /** The element's properties being built */
  protected properties: T;

  /** The element's name (without extension) */
  protected elementName: N;

  /** Optional base element being extended (@ syntax) */
  protected extendsRef?: string;

  /**
   * Creates a new element builder.
   *
   * @param name - The element name (used in namespace and references).
   * @param type - Optional element type. If omitted, type can be inferred
   *   from extension or defaults to "panel".
   *
   * @example With explicit type
   * ```typescript
   * const label = new ElementBuilder("title", "label");
   * ```
   *
   * @example Without type (for extension)
   * ```typescript
   * const button = new ElementBuilder("my_button")
   *   .extends("common.button");
   * ```
   */
  constructor(
    name: string,
    public type?: ElementType
  ) {
    this.elementName = name as N;
    this.properties = (type ? { type } : {}) as T;
  }

  /**
   * Creates a new instance of this builder for extension purposes.
   * Subclasses should override this to preserve their specific properties.
   *
   * Note: Clears the type since extended elements inherit their type
   * from the base element (via @extends syntax).
   *
   * @param name - The name for the new builder instance.
   * @returns A new builder instance of the same type.
   * @internal
   */
  _createForExtension(name: string): this {
    const instance = new (this.constructor as new (
      name: string,
      type?: ElementType
    ) => this)(name);
    // Clear the type - it's inherited from the extended element
    delete (instance.properties as Record<string, unknown>).type;
    instance.type = undefined;
    return instance;
  }

  // -------------------------------------------------------------------------
  // Core Methods
  // -------------------------------------------------------------------------

  /**
   * Gets the element's base name (without extension reference).
   *
   * @returns The element name.
   *
   * @example
   * ```typescript
   * const builder = new ElementBuilder("my_panel");
   * builder.extends("common.panel");
   * console.log(builder.getName()); // "my_panel"
   * ```
   */
  getName(): string {
    return this.elementName;
  }

  /**
   * Gets the full element name including any extension reference.
   *
   * If the element extends another, returns "name@base" format.
   * Otherwise, returns just the name.
   *
   * @returns The full element name with optional extension.
   *
   * @example Without extension
   * ```typescript
   * const builder = new ElementBuilder("my_panel");
   * console.log(builder.getFullName()); // "my_panel"
   * ```
   *
   * @example With extension
   * ```typescript
   * const builder = new ElementBuilder("my_button")
   *   .extends("common.button");
   * console.log(builder.getFullName()); // "my_button@common.button"
   * ```
   */
  getFullName(): string {
    if (this.extendsRef) return `${this.elementName}@${this.extendsRef}`;
    return this.elementName;
  }

  /**
   * Sets the base element to extend using @ syntax.
   * NOTE: This should only be used when extending vanilla minecraft elements as this is unsafe.
   * TODO: Create some type of strict reference check by generating all possibilities from vanilla minecraft types.
   *
   * Extended elements inherit all properties from the base and
   * can override specific values. This is the primary inheritance
   * mechanism in Bedrock UI.
   *
   * @param reference - The base element reference (namespace.element format).
   * @returns This builder for method chaining.
   *
   * @example Extending a common button
   * ```typescript
   * panel("my_button")
   *   .extends("common.button")
   *   .size(100, 30)
   * ```
   *
   * @example Extending from another namespace
   * ```typescript
   * panel("custom_panel")
   *   .extends("my_templates.base_panel")
   * ```
   */
  extends(reference: string, shouldClearType: boolean = true): this {
    this.extendsRef = reference;
    if (shouldClearType) {
      // Clear the type - it's inherited from the extended element
      delete (this.properties as Record<string, unknown>).type;
      this.type = undefined;
    }
    return this;
  }

  /**
   * Sets the base element to extend from another registered element
   * within the SAME namespace.
   *
   * The element being extended MUST have been added to a namespace first
   * via `addToNamespace()`. This ensures compile-time safety for references.
   *
   * For extending elements from OTHER namespaces, use `extendsExternallyFrom()`.
   *
   * @param element - A NamespaceElement to extend (must be registered).
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * const basePanel = panel("base").fullSize().addToNamespace(ns);
   * const derivedPanel = panel("derived").extendsFrom(basePanel);
   * derivedPanel.addToNamespace(ns);
   * ```
   */
  extendsFrom(element: NamespaceElement): this {
    return this.extends(element.getName(), element.builder.type !== undefined);
  }

  /**
   * Sets the base element to extend from a registered element
   * in ANOTHER namespace.
   *
   * This generates the full "namespace.element" reference format
   * required for cross-namespace extension in JSON UI.
   *
   * @param element - A NamespaceElement from another namespace.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * // In shared_ui.ts
   * const sharedButton = panel("button_base").addToNamespace(sharedNs);
   *
   * // In my_ui.ts
   * const myButton = panel("my_button")
   *   .extendsExternallyFrom(sharedButton)
   *   .addToNamespace(ns);
   * // Generates: "my_button@shared_ui.button_base"
   * ```
   */
  extendsExternallyFrom(element: NamespaceElement): this {
    return this.extends(
      element.getQualifiedName(),
      element.builder.type !== undefined
    );
  }

  /**
   * Adds this element to a namespace and returns a registered wrapper.
   *
   * This is the primary way to add elements to namespaces. The returned
   * `NamespaceElement` can then be used with `extendsFrom()` to create
   * type-safe extension hierarchies.
   *
   * @param ns - The namespace builder (implements INamespaceBuilder).
   * @returns A NamespaceElement wrapper for type-safe references.
   *
   * @example Basic usage
   * ```typescript
   * const main = panel("main")
   *   .fullSize()
   *   .addToNamespace(ns);
   * ```
   *
   * @example Extension chain
   * ```typescript
   * const base = panel("base").size(100, 100).addToNamespace(ns);
   * const derived = panel("derived")
   *   .extendsFrom(base)
   *   .color([1, 0, 0])
   *   .addToNamespace(ns);
   * ```
   */
  addToNamespace(ns: INamespaceBuilder): NamespaceElement<this> {
    ns._addInternal(this);
    return new NamespaceElement(this, ns.getName());
  }

  // -------------------------------------------------------------------------
  // Layout & Position
  // -------------------------------------------------------------------------

  /**
   * Sets the element's size.
   *
   * @param width - The width value (pixels, percentage, or special value).
   * @param height - The height value (pixels, percentage, or special value).
   * @returns This builder for method chaining.
   *
   * @see SizeValue for all available value formats.
   *
   * @example Fixed size in pixels
   * ```typescript
   * panel("box").size(100, 50)
   * ```
   *
   * @example Percentage of parent
   * ```typescript
   * panel("full").size("100%", "100%")
   * ```
   *
   * @example Mixed values
   * ```typescript
   * panel("sidebar").size(200, "100%")
   * ```
   *
   * @example Fill remaining space
   * ```typescript
   * panel("content").size("100%", "fill")
   * ```
   *
   * @example Size expression
   * ```typescript
   * panel("padded").size("100% - 20px", "100% - 20px")
   * ```
   */
  size(width: SizeValue = "default", height: SizeValue = "default"): this {
    if (width == "100%" || height == "100%")
      console.warn(
        "Optimization note: Size set of 100% is not needed, as thats the default value."
      );

    const isChildPadding =
      (typeof width === "string" && width.includes("%c + ")) ||
      (typeof height === "string" && height.includes("%c + "));
    if (isChildPadding)
      console.warn(
        "Optimization note: Use .padChildren() instead of .size() when setting child padding."
      );

    this.properties.size = [width, height];
    return this;
  }

  /**
   * Sets the element's size as percentages.
   *
   * Convenience method for percentage-based sizing.
   *
   * @param width - Width percentage (default: 100).
   * @param height - Height percentage (default: 100).
   * @returns This builder for method chaining.
   *
   * @example Full size
   * ```typescript
   * panel("full").sizePercent() // 100% x 100%
   * ```
   *
   * @example Custom percentages
   * ```typescript
   * panel("half").sizePercent(50, 50) // 50% x 50%
   * ```
   */
  sizePercent(width: number = 100, height: number = 100): this {
    return this.size(`${width}%`, `${height}%`);
  }

  /**
   * Sets the element to full size (100% x 100%).
   * NOTE: This is a useless method, as by default all elements are full size.
   *
   * Shorthand for `size("100%", "100%")`.
   *
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("background").fullSize()
   * ```
   */
  fullSize(): this {
    return this.sizePercent(100, 100);
  }

  /**
   * Sets the element to fit its content (100%c x 100%c).
   *
   * The element will size itself based on its children's total size.
   *
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("wrapper").fitContent()
   * ```
   */
  fitContent(): this {
    return this.size("100%c", "100%c");
  }

  /**
   * Sets the element to fit its children with additional padding.
   *
   * The element will size itself based on its children's total size
   * plus the specified padding. This is useful for creating backgrounds
   * that wrap around content with consistent margins.
   *
   * @param horizontal - Horizontal padding in pixels (added to both sides).
   * @param vertical - Vertical padding in pixels (added to top and bottom).
   *   If omitted, uses the horizontal value.
   * @returns This builder for method chaining.
   *
   * @example Uniform padding
   * ```typescript
   * image("bg")
   *   .texture("textures/ui/hud_tip_text_background")
   *   .padChildren(10)
   *   .controls(label("text").text("Hello"))
   * // Size becomes "100%c + 10px" x "100%c + 10px"
   * ```
   *
   * @example Different horizontal and vertical padding
   * ```typescript
   * image("text_bg")
   *   .texture("textures/ui/hud_tip_text_background")
   *   .padChildren(12, 5)
   *   .controls(actionbarLabel)
   * // Size becomes "100%c + 12px" x "100%c + 5px"
   * ```
   */
  padChildren(horizontal: number, vertical?: number): this {
    const v = vertical ?? horizontal;
    return this.size(`100%c + ${horizontal}px`, `100%c + ${v}px`);
  }

  /**
   * Sets the element to wrap its children.
   *
   * The element will size itself based on its children's total size.
   *
   * @returns This builder for method chaining.
   */
  wrapChildren(): this {
    return this.size("100%c", "100%c");
  }

  /**
   * Sets the minimum size constraint.
   *
   * The element will not shrink below this size.
   *
   * @param width - Minimum width.
   * @param height - Minimum height.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("flexible")
   *   .size("100%", "100%")
   *   .minSize(50, 30)
   * ```
   */
  minSize(width: SizeValue, height: SizeValue): this {
    this.properties.min_size = [width, height];
    return this;
  }

  /**
   * Sets the maximum size constraint.
   *
   * The element will not grow beyond this size.
   *
   * @param width - Maximum width.
   * @param height - Maximum height.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("bounded")
   *   .size("100%", "100%")
   *   .maxSize(500, 300)
   * ```
   */
  maxSize(width: SizeValue, height: SizeValue): this {
    this.properties.max_size = [width, height];
    return this;
  }

  /**
   * Sets the element's position offset from its anchor point.
   *
   * Positive X moves right, positive Y moves down.
   *
   * @param x - Horizontal offset.
   * @param y - Vertical offset.
   * @returns This builder for method chaining.
   *
   * @example Pixel offset
   * ```typescript
   * panel("shifted").offset(10, 20)
   * ```
   *
   * @example Percentage offset
   * ```typescript
   * panel("centered_offset").offset("50%", "50%")
   * ```
   *
   * @example Expression offset
   * ```typescript
   * panel("from_edge").offset("100% - 10px", 0)
   * ```
   */
  offset(x: OffsetValue, y: OffsetValue): this {
    this.properties.offset = [x, y];
    return this;
  }

  /**
   * Sets the anchor point on the parent element.
   *
   * This determines where on the parent the element's anchor_to
   * point will attach.
   *
   * @param anchor - The parent anchor position.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("bottom_panel")
   *   .anchorFrom("bottom_middle")
   *   .anchorTo("bottom_middle")
   * ```
   */
  anchorFrom(anchor: Anchor): this {
    this.properties.anchor_from = anchor;
    return this;
  }

  /**
   * Sets the anchor point on this element.
   *
   * This point attaches to the parent's anchor_from position.
   *
   * @param anchor - This element's anchor position.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("corner_panel")
   *   .anchorFrom("top_right")
   *   .anchorTo("top_right")
   * ```
   */
  anchorTo(anchor: Anchor): this {
    this.properties.anchor_to = anchor;
    return this;
  }

  /**
   * Sets both anchor_from and anchor_to to the same value.
   *
   * Convenience method for the common case where both anchors match.
   *
   * @param anchor - The anchor position for both properties.
   * @returns This builder for method chaining.
   *
   * @example Centered element
   * ```typescript
   * panel("centered").anchor("center")
   * ```
   *
   * @example Bottom-right corner
   * ```typescript
   * panel("corner").anchor("bottom_right")
   * ```
   */
  anchor(anchor: Anchor): this {
    if (anchor == "center")
      console.warn(
        "Optimization note: Anchor set of center is not needed, as thats the default value."
      );
    this.properties.anchor_from = anchor;
    this.properties.anchor_to = anchor;
    return this;
  }

  /**
   * Sets the Z-layer for rendering order.
   *
   * Higher values render on top of lower values.
   *
   * @param value - The layer number.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("background").layer(0)
   * panel("content").layer(1)
   * panel("overlay").layer(10)
   * ```
   */
  layer(value: number): this {
    this.properties.layer = value;
    return this;
  }

  // -------------------------------------------------------------------------
  // Visibility & State
  // -------------------------------------------------------------------------

  /**
   * Sets the element's visibility.
   *
   * @param value - Boolean or binding reference for visibility.
   * @returns This builder for method chaining.
   *
   * @example Static visibility
   * ```typescript
   * panel("hidden").visible(false)
   * ```
   *
   * @example Bound visibility
   * ```typescript
   * panel("conditional").visible("#is_visible")
   * ```
   */
  visible(value: boolean | string): this {
    this.properties.visible = value;
    return this;
  }

  /**
   * Sets the element's enabled state.
   *
   * Disabled elements may appear grayed out and not respond to input.
   *
   * @param value - Boolean or binding reference for enabled state.
   * @returns This builder for method chaining.
   *
   * @example Static enabled
   * ```typescript
   * button("disabled_btn").enabled(false)
   * ```
   *
   * @example Bound enabled
   * ```typescript
   * button("conditional_btn").enabled("#can_click")
   * ```
   */
  enabled(value: boolean | string): this {
    this.properties.enabled = value;
    return this;
  }

  /**
   * Sets the element's alpha (opacity).
   *
   * 0 is fully transparent, 1 is fully opaque.
   *
   * @param value - Alpha value (0-1) or binding reference.
   * @returns This builder for method chaining.
   *
   * @example Semi-transparent
   * ```typescript
   * panel("overlay").alpha(0.5)
   * ```
   *
   * @example Bound alpha
   * ```typescript
   * panel("fading").alpha("#fade_alpha")
   * ```
   */
  alpha(value: number | string): this {
    if (value == 1)
      console.warn(
        "Optimization note: Alpha set of 1 is not needed, as thats the default value."
      );
    this.properties.alpha = value;
    return this;
  }

  /**
   * Sets whether alpha changes propagate to children.
   *
   * @param value - Whether to propagate alpha.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("container")
   *   .alpha(0.5)
   *   .propagateAlpha(true) // Children also become 50% transparent
   * ```
   */
  propagateAlpha(value: boolean): this {
    this.properties.propagate_alpha = value;
    return this;
  }

  /**
   * Marks the element as ignored in layout calculations.
   *
   * Ignored elements don't take up space in their parent.
   *
   * @param value - Whether to ignore (default: true).
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("floating").ignored()
   * ```
   */
  ignored(value: boolean = true): this {
    this.properties.ignored = value;
    return this;
  }

  // -------------------------------------------------------------------------
  // Clipping
  // -------------------------------------------------------------------------

  /**
   * Enables clipping of children that extend beyond this element's bounds.
   *
   * @param value - Whether to clip children (default: true).
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("viewport")
   *   .size(200, 100)
   *   .clipsChildren()
   * ```
   */
  clipsChildren(value: boolean = true): this {
    this.properties.clips_children = value;
    return this;
  }

  /**
   * Sets whether this element can be clipped by its parent.
   *
   * @param value - Whether clipping is allowed (default: true).
   * @returns This builder for method chaining.
   *
   * @example Prevent clipping (for tooltips)
   * ```typescript
   * panel("tooltip").allowClipping(false)
   * ```
   */
  allowClipping(value: boolean = true): this {
    this.properties.allow_clipping = value;
    return this;
  }

  /**
   * Sets the offset for the clipping region.
   *
   * @param x - Horizontal clip offset.
   * @param y - Vertical clip offset.
   * @returns This builder for method chaining.
   */
  clipOffset(x: number, y: number): this {
    this.properties.clip_offset = [x, y];
    return this;
  }

  /**
   * Sets the clip direction for progress/reveal effects.
   *
   * @param direction - The direction to clip from.
   * @returns This builder for method chaining.
   *
   * @example Left-to-right progress bar
   * ```typescript
   * image("progress_fill")
   *   .clipDirection("left")
   *   .clipRatio(0.75) // 75% filled
   * ```
   */
  clipDirection(direction: ClipDirection): this {
    this.properties.clip_direction = direction;
    return this;
  }

  /**
   * Sets the clip ratio for progress/reveal effects.
   *
   * @param ratio - Clip amount from 0 (fully clipped) to 1 (fully visible).
   * @returns This builder for method chaining.
   *
   * @example Progress bar at 50%
   * ```typescript
   * image("progress")
   *   .clipDirection("left")
   *   .clipRatio(0.5)
   * ```
   */
  clipRatio(ratio: number): this {
    this.properties.clip_ratio = ratio;
    return this;
  }

  /**
   * Enables the image to try to be the most pixel accurate possible
   *
   * @returns This builder for method chaining.
   */
  clipPixelPerfect(value: boolean = true): this {
    this.properties.clip_pixelperfect = value;
    return this;
  }

  // -------------------------------------------------------------------------
  // Children/Controls
  // -------------------------------------------------------------------------

  /**
   * Adds child control references or builders.
   *
   * Controls are rendered in order (first = bottom, last = top).
   * Accepts ElementBuilder instances, control reference objects, or strings.
   *
   * @param children - Control references or ElementBuilder instances to add.
   * @returns This builder for method chaining.
   *
   * @example Using builders directly (recommended)
   * ```typescript
   * const bg = image("bg").texture("textures/ui/Black");
   * const title = label("title").text("Hello");
   *
   * panel("parent").controls(bg, title)
   * ```
   *
   * @example Using ref helper
   * ```typescript
   * panel("parent")
   *   .controls(
   *     ref("background@common.panel"),
   *     ref("title@my_ui.title_label")
   *   )
   * ```
   *
   * @example Inline references with overrides
   * ```typescript
   * panel("parent")
   *   .controls(
   *     { "bg@common.panel": { alpha: 0.5 } },
   *     { "text@my_ui.label": { text: "Hello" } }
   *   )
   * ```
   */
  controls(...children: (ControlReference | ElementBuilder<string>)[]): this {
    if (!this.properties.controls) this.properties.controls = [];
    for (const child of children) {
      if (child instanceof ElementBuilder) {
        // Convert builder to control reference
        this.properties.controls.push({ [child.getFullName()]: child.build() });
      } else {
        this.properties.controls.push(child);
      }
    }
    return this;
  }

  /**
   * Adds a child control from a builder.
   *
   * @param builder - The child element builder.
   * @param overrides - Optional property overrides for this instance.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * const childPanel = panel("child").size(50, 50);
   *
   * panel("parent")
   *   .addChild(childPanel)
   *   .addChild(childPanel, { offset: [60, 0] }) // Second instance with offset
   * ```
   */
  addChild(
    builder: ElementBuilder<string>,
    overrides: Partial<UIElement> = {}
  ): this {
    const ref: ControlReference = {
      [builder.getFullName()]: overrides,
    };
    return this.controls(ref);
  }

  /**
   * Adds multiple children from builders.
   *
   * @param builders - The child element builders.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * const child1 = panel("a").size(50, 50);
   * const child2 = panel("b").size(50, 50);
   *
   * panel("parent").addChildren(child1, child2)
   * ```
   */
  addChildren(...builders: ElementBuilder<string>[]): this {
    for (const builder of builders) {
      this.addChild(builder);
    }
    return this;
  }

  // -------------------------------------------------------------------------
  // Bindings
  // -------------------------------------------------------------------------

  /**
   * Adds raw binding definitions.
   *
   * Bindings connect UI properties to game data and enable
   * dynamic content.
   *
   * @param newBindings - The binding definitions to add.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * label("player_name")
   *   .bindings({
   *     binding_type: "global",
   *     binding_name: "#player_name",
   *     binding_name_override: "#player_name"
   *   })
   * ```
   */
  bindings(...newBindings: Binding[]): this {
    if (!this.properties.bindings) this.properties.bindings = [];
    this.properties.bindings.push(...newBindings);
    return this;
  }

  /**
   * Adds a simple binding.
   *
   * @param bindingName - The binding name to read.
   * @param options - Additional binding options.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * label("title")
   *   .binding("#title_text")
   * ```
   */
  binding(bindingName: string, options: Partial<Binding> = {}): this {
    return this.bindings({
      binding_name: bindingName,
      ...options,
    });
  }

  /**
   * Adds a global binding that passes through a value.
   *
   * @param bindingName - The global binding name (usually starts with #).
   * @param override - The property to write to (defaults to same as bindingName).
   * @param condition - When to evaluate the binding.
   * @returns This builder for method chaining.
   *
   * @example Simple pass-through
   * ```typescript
   * label("title")
   *   .globalBinding("#title_text")
   * ```
   *
   * @example With different override
   * ```typescript
   * label("health")
   *   .globalBinding("#player_health", "#text")
   * ```
   */
  globalBinding(
    bindingName: string,
    override?: string,
    condition: BindingCondition = "none"
  ): this {
    return this.bindings({
      binding_type: "global",
      binding_condition: condition,
      binding_name: bindingName,
      binding_name_override: override ?? bindingName,
    });
  }

  /**
   * Adds a view binding with a computed property.
   *
   * View bindings evaluate Molang expressions and write the result
   * to a target property.
   *
   * @param sourceProperty - Molang expression to evaluate.
   * @param targetProperty - Property to write the result to.
   * @returns This builder for method chaining.
   *
   * @example Visibility based on condition
   * ```typescript
   * panel("conditional")
   *   .viewBinding("(#health > 0)", "#visible")
   * ```
   *
   * @example Computed text
   * ```typescript
   * label("formatted")
   *   .viewBinding("('Health: ' + #health)", "#text")
   * ```
   */
  viewBinding(sourceProperty: string, targetProperty: string): this {
    return this.bindings({
      binding_name: "#null",
      binding_type: "view",
      source_property_name: sourceProperty,
      target_property_name: targetProperty,
    });
  }

  /**
   * Adds a collection binding for reading from data collections.
   *
   * @param bindingName - The property to read from the collection.
   * @param collectionName - The collection to read from.
   * @param override - Optional override for the target property.
   * @returns This builder for method chaining.
   *
   * @example Hotbar item binding
   * ```typescript
   * custom("item_renderer")
   *   .collectionBinding("#item_id_aux", "hotbar_items")
   * ```
   */
  collectionBinding(
    bindingName: string,
    collectionName: string,
    override?: string
  ): this {
    return this.bindings({
      binding_name: bindingName,
      binding_type: "collection",
      binding_collection_name: collectionName,
      ...(override ? { binding_name_override: override } : {}),
    });
  }

  /**
   * Adds a visibility binding based on a Molang condition.
   *
   * Shorthand for a view binding that targets #visible.
   *
   * @param condition - Molang expression that evaluates to true/false.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("health_bar")
   *   .visibilityBinding("(#health > 0)")
   * ```
   */
  visibilityBinding(condition: string): this {
    return this.viewBinding(condition, "#visible");
  }

  /**
   * Adds an enabled binding based on a Molang condition.
   *
   * Shorthand for a view binding that targets #enabled.
   *
   * @param condition - Molang expression that evaluates to true/false.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * button("submit")
   *   .enabledBinding("(#form_valid)")
   * ```
   */
  enabledBinding(condition: string): this {
    return this.viewBinding(condition, "#enabled");
  }

  // -------------------------------------------------------------------------
  // Button Mappings
  // -------------------------------------------------------------------------

  /**
   * Adds button/input mappings.
   *
   * @param mappings - The button mapping definitions.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * screen("my_screen")
   *   .buttonMappings({
   *     from_button_id: "button.menu_cancel",
   *     to_button_id: "button.menu_exit",
   *     mapping_type: "global"
   *   })
   * ```
   */
  buttonMappings(...mappings: ButtonMapping[]): this {
    if (!this.properties.button_mappings) this.properties.button_mappings = [];
    this.properties.button_mappings.push(...mappings);
    return this;
  }

  /**
   * Adds a global button mapping.
   *
   * Global mappings are always active regardless of focus.
   *
   * @param fromButton - The source button ID to listen for.
   * @param toButton - The target action to trigger.
   * @returns This builder for method chaining.
   *
   * @example Escape to exit
   * ```typescript
   * screen("my_screen")
   *   .globalButtonMapping("button.menu_cancel", "button.menu_exit")
   * ```
   */
  globalButtonMapping(fromButton: string, toButton: string): this {
    return this.buttonMappings({
      from_button_id: fromButton,
      to_button_id: toButton,
      mapping_type: "global",
    });
  }

  // -------------------------------------------------------------------------
  // Modifications
  // -------------------------------------------------------------------------

  /**
   * Adds modifications to this element.
   *
   * Modifications alter the controls array of existing elements.
   *
   * @param mods - The modification definitions.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * element("root_panel")
   *   .modifications({
   *     array_name: "controls",
   *     operation: "insert_back",
   *     value: [{ "my_hud@my_ns.hud": {} }]
   *   })
   * ```
   */
  modifications(...mods: Modification[]): this {
    if (!this.properties.modifications) this.properties.modifications = [];
    this.properties.modifications.push(...mods);
    return this;
  }

  /**
   * Inserts controls at the end of an array.
   *
   * @param arrayName - The array to modify (usually "controls").
   * @param controls - The controls to insert.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * element("root_panel")
   *   .insertBack("controls", ref("my_element@my_ns.element"))
   * ```
   */
  insertBack(arrayName: string, ...controls: ControlReference[]): this {
    return this.modifications({
      array_name: arrayName,
      operation: "insert_back",
      value: controls,
    });
  }

  /**
   * Inserts controls at the beginning of an array.
   *
   * @param arrayName - The array to modify (usually "controls").
   * @param controls - The controls to insert.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * element("root_panel")
   *   .insertFront("controls", ref("background@my_ns.bg"))
   * ```
   */
  insertFront(arrayName: string, ...controls: ControlReference[]): this {
    return this.modifications({
      array_name: arrayName,
      operation: "insert_front",
      value: controls,
    });
  }

  /**
   * Inserts controls after a specific control.
   *
   * @param controlName - The control to insert after.
   * @param controls - The controls to insert.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * element("chat_stack")
   *   .insertAfter("player_position", ref("ping@my_ns.ping"))
   * ```
   */
  insertAfter(controlName: string, ...controls: ControlReference[]): this {
    return this.modifications({
      control_name: controlName,
      operation: "insert_after",
      value: controls,
    });
  }

  /**
   * Inserts controls before a specific control.
   *
   * @param controlName - The control to insert before.
   * @param controls - The controls to insert.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * element("hotbar")
   *   .insertBefore("item_0", ref("custom_slot@my_ns.slot"))
   * ```
   */
  insertBefore(controlName: string, ...controls: ControlReference[]): this {
    return this.modifications({
      control_name: controlName,
      operation: "insert_before",
      value: controls,
    });
  }

  // -------------------------------------------------------------------------
  // Animations
  // -------------------------------------------------------------------------

  /**
   * Adds animation references.
   *
   * @param animRefs - The animation reference strings.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("animated")
   *   .anims("@my_ns.fade_in", "@my_ns.slide_up")
   * ```
   */
  anims(...animRefs: string[]): this {
    if (!this.properties.anims) this.properties.anims = [];
    this.properties.anims.push(...animRefs);
    return this;
  }

  // -------------------------------------------------------------------------
  // Factory & Collection
  // -------------------------------------------------------------------------

  /**
   * Configures this element as a factory for generating children from a collection.
   *
   * Factories dynamically generate child elements based on collection data.
   * Each item in the collection creates an instance of the control template.
   *
   * **Special Variables Available Through Factory:**
   *
   * When using a factory, the generated children gain access to special variables:
   * - `$index` - The zero-based index of the current item in the collection
   * - Collection bindings become available (e.g., `#form_button_text`, `#form_button_texture`)
   *
   * These variables can be used in the control template for dynamic content
   * based on each item's position or data in the collection.
   *
   * @param name - The factory name (used internally by the engine).
   * @param controlName - Reference to the control template to instantiate
   *   (usually a $variable like "$button" that can be overridden).
   * @returns This builder for method chaining.
   *
   * @see https://wiki.bedrock.dev/json-ui/json-ui-intro - Factory variables explanation
   * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#factory - Factory properties
   *
   * @example Stack panel with button factory
   * ```typescript
   * stackPanel("button_list", "vertical")
   *   .factory("buttons", "$button")
   *   .collectionName("form_buttons")
   *   .variableDefault("button", "my_ns.button_template")
   *   .bindings(...factoryBindings())
   * ```
   *
   * @example Using $index in factory-generated items
   * ```typescript
   * // In the control template, $index gives the item's position:
   * label("slot_number", "$index")  // Shows 0, 1, 2, etc.
   * ```
   *
   * @example Grid with item factory
   * ```typescript
   * grid("inventory")
   *   .factory("inventory_items", "my_ns.slot")
   *   .collectionName("inventory_items")
   * ```
   */
  factory(name: string, controlName: string): this {
    return this.setProp("factory", { name, control_name: controlName });
  }

  /**
   * Sets the collection name for factory/grid data binding.
   *
   * The collection provides the data source for dynamically generated
   * children. Common collections include "form_buttons", "hotbar_items",
   * "inventory_items", etc.
   *
   * @param name - The collection name.
   * @returns This builder for method chaining.
   *
   * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#collection
   *
   * @example
   * ```typescript
   * stackPanel("buttons", "vertical")
   *   .factory("buttons", "$button")
   *   .collectionName("form_buttons")
   * ```
   */
  collectionName(name: string): this {
    return this.setProp("collection_name", name);
  }

  // -------------------------------------------------------------------------
  // Variables ($ prefixed)
  // -------------------------------------------------------------------------

  /**
   * Sets a variable property, optionally with a default value.
   *
   * Variables can be overridden when extending elements.
   * When `isDefault` is true, the variable key uses the `$name|default` format.
   *
   * @param name - The variable name ($ prefix added automatically if missing).
   * @param value - The variable value.
   * @param isDefault - If true, formats as `$name|default` for template defaults.
   * @returns This builder for method chaining.
   *
   * @example Simple variable assignment
   * ```typescript
   * panel("instance")
   *   .variable("background_color", [0.1, 0.1, 0.1])
   *   .variable("padding", 10)
   * ```
   *
   * @example Variable with default (for templates)
   * ```typescript
   * panel("template")
   *   .variable("visible", true, true)     // "$visible|default": true
   *   .variable("padding", 10, true)       // "$padding|default": 10
   *   .variable("color", [1, 0, 0], true)  // "$color|default": [1, 0, 0]
   * ```
   */
  variable(name: string, value: unknown, isDefault: boolean = false): this {
    const varName = name.startsWith("$") ? name.slice(1) : name;
    const key = isDefault ? `$${varName}|default` : `$${varName}`;
    (this.properties as AnyProps)[key] = value;
    return this;
  }

  /**
   * Sets a variable with a default value.
   *
   * Shorthand for `.variable(name, value, true)`.
   * Use this when defining template variables that can be overridden.
   *
   * @param name - The variable name ($ prefix added automatically if missing).
   * @param value - The default value for the variable.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("button_template")
   *   .variableDefault("button_text", "Click Me")
   *   .variableDefault("button_color", [0.2, 0.4, 0.8])
   *   .variableDefault("padding", 10)
   * // Produces:
   * // {
   * //   "$button_text|default": "Click Me",
   * //   "$button_color|default": [0.2, 0.4, 0.8],
   * //   "$padding|default": 10
   * // }
   * ```
   */
  variableDefault(name: string, value: unknown): this {
    return this.variable(name, value, true);
  }

  /**
   * Sets multiple variable properties.
   *
   * @param vars - Object with variable names and values.
   * @param isDefault - If true, all variables use the `$name|default` format.
   * @returns This builder for method chaining.
   *
   * @example Simple variables
   * ```typescript
   * panel("instance")
   *   .variables({
   *     background_color: [0.1, 0.1, 0.1],
   *     padding: 10,
   *     text_color: [1, 1, 1]
   *   })
   * ```
   *
   * @example Default variables (for templates)
   * ```typescript
   * panel("template")
   *   .variables({
   *     visible: true,
   *     padding: 10,
   *     color: [1, 0, 0]
   *   }, true)
   * ```
   */
  variables(vars: Record<string, unknown>, isDefault: boolean = false): this {
    for (const [key, value] of Object.entries(vars)) {
      this.variable(key, value, isDefault);
    }
    return this;
  }

  /**
   * Sets multiple variable properties with default values.
   *
   * Shorthand for `.variables(vars, true)`.
   * Use this when defining multiple template variables.
   *
   * @param vars - Object with variable names and default values.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("button_template")
   *   .variableDefaults({
   *     button_text: "Click Me",
   *     button_color: [0.2, 0.4, 0.8],
   *     padding: 10,
   *     visible: true
   *   })
   * ```
   */
  variableDefaults(vars: Record<string, unknown>): this {
    return this.variables(vars, true);
  }

  // -------------------------------------------------------------------------
  // Property Bag
  // -------------------------------------------------------------------------

  /**
   * Sets property bag values.
   *
   * Property bags pass custom data to elements, especially
   * custom renderers.
   *
   * @param bag - The property bag values.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * custom("renderer")
   *   .propertyBag({
   *     "#custom_data": "value",
   *     "#another_prop": 123
   *   })
   * ```
   */
  propertyBag(bag: Record<string, unknown>): this {
    this.properties.property_bag = {
      ...this.properties.property_bag,
      ...bag,
    };
    return this;
  }

  // -------------------------------------------------------------------------
  // Sound
  // -------------------------------------------------------------------------

  /**
   * Sets sound properties for interaction feedback.
   *
   * @param name - The sound name/ID.
   * @param pitch - Pitch multiplier (default: 1).
   * @param volume - Volume multiplier (default: 1).
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * button("click_btn")
   *   .sound("random.click", 1.0, 0.8)
   * ```
   */
  sound(name: string, pitch: number = 1, volume: number = 1): this {
    this.properties.sound_name = name;
    this.properties.sound_pitch = pitch;
    this.properties.sound_volume = volume;
    return this;
  }

  // -------------------------------------------------------------------------
  // Focus
  // -------------------------------------------------------------------------

  /**
   * Enables focus for this element.
   *
   * @param value - Whether focus is enabled (default: true).
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * button("focusable").focusEnabled()
   * ```
   */
  focusEnabled(value: boolean = true): this {
    this.properties.focus_enabled = value;
    return this;
  }

  /**
   * Sets the focus identifier.
   *
   * Used for focus navigation references.
   *
   * @param id - The unique focus identifier.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * button("btn").focusId("main_button")
   * ```
   */
  focusId(id: string): this {
    this.properties.focus_identifier = id;
    return this;
  }

  /**
   * Sets focus navigation targets.
   *
   * @param options - Navigation targets for each direction.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * button("middle")
   *   .focusNavigation({
   *     up: "top_button",
   *     down: "bottom_button",
   *     left: "left_button",
   *     right: "right_button"
   *   })
   * ```
   */
  focusNavigation(options: {
    up?: string;
    down?: string;
    left?: string;
    right?: string;
  }): this {
    if (options.up) this.properties.focus_change_up = options.up;
    if (options.down) this.properties.focus_change_down = options.down;
    if (options.left) this.properties.focus_change_left = options.left;
    if (options.right) this.properties.focus_change_right = options.right;
    return this;
  }

  // -------------------------------------------------------------------------
  // Raw Properties
  // -------------------------------------------------------------------------

  /**
   * Sets a raw property by key.
   *
   * Use this for properties not covered by other methods.
   *
   * @typeParam K - The property key type.
   * @param key - The property name.
   * @param value - The property value.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("custom")
   *   .prop("some_property", "value")
   * ```
   */
  prop<K extends keyof T>(key: K, value: T[K]): this {
    this.properties[key] = value;
    return this;
  }

  /**
   * Sets multiple raw properties.
   *
   * @param values - Object with property names and values.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("custom")
   *   .props({
   *     some_property: "value",
   *     another_property: 123
   *   })
   * ```
   */
  props(values: Partial<T>): this {
    Object.assign(this.properties, values);
    return this;
  }

  /**
   * Sets an arbitrary raw property by string key.
   *
   * Use this for properties not defined in the type system
   * or for experimental/undocumented properties.
   *
   * @param key - The property name as a string.
   * @param value - The property value.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * panel("custom")
   *   .rawProp("undocumented_property", "value")
   *   .rawProp("enable_profanity_filter", false)
   * ```
   */
  rawProp(key: string, value: unknown): this {
    return this.setProp(key, value);
  }

  // -------------------------------------------------------------------------
  // Build
  // -------------------------------------------------------------------------

  /**
   * Builds and returns the element properties object.
   *
   * @returns The complete element properties.
   *
   * @example
   * ```typescript
   * const props = panel("my_panel")
   *   .fullSize()
   *   .anchor("center")
   *   .build();
   *
   * // props = { type: "panel", size: ["100%", "100%"], anchor_from: "center", anchor_to: "center" }
   * ```
   */
  build(): T {
    return { ...this.properties };
  }

  /**
   * Converts to a control reference for use in controls arrays.
   *
   * @param overrides - Optional property overrides.
   * @returns A control reference object.
   *
   * @example
   * ```typescript
   * const button = panel("btn").extends("common.button").size(100, 30);
   *
   * panel("parent")
   *   .controls(
   *     button.toControlRef(),
   *     button.toControlRef({ offset: [110, 0] })
   *   )
   * ```
   */
  toControlRef(overrides: Partial<UIElement> = {}): ControlReference {
    return {
      [this.getFullName()]: overrides,
    };
  }

  // -------------------------------------------------------------------------
  // Protected helper for setting properties via bracket notation
  // -------------------------------------------------------------------------

  /**
   * Internal method for setting properties via bracket notation.
   *
   * @internal
   * @param key - The property key.
   * @param value - The property value.
   * @returns This builder for method chaining.
   */
  protected setProp(key: string, value: unknown): this {
    (this.properties as AnyProps)[key] = value;
    return this;
  }
}

// ============================================================================
// Specialized Builders
// ============================================================================

/**
 * Builder for panel elements.
 *
 * Panels are the most basic container type and serve as the
 * default element type when none is specified.
 *
 * @example
 * ```typescript
 * const myPanel = new PanelBuilder("container")
 *   .fullSize()
 *   .anchor("center");
 * ```
 */
export class PanelBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new panel builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "panel");
  }
}

/**
 * Builder for stack panel elements.
 *
 * Stack panels arrange children sequentially without overlap,
 * either horizontally or vertically.
 *
 * @example
 * ```typescript
 * const toolbar = new StackPanelBuilder("toolbar")
 *   .horizontal()
 *   .size("100%", 32);
 * ```
 */
export class StackPanelBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new stack panel builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "stack_panel");
  }

  /**
   * Sets the stack orientation.
   *
   * @param value - The orientation ("horizontal" or "vertical").
   * @returns This builder for method chaining.
   */
  orientation(value: Orientation): this {
    return this.setProp("orientation", value);
  }

  /**
   * Sets horizontal orientation (left to right).
   *
   * @returns This builder for method chaining.
   */
  horizontal(): this {
    return this.orientation("horizontal");
  }

  /**
   * Sets vertical orientation (top to bottom).
   *
   * @returns This builder for method chaining.
   */
  vertical(): this {
    return this.orientation("vertical");
  }
}

/**
 * Builder for grid elements.
 *
 * Grids arrange children in a 2D layout with rows and columns,
 * commonly used for inventory slots and button arrays.
 *
 * @example
 * ```typescript
 * const inventory = new GridBuilder("slots")
 *   .gridDimensions(9, 4)
 *   .gridItemTemplate("inventory.slot")
 *   .collectionName("inventory_items");
 * ```
 */
export class GridBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new grid builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "grid");
  }

  /**
   * Sets the grid dimensions.
   *
   * @param columns - Number of columns.
   * @param rows - Number of rows.
   * @returns This builder for method chaining.
   */
  gridDimensions(columns: number, rows: number): this {
    return this.setProp("grid_dimensions", [columns, rows]);
  }

  /**
   * Sets the template element for grid items.
   *
   * @param template - Reference to the template element.
   * @returns This builder for method chaining.
   */
  gridItemTemplate(template: string): this {
    return this.setProp("grid_item_template", template);
  }

  /**
   * Sets the data collection for the grid.
   *
   * @param name - The collection name.
   * @returns This builder for method chaining.
   */
  override collectionName(name: string): this {
    return super.collectionName(name);
  }

  /**
   * Sets the grid rescaling type.
   *
   * @param type - How the grid rescales.
   * @returns This builder for method chaining.
   */
  gridRescaling(type: "horizontal" | "vertical" | "none"): this {
    return this.setProp("grid_rescaling_type", type);
  }

  /**
   * Sets the maximum number of grid items.
   *
   * @param count - Maximum item count.
   * @returns This builder for method chaining.
   */
  maxItems(count: number): this {
    return this.setProp("maximum_grid_items", count);
  }
}

/**
 * Builder for label (text) elements.
 *
 * Labels display text with various styling options including
 * fonts, colors, shadows, and alignment.
 *
 * @example
 * ```typescript
 * const title = new LabelBuilder("title")
 *   .text("Hello World")
 *   .color([1, 1, 0])
 *   .shadow()
 *   .fontSize("large");
 * ```
 */
export class LabelBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new label builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "label");
  }

  /**
   * Sets the text content.
   *
   * @param value - Static text, binding reference, or localization key.
   * @returns This builder for method chaining.
   */
  text(value: string): this {
    return this.setProp("text", value);
  }

  /**
   * Sets the text color.
   *
   * @param value - RGB color array or variable reference.
   * @returns This builder for method chaining.
   */
  color(value: Color | ColorWithAlpha | string): this {
    return this.setProp("color", value);
  }

  /**
   * Sets the element to have a text shadow.
   *
   * @returns This builder for method chaining.
   */
  shadow(): this {
    return this.setProp("shadow", true);
  }

  /**
   * Sets the font size preset.
   *
   * @param value - The font size preset.
   * @returns This builder for method chaining.
   */
  fontSize(value: "small" | "normal" | "large" | "extra_large"): this {
    if (value == "normal")
      console.warn(
        "Optimization note: Font size set of normal is not needed, as thats the default value."
      );
    return this.setProp("font_size", value);
  }

  /**
   * Sets the font scale factor.
   *
   * @param value - Scale multiplier (1.0 = normal).
   * @returns This builder for method chaining.
   */
  fontScale(value: number): this {
    return this.setProp("font_scale_factor", value);
  }

  /**
   * Sets the font type.
   *
   * @param value - The font family.
   * @returns This builder for method chaining.
   */
  fontType(value: FontType): this {
    return this.setProp("font_type", value);
  }

  /**
   * Sets the text alignment.
   *
   * @param value - Horizontal alignment.
   * @returns This builder for method chaining.
   */
  textAlignment(value: TextAlignment): this {
    return this.setProp("text_alignment", value);
  }

  /**
   * Enables localization lookup.
   *
   * @returns This builder for method chaining.
   */
  localize(): this {
    return this.setProp("localize", true);
  }

  /**
   * Sets the line padding.
   *
   * @param value - Padding between lines in pixels.
   * @returns This builder for method chaining.
   */
  linePadding(value: number): this {
    return this.setProp("line_padding", value);
  }

  /**
   * Sets the font scale factor.
   *
   * @param value - Scale multiplier (1.0 = normal, 2.0 = double).
   * @returns This builder for method chaining.
   */
  fontScaleFactor(value: number | string): this {
    if (value == 1)
      console.warn(
        "Optimization note: Font scale factor set of 1 is not needed, as thats the default value."
      );
    return this.setProp("font_scale_factor", value);
  }

  /**
   * Enables or disables the profanity filter.
   *
   * @param value - Whether to filter profanity (default: true for user content).
   * @returns This builder for method chaining.
   */
  enableProfanityFilter(value: boolean = true): this {
    return this.setProp("enable_profanity_filter", value);
  }
}

export class BoundLabelBuilder<N extends string> extends LabelBuilder<N> {
  constructor(
    name: N,
    public bindingName: string = "text"
  ) {
    super(name);
    this.text("#" + bindingName);
  }

  /**
   * @internal
   */
  override _createForExtension(name: string): this {
    return new BoundLabelBuilder(name, this.bindingName) as this;
  }
}

/**
 * Builder for image elements.
 *
 * Images display textures with support for UV mapping,
 * 9-slice scaling, tiling, and color tinting.
 *
 * @example
 * ```typescript
 * const bg = new ImageBuilder("background")
 *   .texture("textures/ui/White")
 *   .color([0.2, 0.2, 0.2])
 *   .nineslice(4);
 * ```
 */
export class ImageBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new image builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "image");
  }

  /**
   * Sets the texture path.
   *
   * @param path - Path to the texture (without extension).
   * @returns This builder for method chaining.
   */
  texture(path: string): this {
    return this.setProp("texture", path);
  }

  /**
   * Sets the UV coordinates.
   *
   * @param x - X coordinate in pixels.
   * @param y - Y coordinate in pixels.
   * @returns This builder for method chaining.
   */
  uv(x: number, y: number): this {
    return this.setProp("uv", [x, y]);
  }

  /**
   * Sets the UV to an animation reference.
   *
   * This is used to animate the UV coordinates using a flip_book or uv animation.
   * Use animRef() to generate the proper reference string.
   *
   * @param animationRef - The animation reference (e.g., "@namespace.anim_name").
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * image("sprite")
   *   .texture("textures/ui/icons")
   *   .uvAnim("@my_ui.anim__sprite_flip")
   *   .uvSize(64, 64)
   * ```
   */
  uvAnim(animationRef: string): this {
    return this.setProp("uv", animationRef);
  }

  /**
   * Sets the UV size.
   *
   * @param width - Width in pixels.
   * @param height - Height in pixels.
   * @returns This builder for method chaining.
   */
  uvSize(width: number, height: number): this {
    return this.setProp("uv_size", [width, height]);
  }

  /**
   * Sets 9-slice border sizes.
   *
   * @param size - Single value or [top, right, bottom, left].
   * @returns This builder for method chaining.
   */
  nineslice(size: NinesliceInfo): this {
    return this.setProp("nineslice_size", size);
  }

  /**
   * Enables texture tiling.
   *
   * @param value - true, "x", "y", or false.
   * @returns This builder for method chaining.
   */
  tiled(value: boolean | "x" | "y" = true): this {
    return this.setProp("tiled", value);
  }

  /**
   * Sets the tile scale.
   *
   * @param x - Horizontal scale.
   * @param y - Vertical scale.
   * @returns This builder for method chaining.
   */
  tiledScale(x: number, y: number): this {
    return this.setProp("tiled_scale", [x, y]);
  }

  /**
   * Disables aspect ratio preservation.
   *
   * @returns This builder for method chaining.
   */
  ignoreRatio(): this {
    return this.setProp("keep_ratio", false);
  }

  /**
   * Sets the color tint.
   *
   * @param value - RGB color or variable reference.
   * @returns This builder for method chaining.
   */
  color(value: Color | ColorWithAlpha | string): this {
    return this.setProp("color", value);
  }

  /**
   * Enables grayscale rendering.
   *
   * @param value - Whether to render in grayscale (default: true).
   * @returns This builder for method chaining.
   */
  grayscale(value: boolean = true): this {
    return this.setProp("grayscale", value);
  }

  /**
   * Sets the element to fill its parent.
   *
   * @returns This builder for method chaining.
   */
  fill(): this {
    return this.setProp("fill", true);
  }
}

export class BoundImageBuilder<N extends string> extends ImageBuilder<N> {
  constructor(
    name: N,
    public bindingName: string = "texture"
  ) {
    super(name);
    this.texture("#" + bindingName);
  }

  /**
   * @internal
   */
  override _createForExtension(name: string): this {
    return new BoundImageBuilder(name, this.bindingName) as this;
  }
}

/**
 * Builder for button elements.
 *
 * Buttons are interactive elements with visual states for
 * default, hover, pressed, and locked.
 *
 * @example
 * ```typescript
 * const btn = new ButtonBuilder("my_button")
 *   .defaultControl("default")
 *   .hoverControl("hover")
 *   .pressedControl("pressed");
 * ```
 */
export class ButtonBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new button builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "button");
  }

  /**
   * Sets the default state control.
   *
   * @param name - Child control name for default state.
   * @returns This builder for method chaining.
   */
  defaultControl(name: string): this {
    return this.setProp("default_control", name);
  }

  /**
   * Sets the hover state control.
   *
   * @param name - Child control name for hover state.
   * @returns This builder for method chaining.
   */
  hoverControl(name: string): this {
    return this.setProp("hover_control", name);
  }

  /**
   * Sets the pressed state control.
   *
   * @param name - Child control name for pressed state.
   * @returns This builder for method chaining.
   */
  pressedControl(name: string): this {
    return this.setProp("pressed_control", name);
  }

  /**
   * Sets the locked state control.
   *
   * @param name - Child control name for locked state.
   * @returns This builder for method chaining.
   */
  lockedControl(name: string): this {
    return this.setProp("locked_control", name);
  }

  /**
   * Sets all control states at once.
   *
   * @param states - Object with state names.
   * @returns This builder for method chaining.
   */
  controlStates(states: {
    default?: string;
    hover?: string;
    pressed?: string;
    locked?: string;
  }): this {
    if (states.default) this.defaultControl(states.default);
    if (states.hover) this.hoverControl(states.hover);
    if (states.pressed) this.pressedControl(states.pressed);
    if (states.locked) this.lockedControl(states.locked);
    return this;
  }
}

/**
 * Builder for toggle elements.
 *
 * Toggles are checkbox/radio button elements that maintain
 * a checked/unchecked state.
 *
 * @example
 * ```typescript
 * const checkbox = new ToggleBuilder("enable_sound")
 *   .toggleName("sound_enabled")
 *   .defaultState(true)
 *   .checkedControl("on")
 *   .uncheckedControl("off");
 * ```
 */
export class ToggleBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new toggle builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "toggle");
  }

  /**
   * Sets the toggle name.
   *
   * @param name - Unique name for this toggle.
   * @returns This builder for method chaining.
   */
  toggleName(name: string): this {
    return this.setProp("toggle_name", name);
  }

  /**
   * Sets the default checked state.
   *
   * @param value - Whether checked by default.
   * @returns This builder for method chaining.
   */
  defaultState(value: boolean): this {
    return this.setProp("toggle_default_state", value);
  }

  /**
   * Enables radio button group behavior.
   *
   * @param value - Whether this is a radio group (default: true).
   * @returns This builder for method chaining.
   */
  radioGroup(value: boolean = true): this {
    return this.setProp("radio_toggle_group", value);
  }

  /**
   * Sets the checked state control.
   *
   * @param name - Child control name for checked state.
   * @returns This builder for method chaining.
   */
  checkedControl(name: string): this {
    return this.setProp("checked_control", name);
  }

  /**
   * Sets the unchecked state control.
   *
   * @param name - Child control name for unchecked state.
   * @returns This builder for method chaining.
   */
  uncheckedControl(name: string): this {
    return this.setProp("unchecked_control", name);
  }
}

/**
 * Builder for custom renderer elements.
 *
 * Custom elements use native code renderers for complex
 * content like paper dolls, item previews, and HUD elements.
 *
 * @example
 * ```typescript
 * const paperDoll = new CustomBuilder("player_preview")
 *   .renderer("paper_doll_renderer")
 *   .size(50, 80);
 * ```
 *
 * @example Hover text renderer
 * ```typescript
 * const tooltip = custom("tooltip")
 *   .renderer("hover_text_renderer")
 *   .allowClipping(false)
 *   .layer(30);
 * ```
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#custom-render
 */
export class CustomBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new custom builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "custom");
  }

  /**
   * Sets the native renderer.
   *
   * @param value - The renderer name.
   * @returns This builder for method chaining.
   *
   * @example
   * ```typescript
   * custom("tooltip")
   *   .renderer("hover_text_renderer")
   * ```
   */
  renderer(value: CustomRenderer): this {
    return this.setProp("renderer", value);
  }

  /**
   * Sets whether the content respects parent clipping bounds.
   *
   * Setting to false allows content (like tooltips) to render
   * outside the parent element's boundaries.
   *
   * @param value - Whether clipping is allowed (default: true).
   * @returns This builder for method chaining.
   *
   * @example Tooltip that can extend beyond parent
   * ```typescript
   * custom("hover_text")
   *   .renderer("hover_text_renderer")
   *   .allowClipping(false) // Tooltip renders outside parent bounds
   * ```
   */
  override allowClipping(value: boolean = true): this {
    return super.allowClipping(value);
  }

  /**
   * Sets whether to use anchored offset positioning.
   *
   * When true, offset is calculated from the anchor point.
   * When false, offset is calculated from parent bounds.
   *
   * @param value - Whether to use anchored offset.
   * @returns This builder for method chaining.
   */
  anchoredOffsetEnabled(value: boolean = true): this {
    return this.setProp("use_anchored_offset", value);
  }

  /**
   * Sets whether the content is contained within bounds.
   *
   * @param value - Whether content is contained.
   * @returns This builder for method chaining.
   */
  contained(value: boolean = true): this {
    return this.setProp("contained", value);
  }

  /**
   * Sets the primary color for gradient renderer.
   *
   * @param value - RGB color array.
   * @returns This builder for method chaining.
   */
  primaryColor(value: Color): this {
    return this.setProp("primary_color", value);
  }

  /**
   * Sets the secondary color for gradient renderer.
   *
   * @param value - RGB color array.
   * @returns This builder for method chaining.
   */
  secondaryColor(value: Color): this {
    return this.setProp("secondary_color", value);
  }

  /**
   * Sets whether to force render even when hidden.
   *
   * @param value - Whether to force render.
   * @returns This builder for method chaining.
   */
  forceRenderBelow(value: boolean = true): this {
    return this.setProp("force_render_below", value);
  }
}

/**
 * Builder for factory elements.
 *
 * Factories dynamically create elements based on data,
 * selecting from a map of control IDs.
 *
 * @example
 * ```typescript
 * const formFactory = new FactoryBuilder("form_factory")
 *   .controlIds({
 *     "long_form": "@server_form.long_form",
 *     "custom_form": "@server_form.custom_form"
 *   });
 * ```
 */
export class FactoryBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new factory builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "factory");
  }

  /**
   * Sets the control ID mapping.
   *
   * @param ids - Map of names to element references.
   * @returns This builder for method chaining.
   */
  controlIds(ids: Record<string, string>): this {
    return this.setProp("control_ids", ids);
  }
}

/**
 * Builder for scroll view elements.
 *
 * Scroll views display scrollable content with optional scrollbars.
 *
 * @example
 * ```typescript
 * const scroller = new ScrollViewBuilder("content_scroll")
 *   .scrollViewPort("viewport")
 *   .scrollContent("content")
 *   .scrollbarBox("thumb")
 *   .touchMode();
 * ```
 */
export class ScrollViewBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new scroll view builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "scroll_view");
  }

  /**
   * Sets the scroll speed multiplier.
   *
   * @param value - Speed multiplier.
   * @returns This builder for method chaining.
   */
  scrollSpeed(value: number): this {
    return this.setProp("scroll_speed", value);
  }

  /**
   * Sets the viewport control name.
   *
   * @param name - Child control for the viewport.
   * @returns This builder for method chaining.
   */
  scrollViewPort(name: string): this {
    return this.setProp("scroll_view_port", name);
  }

  /**
   * Sets the content control name.
   *
   * @param name - Child control for scrollable content.
   * @returns This builder for method chaining.
   */
  scrollContent(name: string): this {
    return this.setProp("scroll_content", name);
  }

  /**
   * Sets the scrollbar box control name.
   *
   * @param name - Child control for scrollbar thumb.
   * @returns This builder for method chaining.
   */
  scrollbarBox(name: string): this {
    return this.setProp("scrollbar_box", name);
  }

  /**
   * Enables auto-scroll to bottom on content update.
   *
   * @param value - Whether to jump to bottom (default: true).
   * @returns This builder for method chaining.
   */
  jumpToBottomOnUpdate(value: boolean = true): this {
    return this.setProp("jump_to_bottom_on_update", value);
  }

  /**
   * Enables touch/drag scrolling mode.
   *
   * @param value - Whether to enable touch mode (default: true).
   * @returns This builder for method chaining.
   */
  touchMode(value: boolean = true): this {
    return this.setProp("touch_mode", value);
  }
}

/**
 * Builder for screen elements.
 *
 * Screens are root-level UI containers that define entire views.
 *
 * @example
 * ```typescript
 * const myScreen = new ScreenBuilder("main_screen")
 *   .isModal()
 *   .absorbsInput()
 *   .renderGameBehind(false);
 * ```
 */
export class ScreenBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new screen builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "screen");
  }

  /**
   * Sets whether to render game behind this screen.
   *
   * @param value - Whether to render game (default: true).
   * @returns This builder for method chaining.
   */
  renderGameBehind(value: boolean = true): this {
    return this.setProp("render_game_behind", value);
  }

  /**
   * Sets whether this screen absorbs input.
   *
   * @param value - Whether to absorb input (default: true).
   * @returns This builder for method chaining.
   */
  absorbsInput(value: boolean = true): this {
    return this.setProp("absorbs_input", value);
  }

  /**
   * Sets whether this screen is modal.
   *
   * @param value - Whether modal (default: true).
   * @returns This builder for method chaining.
   */
  isModal(value: boolean = true): this {
    return this.setProp("is_modal", value);
  }

  /**
   * Sets whether to always accept input.
   *
   * @param value - Whether to always accept (default: true).
   * @returns This builder for method chaining.
   */
  alwaysAcceptsInput(value: boolean = true): this {
    return this.setProp("always_accepts_input", value);
  }

  /**
   * Sets whether to close on player hurt.
   *
   * @param value - Whether to close (default: true).
   * @returns This builder for method chaining.
   */
  closeOnPlayerHurt(value: boolean = true): this {
    return this.setProp("close_on_player_hurt", value);
  }
}

/**
 * Builder for input panel elements.
 *
 * Input panels capture and handle input events.
 *
 * @example
 * ```typescript
 * const overlay = new InputPanelBuilder("touch_capture")
 *   .modal()
 *   .consumeEvent()
 *   .hoverEnabled();
 * ```
 */
export class InputPanelBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new input panel builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "input_panel");
  }

  /**
   * Sets whether this panel is modal.
   *
   * @param value - Whether modal (default: true).
   * @returns This builder for method chaining.
   */
  modal(value: boolean = true): this {
    return this.setProp("modal", value);
  }

  /**
   * Enables hover detection.
   *
   * @param value - Whether to enable hover (default: true).
   * @returns This builder for method chaining.
   */
  hoverEnabled(value: boolean = true): this {
    return this.setProp("hover_enabled", value);
  }

  /**
   * Sets whether to consume input events.
   *
   * @param value - Whether to consume events (default: true).
   * @returns This builder for method chaining.
   */
  consumeEvent(value: boolean = true): this {
    return this.setProp("consume_event", value);
  }
}

/**
 * Builder for edit box (text input) elements.
 *
 * Edit boxes accept user text input.
 *
 * @example
 * ```typescript
 * const searchBox = new EditBoxBuilder("search_input")
 *   .textBoxName("search")
 *   .maxLength(50)
 *   .textControl("text_display")
 *   .placeholderControl("placeholder");
 * ```
 */
export class EditBoxBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new edit box builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "edit_box");
  }

  /**
   * Sets the text box name.
   *
   * @param name - Unique name for this text box.
   * @returns This builder for method chaining.
   */
  textBoxName(name: string): this {
    return this.setProp("text_box_name", name);
  }

  /**
   * Sets the maximum text length.
   *
   * @param value - Maximum character count.
   * @returns This builder for method chaining.
   */
  maxLength(value: number): this {
    return this.setProp("max_length", value);
  }

  /**
   * Sets the allowed text type.
   *
   * @param value - Character type restriction.
   * @returns This builder for method chaining.
   */
  textType(value: "ExtendedASCII" | "IdentifierChars" | "NumberChars"): this {
    return this.setProp("text_type", value);
  }

  /**
   * Sets the text display control.
   *
   * @param name - Child control for text display.
   * @returns This builder for method chaining.
   */
  textControl(name: string): this {
    return this.setProp("text_control", name);
  }

  /**
   * Sets the placeholder control.
   *
   * @param name - Child control for placeholder.
   * @returns This builder for method chaining.
   */
  placeholderControl(name: string): this {
    return this.setProp("place_holder_control", name);
  }
}

/**
 * Builder for slider elements.
 *
 * Sliders allow selecting values within a range.
 *
 * @example
 * ```typescript
 * const volumeSlider = new SliderBuilder("volume")
 *   .sliderName("master_volume")
 *   .steps(10)
 *   .direction("horizontal")
 *   .sliderBoxControl("thumb");
 * ```
 */
export class SliderBuilder<N extends string> extends ElementBuilder<N> {
  /**
   * Creates a new slider builder.
   *
   * @param name - The element name.
   */
  constructor(name: N) {
    super(name, "slider");
  }

  /**
   * Sets the slider name.
   *
   * @param name - Unique name for this slider.
   * @returns This builder for method chaining.
   */
  sliderName(name: string): this {
    return this.setProp("slider_name", name);
  }

  /**
   * Sets the number of steps.
   *
   * @param value - Step count (0 = continuous).
   * @returns This builder for method chaining.
   */
  steps(value: number): this {
    return this.setProp("slider_steps", value);
  }

  /**
   * Sets the slider direction.
   *
   * @param value - "horizontal" or "vertical".
   * @returns This builder for method chaining.
   */
  direction(value: "horizontal" | "vertical"): this {
    return this.setProp("slider_direction", value);
  }

  /**
   * Sets the slider box control.
   *
   * @param name - Child control for slider thumb.
   * @returns This builder for method chaining.
   */
  sliderBoxControl(name: string): this {
    return this.setProp("slider_box_control", name);
  }
}
