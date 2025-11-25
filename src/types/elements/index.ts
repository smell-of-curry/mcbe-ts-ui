/**
 * Bedrock UI Generator - Elements Index
 * 
 * Re-exports all element type definitions.
 */

// Base types
export * from "./base";

// Element types
export * from "./panel";
export * from "./stack_panel";
export * from "./grid";
export * from "./label";
export * from "./image";
export * from "./button";
export * from "./toggle";
export * from "./dropdown";
export * from "./slider";
export * from "./slider_box";
export * from "./edit_box";
export * from "./scroll_view";
export * from "./scrollbar_box";
export * from "./factory";
export * from "./screen";
export * from "./custom";
export * from "./selection_wheel";
export * from "./input_panel";

// ============================================================================
// Union of All Element Types
// ============================================================================

import type { PanelProperties } from "./panel";
import type { StackPanelProperties } from "./stack_panel";
import type { GridProperties } from "./grid";
import type { LabelProperties } from "./label";
import type { ImageProperties } from "./image";
import type { ButtonProperties } from "./button";
import type { ToggleProperties } from "./toggle";
import type { DropdownProperties } from "./dropdown";
import type { SliderProperties } from "./slider";
import type { SliderBoxProperties } from "./slider_box";
import type { EditBoxProperties } from "./edit_box";
import type { ScrollViewProperties } from "./scroll_view";
import type { ScrollbarBoxProperties } from "./scrollbar_box";
import type { FactoryProperties } from "./factory";
import type { ScreenProperties } from "./screen";
import type { CustomProperties } from "./custom";
import type { SelectionWheelProperties } from "./selection_wheel";
import type { InputPanelProperties } from "./input_panel";

/**
 * Union of all possible UI element property types.
 * 
 * Use this when you need to accept any element type.
 * For type-specific operations, use the individual property interfaces.
 */
export type UIElement =
  | PanelProperties
  | StackPanelProperties
  | GridProperties
  | LabelProperties
  | ImageProperties
  | ButtonProperties
  | ToggleProperties
  | DropdownProperties
  | SliderProperties
  | SliderBoxProperties
  | EditBoxProperties
  | ScrollViewProperties
  | ScrollbarBoxProperties
  | FactoryProperties
  | ScreenProperties
  | CustomProperties
  | SelectionWheelProperties
  | InputPanelProperties;

