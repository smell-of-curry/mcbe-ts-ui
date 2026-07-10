/**
 * Bedrock UI Animation Builder
 *
 * Provides a fluent API for building UI animations.
 * Animations are separate from UI elements and are referenced via the `anims` property.
 *
 * @module builders/animation
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#animations
 */
import type { AnimationType, AnimationEasing } from "../types/animations";
/**
 * Builder class for creating UI animations.
 *
 * @example Flip book animation
 * ```typescript
 * const ringing = animation("anim__ringing")
 *   .flipBook()
 *   .initialUV(0, 0)
 *   .frameCount(11)
 *   .fps(11)
 *   .frameStep(64);
 * ```
 *
 * @example Wait animation with chain
 * ```typescript
 * const waitAnim = animation("anim__wait")
 *   .wait(0.97)
 *   .next("@my_ns.anim__next");
 * ```
 *
 * @example Alpha animation
 * ```typescript
 * const fadeIn = animation("anim__fade_in")
 *   .alpha(0, 1)
 *   .duration(0.5)
 *   .easing("out_cubic");
 * ```
 */
export declare class AnimationBuilder {
    /** The animation's name */
    private animName;
    /** The animation properties being built */
    private props;
    /**
     * Creates a new animation builder.
     *
     * @param name - The animation name (used in namespace references)
     */
    constructor(name: string);
    /**
     * Gets the animation name.
     */
    getName(): string;
    /**
     * Creates a flip book (sprite sheet) animation.
     *
     * @returns This builder for chaining
     */
    flipBook(): this;
    /**
     * Creates a wait/timer animation.
     *
     * @param duration - Duration to wait in seconds
     * @returns This builder for chaining
     */
    wait(duration: number): this;
    /**
     * Creates an alpha (opacity) animation.
     *
     * @param from - Starting alpha (0-1)
     * @param to - Ending alpha (0-1)
     * @returns This builder for chaining
     */
    alpha(from: number, to: number): this;
    /**
     * Creates an offset (position) animation.
     *
     * @param from - Starting offset [x, y]
     * @param to - Ending offset [x, y]
     * @returns This builder for chaining
     */
    offset(from: [number | string, number | string], to: [number | string, number | string]): this;
    /**
     * Creates a size animation.
     *
     * @param from - Starting size [width, height]
     * @param to - Ending size [width, height]
     * @returns This builder for chaining
     */
    sizeAnim(from: [number | string, number | string], to: [number | string, number | string]): this;
    /**
     * Creates a color animation.
     *
     * @param from - Starting color [r, g, b] or [r, g, b, a]
     * @param to - Ending color [r, g, b] or [r, g, b, a]
     * @returns This builder for chaining
     */
    color(from: [number, number, number] | [number, number, number, number], to: [number, number, number] | [number, number, number, number]): this;
    /**
     * Creates a UV animation.
     *
     * @param from - Starting UV [u, v]
     * @param to - Ending UV [u, v]
     * @returns This builder for chaining
     */
    uv(from: [number, number], to: [number, number]): this;
    /**
     * Creates a clip animation.
     *
     * @param from - Starting clip ratio (0-1)
     * @param to - Ending clip ratio (0-1)
     * @returns This builder for chaining
     */
    clip(from: number, to: number): this;
    /**
     * Sets the initial UV coordinates for flip book animations.
     *
     * @param u - U coordinate
     * @param v - V coordinate
     * @returns This builder for chaining
     */
    initialUV(u: number, v: number): this;
    /**
     * Sets the frame count for flip book animations.
     *
     * @param count - Number of frames
     * @returns This builder for chaining
     */
    frameCount(count: number): this;
    /**
     * Sets the frames per second for flip book animations.
     *
     * @param fps - Frames per second
     * @returns This builder for chaining
     */
    fps(fps: number): this;
    /**
     * Sets the pixel step between frames for flip book animations.
     *
     * @param step - Pixel step
     * @returns This builder for chaining
     */
    frameStep(step: number): this;
    /**
     * Sets the animation duration.
     *
     * @param seconds - Duration in seconds
     * @returns This builder for chaining
     */
    duration(seconds: number): this;
    /**
     * Sets the next animation to play after this one completes.
     *
     * @param animRef - Animation reference (e.g., "@namespace.anim_name")
     * @returns This builder for chaining
     */
    next(animRef: string): this;
    /**
     * Sets the easing function.
     *
     * @param easing - Easing function name
     * @returns This builder for chaining
     */
    easing(easing: AnimationEasing): this;
    /**
     * Sets the element to destroy when animation ends.
     *
     * @param elementName - Name of element to destroy
     * @returns This builder for chaining
     */
    destroyAtEnd(elementName: string): this;
    /**
     * Makes the animation reversible (plays backward after completing).
     *
     * @param reversible - Whether animation is reversible
     * @returns This builder for chaining
     */
    reversible(reversible?: boolean): this;
    /**
     * Makes the animation resettable (resets to initial state when complete).
     *
     * @param resettable - Whether animation is resettable
     * @returns This builder for chaining
     */
    resettable(resettable?: boolean): this;
    /**
     * Sets the initial wait/delay before animation starts.
     *
     * @param seconds - Delay in seconds
     * @returns This builder for chaining
     */
    initialWait(seconds: number): this;
    /**
     * Sets the from value for value-based animations.
     *
     * @param value - Starting value
     * @returns This builder for chaining
     */
    from(value: number | [number, number] | [number, number, number]): this;
    /**
     * Sets the to value for value-based animations.
     *
     * @param value - Ending value
     * @returns This builder for chaining
     */
    to(value: number | [number, number] | [number, number, number]): this;
    /**
     * Sets the animation type directly.
     *
     * @param type - Animation type
     * @returns This builder for chaining
     */
    type(type: AnimationType): this;
    /**
     * Builds and returns the animation object.
     *
     * @returns The animation properties object
     */
    build(): Record<string, unknown>;
}
/**
 * Creates a new animation builder.
 *
 * @param name - The animation name
 * @returns A new AnimationBuilder instance
 *
 * @example Flip book animation
 * ```typescript
 * const ringing = animation("anim__ringing")
 *   .flipBook()
 *   .initialUV(0, 0)
 *   .frameCount(11)
 *   .fps(11)
 *   .frameStep(64);
 * ```
 *
 * @example Wait with chain
 * ```typescript
 * const wait = animation("anim__wait")
 *   .wait(0.97)
 *   .next("@my_ns.anim__next")
 *   .destroyAtEnd("start");
 * ```
 *
 * @example Alpha fade
 * ```typescript
 * const fadeIn = animation("anim__fade")
 *   .alpha(0, 1)
 *   .duration(0.5)
 *   .easing("out_cubic");
 * ```
 */
export declare function animation(name: string): AnimationBuilder;
//# sourceMappingURL=animation.d.ts.map