/**
 * Bedrock UI Generator - Button Mapping Types
 *
 * Button mappings handle input from controllers, keyboard,
 * and other input devices to trigger UI actions.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#input
 */
/**
 * The type of button mapping - when the mapping is active.
 *
 * - `"global"` - Always active regardless of focus
 * - `"pressed"` - Active when button is pressed
 * - `"double_pressed"` - Active on double-press
 * - `"focused"` - Active when element has focus
 */
export type MappingType = "global" | "pressed" | "double_pressed" | "focused";
/**
 * Condition based on the current input mode.
 *
 * - `"gamepad_and_not_gaze"` - Controller without gaze controls
 * - `"not_gaze"` - Any input except gaze controls
 */
export type InputModeCondition = "gamepad_and_not_gaze" | "not_gaze";
/**
 * Scope of the button mapping.
 *
 * - `"view"` - Scoped to the current view/element
 * - `"controller"` - Scoped to controller input globally
 */
export type MappingScope = "view" | "controller";
/**
 * A button mapping that connects input to UI actions.
 *
 * Button mappings translate hardware inputs (controller buttons,
 * keyboard keys) into UI actions (button clicks, menu navigation).
 *
 * @example Global escape mapping:
 * ```typescript
 * {
 *   from_button_id: "button.menu_cancel",
 *   to_button_id: "button.menu_exit",
 *   mapping_type: "global"
 * }
 * ```
 *
 * @example Focused button press:
 * ```typescript
 * {
 *   from_button_id: "button.menu_select",
 *   to_button_id: "button.form_button_click",
 *   mapping_type: "focused"
 * }
 * ```
 */
export interface ButtonMapping {
    /**
     * The source button/input to listen for.
     *
     * Common values:
     * - `"button.menu_select"` - Confirm/Select
     * - `"button.menu_cancel"` - Cancel/Back
     * - `"button.menu_ok"` - OK button
     * - `"button.menu_exit"` - Exit menu
     * - `"button.controller_select"` - Controller A button
     * - `"button.controller_back"` - Controller B button
     *
     * @example "button.menu_cancel"
     */
    from_button_id: string;
    /**
     * The target action to trigger.
     *
     * Common values:
     * - `"button.menu_exit"` - Close the menu
     * - `"button.form_button_click"` - Click a form button
     * - `"button.menu_tab_left"` - Navigate tabs left
     * - `"button.menu_tab_right"` - Navigate tabs right
     *
     * @example "button.menu_exit"
     */
    to_button_id: string;
    /**
     * When this mapping should be active.
     * @default "focused"
     */
    mapping_type?: MappingType;
    /**
     * Additional condition based on input mode.
     * Useful for controller-specific mappings.
     */
    input_mode_condition?: InputModeCondition;
    /**
     * Whether this mapping is currently ignored/disabled.
     * @default false
     */
    ignored?: boolean;
    /**
     * The scope of this mapping.
     */
    scope?: MappingScope;
}
/**
 * Common button IDs used in from_button_id.
 * These represent hardware/input buttons.
 */
export declare const FROM_BUTTONS: {
    /** Menu select/confirm button */
    readonly MENU_SELECT: "button.menu_select";
    /** Menu cancel/back button */
    readonly MENU_CANCEL: "button.menu_cancel";
    /** Menu OK button */
    readonly MENU_OK: "button.menu_ok";
    /** Menu exit button */
    readonly MENU_EXIT: "button.menu_exit";
    /** Controller A/Select */
    readonly CONTROLLER_SELECT: "button.controller_select";
    /** Controller B/Back */
    readonly CONTROLLER_BACK: "button.controller_back";
    /** Controller X */
    readonly CONTROLLER_SECONDARY_SELECT: "button.controller_secondary_select";
    /** Controller Y */
    readonly CONTROLLER_SECONDARY_BACK: "button.controller_secondary_back";
    /** Tab left (LB) */
    readonly MENU_TAB_LEFT: "button.menu_tab_left";
    /** Tab right (RB) */
    readonly MENU_TAB_RIGHT: "button.menu_tab_right";
};
/**
 * Common button IDs used in to_button_id.
 * These represent UI actions.
 */
export declare const TO_BUTTONS: {
    /** Exit/close the menu */
    readonly MENU_EXIT: "button.menu_exit";
    /** Click a form button */
    readonly FORM_BUTTON_CLICK: "button.form_button_click";
    /** Navigate tabs left */
    readonly TAB_LEFT: "button.menu_tab_left";
    /** Navigate tabs right */
    readonly TAB_RIGHT: "button.menu_tab_right";
};
/**
 * Create a global button mapping.
 *
 * @example
 * ```typescript
 * const escapeMapping = globalMapping(
 *   "button.menu_cancel",
 *   "button.menu_exit"
 * );
 * ```
 */
export declare function globalMapping(fromButton: string, toButton: string): ButtonMapping;
/**
 * Create a focused button mapping (active when element has focus).
 *
 * @example
 * ```typescript
 * const selectMapping = focusedMapping(
 *   "button.menu_select",
 *   "button.form_button_click"
 * );
 * ```
 */
export declare function focusedMapping(fromButton: string, toButton: string): ButtonMapping;
//# sourceMappingURL=button_mappings.d.ts.map