"use strict";
/**
 * Bedrock UI Generator - Types Index
 *
 * Complete type definitions for Minecraft Bedrock JSON UI system.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInputPanel = exports.isSelectionWheel = exports.isCustom = exports.isScreen = exports.isFactory = exports.isScrollbarBox = exports.isScrollView = exports.isEditBox = exports.isSliderBox = exports.isSlider = exports.isDropdown = exports.isToggle = exports.isButton = exports.isImage = exports.isLabel = exports.isGrid = exports.isStackPanel = exports.isPanel = exports.focusedMapping = exports.globalMapping = exports.TO_BUTTONS = exports.FROM_BUTTONS = exports.replaceControl = exports.removeControl = exports.insertBefore = exports.insertAfter = exports.insertFront = exports.insertBack = exports.createEnabledBinding = exports.createVisibilityBinding = exports.createCollectionBinding = exports.createViewBinding = exports.createGlobalBinding = void 0;
// ============================================================================
// Binding Types
// ============================================================================
var bindings_1 = require("./bindings");
Object.defineProperty(exports, "createGlobalBinding", { enumerable: true, get: function () { return bindings_1.createGlobalBinding; } });
Object.defineProperty(exports, "createViewBinding", { enumerable: true, get: function () { return bindings_1.createViewBinding; } });
Object.defineProperty(exports, "createCollectionBinding", { enumerable: true, get: function () { return bindings_1.createCollectionBinding; } });
Object.defineProperty(exports, "createVisibilityBinding", { enumerable: true, get: function () { return bindings_1.createVisibilityBinding; } });
Object.defineProperty(exports, "createEnabledBinding", { enumerable: true, get: function () { return bindings_1.createEnabledBinding; } });
// ============================================================================
// Modification Types
// ============================================================================
var modifications_1 = require("./modifications");
Object.defineProperty(exports, "insertBack", { enumerable: true, get: function () { return modifications_1.insertBack; } });
Object.defineProperty(exports, "insertFront", { enumerable: true, get: function () { return modifications_1.insertFront; } });
Object.defineProperty(exports, "insertAfter", { enumerable: true, get: function () { return modifications_1.insertAfter; } });
Object.defineProperty(exports, "insertBefore", { enumerable: true, get: function () { return modifications_1.insertBefore; } });
Object.defineProperty(exports, "removeControl", { enumerable: true, get: function () { return modifications_1.removeControl; } });
Object.defineProperty(exports, "replaceControl", { enumerable: true, get: function () { return modifications_1.replaceControl; } });
// ============================================================================
// Button Mapping Types
// ============================================================================
var button_mappings_1 = require("./button_mappings");
Object.defineProperty(exports, "FROM_BUTTONS", { enumerable: true, get: function () { return button_mappings_1.FROM_BUTTONS; } });
Object.defineProperty(exports, "TO_BUTTONS", { enumerable: true, get: function () { return button_mappings_1.TO_BUTTONS; } });
Object.defineProperty(exports, "globalMapping", { enumerable: true, get: function () { return button_mappings_1.globalMapping; } });
Object.defineProperty(exports, "focusedMapping", { enumerable: true, get: function () { return button_mappings_1.focusedMapping; } });
// ============================================================================
// Element Types
// ============================================================================
var elements_1 = require("./elements");
// Type guards
Object.defineProperty(exports, "isPanel", { enumerable: true, get: function () { return elements_1.isPanel; } });
Object.defineProperty(exports, "isStackPanel", { enumerable: true, get: function () { return elements_1.isStackPanel; } });
Object.defineProperty(exports, "isGrid", { enumerable: true, get: function () { return elements_1.isGrid; } });
Object.defineProperty(exports, "isLabel", { enumerable: true, get: function () { return elements_1.isLabel; } });
Object.defineProperty(exports, "isImage", { enumerable: true, get: function () { return elements_1.isImage; } });
Object.defineProperty(exports, "isButton", { enumerable: true, get: function () { return elements_1.isButton; } });
Object.defineProperty(exports, "isToggle", { enumerable: true, get: function () { return elements_1.isToggle; } });
Object.defineProperty(exports, "isDropdown", { enumerable: true, get: function () { return elements_1.isDropdown; } });
Object.defineProperty(exports, "isSlider", { enumerable: true, get: function () { return elements_1.isSlider; } });
Object.defineProperty(exports, "isSliderBox", { enumerable: true, get: function () { return elements_1.isSliderBox; } });
Object.defineProperty(exports, "isEditBox", { enumerable: true, get: function () { return elements_1.isEditBox; } });
Object.defineProperty(exports, "isScrollView", { enumerable: true, get: function () { return elements_1.isScrollView; } });
Object.defineProperty(exports, "isScrollbarBox", { enumerable: true, get: function () { return elements_1.isScrollbarBox; } });
Object.defineProperty(exports, "isFactory", { enumerable: true, get: function () { return elements_1.isFactory; } });
Object.defineProperty(exports, "isScreen", { enumerable: true, get: function () { return elements_1.isScreen; } });
Object.defineProperty(exports, "isCustom", { enumerable: true, get: function () { return elements_1.isCustom; } });
Object.defineProperty(exports, "isSelectionWheel", { enumerable: true, get: function () { return elements_1.isSelectionWheel; } });
Object.defineProperty(exports, "isInputPanel", { enumerable: true, get: function () { return elements_1.isInputPanel; } });
//# sourceMappingURL=index.js.map