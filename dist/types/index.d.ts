/**
 * Bedrock UI Generator - Types Index
 *
 * Complete type definitions for Minecraft Bedrock JSON UI system.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */
export { type PixelValue, type PixelString, type PercentParent, type PercentChildren, type PercentChildMax, type PercentSibling, type PercentHeight, type PercentWidth, type PercentValue, type PercentSuffix, type SizeExpression, type FillValue, type DefaultValue, type SizeValue, type Size, type OffsetValue, type Offset, type Anchor, type Orientation, type TextAlignment, type FontType, type FontSize, type ClipDirection, type Color, type ColorWithAlpha, type NinesliceInfo, type VariableRef, type BindingRef, } from "./common";
export { type BindingType, type BindingCondition, type Binding, createGlobalBinding, createViewBinding, createCollectionBinding, createVisibilityBinding, createEnabledBinding, } from "./bindings";
export { type ArrayOperation, type Modification, insertBack, insertFront, insertAfter, insertBefore, removeControl, replaceControl, } from "./modifications";
export { type AnimationType, type AnimationEasing, type Animation, } from "./animations";
export { type MappingType, type InputModeCondition, type MappingScope, type ButtonMapping, FROM_BUTTONS, TO_BUTTONS, globalMapping, focusedMapping, } from "./button_mappings";
export { type ElementType, type ControlReference, type BaseUIProperties, type PanelProperties, type StackPanelProperties, type GridProperties, type GridRescalingType, type GridFillDirection, type LabelProperties, type ImageProperties, type TiledMode, type ButtonProperties, type ToggleProperties, type DropdownProperties, type SliderProperties, type SliderDirection, type SliderBoxProperties, type EditBoxProperties, type TextEditType, type ScrollViewProperties, type ScrollbarBoxProperties, type DraggableDirection, type FactoryProperties, type ScreenProperties, type CustomProperties, type CustomRenderer, type SelectionWheelProperties, type InputPanelProperties, type UIElement, isPanel, isStackPanel, isGrid, isLabel, isImage, isButton, isToggle, isDropdown, isSlider, isSliderBox, isEditBox, isScrollView, isScrollbarBox, isFactory, isScreen, isCustom, isSelectionWheel, isInputPanel, } from "./elements";
export { type UINamespace, type UIDefs, type GlobalVariables, type ElementRef, type ExtensionRef, } from "./namespace";
//# sourceMappingURL=index.d.ts.map