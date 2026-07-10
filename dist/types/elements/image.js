"use strict";
/**
 * Bedrock UI Generator - Image Element Type
 *
 * Images display textures with support for UV mapping,
 * 9-slice scaling, tiling, and various rendering options.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#sprite
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImage = isImage;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is an image.
 */
function isImage(element) {
    return element.type === "image";
}
//# sourceMappingURL=image.js.map