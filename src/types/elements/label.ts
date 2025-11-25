/**
 * Bedrock UI Generator - Label Element Type
 *
 * Labels display text content with various styling options.
 * They support static text, bound text from game data,
 * localized strings, and rich formatting.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#text
 */

import type { BaseUIProperties } from "./base";
import type { Color, TextAlignment, FontType, FontSize } from "../common";

// ============================================================================
// Label Properties
// ============================================================================

/**
 * Properties specific to label (text) elements.
 *
 * Labels are text display elements that:
 * - Show static or dynamic text content
 * - Support various fonts and sizes
 * - Can have shadows and colors
 * - Support text alignment and wrapping
 * - Can be localized using translation keys
 *
 * @example Static text label:
 * ```typescript
 * {
 *   type: "label",
 *   text: "Hello World!",
 *   color: [1, 1, 0],
 *   shadow: true,
 *   anchor_from: "center",
 *   anchor_to: "center"
 * }
 * ```
 *
 * @example Bound text label:
 * ```typescript
 * {
 *   type: "label",
 *   text: "#player_name",
 *   bindings: [
 *     {
 *       binding_type: "global",
 *       binding_name: "#player_name",
 *       binding_name_override: "#player_name"
 *     }
 *   ]
 * }
 * ```
 *
 * @example Localized text:
 * ```typescript
 * {
 *   type: "label",
 *   text: "gui.ok",  // Translated to "OK" or equivalent
 *   localize: true
 * }
 * ```
 */
export interface LabelProperties extends BaseUIProperties {
  /**
   * Element type - must be "label".
   */
  type?: "label";

  /**
   * The text content to display.
   *
   * Can be:
   * - Static string: `"Hello World"`
   * - Binding reference: `"#player_name"`
   * - Localization key: `"gui.ok"` (with localize: true)
   * - Variable reference: `"$button_text"`
   *
   * Supports Minecraft formatting codes (§) for colors and styles.
   *
   * @example "Hello", "#title_text", "container.inventory"
   */
  text?: string;

  /**
   * Text color as RGB array [r, g, b] with values 0-1.
   * Can also be a variable reference string.
   *
   * @example [1, 0, 0] (red), [1, 1, 1] (white), "$title_color"
   */
  color?: Color | string;

  /**
   * Color when the element is in locked/disabled state.
   */
  locked_color?: Color;

  /**
   * Whether to render a drop shadow behind the text.
   * Shadows improve readability on varied backgrounds.
   *
   * @default false
   */
  shadow?: boolean;

  /**
   * Whether to hide hyphens in hyphenated words.
   * Useful for certain localized text.
   *
   * @default false
   */
  hide_hyphen?: boolean;

  /**
   * Controls to notify when text is truncated with ellipses.
   * TODO: Figure out exact notification mechanism
   */
  notify_on_ellipses?: string[];

  /**
   * Whether to apply the profanity filter to this text.
   * Enabled by default for user-generated content.
   *
   * @default true (for user content)
   */
  enable_profanity_filter?: boolean;

  /**
   * Alpha value when in locked/disabled state.
   */
  locked_alpha?: number;

  /**
   * Predefined font size.
   *
   * @default "normal"
   */
  font_size?: FontSize;

  /**
   * Scale multiplier for font size.
   * 1.0 is normal, 2.0 is double size, 0.5 is half.
   *
   * @default 1.0
   */
  font_scale_factor?: number;

  /**
   * Whether to look up the text in the localization files.
   * When true, `text` is treated as a translation key.
   *
   * @default false
   */
  localize?: boolean;

  /**
   * Extra padding between lines of text in pixels.
   *
   * @default 0
   */
  line_padding?: number;

  /**
   * Font family/type to use.
   *
   * @default "default"
   */
  font_type?: FontType;

  /**
   * Fallback font if primary font is unavailable.
   */
  backup_font_type?: FontType;

  /**
   * Horizontal text alignment within the label bounds.
   *
   * @default "left"
   */
  text_alignment?: TextAlignment;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a label.
 */
export function isLabel(element: BaseUIProperties): element is LabelProperties {
  return element.type === "label";
}
