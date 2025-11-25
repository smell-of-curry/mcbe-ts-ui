/**
 * Bedrock UI Generator - Image Element Type
 *
 * Images display textures with support for UV mapping,
 * 9-slice scaling, tiling, and various rendering options.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#sprite
 */

import type { BaseUIProperties } from "./base";
import type { Size, Color, ClipDirection, NinesliceInfo } from "../common";

// ============================================================================
// Tiled Mode Type
// ============================================================================

/**
 * Tiling mode for the texture.
 *
 * - `true` - Tile in both directions
 * - `false` - No tiling (stretch)
 * - `"x"` - Tile horizontally only
 * - `"y"` - Tile vertically only
 */
export type TiledMode = boolean | "x" | "y";

// ============================================================================
// Image Properties
// ============================================================================

/**
 * Properties specific to image (sprite) elements.
 *
 * Images are visual elements that:
 * - Display textures from resource packs
 * - Support UV coordinates for sprite sheets
 * - Can use 9-slice for scalable borders
 * - Support tiling for patterns
 * - Can apply color tints and grayscale
 *
 * @example Basic image:
 * ```typescript
 * {
 *   type: "image",
 *   texture: "textures/ui/White",
 *   size: [100, 50],
 *   color: [0.2, 0.2, 0.2]
 * }
 * ```
 *
 * @example 9-slice button background:
 * ```typescript
 * {
 *   type: "image",
 *   texture: "textures/ui/button",
 *   nineslice_size: 4,
 *   size: ["100%", "100%"]
 * }
 * ```
 *
 * @example Sprite from sprite sheet:
 * ```typescript
 * {
 *   type: "image",
 *   texture: "textures/ui/icons",
 *   uv: [16, 0],
 *   uv_size: [16, 16],
 *   size: [16, 16]
 * }
 * ```
 *
 * @example Tiled background:
 * ```typescript
 * {
 *   type: "image",
 *   texture: "textures/ui/recipe_back_panel",
 *   tiled: true,
 *   size: ["100%", "100%"]
 * }
 * ```
 */
export interface ImageProperties extends BaseUIProperties {
  /**
   * Element type - must be "image".
   */
  type?: "image";

  /**
   * Path to the texture file (without extension).
   * Can also be a binding reference for dynamic textures.
   *
   * @example "textures/ui/White", "textures/ui/button", "#texture"
   */
  texture?: string;

  /**
   * UV coordinates [x, y] for the top-left corner of the sprite.
   * Used to select a portion of a sprite sheet.
   *
   * @default [0, 0]
   * @example [16, 0] - Start 16 pixels from left
   */
  uv?: [number, number];

  /**
   * Size of the UV region [width, height] in pixels.
   * Defines how much of the texture to use.
   *
   * @example [16, 16] - 16x16 pixel sprite
   */
  uv_size?: [number, number];

  /**
   * File system source for the texture.
   * Used for external textures (e.g., player skins).
   *
   * @example "InUserPackage", "InServerData"
   */
  texture_file_system?: string;

  /**
   * 9-slice border sizes for scalable textures.
   *
   * 9-slice divides the texture into 9 regions:
   * - Corners stay fixed size
   * - Edges stretch in one direction
   * - Center stretches in both directions
   *
   * Can be a single number (same on all sides) or
   * [top, right, bottom, left] for individual borders.
   *
   * @example 4, [4, 8, 4, 8]
   */
  nineslice_size?: NinesliceInfo;

  /**
   * Whether to tile the texture instead of stretching.
   *
   * - `true` - Tile in both X and Y
   * - `"x"` - Tile horizontally only
   * - `"y"` - Tile vertically only
   * - `false` - Stretch to fit (default)
   *
   * @default false
   */
  tiled?: TiledMode;

  /**
   * Scale factor for tiled textures [x, y].
   * Values > 1 make tiles larger, < 1 makes them smaller.
   *
   * @default [1, 1]
   */
  tiled_scale?: [number, number];

  /**
   * Clip ratio for progress bar effects (0-1).
   * 0 = fully clipped, 1 = fully visible.
   * Use with clip_direction for animated reveals.
   */
  clip_ratio?: number;

  /**
   * Direction to clip from for clip_ratio.
   *
   * @example "left" - Reveal from left to right
   */
  clip_direction?: ClipDirection;

  /**
   * Whether clipping should be pixel-perfect.
   * Prevents sub-pixel rendering artifacts.
   *
   * @default false
   */
  clip_pixelperfect?: boolean;

  /**
   * Whether to maintain aspect ratio when scaling.
   * When true, image won't distort.
   *
   * @default false
   */
  keep_ratio?: boolean;

  /**
   * Whether to use bilinear filtering.
   * Creates smoother scaling but may blur pixel art.
   *
   * @default false
   */
  bilinear?: boolean;

  /**
   * Whether to fill the entire element area.
   * Similar to CSS background-size: cover.
   *
   * @default false
   */
  fill?: boolean;

  /**
   * Color tint to apply to the image [r, g, b].
   * Multiplies with texture colors.
   *
   * @example [1, 0, 0] - Red tint
   * @example [0.5, 0.5, 0.5] - 50% darker
   */
  color?: Color | string;

  /**
   * Whether to render in grayscale.
   * Useful for disabled states.
   *
   * @default false
   */
  grayscale?: boolean;

  /**
   * Force texture to reload.
   * Useful for dynamic textures that change.
   *
   * @default false
   */
  force_texture_reload?: boolean;

  /**
   * Base size of the texture for scaling calculations.
   * TODO: Figure out exact usage
   */
  base_size?: Size;

  /**
   * ZIP folder path for texture lookup.
   * Used for textures in compressed archives.
   */
  zip_folder?: string;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is an image.
 */
export function isImage(element: BaseUIProperties): element is ImageProperties {
  return element.type === "image";
}
