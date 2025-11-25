/**
 * Bedrock UI Generator - Edit Box Element Type
 *
 * Edit boxes are text input fields that allow users to
 * type and edit text content.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#text-edit
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Text Type Enum
// ============================================================================

/**
 * Allowed character types for text input.
 *
 * - `"ExtendedASCII"` - Extended ASCII characters (most text)
 * - `"IdentifierChars"` - Valid identifier characters (letters, numbers, underscore)
 * - `"NumberChars"` - Only numeric characters
 */
export type TextEditType = "ExtendedASCII" | "IdentifierChars" | "NumberChars";

// ============================================================================
// Edit Box Properties
// ============================================================================

/**
 * Properties specific to edit box (text edit) elements.
 *
 * Edit boxes are text input fields that:
 * - Accept user keyboard input
 * - Support placeholder text
 * - Can limit input length and character types
 * - Handle virtual keyboards on mobile
 *
 * @example Basic text input:
 * ```typescript
 * {
 *   type: "edit_box",
 *   text_box_name: "username_input",
 *   max_length: 20,
 *   text_control: "text_display",
 *   place_holder_control: "placeholder"
 * }
 * ```
 *
 * @example Numeric input:
 * ```typescript
 * {
 *   type: "edit_box",
 *   text_box_name: "port_input",
 *   text_type: "NumberChars",
 *   max_length: 5
 * }
 * ```
 */
export interface EditBoxProperties extends BaseUIProperties {
  /**
   * Element type - must be "edit_box".
   */
  type?: "edit_box";

  /**
   * Unique name for this text box.
   * Used for bindings and state management.
   *
   * @example "search_box", "username_input"
   */
  text_box_name?: string;

  /**
   * Collection name for grid-based text edits.
   * Used when edit box is in a grid template.
   *
   * @example "chat_messages"
   */
  text_edit_box_grid_collection_name?: string;

  /**
   * Whether to constrain text to the element bounds.
   * When true, text doesn't overflow visually.
   *
   * @default false
   */
  constrain_to_rect?: boolean;

  /**
   * Whether to allow newlines (multi-line input).
   * When true, Enter creates a new line instead of submitting.
   *
   * @default false
   */
  enabled_newline?: boolean;

  /**
   * Type of characters allowed in the input.
   *
   * @default "ExtendedASCII"
   */
  text_type?: TextEditType;

  /**
   * Maximum number of characters allowed.
   * 0 or omitted means no limit.
   *
   * @example 20, 100, 256
   */
  max_length?: number;

  /**
   * Name of the child control that displays the text.
   * Usually a label element.
   *
   * @example "text_display", "input_text"
   */
  text_control?: string;

  /**
   * Name of the child control for placeholder text.
   * Shown when input is empty.
   *
   * @example "placeholder", "hint_text"
   */
  place_holder_control?: string;

  /**
   * Whether the edit box can be deselected.
   * When false, it stays focused until another element takes focus.
   *
   * @default true
   */
  can_be_deselected?: boolean;

  /**
   * Whether to always listen for input.
   * When true, captures input even when not focused.
   *
   * @default false
   */
  always_listening?: boolean;

  /**
   * Control for virtual keyboard buffer.
   * Used on mobile/touch devices.
   */
  virtual_keyboard_buffer_control?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is an edit box.
 */
export function isEditBox(
  element: BaseUIProperties
): element is EditBoxProperties {
  return element.type === "edit_box";
}
