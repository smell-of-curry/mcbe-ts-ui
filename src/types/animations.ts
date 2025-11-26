/**
 * Bedrock UI Animation Types
 *
 * Type definitions for UI animations in Minecraft Bedrock.
 * Animations can be applied to elements via the `anims` property
 * or UV animations via the `uv` property.
 *
 * @module types/animations
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#animations
 */

// ============================================================================
// Animation Types
// ============================================================================

/**
 * Types of animations available in Bedrock UI.
 */
export type AnimationType =
  | "alpha"
  | "offset"
  | "size"
  | "flip_book"
  | "uv"
  | "color"
  | "wait"
  | "aseprite_flip_book"
  | "clip";

/**
 * Animation easing functions.
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
  | "in_out_circ"
  | "in_quart"
  | "out_quart"
  | "in_out_quart"
  | "in_quint"
  | "out_quint"
  | "in_out_quint";

// ============================================================================
// Base Animation Properties
// ============================================================================

/**
 * Common properties for all animation types.
 */
export interface BaseAnimationProperties {
  /**
   * The type of animation.
   */
  anim_type: AnimationType;

  /**
   * Duration of the animation in seconds.
   * @default 1.0
   */
  duration?: number;

  /**
   * Reference to the next animation to play after this one completes.
   * Uses the format "@namespace.animation_name".
   */
  next?: string;

  /**
   * Easing function for the animation.
   * @default "linear"
   */
  easing?: AnimationEasing;

  /**
   * Name of the element to destroy when animation ends.
   */
  destroy_at_end?: string;

  /**
   * Whether to play animation in reverse after completing.
   * @default false
   */
  reversible?: boolean;

  /**
   * Whether animation resets to initial state when complete.
   * @default false
   */
  resettable?: boolean;

  /**
   * Delay before animation starts (in seconds).
   */
  initial_wait?: number;

  /**
   * Whether animation plays from UI file being read.
   * @default true
   */
  play_event?: string;

  /**
   * Event that triggers this animation.
   */
  start_event?: string;

  /**
   * Event that ends this animation.
   */
  end_event?: string;

  /**
   * Event triggered when animation completes.
   */
  end_value_event?: string;
}

// ============================================================================
// Specific Animation Types
// ============================================================================

/**
 * Alpha (opacity) animation properties.
 */
export interface AlphaAnimation extends BaseAnimationProperties {
  anim_type: "alpha";
  /** Starting alpha value (0-1). */
  from?: number;
  /** Ending alpha value (0-1). */
  to?: number;
}

/**
 * Offset (position) animation properties.
 */
export interface OffsetAnimation extends BaseAnimationProperties {
  anim_type: "offset";
  /** Starting offset [x, y]. */
  from?: [number | string, number | string];
  /** Ending offset [x, y]. */
  to?: [number | string, number | string];
}

/**
 * Size animation properties.
 */
export interface SizeAnimation extends BaseAnimationProperties {
  anim_type: "size";
  /** Starting size [width, height]. */
  from?: [number | string, number | string];
  /** Ending size [width, height]. */
  to?: [number | string, number | string];
}

/**
 * Color animation properties.
 */
export interface ColorAnimation extends BaseAnimationProperties {
  anim_type: "color";
  /** Starting color [r, g, b] or [r, g, b, a]. */
  from?: [number, number, number] | [number, number, number, number];
  /** Ending color [r, g, b] or [r, g, b, a]. */
  to?: [number, number, number] | [number, number, number, number];
}

/**
 * Flip book animation properties (sprite sheet animation).
 */
export interface FlipBookAnimation extends BaseAnimationProperties {
  anim_type: "flip_book";
  /** Initial UV coordinates [u, v]. */
  initial_uv?: [number, number];
  /** Number of frames in the animation. */
  frame_count?: number;
  /** Frames per second. */
  fps?: number;
  /** Pixel step between frames. */
  frame_step?: number;
  /** Whether frames are arranged horizontally or vertically. */
  reversible?: boolean;
}

/**
 * UV animation properties (texture coordinate animation).
 */
export interface UVAnimation extends BaseAnimationProperties {
  anim_type: "uv";
  /** Starting UV coordinates [u, v]. */
  from?: [number, number];
  /** Ending UV coordinates [u, v]. */
  to?: [number, number];
}

/**
 * Wait animation (timer/delay).
 */
export interface WaitAnimation extends BaseAnimationProperties {
  anim_type: "wait";
  /** Duration to wait in seconds. */
  duration?: number;
}

/**
 * Clip animation properties.
 */
export interface ClipAnimation extends BaseAnimationProperties {
  anim_type: "clip";
  /** Starting clip ratio (0-1). */
  from?: number;
  /** Ending clip ratio (0-1). */
  to?: number;
}

/**
 * Aseprite flip book animation.
 */
export interface AsepriteFlipBookAnimation extends BaseAnimationProperties {
  anim_type: "aseprite_flip_book";
  /** Initial UV coordinates. */
  initial_uv?: [number, number];
  /** Frame count. */
  frame_count?: number;
  /** Frames per second. */
  fps?: number;
  /** Frame step size. */
  frame_step?: number;
}

// ============================================================================
// Union Type
// ============================================================================

/**
 * Union of all animation types.
 */
export type Animation =
  | AlphaAnimation
  | OffsetAnimation
  | SizeAnimation
  | ColorAnimation
  | FlipBookAnimation
  | UVAnimation
  | WaitAnimation
  | ClipAnimation
  | AsepriteFlipBookAnimation;
