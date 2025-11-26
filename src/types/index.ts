/**
 * Bedrock UI Generator - Types Index
 *
 * Complete type definitions for Minecraft Bedrock JSON UI system.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */

// ============================================================================
// Common Types
// ============================================================================

export {
  // Size types
  type PixelValue,
  type PixelString,
  type PercentParent,
  type PercentChildren,
  type PercentChildMax,
  type PercentSibling,
  type PercentHeight,
  type PercentWidth,
  type PercentValue,
  type PercentSuffix,
  type SizeExpression,
  type FillValue,
  type DefaultValue,
  type SizeValue,
  type Size,

  // Offset types
  type OffsetValue,
  type Offset,

  // Anchor & Layout
  type Anchor,
  type Orientation,

  // Text
  type TextAlignment,
  type FontType,
  type FontSize,

  // Clipping
  type ClipDirection,

  // Color
  type Color,
  type ColorWithAlpha,

  // Nineslice
  type NinesliceInfo,

  // Variable references
  type VariableRef,
  type BindingRef,
} from "./common";

// ============================================================================
// Binding Types
// ============================================================================

export {
  type BindingType,
  type BindingCondition,
  type Binding,
  createGlobalBinding,
  createViewBinding,
  createCollectionBinding,
  createVisibilityBinding,
  createEnabledBinding,
} from "./bindings";

// ============================================================================
// Modification Types
// ============================================================================

export {
  type ArrayOperation,
  type Modification,
  insertBack,
  insertFront,
  insertAfter,
  insertBefore,
  removeControl,
  replaceControl,
} from "./modifications";

// ============================================================================
// Animation Types
// ============================================================================

export {
  type AnimationType,
  type AnimationEasing,
  type Animation,
} from "./animations";

// ============================================================================
// Button Mapping Types
// ============================================================================

export {
  type MappingType,
  type InputModeCondition,
  type MappingScope,
  type ButtonMapping,
  FROM_BUTTONS,
  TO_BUTTONS,
  globalMapping,
  focusedMapping,
} from "./button_mappings";

// ============================================================================
// Element Types
// ============================================================================

export {
  // Base types
  type ElementType,
  type ControlReference,
  type BaseUIProperties,

  // Element types
  type PanelProperties,
  type StackPanelProperties,
  type GridProperties,
  type GridRescalingType,
  type GridFillDirection,
  type LabelProperties,
  type ImageProperties,
  type TiledMode,
  type ButtonProperties,
  type ToggleProperties,
  type DropdownProperties,
  type SliderProperties,
  type SliderDirection,
  type SliderBoxProperties,
  type EditBoxProperties,
  type TextEditType,
  type ScrollViewProperties,
  type ScrollbarBoxProperties,
  type DraggableDirection,
  type FactoryProperties,
  type ScreenProperties,
  type CustomProperties,
  type CustomRenderer,
  type SelectionWheelProperties,
  type InputPanelProperties,

  // Union type
  type UIElement,

  // Type guards
  isPanel,
  isStackPanel,
  isGrid,
  isLabel,
  isImage,
  isButton,
  isToggle,
  isDropdown,
  isSlider,
  isSliderBox,
  isEditBox,
  isScrollView,
  isScrollbarBox,
  isFactory,
  isScreen,
  isCustom,
  isSelectionWheel,
  isInputPanel,
} from "./elements";

// ============================================================================
// Namespace Types
// ============================================================================

export {
  type UINamespace,
  type UIDefs,
  type GlobalVariables,
  type ElementRef,
  type ExtensionRef,
} from "./namespace";
