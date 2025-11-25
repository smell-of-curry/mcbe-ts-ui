/**
 * Bedrock UI Generator - Animation Types
 *
 * Animations provide visual effects like fading, moving, and scaling
 * UI elements over time.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#animations
 */

import type { Size, Color } from "./common";

// ============================================================================
// Animation Type Enum
// ============================================================================

/**
 * The type of animation to perform.
 *
 * - `"alpha"` - Fade transparency
 * - `"clip"` - Clip/reveal animation
 * - `"color"` - Color transition
 * - `"flip_book"` - Sprite sheet animation
 * - `"offset"` - Position movement
 * - `"size"` - Size change
 * - `"uv"` - UV coordinate animation
 * - `"wait"` - Delay before next animation
 * - `"aseprite_flip_book"` - Aseprite-exported animation
 */
export type AnimationType =
  | "alpha"
  | "clip"
  | "color"
  | "flip_book"
  | "offset"
  | "size"
  | "uv"
  | "wait"
  | "aseprite_flip_book";

// ============================================================================
// Animation Easing Enum
// ============================================================================

/**
 * Easing function for animation interpolation.
 * Controls the acceleration curve of the animation.
 *
 * - `"linear"` - Constant speed
 * - `"spring"` - Springy bounce effect
 * - `"in_*"` - Start slow, end fast
 * - `"out_*"` - Start fast, end slow
 * - `"in_out_*"` - Start slow, fast middle, end slow
 *
 * Available curves: bounce, expo, sine, cubic, back, elastic, quad, circ
 */
export type AnimationEasing =
  | "linear"
  | "spring"
  | "in_bounce"
  | "out_bounce"
  | "in_out_bounce"
  | "in_expo"
  | "out_expo"
  | "in_out_expo"
  | "in_sine"
  | "out_sine"
  | "in_out_sine"
  | "in_cubic"
  | "out_cubic"
  | "in_out_cubic"
  | "in_back"
  | "out_back"
  | "in_out_back"
  | "in_elastic"
  | "out_elastic"
  | "in_out_elastic"
  | "in_quad"
  | "out_quad"
  | "in_out_quad"
  | "in_circ"
  | "out_circ"
  | "in_out_circ";

// ============================================================================
// Animation Interface
// ============================================================================

/**
 * An animation definition for UI elements.
 *
 * Animations are defined at the namespace level and referenced
 * by elements using the `anims` property.
 *
 * @example Fade in animation:
 * ```typescript
 * {
 *   anim_type: "alpha",
 *   duration: 0.5,
 *   from: 0,
 *   to: 1,
 *   easing: "out_cubic"
 * }
 * ```
 *
 * @example Slide in from left:
 * ```typescript
 * {
 *   anim_type: "offset",
 *   duration: 0.3,
 *   from: [-100, 0],
 *   to: [0, 0],
 *   easing: "out_expo"
 * }
 * ```
 *
 * @example Flipbook sprite animation:
 * ```typescript
 * {
 *   anim_type: "flip_book",
 *   initial_uv: [0, 0],
 *   frame_count: 8,
 *   frame_step: 16,
 *   fps: 12
 * }
 * ```
 */
export interface Animation {
  /**
   * The type of animation to perform.
   */
  anim_type: AnimationType;

  /**
   * Duration of the animation in seconds.
   * @default 1.0
   */
  duration?: number;

  /**
   * Starting value for the animation.
   * Type depends on anim_type:
   * - alpha: number (0-1)
   * - offset/size: [x, y]
   * - color: [r, g, b]
   */
  from?: number | Size | Color;

  /**
   * Ending value for the animation.
   * Type depends on anim_type (same as `from`).
   */
  to?: number | Size | Color;

  /**
   * Initial UV coordinates for flip_book animations.
   * @example [0, 0]
   */
  initial_uv?: [number, number];

  /**
   * Number of frames in a flip_book animation.
   */
  frame_count?: number;

  /**
   * Pixel step between frames in flip_book.
   * Usually the width/height of a single frame.
   */
  frame_step?: number;

  /**
   * Frames per second for flip_book animations.
   * @default 1
   */
  fps?: number;

  /**
   * Easing function for smooth interpolation.
   * @default "linear"
   */
  easing?: AnimationEasing;

  /**
   * Animation to play after this one completes.
   * Reference to another animation by name.
   *
   * @example "@my_namespace.next_animation"
   */
  next?: string;

  /**
   * Destroy the element when animation ends.
   * TODO: Figure out exact behavior and valid values
   */
  destroy_at_end?: string;

  /**
   * Event that triggers this animation to play.
   * TODO: Figure out available events
   */
  play_event?: string;

  /**
   * Event fired when animation ends.
   */
  end_event?: string;

  /**
   * Event fired when animation starts.
   */
  start_event?: string;

  /**
   * Event that resets the animation.
   */
  reset_event?: string;

  /**
   * Whether the animation can play in reverse.
   * @default false
   */
  reversible?: boolean;

  /**
   * Whether the animation can be reset and replayed.
   * @default false
   */
  resettable?: boolean;

  /**
   * For alpha animations, whether to scale from
   * the current alpha rather than the `from` value.
   * @default false
   */
  scale_from_starting_alpha?: boolean;
}

// ============================================================================
// Animation Reference
// ============================================================================

/**
 * Reference to an animation using @ syntax.
 *
 * @example "@my_namespace.fade_in", "@common.button_pressed"
 */
export type AnimationRef = `@${string}.${string}`;
