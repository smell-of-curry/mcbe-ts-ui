/**
 * Example UI Source File
 *
 * This demonstrates how to create a Minecraft Bedrock JSON UI file
 * using the TypeScript builder pattern.
 */

import {
  defineMain,
  defineUI,
  namespace,
  panel,
  label,
  image,
  stackPanel,
  ref,
} from "../";

// ============================================================================
// Example: Simple Main Element (Recommended)
// ============================================================================

/**
 * Method 1: Using defineMain (simplest approach)
 *
 * Most namespaces only need a `main` element, so just define it directly.
 * Child elements are defined as constants and composed together.
 */

// Define child elements as constants
const healthIcon = image("health_icon")
  .texture("textures/ui/heart_background")
  .size(16, 16);

const healthText = label("health_text")
  .text("#player_health")
  .size(40, 16)
  .color([1, 0.2, 0.2])
  .shadow()
  .globalBinding("#player_health", "#player_health", "always");

const manaIcon = image("mana_icon")
  .texture("textures/ui/experience_bar_full_blue")
  .size(16, 16);

const manaText = label("mana_text")
  .text("#player_mana")
  .size(40, 16)
  .color([0.2, 0.6, 1])
  .shadow();

const spacer = panel("spacer").size(20, "100%");

// Compose into a status bar
const statusBar = stackPanel("status_bar")
  .horizontal()
  .size("100%", 20)
  .anchor("bottom_middle")
  .offset(0, -40)
  .controls(healthIcon, healthText, spacer, manaIcon, manaText);

// Info panel elements
const infoTitle = label("info_title")
  .text("Info")
  .anchor("top_middle")
  .offset(0, 5)
  .color([1, 1, 0])
  .fontSize("large")
  .shadow();

const infoContent = label("info_content")
  .text("#info_text")
  .anchor("center")
  .size("90%", "default")
  .textAlignment("center")
  .color([1, 1, 1]);

const infoPanel = panel("info_panel")
  .extends("common.panel")
  .size(150, 50)
  .anchor("top_right")
  .offset(-10, 10)
  .controls(infoTitle, infoContent)
  .visibilityBinding("(#info_visible)");

// Export the main element directly
export default defineMain(
  "example_hud",
  panel("main")
    .fullSize()
    .anchor("bottom_middle")
    .controls(statusBar, infoPanel)
);

// ============================================================================
// Example: Sharing Elements Across Files
// ============================================================================

/**
 * Export elements that can be referenced from other namespaces.
 * Other files can use nsRef() to create a reference without duplicating.
 */
export const sharedButton = panel("shared_button")
  .extends("common.button")
  .size(100, 30);

// In another file, you would use:
// import { sharedButton } from "./example_hud";
// panel("main").controls(nsRef("example_hud", sharedButton))
// This generates: { "shared_button@example_hud.shared_button": {} }

// ============================================================================
// Alternative: Using defineUI for Complex Cases
// ============================================================================

/**
 * Method 2: Using defineUI with ns.add()
 *
 * Use this when you need multiple top-level elements in a namespace,
 * or when modifying existing vanilla UI.
 */
export const complexExample = defineUI("complex_ui", (ns) => {
  // Add multiple elements to the namespace
  ns.add(panel("element_a").size(100, 100).anchor("top_left")).add(
    panel("element_b").size(100, 100).anchor("top_right")
  );

  // Add the main that references them
  ns.add(
    panel("main")
      .fullSize()
      .controls(ref("a@complex_ui.element_a"), ref("b@complex_ui.element_b"))
  );
});

// ============================================================================
// Example: Modifying Vanilla UI
// ============================================================================

/**
 * Method 3: Modifying existing vanilla UI
 *
 * Use namespace builder directly when you need raw control.
 */
export const hudModification = {
  namespace: namespace("hud")
    .addRaw("root_panel", {
      modifications: [
        {
          array_name: "controls",
          operation: "insert_back",
          value: [{ "custom_hud@example_hud.main": {} }],
        },
      ],
    })
    .build(),
  filename: "hud_modifications",
};
