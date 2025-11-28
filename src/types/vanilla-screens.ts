/**
 * Vanilla Minecraft UI Screen Paths
 *
 * Type definitions for all vanilla Minecraft Bedrock UI screen files.
 * Use these with `redefineUI` to modify existing game UI screens.
 *
 * @module types/vanilla-screens
 * @see https://wiki.bedrock.dev/json-ui/json-ui-intro
 * @see https://github.com/ZtechNetwork/MCBVanillaResourcePack/tree/master/ui
 */

// ============================================================================
// Vanilla Screen Paths
// ============================================================================

/**
 * All vanilla Minecraft UI screen file paths.
 *
 * These are the valid targets for `redefineUI()` when modifying
 * existing Minecraft UI files. Paths include subdirectories.
 *
 * @example
 * ```typescript
 * // Modify the HUD screen
 * redefineUI("hud_screen", (ns) => {
 *   ns.addRaw("root_panel", { ... });
 * });
 *
 * // Modify a subdirectory file
 * redefineUI("settings_sections/general_section", (ns) => {
 *   ns.addRaw("some_element", { ... });
 * });
 * ```
 *
 * @see https://github.com/ZtechNetwork/MCBVanillaResourcePack/tree/master/ui
 */
export type VanillaScreen =
  // ============================================================================
  // Core Screens
  // ============================================================================
  | "hud_screen"
  | "start_screen"
  | "pause_screen"
  | "death_screen"
  | "chat_screen"
  | "settings_screen"

  // ============================================================================
  // Container/Inventory Screens
  // ============================================================================
  | "inventory_screen"
  | "inventory_screen_pocket"
  | "chest_screen"
  | "furnace_screen"
  | "furnace_screen_pocket"
  | "blast_furnace_screen"
  | "smoker_screen"
  | "brewing_stand_screen"
  | "brewing_stand_screen_pocket"
  | "enchanting_screen"
  | "enchanting_screen_pocket"
  | "anvil_screen"
  | "anvil_screen_pocket"
  | "beacon_screen"
  | "beacon_screen_pocket"
  | "cartography_screen"
  | "cartography_screen_pocket"
  | "grindstone_screen"
  | "grindstone_screen_pocket"
  | "loom_screen"
  | "loom_screen_pocket"
  | "smithing_table_screen"
  | "smithing_table_screen_pocket"
  | "smithing_table_2_screen"
  | "smithing_table_2_screen_pocket"
  | "stonecutter_screen"
  | "stonecutter_screen_pocket"
  | "crafter_screen_pocket"
  | "horse_screen"
  | "horse_screen_pocket"
  | "pocket_containers"

  // ============================================================================
  // Trading Screens
  // ============================================================================
  | "trade_screen"
  | "trade_screen_pocket"
  | "trade_2_screen"
  | "trade_2_screen_pocket"

  // ============================================================================
  // Book and Signs
  // ============================================================================
  | "book_screen"
  | "sign_screen"
  | "chalkboard_screen"

  // ============================================================================
  // Command and Structure Editors
  // ============================================================================
  | "command_block_screen"
  | "structure_editor_screen"
  | "jigsaw_editor_screen"

  // ============================================================================
  // World/Server Selection
  // ============================================================================
  | "select_world_screen"
  | "play_screen"
  | "local_world_picker_screen"
  | "add_external_server_screen"

  // ============================================================================
  // Multiplayer Screens
  // ============================================================================
  | "invite_screen"
  | "permissions_screen"
  | "host_options_screen"
  | "chat_settings_menu_screen"

  // ============================================================================
  // Realms Screens
  // ============================================================================
  | "choose_realm_screen"
  | "realms_settings_screen"
  | "realms_slots_screen"
  | "realms_pending_invitations"
  | "realms_allowlist"
  | "realms_invite_link_settings_screen"
  | "realms_stories_transition_screen"
  | "realmsPlus_screen"
  | "realms_plus_ended_screen"
  | "realms_create"
  | "realms_common"
  // realmsPlus_sections/
  | "realmsPlus_sections/content_section"
  | "realmsPlus_sections/faq_section"
  | "realmsPlus_sections/landing_section"
  | "realmsPlus_sections/realmsPlus_buy_now_screen"
  | "realmsPlus_sections/realmsPlus_purchase_warning_screen"
  | "realmsPlus_sections/realmsPlus_view_packs_screen"

  // ============================================================================
  // Store/Marketplace Screens
  // ============================================================================
  | "store_data_driven_screen"
  | "store_inventory_screen"
  | "store_item_list_screen"
  | "store_sales_item_list_screen"
  | "store_search_screen"
  | "store_filter_menu_screen"
  | "store_sort_menu_screen"
  | "store_progress_screen"
  | "store_promo_timeline_screen"
  | "store_common"
  | "pdp_screen"
  | "pdp_screenshots_section"
  | "coin_purchase_screen"
  | "skin_pack_purchase_screen"
  | "bundle_purchase_warning_screen"
  | "third_party_store_screen"
  | "token_faq_screen"
  // marketplace_sdl/
  | "marketplace_sdl/sdl_dropdowns"
  | "marketplace_sdl/sdl_image_row"
  | "marketplace_sdl/sdl_label"
  | "marketplace_sdl/sdl_text_row"

  // ============================================================================
  // CSB (Content Subscription) Screens
  // ============================================================================
  | "csb_screen"
  | "csb_purchase_error_screen"
  // csb_sections/
  | "csb_sections/content_section"
  | "csb_sections/csb_banner"
  | "csb_sections/csb_buy_now_screen"
  | "csb_sections/csb_common"
  | "csb_sections/csb_purchase_amazondevicewarning_screen"
  | "csb_sections/csb_purchase_warning_screen"
  | "csb_sections/csb_subscription_panel"
  | "csb_sections/csb_upsell_dialog"
  | "csb_sections/csb_view_packs_screen"
  | "csb_sections/csb_welcome_screen"
  | "csb_sections/faq_section"
  | "csb_sections/landing_section"

  // ============================================================================
  // Settings Sections
  // ============================================================================
  | "settings_sections/controls_section"
  | "settings_sections/general_section"
  | "settings_sections/realms_world_section"
  | "settings_sections/settings_common"
  | "settings_sections/social_section"
  | "settings_sections/world_section"

  // ============================================================================
  // Skin/Persona Screens
  // ============================================================================
  | "skin_picker_screen"
  | "persona_common"
  | "persona_popups"
  | "persona_cast_character_screen"
  | "persona_SDL"
  | "expanded_skin_pack_screen"

  // ============================================================================
  // Achievement and Progress
  // ============================================================================
  | "achievement_screen"
  | "progress_screen"
  | "credits_screen"

  // ============================================================================
  // Resource/Behavior Packs
  // ============================================================================
  | "resource_packs_screen"
  | "pack_settings_screen"
  | "manifest_validation_screen"

  // ============================================================================
  // World Templates and Creation
  // ============================================================================
  | "world_templates_screen"
  | "custom_templates_screen"
  | "create_world_upsell_screen"

  // ============================================================================
  // Authentication Screens
  // ============================================================================
  | "authentication_screen"
  | "authentication_modals"
  | "xbl_console_signin"
  | "xbl_console_signin_succeeded"
  | "xbl_console_qr_signin"
  | "xbl_immediate_signin"
  | "confirm_delete_account_screen"
  | "non_xbl_user_management_screen"
  | "online_safety_screen"

  // ============================================================================
  // Info and Help Screens
  // ============================================================================
  | "how_to_play_screen"
  | "how_to_play_common"
  | "encyclopedia_screen"
  | "patch_notes_screen"
  | "game_tip_screen"

  // ============================================================================
  // Dialogs and Popups
  // ============================================================================
  | "popup_dialog"
  | "disconnect_screen"
  | "display_logged_error_screen"
  | "toast_screen"
  | "rating_prompt"
  | "gamepad_disconnected"
  | "library_modal_screen"

  // ============================================================================
  // Other Screens
  // ============================================================================
  | "panorama_screen"
  | "emote_wheel_screen"
  | "mob_effect_screen"
  | "npc_interact_screen"
  | "in_bed_screen"
  | "screenshot_screen"
  | "debug_screen"
  | "dev_console_screen"
  | "content_log"
  | "content_log_history_screen"
  | "scoreboards"
  | "redstone_screen"
  | "perf_turtle"

  // ============================================================================
  // Server Forms
  // ============================================================================
  | "server_form"

  // ============================================================================
  // Storage and Migration
  // ============================================================================
  | "storage_management"
  | "storage_management_popup"
  | "storage_migration_common"
  | "storage_migration_generic_screen"
  | "cloud_upload_screen"
  | "file_upload_screen"

  // ============================================================================
  // Settings Screens
  // ============================================================================
  | "safe_zone_screen"
  | "gamma_calibration_screen"
  | "gamepad_layout_screen"
  | "auto_save_info_screen"

  // ============================================================================
  // Day One Experience
  // ============================================================================
  | "day_one_experience_screen"
  | "day_one_experience_intro_screen"

  // ============================================================================
  // Trials and Upsells
  // ============================================================================
  | "trial_upsell_screen"
  | "tabbed_upsell_screen"
  | "win10_trial_conversion_screen"

  // ============================================================================
  // Network Screens
  // ============================================================================
  | "adhoc_screen"
  | "adhoc_inprogess_screen"
  | "simple_inprogress_screen"
  | "gathering_info_screen"
  | "late_join_pregame_screen"
  | "global_pause_screen"

  // ============================================================================
  // Common/Shared UI Files
  // ============================================================================
  | "ui_common"
  | "ui_common_classic"
  | "ui_edu_common"
  | "ui_art_assets_common"
  | "ui_template_buttons"
  | "ui_template_dialogs"
  | "ui_template_tabs"
  | "ui_template_toggles"
  | "ui_purchase_common"
  | "ui_friendsbutton"
  | "ui_iconbutton"
  | "gameplay_common"
  | "sidebar_navigation"

  // ============================================================================
  // Feed and Portfolio
  // ============================================================================
  | "feed_common"
  | "manage_feed_screen"
  | "portfolio_screen"
  | "submit_feedback_screen"

  // ============================================================================
  // UGC Viewer
  // ============================================================================
  | "ugc_viewer_screen"

  // ============================================================================
  // Immersive Reader
  // ============================================================================
  | "immersive_reader"

  // ============================================================================
  // Update Screens
  // ============================================================================
  | "update_dimensions"
  | "update_version"

  // ============================================================================
  // World Recovery
  // ============================================================================
  | "world_recovery_screen"
  | "world_conversion_complete_screen"

  // ============================================================================
  // Testing Screens
  // ============================================================================
  | "test_anims_screen"
  | "thanks_for_testing_screen"

  // ============================================================================
  // Education Features
  // ============================================================================
  | "edu_discovery_dialog"
  | "edu_featured"
  | "edu_pause_screen_pause_button";

// ============================================================================
// Vanilla Screen Metadata
// ============================================================================

/**
 * Metadata for a vanilla screen, including its namespace and optional subdirectory.
 */
export interface VanillaScreenInfo {
  /** The JSON UI namespace name */
  namespace: string;
  /** Subdirectory path (if any) */
  subdir?: string;
}

/**
 * Map of vanilla screen paths to their metadata.
 *
 * This includes the namespace name and subdirectory for each screen.
 * Used by `redefineUI` to generate the correct output path and namespace.
 *
 * @see https://github.com/ZtechNetwork/MCBVanillaResourcePack/tree/master/ui
 */
export const VANILLA_SCREEN_INFO: Record<VanillaScreen, VanillaScreenInfo> = {
  // ============================================================================
  // Core Screens
  // ============================================================================
  hud_screen: { namespace: "hud" },
  start_screen: { namespace: "start" },
  pause_screen: { namespace: "pause" },
  death_screen: { namespace: "death" },
  chat_screen: { namespace: "chat" },
  settings_screen: { namespace: "settings" },

  // ============================================================================
  // Container/Inventory Screens
  // ============================================================================
  inventory_screen: { namespace: "inventory_screen" },
  inventory_screen_pocket: { namespace: "inventory_screen_pocket" },
  chest_screen: { namespace: "chest" },
  furnace_screen: { namespace: "furnace" },
  furnace_screen_pocket: { namespace: "furnace_pocket" },
  blast_furnace_screen: { namespace: "blast_furnace" },
  smoker_screen: { namespace: "smoker" },
  brewing_stand_screen: { namespace: "brewing_stand" },
  brewing_stand_screen_pocket: { namespace: "brewing_stand_pocket" },
  enchanting_screen: { namespace: "enchanting" },
  enchanting_screen_pocket: { namespace: "enchanting_pocket" },
  anvil_screen: { namespace: "anvil" },
  anvil_screen_pocket: { namespace: "anvil_pocket" },
  beacon_screen: { namespace: "beacon" },
  beacon_screen_pocket: { namespace: "beacon_pocket" },
  cartography_screen: { namespace: "cartography" },
  cartography_screen_pocket: { namespace: "cartography_pocket" },
  grindstone_screen: { namespace: "grindstone" },
  grindstone_screen_pocket: { namespace: "grindstone_pocket" },
  loom_screen: { namespace: "loom" },
  loom_screen_pocket: { namespace: "loom_pocket" },
  smithing_table_screen: { namespace: "smithing_table" },
  smithing_table_screen_pocket: { namespace: "smithing_table_pocket" },
  smithing_table_2_screen: { namespace: "smithing_table_2" },
  smithing_table_2_screen_pocket: { namespace: "smithing_table_2_pocket" },
  stonecutter_screen: { namespace: "stonecutter" },
  stonecutter_screen_pocket: { namespace: "stonecutter_pocket" },
  crafter_screen_pocket: { namespace: "crafter_pocket" },
  horse_screen: { namespace: "horse" },
  horse_screen_pocket: { namespace: "horse_pocket" },
  pocket_containers: { namespace: "pocket_containers" },

  // ============================================================================
  // Trading Screens
  // ============================================================================
  trade_screen: { namespace: "trade" },
  trade_screen_pocket: { namespace: "trade_pocket" },
  trade_2_screen: { namespace: "trade_2" },
  trade_2_screen_pocket: { namespace: "trade_2_pocket" },

  // ============================================================================
  // Book and Signs
  // ============================================================================
  book_screen: { namespace: "book" },
  sign_screen: { namespace: "sign" },
  chalkboard_screen: { namespace: "chalkboard" },

  // ============================================================================
  // Command and Structure Editors
  // ============================================================================
  command_block_screen: { namespace: "command_block" },
  structure_editor_screen: { namespace: "structure_editor" },
  jigsaw_editor_screen: { namespace: "jigsaw_editor" },

  // ============================================================================
  // World/Server Selection
  // ============================================================================
  select_world_screen: { namespace: "select_world" },
  play_screen: { namespace: "play" },
  local_world_picker_screen: { namespace: "local_world_picker" },
  add_external_server_screen: { namespace: "add_external_server" },

  // ============================================================================
  // Multiplayer Screens
  // ============================================================================
  invite_screen: { namespace: "invite" },
  permissions_screen: { namespace: "permissions" },
  host_options_screen: { namespace: "host_options" },
  chat_settings_menu_screen: { namespace: "chat_settings_menu" },

  // ============================================================================
  // Realms Screens
  // ============================================================================
  choose_realm_screen: { namespace: "choose_realm" },
  realms_settings_screen: { namespace: "realms_settings" },
  realms_slots_screen: { namespace: "realms_slots" },
  realms_pending_invitations: { namespace: "realms_pending_invitations" },
  realms_allowlist: { namespace: "realms_allowlist" },
  realms_invite_link_settings_screen: {
    namespace: "realms_invite_link_settings",
  },
  realms_stories_transition_screen: { namespace: "realms_stories_transition" },
  realmsPlus_screen: { namespace: "realmsPlus" },
  realms_plus_ended_screen: { namespace: "realms_plus_ended" },
  realms_create: { namespace: "realms_create" },
  realms_common: { namespace: "realms_common" },
  // realmsPlus_sections/
  "realmsPlus_sections/content_section": {
    namespace: "realmsPlus_content",
    subdir: "realmsPlus_sections",
  },
  "realmsPlus_sections/faq_section": {
    namespace: "realmsPlus_faq",
    subdir: "realmsPlus_sections",
  },
  "realmsPlus_sections/landing_section": {
    namespace: "realmsPlus_landing",
    subdir: "realmsPlus_sections",
  },
  "realmsPlus_sections/realmsPlus_buy_now_screen": {
    namespace: "realmsPlus_buy",
    subdir: "realmsPlus_sections",
  },
  "realmsPlus_sections/realmsPlus_purchase_warning_screen": {
    namespace: "realmsPlus_purchase_warning",
    subdir: "realmsPlus_sections",
  },
  "realmsPlus_sections/realmsPlus_view_packs_screen": {
    namespace: "realmsPlus_packs",
    subdir: "realmsPlus_sections",
  },

  // ============================================================================
  // Store/Marketplace Screens
  // ============================================================================
  store_data_driven_screen: { namespace: "store_data_driven" },
  store_inventory_screen: { namespace: "store_inventory" },
  store_item_list_screen: { namespace: "store_item_list" },
  store_sales_item_list_screen: { namespace: "store_sales_item_list" },
  store_search_screen: { namespace: "store_search" },
  store_filter_menu_screen: { namespace: "store_filter_menu" },
  store_sort_menu_screen: { namespace: "store_sort_menu" },
  store_progress_screen: { namespace: "store_progress" },
  store_promo_timeline_screen: { namespace: "store_promo_timeline" },
  store_common: { namespace: "store_common" },
  pdp_screen: { namespace: "pdp" },
  pdp_screenshots_section: { namespace: "pdp_screenshots_section" },
  coin_purchase_screen: { namespace: "coin_purchase" },
  skin_pack_purchase_screen: { namespace: "skin_pack_purchase" },
  bundle_purchase_warning_screen: { namespace: "bundle_purchase_warning" },
  third_party_store_screen: { namespace: "third_party_store" },
  token_faq_screen: { namespace: "token_faq" },
  // marketplace_sdl/
  "marketplace_sdl/sdl_dropdowns": {
    namespace: "sdl_dropdowns",
    subdir: "marketplace_sdl",
  },
  "marketplace_sdl/sdl_image_row": {
    namespace: "sdl_image_row",
    subdir: "marketplace_sdl",
  },
  "marketplace_sdl/sdl_label": {
    namespace: "sdl_label",
    subdir: "marketplace_sdl",
  },
  "marketplace_sdl/sdl_text_row": {
    namespace: "sdl_text_row",
    subdir: "marketplace_sdl",
  },

  // ============================================================================
  // CSB (Content Subscription) Screens
  // ============================================================================
  csb_screen: { namespace: "csb" },
  csb_purchase_error_screen: { namespace: "csb_purchase_error" },
  // csb_sections/
  "csb_sections/content_section": {
    namespace: "csb_content",
    subdir: "csb_sections",
  },
  "csb_sections/csb_banner": {
    namespace: "csb_banner",
    subdir: "csb_sections",
  },
  "csb_sections/csb_buy_now_screen": {
    namespace: "csb_buy",
    subdir: "csb_sections",
  },
  "csb_sections/csb_common": {
    namespace: "common_csb",
    subdir: "csb_sections",
  },
  "csb_sections/csb_purchase_amazondevicewarning_screen": {
    namespace: "csb_purchase_amazondevicewarning",
    subdir: "csb_sections",
  },
  "csb_sections/csb_purchase_warning_screen": {
    namespace: "csb_purchase_warning",
    subdir: "csb_sections",
  },
  "csb_sections/csb_subscription_panel": {
    namespace: "csb_subscription_panel",
    subdir: "csb_sections",
  },
  "csb_sections/csb_upsell_dialog": {
    namespace: "csb_upsell",
    subdir: "csb_sections",
  },
  "csb_sections/csb_view_packs_screen": {
    namespace: "csb_packs",
    subdir: "csb_sections",
  },
  "csb_sections/csb_welcome_screen": {
    namespace: "csb_welcome",
    subdir: "csb_sections",
  },
  "csb_sections/faq_section": { namespace: "csb_faq", subdir: "csb_sections" },
  "csb_sections/landing_section": {
    namespace: "csb_landing",
    subdir: "csb_sections",
  },

  // ============================================================================
  // Settings Sections
  // ============================================================================
  "settings_sections/controls_section": {
    namespace: "controls_section",
    subdir: "settings_sections",
  },
  "settings_sections/general_section": {
    namespace: "general_section",
    subdir: "settings_sections",
  },
  "settings_sections/realms_world_section": {
    namespace: "realms_world_section",
    subdir: "settings_sections",
  },
  "settings_sections/settings_common": {
    namespace: "settings_common",
    subdir: "settings_sections",
  },
  "settings_sections/social_section": {
    namespace: "social_section",
    subdir: "settings_sections",
  },
  "settings_sections/world_section": {
    namespace: "world_section",
    subdir: "settings_sections",
  },

  // ============================================================================
  // Skin/Persona Screens
  // ============================================================================
  skin_picker_screen: { namespace: "skin_picker" },
  persona_common: { namespace: "persona_common" },
  persona_popups: { namespace: "persona_popups" },
  persona_cast_character_screen: { namespace: "persona_cast_character" },
  persona_SDL: { namespace: "persona_SDL" },
  expanded_skin_pack_screen: { namespace: "expanded_skin_pack" },

  // ============================================================================
  // Achievement and Progress
  // ============================================================================
  achievement_screen: { namespace: "achievement" },
  progress_screen: { namespace: "progress" },
  credits_screen: { namespace: "credits" },

  // ============================================================================
  // Resource/Behavior Packs
  // ============================================================================
  resource_packs_screen: { namespace: "resource_packs" },
  pack_settings_screen: { namespace: "pack_settings" },
  manifest_validation_screen: { namespace: "manifest_validation" },

  // ============================================================================
  // World Templates and Creation
  // ============================================================================
  world_templates_screen: { namespace: "world_templates" },
  custom_templates_screen: { namespace: "custom_templates" },
  create_world_upsell_screen: { namespace: "create_world_upsell" },

  // ============================================================================
  // Authentication Screens
  // ============================================================================
  authentication_screen: { namespace: "authentication" },
  authentication_modals: { namespace: "authentication_modals" },
  xbl_console_signin: { namespace: "xbl_console_signin" },
  xbl_console_signin_succeeded: { namespace: "xbl_console_signin_succeeded" },
  xbl_console_qr_signin: { namespace: "xbl_console_qr_signin" },
  xbl_immediate_signin: { namespace: "xbl_immediate_signin" },
  confirm_delete_account_screen: { namespace: "confirm_delete_account" },
  non_xbl_user_management_screen: { namespace: "non_xbl_user_management" },
  online_safety_screen: { namespace: "online_safety" },

  // ============================================================================
  // Info and Help Screens
  // ============================================================================
  how_to_play_screen: { namespace: "how_to_play" },
  how_to_play_common: { namespace: "how_to_play_common" },
  encyclopedia_screen: { namespace: "encyclopedia" },
  patch_notes_screen: { namespace: "patch_notes" },
  game_tip_screen: { namespace: "game_tip" },

  // ============================================================================
  // Dialogs and Popups
  // ============================================================================
  popup_dialog: { namespace: "popup_dialog" },
  disconnect_screen: { namespace: "disconnect" },
  display_logged_error_screen: { namespace: "display_logged_error" },
  toast_screen: { namespace: "toast" },
  rating_prompt: { namespace: "rating_prompt" },
  gamepad_disconnected: { namespace: "gamepad_disconnected" },
  library_modal_screen: { namespace: "library_modal" },

  // ============================================================================
  // Other Screens
  // ============================================================================
  panorama_screen: { namespace: "panorama" },
  emote_wheel_screen: { namespace: "emote_wheel" },
  mob_effect_screen: { namespace: "mob_effect" },
  npc_interact_screen: { namespace: "npc_interact" },
  in_bed_screen: { namespace: "in_bed" },
  screenshot_screen: { namespace: "screenshot" },
  debug_screen: { namespace: "debug" },
  dev_console_screen: { namespace: "dev_console" },
  content_log: { namespace: "content_log" },
  content_log_history_screen: { namespace: "content_log_history" },
  scoreboards: { namespace: "scoreboards" },
  redstone_screen: { namespace: "redstone" },
  perf_turtle: { namespace: "perf_turtle" },

  // ============================================================================
  // Server Forms
  // ============================================================================
  server_form: { namespace: "server_form" },

  // ============================================================================
  // Storage and Migration
  // ============================================================================
  storage_management: { namespace: "storage_management" },
  storage_management_popup: { namespace: "storage_management_popup" },
  storage_migration_common: { namespace: "storage_migration_common" },
  storage_migration_generic_screen: { namespace: "storage_migration_generic" },
  cloud_upload_screen: { namespace: "cloud_upload" },
  file_upload_screen: { namespace: "file_upload" },

  // ============================================================================
  // Settings Screens
  // ============================================================================
  safe_zone_screen: { namespace: "safe_zone" },
  gamma_calibration_screen: { namespace: "gamma_calibration" },
  gamepad_layout_screen: { namespace: "gamepad_layout" },
  auto_save_info_screen: { namespace: "auto_save_info" },

  // ============================================================================
  // Day One Experience
  // ============================================================================
  day_one_experience_screen: { namespace: "day_one_experience" },
  day_one_experience_intro_screen: { namespace: "day_one_experience_intro" },

  // ============================================================================
  // Trials and Upsells
  // ============================================================================
  trial_upsell_screen: { namespace: "trial_upsell" },
  tabbed_upsell_screen: { namespace: "tabbed_upsell" },
  win10_trial_conversion_screen: { namespace: "win10_trial_conversion" },

  // ============================================================================
  // Network Screens
  // ============================================================================
  adhoc_screen: { namespace: "adhoc" },
  adhoc_inprogess_screen: { namespace: "adhoc_inprogress" },
  simple_inprogress_screen: { namespace: "simple_inprogress" },
  gathering_info_screen: { namespace: "gathering_info" },
  late_join_pregame_screen: { namespace: "late_join_pregame" },
  global_pause_screen: { namespace: "global_pause" },

  // ============================================================================
  // Common/Shared UI Files
  // ============================================================================
  ui_common: { namespace: "common" },
  ui_common_classic: { namespace: "common_classic" },
  ui_edu_common: { namespace: "edu_common" },
  ui_art_assets_common: { namespace: "ui_art_assets_common" },
  ui_template_buttons: { namespace: "common_buttons" },
  ui_template_dialogs: { namespace: "common_dialogs" },
  ui_template_tabs: { namespace: "common_tabs" },
  ui_template_toggles: { namespace: "common_toggles" },
  ui_purchase_common: { namespace: "purchase_common" },
  ui_friendsbutton: { namespace: "friendsbutton" },
  ui_iconbutton: { namespace: "iconbutton" },
  gameplay_common: { namespace: "gameplay_common" },
  sidebar_navigation: { namespace: "sidebar_navigation" },

  // ============================================================================
  // Feed and Portfolio
  // ============================================================================
  feed_common: { namespace: "feed_common" },
  manage_feed_screen: { namespace: "manage_feed" },
  portfolio_screen: { namespace: "portfolio" },
  submit_feedback_screen: { namespace: "submit_feedback" },

  // ============================================================================
  // UGC Viewer
  // ============================================================================
  ugc_viewer_screen: { namespace: "ugc_viewer" },

  // ============================================================================
  // Immersive Reader
  // ============================================================================
  immersive_reader: { namespace: "immersive_reader" },

  // ============================================================================
  // Update Screens
  // ============================================================================
  update_dimensions: { namespace: "update_dimensions" },
  update_version: { namespace: "update_version" },

  // ============================================================================
  // World Recovery
  // ============================================================================
  world_recovery_screen: { namespace: "world_recovery" },
  world_conversion_complete_screen: { namespace: "world_conversion_complete" },

  // ============================================================================
  // Testing Screens
  // ============================================================================
  test_anims_screen: { namespace: "test_anims" },
  thanks_for_testing_screen: { namespace: "thanks_for_testing" },

  // ============================================================================
  // Education Features
  // ============================================================================
  edu_discovery_dialog: { namespace: "edu_discovery_dialog" },
  edu_featured: { namespace: "edu_featured" },
  edu_pause_screen_pause_button: { namespace: "edu_pause_button" },
};

/**
 * @deprecated Use `VANILLA_SCREEN_INFO` instead for full metadata including subdirectories.
 */
export const VANILLA_SCREEN_NAMESPACES: Record<VanillaScreen, string> =
  Object.fromEntries(
    Object.entries(VANILLA_SCREEN_INFO).map(([key, value]) => [
      key,
      value.namespace,
    ])
  ) as Record<VanillaScreen, string>;
