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
export type VanillaScreen = "hud_screen" | "start_screen" | "pause_screen" | "death_screen" | "chat_screen" | "settings_screen" | "inventory_screen" | "inventory_screen_pocket" | "chest_screen" | "furnace_screen" | "furnace_screen_pocket" | "blast_furnace_screen" | "smoker_screen" | "brewing_stand_screen" | "brewing_stand_screen_pocket" | "enchanting_screen" | "enchanting_screen_pocket" | "anvil_screen" | "anvil_screen_pocket" | "beacon_screen" | "beacon_screen_pocket" | "cartography_screen" | "cartography_screen_pocket" | "grindstone_screen" | "grindstone_screen_pocket" | "loom_screen" | "loom_screen_pocket" | "smithing_table_screen" | "smithing_table_screen_pocket" | "smithing_table_2_screen" | "smithing_table_2_screen_pocket" | "stonecutter_screen" | "stonecutter_screen_pocket" | "crafter_screen_pocket" | "horse_screen" | "horse_screen_pocket" | "pocket_containers" | "trade_screen" | "trade_screen_pocket" | "trade_2_screen" | "trade_2_screen_pocket" | "book_screen" | "sign_screen" | "chalkboard_screen" | "command_block_screen" | "structure_editor_screen" | "jigsaw_editor_screen" | "select_world_screen" | "play_screen" | "local_world_picker_screen" | "add_external_server_screen" | "invite_screen" | "permissions_screen" | "host_options_screen" | "chat_settings_menu_screen" | "choose_realm_screen" | "realms_settings_screen" | "realms_slots_screen" | "realms_pending_invitations" | "realms_allowlist" | "realms_invite_link_settings_screen" | "realms_stories_transition_screen" | "realmsPlus_screen" | "realms_plus_ended_screen" | "realms_create" | "realms_common" | "realmsPlus_sections/content_section" | "realmsPlus_sections/faq_section" | "realmsPlus_sections/landing_section" | "realmsPlus_sections/realmsPlus_buy_now_screen" | "realmsPlus_sections/realmsPlus_purchase_warning_screen" | "realmsPlus_sections/realmsPlus_view_packs_screen" | "store_data_driven_screen" | "store_inventory_screen" | "store_item_list_screen" | "store_sales_item_list_screen" | "store_search_screen" | "store_filter_menu_screen" | "store_sort_menu_screen" | "store_progress_screen" | "store_promo_timeline_screen" | "store_common" | "pdp_screen" | "pdp_screenshots_section" | "coin_purchase_screen" | "skin_pack_purchase_screen" | "bundle_purchase_warning_screen" | "third_party_store_screen" | "token_faq_screen" | "marketplace_sdl/sdl_dropdowns" | "marketplace_sdl/sdl_image_row" | "marketplace_sdl/sdl_label" | "marketplace_sdl/sdl_text_row" | "csb_screen" | "csb_purchase_error_screen" | "csb_sections/content_section" | "csb_sections/csb_banner" | "csb_sections/csb_buy_now_screen" | "csb_sections/csb_common" | "csb_sections/csb_purchase_amazondevicewarning_screen" | "csb_sections/csb_purchase_warning_screen" | "csb_sections/csb_subscription_panel" | "csb_sections/csb_upsell_dialog" | "csb_sections/csb_view_packs_screen" | "csb_sections/csb_welcome_screen" | "csb_sections/faq_section" | "csb_sections/landing_section" | "settings_sections/controls_section" | "settings_sections/general_section" | "settings_sections/realms_world_section" | "settings_sections/settings_common" | "settings_sections/social_section" | "settings_sections/world_section" | "skin_picker_screen" | "persona_common" | "persona_popups" | "persona_cast_character_screen" | "persona_SDL" | "expanded_skin_pack_screen" | "achievement_screen" | "progress_screen" | "credits_screen" | "resource_packs_screen" | "pack_settings_screen" | "manifest_validation_screen" | "world_templates_screen" | "custom_templates_screen" | "create_world_upsell_screen" | "authentication_screen" | "authentication_modals" | "xbl_console_signin" | "xbl_console_signin_succeeded" | "xbl_console_qr_signin" | "xbl_immediate_signin" | "confirm_delete_account_screen" | "non_xbl_user_management_screen" | "online_safety_screen" | "how_to_play_screen" | "how_to_play_common" | "encyclopedia_screen" | "patch_notes_screen" | "game_tip_screen" | "popup_dialog" | "disconnect_screen" | "display_logged_error_screen" | "toast_screen" | "rating_prompt" | "gamepad_disconnected" | "library_modal_screen" | "panorama_screen" | "emote_wheel_screen" | "mob_effect_screen" | "npc_interact_screen" | "in_bed_screen" | "screenshot_screen" | "debug_screen" | "dev_console_screen" | "content_log" | "content_log_history_screen" | "scoreboards" | "redstone_screen" | "perf_turtle" | "server_form" | "storage_management" | "storage_management_popup" | "storage_migration_common" | "storage_migration_generic_screen" | "cloud_upload_screen" | "file_upload_screen" | "safe_zone_screen" | "gamma_calibration_screen" | "gamepad_layout_screen" | "auto_save_info_screen" | "day_one_experience_screen" | "day_one_experience_intro_screen" | "trial_upsell_screen" | "tabbed_upsell_screen" | "win10_trial_conversion_screen" | "adhoc_screen" | "adhoc_inprogess_screen" | "simple_inprogress_screen" | "gathering_info_screen" | "late_join_pregame_screen" | "global_pause_screen" | "ui_common" | "ui_common_classic" | "ui_edu_common" | "ui_art_assets_common" | "ui_template_buttons" | "ui_template_dialogs" | "ui_template_tabs" | "ui_template_toggles" | "ui_purchase_common" | "ui_friendsbutton" | "ui_iconbutton" | "gameplay_common" | "sidebar_navigation" | "feed_common" | "manage_feed_screen" | "portfolio_screen" | "submit_feedback_screen" | "ugc_viewer_screen" | "immersive_reader" | "update_dimensions" | "update_version" | "world_recovery_screen" | "world_conversion_complete_screen" | "test_anims_screen" | "thanks_for_testing_screen" | "edu_discovery_dialog" | "edu_featured" | "edu_pause_screen_pause_button";
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
export declare const VANILLA_SCREEN_INFO: Record<VanillaScreen, VanillaScreenInfo>;
/**
 * @deprecated Use `VANILLA_SCREEN_INFO` instead for full metadata including subdirectories.
 */
export declare const VANILLA_SCREEN_NAMESPACES: Record<VanillaScreen, string>;
//# sourceMappingURL=vanilla-screens.d.ts.map