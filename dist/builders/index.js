"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.animation = exports.AnimationBuilder = exports.animRef = exports.nsRef = exports.fromBuilder = exports.extendRaw = exports.extendExternal = exports.extend = exports.ref = exports.namespace = exports.NamespaceBuilder = exports.SliderBuilder = exports.EditBoxBuilder = exports.InputPanelBuilder = exports.ScreenBuilder = exports.ScrollViewBuilder = exports.FactoryBuilder = exports.CustomBuilder = exports.ToggleBuilder = exports.ButtonBuilder = exports.ImageBuilder = exports.LabelBuilder = exports.GridBuilder = exports.StackPanelBuilder = exports.PanelBuilder = exports.NamespaceElement = exports.ElementBuilder = void 0;
exports.panel = panel;
exports.stackPanel = stackPanel;
exports.grid = grid;
exports.label = label;
exports.boundLabel = boundLabel;
exports.image = image;
exports.boundImage = boundImage;
exports.button = button;
exports.toggle = toggle;
exports.custom = custom;
exports.factory = factory;
exports.scrollView = scrollView;
exports.screen = screen;
exports.inputPanel = inputPanel;
exports.editBox = editBox;
exports.slider = slider;
exports.element = element;
// Element builders
var element_1 = require("./element");
Object.defineProperty(exports, "ElementBuilder", { enumerable: true, get: function () { return element_1.ElementBuilder; } });
Object.defineProperty(exports, "NamespaceElement", { enumerable: true, get: function () { return element_1.NamespaceElement; } });
Object.defineProperty(exports, "PanelBuilder", { enumerable: true, get: function () { return element_1.PanelBuilder; } });
Object.defineProperty(exports, "StackPanelBuilder", { enumerable: true, get: function () { return element_1.StackPanelBuilder; } });
Object.defineProperty(exports, "GridBuilder", { enumerable: true, get: function () { return element_1.GridBuilder; } });
Object.defineProperty(exports, "LabelBuilder", { enumerable: true, get: function () { return element_1.LabelBuilder; } });
Object.defineProperty(exports, "ImageBuilder", { enumerable: true, get: function () { return element_1.ImageBuilder; } });
Object.defineProperty(exports, "ButtonBuilder", { enumerable: true, get: function () { return element_1.ButtonBuilder; } });
Object.defineProperty(exports, "ToggleBuilder", { enumerable: true, get: function () { return element_1.ToggleBuilder; } });
Object.defineProperty(exports, "CustomBuilder", { enumerable: true, get: function () { return element_1.CustomBuilder; } });
Object.defineProperty(exports, "FactoryBuilder", { enumerable: true, get: function () { return element_1.FactoryBuilder; } });
Object.defineProperty(exports, "ScrollViewBuilder", { enumerable: true, get: function () { return element_1.ScrollViewBuilder; } });
Object.defineProperty(exports, "ScreenBuilder", { enumerable: true, get: function () { return element_1.ScreenBuilder; } });
Object.defineProperty(exports, "InputPanelBuilder", { enumerable: true, get: function () { return element_1.InputPanelBuilder; } });
Object.defineProperty(exports, "EditBoxBuilder", { enumerable: true, get: function () { return element_1.EditBoxBuilder; } });
Object.defineProperty(exports, "SliderBuilder", { enumerable: true, get: function () { return element_1.SliderBuilder; } });
// Namespace builder
var namespace_1 = require("./namespace");
Object.defineProperty(exports, "NamespaceBuilder", { enumerable: true, get: function () { return namespace_1.NamespaceBuilder; } });
Object.defineProperty(exports, "namespace", { enumerable: true, get: function () { return namespace_1.namespace; } });
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return namespace_1.ref; } });
Object.defineProperty(exports, "extend", { enumerable: true, get: function () { return namespace_1.extend; } });
Object.defineProperty(exports, "extendExternal", { enumerable: true, get: function () { return namespace_1.extendExternal; } });
Object.defineProperty(exports, "extendRaw", { enumerable: true, get: function () { return namespace_1.extendRaw; } });
Object.defineProperty(exports, "fromBuilder", { enumerable: true, get: function () { return namespace_1.fromBuilder; } });
Object.defineProperty(exports, "nsRef", { enumerable: true, get: function () { return namespace_1.nsRef; } });
Object.defineProperty(exports, "animRef", { enumerable: true, get: function () { return namespace_1.animRef; } });
// Animation builder
var animation_1 = require("./animation");
Object.defineProperty(exports, "AnimationBuilder", { enumerable: true, get: function () { return animation_1.AnimationBuilder; } });
Object.defineProperty(exports, "animation", { enumerable: true, get: function () { return animation_1.animation; } });
// ============================================================================
// Factory Functions
// ============================================================================
const element_2 = require("./element");
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
function panel(name) {
    return new element_2.PanelBuilder(name);
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
function stackPanel(name, orientation) {
    return new element_2.StackPanelBuilder(name).orientation(orientation);
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
function grid(name) {
    return new element_2.GridBuilder(name);
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
function label(name, text) {
    return new element_2.LabelBuilder(name).text(text);
}
/**
 * Specifies a incomplete label that assumes it will be bound to a property in the future.
 *
 * @param name
 * @param bindingName - The name of the binding to use for the label.
 * @returns
 */
function boundLabel(name, bindingName = "text") {
    return new element_2.BoundLabelBuilder(name, bindingName);
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
function image(name, texture) {
    return new element_2.ImageBuilder(name).texture(texture);
}
/**
 * Specifies a incomplete image that assumes it will be bound to a property in the future.
 *
 * @param name
 * @param bindingName - The name of the binding to use for the image.
 * @returns
 */
function boundImage(name, bindingName = "texture") {
    return new element_2.BoundImageBuilder(name, bindingName);
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
function button(name) {
    return new element_2.ButtonBuilder(name);
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
function toggle(name) {
    return new element_2.ToggleBuilder(name);
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
function custom(name) {
    return new element_2.CustomBuilder(name);
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
function factory(name) {
    return new element_2.FactoryBuilder(name);
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
function scrollView(name) {
    return new element_2.ScrollViewBuilder(name);
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
function screen(name) {
    return new element_2.ScreenBuilder(name);
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
function inputPanel(name) {
    return new element_2.InputPanelBuilder(name);
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
function editBox(name) {
    return new element_2.EditBoxBuilder(name);
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
function slider(name) {
    return new element_2.SliderBuilder(name);
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
function element(name) {
    return new element_2.ElementBuilder(name);
}
//# sourceMappingURL=index.js.map