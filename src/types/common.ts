/**
 * Bedrock UI Generator - Common Types
 *
 * Shared type definitions used across multiple UI elements.
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */

// ============================================================================
// Size Value Types
// ============================================================================

/**
 * A raw pixel value (integer or float).
 * Represents absolute positioning in screen pixels.
 *
 * @example 100, 50.5, 0
 */
export type PixelValue = number;

/**
 * Pixel value as a string with 'px' suffix.
 * Useful when combining with percentage values in expressions.
 *
 * @example "100px", "50px", "12px"
 */
export type PixelString = `${number}px`;

/**
 * Percentage relative to the parent element's width/height.
 *
 * @example "100%", "50%", "75%"
 */
export type PercentParent = `${number}%`;

/**
 * Percentage of the total width/height of all children elements.
 * Useful for containers that should size based on their content.
 *
 * @example "100%c" - 100% of children's total size
 */
export type PercentChildren = `${number}%c`;

/**
 * Percentage of the width/height of the largest visible child element.
 * Useful when you want to match the biggest child's dimensions.
 *
 * @example "100%cm" - 100% of the biggest child's size
 */
export type PercentChildMax = `${number}%cm`;

/**
 * Percentage of the sibling element's width/height.
 * Useful for elements that need to match a sibling's size.
 *
 * @example "100%sm" - 100% of sibling's size
 */
export type PercentSibling = `${number}%sm`;

/**
 * Percentage of the element's own height.
 * Useful for maintaining aspect ratios (e.g., width based on height).
 *
 * @example "100%y" - 100% of this element's height
 */
export type PercentHeight = `${number}%y`;

/**
 * Percentage of the element's own width.
 * Useful for maintaining aspect ratios (e.g., height based on width).
 *
 * @example "100%x" - 100% of this element's width
 */
export type PercentWidth = `${number}%x`;

/**
 * All percentage-based size values.
 */
export type PercentValue =
  | PercentParent
  | PercentChildren
  | PercentChildMax
  | PercentSibling
  | PercentHeight
  | PercentWidth;

/**
 * Suffix for percentage-based size values.
 *
 * - `""` (empty) - Percentage of parent
 * - `"c"` - Percentage of children total
 * - `"cm"` - Percentage of biggest child
 * - `"sm"` - Percentage of sibling
 * - `"y"` - Percentage of element height
 * - `"x"` - Percentage of element width
 */
export type PercentSuffix = "" | "c" | "cm" | "sm" | "y" | "x";

/**
 * Combined size expression allowing addition/subtraction of values.
 * Useful for precise positioning like "75% + 12px" or "100% - 20px".
 *
 * @example "75% + 12px", "100% - 20px", "50%c + 10px", "100%sm - 5px"
 */
export type SizeExpression = `${number}%${PercentSuffix} ${
  | "+"
  | "-"} ${number}px`;

/**
 * Special "fill" value that expands to remaining space in parent.
 * The element will take up whatever space is left after other elements.
 *
 * @example In a stack panel, "fill" makes the element expand to remaining space
 */
export type FillValue = "fill";

/**
 * Default size value, equivalent to "100%".
 */
export type DefaultValue = "default";

/**
 * Complete size value type for a single dimension (width or height).
 *
 * Position of the UI element is TopLeft based, meaning coordinates [0, 0]
 * start at the top left of the screen/parent element.
 *
 * @example
 * - `100` - 100 pixels
 * - `"100px"` - 100 pixels (string form, for expressions)
 * - `"50%"` - 50% of parent's size
 * - `"100%c"` - 100% of children's total size
 * - `"100%cm"` - 100% of biggest child's size
 * - `"100%sm"` - 100% of sibling's size
 * - `"50%y"` - 50% of this element's height
 * - `"50%x"` - 50% of this element's width
 * - `"fill"` - Expand to remaining space
 * - `"default"` - Default value (100%)
 * - `"75% + 12px"` - Combined expression
 */
export type SizeValue =
  | PixelValue
  | PixelString
  | PercentValue
  | SizeExpression
  | FillValue
  | DefaultValue;

/**
 * Size tuple for [width, height] of an element.
 * Each dimension can use any SizeValue type.
 *
 * @example
 * - `[100, 50]` - 100x50 pixels
 * - `["100%", "50%"]` - Full width, half height of parent
 * - `["100%c", "100%c"]` - Size to fit all children
 * - `[200, "fill"]` - Fixed width, fill remaining height
 */
export type Size = [SizeValue, SizeValue];

// ============================================================================
// Offset Types
// ============================================================================

/**
 * Negative percentage of parent element.
 *
 * @example "-50%", "-10%", "-25.5%"
 */
export type NegativePercentParent = `-${number}%`;

/**
 * Any percentage string (positive or negative, with or without decimals).
 * This is a more permissive type for cases where strict typing is too restrictive.
 *
 * @example "50%", "-25%", "33.33%", "-100%"
 */
export type AnyPercent = `${number}%` | `-${number}%`;

/**
 * Offset value for a single axis (X or Y).
 *
 * Position is relative to the parent element and TopLeft based,
 * meaning [0, 0] is at the top-left corner.
 *
 * @example
 * - `10` - 10 pixels offset
 * - `"10px"` - 10 pixels (string form)
 * - `"50%"` - 50% of parent's size
 * - `"-25%"` - Negative 25% of parent's size
 * - `"50%x"` - 50% of element's width
 * - `"50%y"` - 50% of element's height
 */
export type OffsetValue =
  | PixelValue
  | PixelString
  | PercentParent
  | NegativePercentParent
  | PercentWidth
  | PercentHeight
  | SizeExpression
  | AnyPercent;

/**
 * Offset tuple for [x, y] position relative to parent.
 * Positive X moves right, positive Y moves down.
 *
 * @example
 * - `[10, 20]` - 10px right, 20px down
 * - `["50%", "50%"]` - Center of parent (with center anchor)
 * - `[0, "100% - 20px"]` - 20px from bottom
 */
export type Offset = [OffsetValue, OffsetValue];

// ============================================================================
// Anchor Types
// ============================================================================

/**
 * Anchor position for element alignment.
 *
 * Anchors determine the reference point for positioning an element.
 * `anchor_from` sets the parent's reference point, `anchor_to` sets
 * the element's reference point. When both match, the element aligns
 * that corner/edge to the parent's same corner/edge.
 *
 * @example
 * - `"center"` - Center of the element/parent
 * - `"top_left"` - Top-left corner
 * - `"bottom_middle"` - Bottom edge, horizontally centered
 */
export type Anchor =
  | "top_left"
  | "top_middle"
  | "top_right"
  | "left_middle"
  | "center"
  | "right_middle"
  | "bottom_left"
  | "bottom_middle"
  | "bottom_right";

// ============================================================================
// Orientation Type
// ============================================================================

/**
 * Orientation for layout containers like stack panels.
 *
 * - `"horizontal"` - Children arranged left to right
 * - `"vertical"` - Children arranged top to bottom (default)
 */
export type Orientation = "horizontal" | "vertical";

// ============================================================================
// Text Types
// ============================================================================

/**
 * Text alignment within a label element.
 *
 * - `"left"` - Text aligned to left edge
 * - `"center"` - Text centered horizontally
 * - `"right"` - Text aligned to right edge
 */
export type TextAlignment = "left" | "center" | "right";

/**
 * Font type/family for text rendering.
 *
 * - `"default"` - Standard Minecraft font
 * - `"smooth"` - Smoother rendering
 * - `"rune"` - Enchanting table style font
 * - `"unicode"` - Unicode-compatible font
 * - `"MinecraftTen"` - Minecraft 10th anniversary font
 * - `"MinecraftSeven"` - Alternative Minecraft font
 */
export type FontType =
  | "default"
  | "smooth"
  | "rune"
  | "unicode"
  | "MinecraftTen"
  | "MinecraftSeven";

/**
 * Predefined font size presets.
 *
 * - `"small"` - Smaller than normal text
 * - `"normal"` - Default text size
 * - `"large"` - Larger text
 * - `"extra_large"` - Largest preset size
 */
export type FontSize = "small" | "normal" | "large" | "extra_large";

// ============================================================================
// Clipping Types
// ============================================================================

/**
 * Direction for clipping/progress animations.
 *
 * Used with `clip_ratio` to create progress bar effects or
 * reveal animations from a specific direction.
 *
 * - `"left"` - Clip from left edge
 * - `"right"` - Clip from right edge
 * - `"up"` - Clip from top edge
 * - `"down"` - Clip from bottom edge
 * - `"center"` - Clip from center outward
 */
export type ClipDirection = "left" | "right" | "up" | "down" | "center";

// ============================================================================
// Color Types
// ============================================================================

/**
 * RGB color as [red, green, blue] with values from 0 to 1.
 *
 * @example
 * - `[1, 0, 0]` - Pure red
 * - `[0, 1, 0]` - Pure green
 * - `[0.5, 0.5, 0.5]` - Medium gray
 * - `[1, 1, 1]` - White
 */
export type Color = [number, number, number];

/**
 * RGBA color as [red, green, blue, alpha] with values from 0 to 1.
 * Alpha of 0 is fully transparent, 1 is fully opaque.
 *
 * @example
 * - `[1, 0, 0, 1]` - Opaque red
 * - `[0, 0, 0, 0.5]` - Semi-transparent black
 */
export type ColorWithAlpha = [number, number, number, number];

// ============================================================================
// Nineslice Types
// ============================================================================

/**
 * Nineslice configuration for 9-slice texture scaling.
 *
 * 9-slice allows textures to scale without distorting corners/edges.
 * Can be a single number (same border on all sides) or
 * [top, right, bottom, left] for individual borders.
 *
 * @example
 * - `4` - 4 pixel border on all sides
 * - `[4, 8, 4, 8]` - Different horizontal/vertical borders
 */
export type NinesliceInfo = [number, number, number, number] | number;

// ============================================================================
// Variable Reference Type
// ============================================================================

/**
 * A variable reference starting with $.
 * Variables can be defined and overridden when extending elements.
 *
 * @example "$button_color", "$panel_size", "$my_variable"
 */
export type VariableRef = `$${string}`;

/**
 * A binding reference starting with #.
 * Bindings connect UI elements to game data.
 *
 * @example "#player_health", "#title_text", "#is_visible"
 */
export type BindingRef = `#${string}`;
