/**
 * Bedrock UI Generator - Custom Element Type
 * 
 * Custom elements use native code renderers to display
 * complex or dynamic content that can't be created with
 * standard UI elements.
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#custom-render
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Custom Renderer Type
// ============================================================================

/**
 * Available custom renderers.
 * 
 * Custom renderers are native code implementations that:
 * - Draw complex game content
 * - Handle special effects
 * - Display dynamic data
 * 
 * Common renderers:
 * - `"paper_doll_renderer"` - Character preview
 * - `"inventory_item_renderer"` - Item display
 * - `"hover_text_renderer"` - Tooltip text
 * - `"progress_indicator_renderer"` - Loading indicators
 */
export type CustomRenderer =
  /** Renders text as a tooltip/hover popup */
  | "hover_text_renderer"
  /** Renders a paper doll (character preview) */
  | "paper_doll_renderer"
  /** Renders the live player model */
  | "live_player_renderer"
  /** Renders the horse/mount model */
  | "live_horse_renderer"
  /** Renders the hotbar slots */
  | "hotbar_renderer"
  /** Renders health hearts */
  | "heart_renderer"
  /** Renders armor icons */
  | "armor_renderer"
  /** Renders horse/mount health */
  | "horse_heart_renderer"
  /** Renders hunger/food icons */
  | "hunger_renderer"
  /** Renders horse jump bar */
  | "horse_jump_renderer"
  /** Renders experience bar */
  | "experience_renderer"
  /** Renders active mob effects */
  | "mob_effects_renderer"
  /** Renders the cursor/pointer */
  | "cursor_renderer"
  /** Renders loading/progress indicators */
  | "progress_indicator_renderer"
  /** Renders camera view */
  | "camera_renderer"
  /** Renders web content */
  | "web_view_renderer"
  /** Renders entity name tags */
  | "name_tag_renderer"
  /** Renders flying/thrown items */
  | "flying_item_renderer"
  /** Renders inventory items with 3D preview */
  | "inventory_item_renderer"
  /** Renders credits text scroll */
  | "credits_renderer"
  /** Renders toast notifications */
  | "toast_renderer"
  /** Renders trial time remaining */
  | "trial_time_renderer"
  /** Renders panoramic backgrounds */
  | "panorama_renderer"
  /** Renders actor/entity portraits */
  | "actor_portrait_renderer"
  /** Renders color gradients */
  | "gradient_renderer"
  /** Renders debug screen info */
  | "debug_screen_renderer"
  /** Renders 3D structure previews */
  | "3d_structure_renderer"
  /** Renders splash text */
  | "splash_text_renderer"
  /** Renders player model on HUD */
  | "hud_player_renderer"
  /** Renders VR holographic cursor */
  | "ui_holo_cursor"
  /** Renders enchanting table book */
  | "enchanting_book_renderer"
  /** Renders bundle contents preview */
  | "bundle_renderer";

// ============================================================================
// Custom Properties
// ============================================================================

/**
 * Properties specific to custom renderer elements.
 * 
 * Custom elements render native content including:
 * - Player/entity models
 * - HUD elements (hearts, armor, hunger)
 * - Item renderers
 * - Special effects
 * 
 * Each renderer may have additional property_bag requirements.
 * 
 * @example Paper doll renderer:
 * ```typescript
 * {
 *   type: "custom",
 *   renderer: "paper_doll_renderer",
 *   size: [50, 80]
 * }
 * ```
 * 
 * @example Hover text renderer:
 * ```typescript
 * {
 *   type: "custom",
 *   renderer: "hover_text_renderer",
 *   bindings: [
 *     {
 *       binding_name: "#my_text",
 *       binding_name_override: "#hover_text"
 *     }
 *   ]
 * }
 * ```
 * 
 * @example Inventory item renderer:
 * ```typescript
 * {
 *   type: "custom",
 *   renderer: "inventory_item_renderer",
 *   size: [16, 16],
 *   bindings: [
 *     {
 *       binding_type: "collection",
 *       binding_collection_name: "hotbar_items",
 *       binding_name: "#item_id_aux"
 *     }
 *   ]
 * }
 * ```
 */
export interface CustomProperties extends BaseUIProperties {
  /**
   * Element type - must be "custom".
   */
  type?: "custom";

  /**
   * The native renderer to use.
   * Each renderer handles specific content types.
   * 
   * @see CustomRenderer for available options
   */
  renderer?: CustomRenderer;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a custom renderer.
 */
export function isCustom(element: BaseUIProperties): element is CustomProperties {
  return element.type === "custom";
}

