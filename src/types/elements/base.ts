/**
 * Bedrock UI Generator - Base Element Types
 *
 * Base properties shared by all UI element types.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#control
 */

import type { Size, Offset, Anchor, ClipDirection } from "../common";
import type { Binding } from "../bindings";
import type { ButtonMapping } from "../button_mappings";
import type { Modification } from "../modifications";

// ============================================================================
// Element Type Enum
// ============================================================================

/**
 * All available UI element types.
 *
 * - `"panel"` - Basic container, most common element type
 * - `"stack_panel"` - Container that stacks children horizontally or vertically
 * - `"grid"` - Grid layout for repeated items (inventory, buttons)
 * - `"label"` - Text display element
 * - `"image"` - Image/texture display
 * - `"button"` - Clickable button with states
 * - `"toggle"` - Checkbox/radio button
 * - `"dropdown"` - Dropdown menu
 * - `"slider"` - Sliding value selector
 * - `"slider_box"` - The draggable part of a slider
 * - `"edit_box"` - Text input field
 * - `"scroll_view"` - Scrollable container
 * - `"scrollbar_box"` - Scrollbar thumb element
 * - `"factory"` - Dynamic element creation based on data
 * - `"screen"` - Root screen element
 * - `"custom"` - Custom renderer (native code rendering)
 * - `"selection_wheel"` - Radial selection menu
 * - `"input_panel"` - Panel that captures input events
 */
export type ElementType =
  | "panel"
  | "stack_panel"
  | "grid"
  | "label"
  | "image"
  | "button"
  | "toggle"
  | "dropdown"
  | "slider"
  | "slider_box"
  | "edit_box"
  | "scroll_view"
  | "scrollbar_box"
  | "factory"
  | "screen"
  | "custom"
  | "selection_wheel"
  | "input_panel";

// ============================================================================
// Control Reference Type
// ============================================================================

/**
 * A reference to a child control within a controls array.
 *
 * The key is the control name, optionally with @base for extension.
 * The value contains property overrides.
 *
 * @example
 * ```typescript
 * // Simple reference
 * { "my_panel": {} }
 *
 * // Reference with extension
 * { "my_button@common.button": { size: [100, 30] } }
 *
 * // Reference to another namespace
 * { "hud_element@my_hud.main": {} }
 * ```
 */
export type ControlReference = {
  [key: string]: Partial<BaseUIProperties>;
};

// ============================================================================
// Base UI Properties
// ============================================================================

/**
 * Common properties available on all UI element types.
 *
 * These properties control layout, visibility, bindings, and behavior
 * that apply universally to any element.
 */
export interface BaseUIProperties {
  // -------------------------------------------------------------------------
  // Element Type
  // -------------------------------------------------------------------------

  /**
   * The type of UI element to create.
   * Determines available properties and rendering behavior.
   *
   * If not specified, defaults to "panel".
   */
  type?: ElementType;

  // -------------------------------------------------------------------------
  // Layout & Position
  // -------------------------------------------------------------------------

  /**
   * Size of the element as [width, height].
   *
   * @see Size for all available value types
   * @example [100, 50], ["100%", "100%"], ["fill", 30]
   */
  size?: Size;

  /**
   * Minimum size constraint as [width, height].
   * Element won't shrink below this size.
   */
  min_size?: Size;

  /**
   * Maximum size constraint as [width, height].
   * Element won't grow beyond this size.
   */
  max_size?: Size;

  /**
   * Position offset from the anchor point as [x, y].
   * Positive X moves right, positive Y moves down.
   *
   * @see Offset for all available value types
   * @example [10, 20], ["50%", 0], ["100% - 10px", 5]
   */
  offset?: Offset;

  /**
   * The anchor point on the parent element.
   * This is where the element's anchor_to point attaches.
   *
   * @example "center", "top_left", "bottom_middle"
   */
  anchor_from?: Anchor;

  /**
   * The anchor point on this element.
   * This point attaches to the parent's anchor_from point.
   *
   * @example "center", "top_left", "bottom_middle"
   */
  anchor_to?: Anchor;

  /**
   * Z-order layer for rendering.
   * Higher values render on top of lower values.
   *
   * @default 0
   */
  layer?: number;

  // -------------------------------------------------------------------------
  // Visibility & State
  // -------------------------------------------------------------------------

  /**
   * Whether the element is visible.
   * Can be a boolean or a binding reference.
   *
   * @default true
   * @example true, false, "#is_visible"
   */
  visible?: boolean | string;

  /**
   * Whether the element is enabled/interactive.
   * Disabled elements may appear grayed out.
   *
   * @default true
   * @example true, false, "#is_enabled"
   */
  enabled?: boolean | string;

  /**
   * Opacity/transparency of the element (0-1).
   * 0 is fully transparent, 1 is fully opaque.
   *
   * @default 1.0
   */
  alpha?: number | string;

  /**
   * Whether alpha changes propagate to child elements.
   *
   * @default true
   */
  propagate_alpha?: boolean;

  /**
   * Whether this element should be ignored in layout calculations.
   * Ignored elements don't take up space.
   *
   * @default false
   */
  ignored?: boolean;

  // -------------------------------------------------------------------------
  // Clipping
  // -------------------------------------------------------------------------

  /**
   * Whether children outside this element's bounds are clipped.
   * Useful for scroll views and masked content.
   *
   * @default false
   */
  clips_children?: boolean;

  /**
   * Whether this element can be clipped by its parent.
   *
   * @default true
   */
  allow_clipping?: boolean;

  /**
   * Offset for the clipping region as [x, y].
   */
  clip_offset?: Offset;

  /**
   * Event fired when clip state changes.
   * TODO: Figure out exact event system
   */
  clip_state_change_event?: string;

  /**
   * Whether clipping should be pixel-perfect.
   *
   * @default false
   */
  clip_pixelperfect?: boolean;

  /**
   * Direction for clip animations.
   * Used with clip_ratio to create reveal effects.
   */
  clip_direction?: ClipDirection;

  /**
   * Clip ratio for progressive reveal (0-1).
   * 0 = fully clipped, 1 = fully visible.
   * Animate this for progress bar effects.
   */
  clip_ratio?: number;

  // -------------------------------------------------------------------------
  // Children/Controls
  // -------------------------------------------------------------------------

  /**
   * Child controls contained within this element.
   * Controls are rendered in order (first = bottom, last = top).
   *
   * @example
   * ```typescript
   * controls: [
   *   { "background@common.panel": { size: ["100%", "100%"] } },
   *   { "title@my_ns.title_label": {} },
   *   { "content_panel": { type: "panel", size: ["100%", "fill"] } }
   * ]
   * ```
   */
  controls?: ControlReference[];

  // -------------------------------------------------------------------------
  // Bindings
  // -------------------------------------------------------------------------

  /**
   * Data bindings that connect this element to game state.
   * Bindings enable dynamic content and conditional visibility.
   *
   * @see Binding for binding structure
   */
  bindings?: Binding[];

  // -------------------------------------------------------------------------
  // Variables
  // -------------------------------------------------------------------------

  /**
   * Variable definitions that can be overridden by child elements.
   * Variables are prefixed with $ in JSON.
   *
   * TODO: Figure out exact structure for array form
   */
  variables?: Record<string, unknown>[];

  // -------------------------------------------------------------------------
  // Button Mappings
  // -------------------------------------------------------------------------

  /**
   * Input mappings for controller/keyboard navigation.
   *
   * @see ButtonMapping for mapping structure
   */
  button_mappings?: ButtonMapping[];

  // -------------------------------------------------------------------------
  // Modifications
  // -------------------------------------------------------------------------

  /**
   * Modifications to apply to this element's controls array.
   * Used primarily when extending vanilla UI elements.
   *
   * @see Modification for modification structure
   */
  modifications?: Modification[];

  // -------------------------------------------------------------------------
  // Animations
  // -------------------------------------------------------------------------

  /**
   * Animation references to apply to this element.
   * Animations are defined at namespace level and referenced here.
   *
   * @example ["@my_namespace.fade_in", "@common.button_hover"]
   */
  anims?: string[];

  // -------------------------------------------------------------------------
  // Property Bag
  // -------------------------------------------------------------------------

  /**
   * Custom properties passed to the element.
   * Useful for custom renderers and special elements.
   *
   * @example { "#my_custom_data": "value" }
   */
  property_bag?: Record<string, unknown>;

  // -------------------------------------------------------------------------
  // Focus Properties
  // -------------------------------------------------------------------------

  /**
   * Whether this element can receive focus.
   *
   * @default false (true for interactive elements)
   */
  focus_enabled?: boolean;

  /**
   * Whether focus wraps around in this container.
   * When true, navigating past the last element wraps to first.
   *
   * @default false
   */
  focus_wrap_enabled?: boolean;

  /**
   * Whether this element acts as a focus magnet.
   * Focus magnets attract focus when nearby.
   *
   * @default false
   */
  focus_magnet_enabled?: boolean;

  /**
   * Unique identifier for focus navigation.
   * Used by focus_change_* properties.
   */
  focus_identifier?: string;

  /**
   * Element to focus when pressing down.
   * Reference by focus_identifier.
   */
  focus_change_down?: string;

  /**
   * Element to focus when pressing up.
   * Reference by focus_identifier.
   */
  focus_change_up?: string;

  /**
   * Element to focus when pressing left.
   * Reference by focus_identifier.
   */
  focus_change_left?: string;

  /**
   * Element to focus when pressing right.
   * Reference by focus_identifier.
   */
  focus_change_right?: string;

  /**
   * Whether this element is a focus container.
   * Focus containers manage focus navigation within them.
   *
   * @default false
   */
  focus_container?: boolean;

  /**
   * Custom focus navigation for left direction.
   * TODO: Figure out exact structure
   */
  focus_container_custom_left?: ControlReference[];

  /**
   * Custom focus navigation for right direction.
   */
  focus_container_custom_right?: ControlReference[];

  /**
   * Custom focus navigation for up direction.
   */
  focus_container_custom_up?: ControlReference[];

  /**
   * Custom focus navigation for down direction.
   */
  focus_container_custom_down?: ControlReference[];

  /**
   * Focus navigation mode for left direction.
   * - `"none"` - No special handling
   * - `"stop"` - Stop at boundary
   * - `"custom"` - Use custom navigation
   * - `"contained"` - Keep focus within container
   */
  focus_navigation_mode_left?: "none" | "stop" | "custom" | "contained";

  /** Focus navigation mode for right direction. */
  focus_navigation_mode_right?: "none" | "stop" | "custom" | "contained";

  /** Focus navigation mode for up direction. */
  focus_navigation_mode_up?: "none" | "stop" | "custom" | "contained";

  /** Focus navigation mode for down direction. */
  focus_navigation_mode_down?: "none" | "stop" | "custom" | "contained";

  /**
   * Priority for default focus.
   * Higher values get focus first.
   *
   * @default 0
   */
  default_focus_precedence?: number;

  // -------------------------------------------------------------------------
  // Sound Properties
  // -------------------------------------------------------------------------

  /**
   * Sound to play on interaction.
   *
   * @example "random.click", "ui.click"
   */
  sound_name?: string;

  /**
   * Pitch multiplier for the sound (0.5 = half speed, 2 = double).
   *
   * @default 1.0
   */
  sound_pitch?: number;

  /**
   * Volume multiplier for the sound (0-1).
   *
   * @default 1.0
   */
  sound_volume?: number;

  // -------------------------------------------------------------------------
  // TTS (Text-to-Speech) Properties
  // -------------------------------------------------------------------------

  /**
   * Text-to-speech name for accessibility.
   * Read by screen readers.
   */
  tts_name?: string;

  /**
   * TTS header for the control type.
   */
  tts_control_header?: string;

  /**
   * TTS section header.
   */
  tts_section_header?: string;

  /**
   * Priority for TTS control type ordering.
   */
  tts_control_type_order_priority?: number;

  /**
   * Priority for TTS index ordering.
   */
  tts_index_priority?: number;

  /**
   * TTS text when toggle is on.
   */
  tts_toggle_on?: string;

  /**
   * TTS text when toggle is off.
   */
  tts_toggle_off?: string;

  /**
   * Override the control value for TTS.
   */
  tts_override_control_value?: string;

  /**
   * Whether to inherit TTS info from siblings.
   *
   * @default false
   */
  tts_inherit_siblings?: boolean;

  /**
   * Priority for TTS value ordering.
   */
  tts_value_order_priority?: number;

  /**
   * Whether to play TTS on unchanged focus.
   *
   * @default false
   */
  tts_play_on_unchanged_focus_control?: boolean;

  /**
   * Whether to ignore count in TTS.
   *
   * @default false
   */
  tts_ignore_count?: boolean;

  /**
   * Whether to ignore subsections in TTS.
   *
   * @default false
   */
  tts_ignore_subsections?: boolean;

  /**
   * Whether to skip TTS message.
   *
   * @default false
   */
  tts_skip_message?: boolean;

  /**
   * TTS text when value changes.
   */
  tts_value_changed?: string;

  // -------------------------------------------------------------------------
  // Common Override Properties
  // -------------------------------------------------------------------------
  // These properties can be overridden on any element type through control
  // references, even if they're technically type-specific.

  /**
   * Color tint for images (RGB or RGBA).
   * Also used for label text color.
   * Can be set in control references on any element type for convenience.
   *
   * @example [1, 0, 0], [0.5, 0.5, 0.5, 1.0], "white", "$button_color"
   */
  color?: [number, number, number] | [number, number, number, number] | string;

  /**
   * Texture path for images.
   * Can be set in control references for image elements.
   */
  texture?: string;

  /**
   * UV coordinates for images [x, y].
   * Can be set in control references for image elements.
   */
  uv?: [number, number] | string;

  /**
   * UV size for images [width, height].
   * Can be set in control references for image elements.
   */
  uv_size?: [number, number];

  /**
   * Text content for labels.
   * Can be set in control references for label elements.
   */
  text?: string;

  /**
   * Font scale factor for labels.
   */
  font_scale_factor?: number | string;

  /**
   * Whether to localize text.
   */
  localize?: boolean;

  /**
   * Custom renderer for custom elements.
   */
  renderer?: string;

  /**
   * Stack panel orientation.
   */
  orientation?: "horizontal" | "vertical";

  // -------------------------------------------------------------------------
  // Variable Properties ($ prefixed)
  // -------------------------------------------------------------------------

  /**
   * Allow any variable properties (prefixed with $).
   * Variables can be defined on parent elements and overridden by children.
   *
   * @example "$button_color", "$panel_size", "$is_enabled"
   */
  [key: `$${string}`]: unknown;
}
