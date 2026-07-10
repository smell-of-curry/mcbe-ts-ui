"use strict";
/**
 * Bedrock UI Generator - Scroll View Element Type
 *
 * Scroll views display scrollable content that exceeds the
 * visible area. They support touch/mouse scrolling and
 * optional scrollbars.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#scroll-view
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScrollView = isScrollView;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a scroll view.
 */
function isScrollView(element) {
    return element.type === "scroll_view";
}
//# sourceMappingURL=scroll_view.js.map