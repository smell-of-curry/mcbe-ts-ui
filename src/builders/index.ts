/**
 * Bedrock UI Generator - Builders Index
 *
 * Re-exports all builders and factory functions for convenient imports.
 *
 * @module builders
 *
 * @example Import specific builders
 * ```typescript
 * import { PanelBuilder, LabelBuilder, namespace } from "./builders";
 * ```
 *
 * @example Import factory functions
 * ```typescript
 * import { panel, label, image, ref, namespace } from "./builders";
 * ```
 */

// Element builders
export {
  ElementBuilder,
  PanelBuilder,
  StackPanelBuilder,
  GridBuilder,
  LabelBuilder,
  ImageBuilder,
  ButtonBuilder,
  ToggleBuilder,
  CustomBuilder,
  FactoryBuilder,
  ScrollViewBuilder,
  ScreenBuilder,
  InputPanelBuilder,
  EditBoxBuilder,
  SliderBuilder,
} from "./element";

// Namespace builder
export {
  NamespaceBuilder,
  namespace,
  ref,
  extend,
  fromBuilder,
  nsRef,
} from "./namespace";

// ============================================================================
// Factory Functions
// ============================================================================

import {
  PanelBuilder,
  StackPanelBuilder,
  GridBuilder,
  LabelBuilder,
  ImageBuilder,
  ButtonBuilder,
  ToggleBuilder,
  CustomBuilder,
  FactoryBuilder,
  ScrollViewBuilder,
  ScreenBuilder,
  InputPanelBuilder,
  EditBoxBuilder,
  SliderBuilder,
  ElementBuilder,
} from "./element";

/**
 * Creates a new panel element builder.
 *
 * Panels are the most basic container type and serve as the
 * default element type. Use them to group and organize other elements.
 *
 * @param name - The element name.
 * @returns A new PanelBuilder instance.
 *
 * @example Basic panel
 * ```typescript
 * const main = panel("main_container")
 *   .fullSize()
 *   .anchor("center");
 * ```
 *
 * @example Panel with children
 * ```typescript
 * const container = panel("content")
 *   .size(200, 100)
 *   .controls(
 *     ref("title@my_ui.title_label"),
 *     ref("body@my_ui.body_panel")
 *   );
 * ```
 */
export function panel(name: string): PanelBuilder {
  return new PanelBuilder(name);
}

/**
 * Creates a new stack panel element builder.
 *
 * Stack panels arrange children sequentially without overlap,
 * either horizontally or vertically.
 *
 * @param name - The element name.
 * @returns A new StackPanelBuilder instance.
 *
 * @example Horizontal toolbar
 * ```typescript
 * const toolbar = stackPanel("toolbar")
 *   .horizontal()
 *   .size("100%", 32)
 *   .controls(
 *     ref("btn1@common.button"),
 *     ref("spacer"),
 *     ref("btn2@common.button")
 *   );
 * ```
 *
 * @example Vertical list
 * ```typescript
 * const menu = stackPanel("menu_items")
 *   .vertical()
 *   .size(150, "100%c");
 * ```
 */
export function stackPanel(name: string): StackPanelBuilder {
  return new StackPanelBuilder(name);
}

/**
 * Creates a new grid element builder.
 *
 * Grids arrange children in a 2D layout with rows and columns,
 * commonly used for inventory slots, button arrays, and repeated items.
 *
 * @param name - The element name.
 * @returns A new GridBuilder instance.
 *
 * @example Inventory grid
 * ```typescript
 * const inventory = grid("inventory_slots")
 *   .gridDimensions(9, 4)
 *   .gridItemTemplate("inventory.slot_template")
 *   .collectionName("inventory_items")
 *   .size(162, 72); // 9*18, 4*18
 * ```
 *
 * @example Button grid
 * ```typescript
 * const buttons = grid("button_grid")
 *   .gridDimensions(3, 3)
 *   .gridItemTemplate("my_ui.button_item")
 *   .maxItems(9);
 * ```
 */
export function grid(name: string): GridBuilder {
  return new GridBuilder(name);
}

/**
 * Creates a new label (text) element builder.
 *
 * Labels display text with various styling options including
 * fonts, colors, shadows, and alignment.
 *
 * @param name - The element name.
 * @returns A new LabelBuilder instance.
 *
 * @example Static text
 * ```typescript
 * const title = label("title")
 *   .text("Hello World!")
 *   .color([1, 1, 0])
 *   .shadow()
 *   .anchor("center");
 * ```
 *
 * @example Bound text
 * ```typescript
 * const playerName = label("player_name")
 *   .text("#player_name")
 *   .globalBinding("#player_name");
 * ```
 *
 * @example Localized text
 * ```typescript
 * const okButton = label("ok_label")
 *   .text("gui.ok")
 *   .localize();
 * ```
 */
export function label(name: string): LabelBuilder {
  return new LabelBuilder(name);
}

/**
 * Creates a new image element builder.
 *
 * Images display textures with support for UV mapping,
 * 9-slice scaling, tiling, and color tinting.
 *
 * @param name - The element name.
 * @returns A new ImageBuilder instance.
 *
 * @example Simple image
 * ```typescript
 * const icon = image("icon")
 *   .texture("textures/ui/my_icon")
 *   .size(16, 16);
 * ```
 *
 * @example 9-slice background
 * ```typescript
 * const bg = image("background")
 *   .texture("textures/ui/panel_bg")
 *   .nineslice(4)
 *   .fullSize();
 * ```
 *
 * @example Sprite from sheet
 * ```typescript
 * const sprite = image("sprite")
 *   .texture("textures/ui/icons")
 *   .uv(16, 0)
 *   .uvSize(16, 16)
 *   .size(16, 16);
 * ```
 *
 * @example Tinted image
 * ```typescript
 * const overlay = image("tint")
 *   .texture("textures/ui/White")
 *   .color([0.2, 0.2, 0.2])
 *   .fullSize();
 * ```
 */
export function image(name: string): ImageBuilder {
  return new ImageBuilder(name);
}

/**
 * Creates a new button element builder.
 *
 * Buttons are interactive elements with visual states for
 * default, hover, pressed, and locked.
 *
 * @param name - The element name.
 * @returns A new ButtonBuilder instance.
 *
 * @example Button with states
 * ```typescript
 * const btn = button("my_button")
 *   .defaultControl("default")
 *   .hoverControl("hover")
 *   .pressedControl("pressed")
 *   .size(100, 30);
 * ```
 *
 * @example Extending common button
 * ```typescript
 * const myButton = button("custom_btn")
 *   .extends("common_buttons.light_text_button")
 *   .variable("button_text", "Click Me");
 * ```
 */
export function button(name: string): ButtonBuilder {
  return new ButtonBuilder(name);
}

/**
 * Creates a new toggle element builder.
 *
 * Toggles are checkbox/radio button elements that maintain
 * a checked/unchecked state.
 *
 * @param name - The element name.
 * @returns A new ToggleBuilder instance.
 *
 * @example Checkbox
 * ```typescript
 * const checkbox = toggle("enable_sounds")
 *   .toggleName("sounds_enabled")
 *   .defaultState(true)
 *   .checkedControl("checked")
 *   .uncheckedControl("unchecked");
 * ```
 *
 * @example Radio button
 * ```typescript
 * const option = toggle("difficulty_easy")
 *   .toggleName("difficulty")
 *   .radioGroup()
 *   .variable("toggle_group_forced_index", 0);
 * ```
 */
export function toggle(name: string): ToggleBuilder {
  return new ToggleBuilder(name);
}

/**
 * Creates a new custom renderer element builder.
 *
 * Custom elements use native code renderers for complex
 * content like paper dolls, item previews, and HUD elements.
 *
 * @param name - The element name.
 * @returns A new CustomBuilder instance.
 *
 * @example Paper doll
 * ```typescript
 * const playerPreview = custom("player_model")
 *   .renderer("paper_doll_renderer")
 *   .size(50, 80);
 * ```
 *
 * @example Hover text
 * ```typescript
 * const tooltip = custom("tooltip")
 *   .renderer("hover_text_renderer")
 *   .bindings({
 *     binding_name: "#tooltip_text",
 *     binding_name_override: "#hover_text"
 *   });
 * ```
 */
export function custom(name: string): CustomBuilder {
  return new CustomBuilder(name);
}

/**
 * Creates a new factory element builder.
 *
 * Factories dynamically create elements based on data,
 * selecting from a map of control IDs.
 *
 * @param name - The element name.
 * @returns A new FactoryBuilder instance.
 *
 * @example Form type factory
 * ```typescript
 * const formFactory = factory("form_factory")
 *   .controlIds({
 *     "long_form": "@server_form.long_form_panel",
 *     "custom_form": "@server_form.custom_form_panel"
 *   });
 * ```
 */
export function factory(name: string): FactoryBuilder {
  return new FactoryBuilder(name);
}

/**
 * Creates a new scroll view element builder.
 *
 * Scroll views display scrollable content with optional scrollbars.
 *
 * @param name - The element name.
 * @returns A new ScrollViewBuilder instance.
 *
 * @example Basic scroll view
 * ```typescript
 * const scroller = scrollView("content_scroll")
 *   .size("100%", 200)
 *   .scrollViewPort("viewport")
 *   .scrollContent("content")
 *   .scrollbarBox("thumb")
 *   .touchMode();
 * ```
 *
 * @example Chat-style (auto-scroll)
 * ```typescript
 * const chatScroll = scrollView("chat_messages")
 *   .jumpToBottomOnUpdate()
 *   .scrollSpeed(2);
 * ```
 */
export function scrollView(name: string): ScrollViewBuilder {
  return new ScrollViewBuilder(name);
}

/**
 * Creates a new screen element builder.
 *
 * Screens are root-level UI containers that define entire views.
 *
 * @param name - The element name.
 * @returns A new ScreenBuilder instance.
 *
 * @example Modal screen
 * ```typescript
 * const modal = screen("my_modal")
 *   .isModal()
 *   .absorbsInput()
 *   .renderGameBehind(false);
 * ```
 *
 * @example HUD overlay
 * ```typescript
 * const hud = screen("custom_hud")
 *   .renderGameBehind()
 *   .absorbsInput(false)
 *   .alwaysAcceptsInput();
 * ```
 */
export function screen(name: string): ScreenBuilder {
  return new ScreenBuilder(name);
}

/**
 * Creates a new input panel element builder.
 *
 * Input panels capture and handle input events.
 *
 * @param name - The element name.
 * @returns A new InputPanelBuilder instance.
 *
 * @example Modal overlay
 * ```typescript
 * const overlay = inputPanel("modal_bg")
 *   .modal()
 *   .consumeEvent()
 *   .fullSize();
 * ```
 *
 * @example Touch capture
 * ```typescript
 * const touchArea = inputPanel("touch_zone")
 *   .hoverEnabled()
 *   .consumeEvent();
 * ```
 */
export function inputPanel(name: string): InputPanelBuilder {
  return new InputPanelBuilder(name);
}

/**
 * Creates a new edit box (text input) element builder.
 *
 * Edit boxes accept user text input.
 *
 * @param name - The element name.
 * @returns A new EditBoxBuilder instance.
 *
 * @example Search box
 * ```typescript
 * const searchInput = editBox("search")
 *   .textBoxName("search_query")
 *   .maxLength(100)
 *   .textControl("text_display")
 *   .placeholderControl("placeholder");
 * ```
 *
 * @example Numeric input
 * ```typescript
 * const portInput = editBox("port")
 *   .textType("NumberChars")
 *   .maxLength(5);
 * ```
 */
export function editBox(name: string): EditBoxBuilder {
  return new EditBoxBuilder(name);
}

/**
 * Creates a new slider element builder.
 *
 * Sliders allow selecting values within a range.
 *
 * @param name - The element name.
 * @returns A new SliderBuilder instance.
 *
 * @example Volume slider
 * ```typescript
 * const volume = slider("volume_control")
 *   .sliderName("master_volume")
 *   .steps(10)
 *   .direction("horizontal")
 *   .sliderBoxControl("thumb");
 * ```
 */
export function slider(name: string): SliderBuilder {
  return new SliderBuilder(name);
}

/**
 * Creates a generic element builder without a specific type.
 *
 * Useful for extending elements where the type is inherited
 * from the base element.
 *
 * @param name - The element name.
 * @returns A new ElementBuilder instance.
 *
 * @example Extending without type
 * ```typescript
 * const myButton = element("custom_button")
 *   .extends("common.button")
 *   .size(100, 30)
 *   .variable("button_text", "Click");
 * ```
 *
 * @example Modifying vanilla elements
 * ```typescript
 * const modified = element("root_panel")
 *   .insertBack("controls", ref("my_hud@my_ns.hud"));
 * ```
 */
export function element(name: string): ElementBuilder {
  return new ElementBuilder(name);
}
