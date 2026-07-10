"use strict";
/**
 * Bedrock UI Generator - Button Mapping Types
 *
 * Button mappings handle input from controllers, keyboard,
 * and other input devices to trigger UI actions.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#input
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TO_BUTTONS = exports.FROM_BUTTONS = void 0;
exports.globalMapping = globalMapping;
exports.focusedMapping = focusedMapping;
// ============================================================================
// Common Button IDs
// ============================================================================
/**
 * Common button IDs used in from_button_id.
 * These represent hardware/input buttons.
 */
exports.FROM_BUTTONS = {
    /** Menu select/confirm button */
    MENU_SELECT: "button.menu_select",
    /** Menu cancel/back button */
    MENU_CANCEL: "button.menu_cancel",
    /** Menu OK button */
    MENU_OK: "button.menu_ok",
    /** Menu exit button */
    MENU_EXIT: "button.menu_exit",
    /** Controller A/Select */
    CONTROLLER_SELECT: "button.controller_select",
    /** Controller B/Back */
    CONTROLLER_BACK: "button.controller_back",
    /** Controller X */
    CONTROLLER_SECONDARY_SELECT: "button.controller_secondary_select",
    /** Controller Y */
    CONTROLLER_SECONDARY_BACK: "button.controller_secondary_back",
    /** Tab left (LB) */
    MENU_TAB_LEFT: "button.menu_tab_left",
    /** Tab right (RB) */
    MENU_TAB_RIGHT: "button.menu_tab_right",
};
/**
 * Common button IDs used in to_button_id.
 * These represent UI actions.
 */
exports.TO_BUTTONS = {
    /** Exit/close the menu */
    MENU_EXIT: "button.menu_exit",
    /** Click a form button */
    FORM_BUTTON_CLICK: "button.form_button_click",
    /** Navigate tabs left */
    TAB_LEFT: "button.menu_tab_left",
    /** Navigate tabs right */
    TAB_RIGHT: "button.menu_tab_right",
};
// ============================================================================
// Helper Functions
// ============================================================================
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
function globalMapping(fromButton, toButton) {
    return {
        from_button_id: fromButton,
        to_button_id: toButton,
        mapping_type: "global",
    };
}
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
function focusedMapping(fromButton, toButton) {
    return {
        from_button_id: fromButton,
        to_button_id: toButton,
        mapping_type: "focused",
    };
}
//# sourceMappingURL=button_mappings.js.map