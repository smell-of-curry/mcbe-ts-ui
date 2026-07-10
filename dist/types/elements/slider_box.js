"use strict";
/**
 * Bedrock UI Generator - Slider Box Element Type
 *
 * Slider boxes are the draggable handle/thumb of a slider.
 * They support multiple visual states and are typically used
 * as children of slider elements.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#slider-box
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSliderBox = isSliderBox;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a slider box.
 */
function isSliderBox(element) {
    return element.type === "slider_box";
}
//# sourceMappingURL=slider_box.js.map