/**
 * Bedrock UI Generator - Screen Element Type
 * 
 * Screens are top-level UI containers that represent
 * entire UI views (menus, HUD overlays, dialogs).
 * 
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#screen
 */

import type { BaseUIProperties } from "./base";

// ============================================================================
// Screen Properties
// ============================================================================

/**
 * Properties specific to screen elements.
 * 
 * Screens are root-level containers that:
 * - Define entire UI views
 * - Control input handling
 * - Manage rendering order
 * - Handle game state interaction
 * 
 * Screen properties control how the UI interacts with
 * the game (input blocking, rendering, focus, etc.).
 * 
 * @example Basic modal screen:
 * ```typescript
 * {
 *   type: "screen",
 *   is_modal: true,
 *   absorbs_input: true,
 *   render_game_behind: false,
 *   always_accepts_input: true
 * }
 * ```
 * 
 * @example HUD overlay screen:
 * ```typescript
 * {
 *   type: "screen",
 *   render_game_behind: true,
 *   absorbs_input: false,
 *   render_only_when_topmost: false
 * }
 * ```
 */
export interface ScreenProperties extends BaseUIProperties {
  /**
   * Element type - must be "screen".
   */
  type?: "screen";

  /**
   * Whether to only render when this is the topmost screen.
   * When false, renders even when other screens are on top.
   * 
   * @default true
   */
  render_only_when_topmost?: boolean;

  /**
   * Whether this screen can be flushed from memory.
   * Non-flushable screens persist in memory.
   * 
   * @default false
   */
  screen_not_flushable?: boolean;

  /**
   * Whether to always accept input regardless of focus.
   * Useful for HUD elements that need constant input.
   * 
   * @default false
   */
  always_accepts_input?: boolean;

  /**
   * Whether to render the game world behind this screen.
   * When false, shows black or defined background.
   * 
   * @default true
   */
  render_game_behind?: boolean;

  /**
   * Whether this screen absorbs/blocks input.
   * When true, input doesn't pass through to game.
   * 
   * @default false
   */
  absorbs_input?: boolean;

  /**
   * Whether this screen represents a menu.
   * Affects game pause behavior.
   * 
   * @default false
   */
  is_showing_menu?: boolean;

  /**
   * Whether this screen is a modal dialog.
   * Modals block interaction with elements behind.
   * 
   * @default false
   */
  is_modal?: boolean;

  /**
   * Whether to capture/steal mouse input.
   * Used for screens that need exclusive mouse control.
   * 
   * @default false
   */
  should_steal_mouse?: boolean;

  /**
   * Whether to use low frequency rendering.
   * Reduces render calls for static screens.
   * 
   * @default false
   */
  low_frequency_rendering?: boolean;

  /**
   * Whether this screen renders last (on top).
   * 
   * @default false
   */
  screen_draws_last?: boolean;

  /**
   * Whether this is a VR-specific screen.
   * 
   * @default false
   */
  vr_mode?: boolean;

  /**
   * Whether to force rendering below other screens.
   * 
   * @default false
   */
  force_render_below?: boolean;

  /**
   * Whether to send telemetry for this screen.
   * 
   * @default false
   */
  send_telemetry?: boolean;

  /**
   * Whether to close the screen when player takes damage.
   * Useful for interruptible menus.
   * 
   * @default false
   */
  close_on_player_hurt?: boolean;

  /**
   * Whether to cache this screen for faster reopening.
   * 
   * @default false
   */
  cache_screen?: boolean;

  /**
   * Whether to load this screen immediately.
   * When false, may be lazy-loaded.
   * 
   * @default false
   */
  load_screen_immediately?: boolean;

  /**
   * Whether to enable gamepad cursor mode.
   * Shows a cursor controlled by gamepad.
   * 
   * @default false
   */
  gamepad_cursor?: boolean;

  /**
   * Whether gamepad cursor uses deflection mode.
   * TODO: Figure out exact behavior
   * 
   * @default false
   */
  gamepad_cursor_deflection_mode?: boolean;

  /**
   * Whether automated testing should skip this screen.
   * 
   * @default false
   */
  should_be_skipped_during_automation?: boolean;
}

// ============================================================================
// Type Guard
// ============================================================================

/**
 * Type guard to check if an element is a screen.
 */
export function isScreen(element: BaseUIProperties): element is ScreenProperties {
  return element.type === "screen";
}

