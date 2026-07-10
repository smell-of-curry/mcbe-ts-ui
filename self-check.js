const assert = require("node:assert/strict");
const {
  NamespaceBuilder,
  boundImage,
  buttonFlagVisibility,
  extendRaw,
  first,
  fromRGB,
  panel,
  ref,
  strip,
} = require("./dist");

assert.equal(
  strip(first(22, "#title_text")),
  "((%.22s * #title_text) - '_')"
);
assert.deepEqual(fromRGB(191, 43, 54), [0.749, 0.168, 0.211]);
assert.equal("texture" in boundImage("image").build(), false);
assert.deepEqual(ref("image", { offset: "$offset" }), {
  image: { offset: "$offset" },
});
assert.deepEqual(
  extendRaw("item", "beacon.item_renderer", {
    bindings: "$texture_bindings",
  }),
  { "item@beacon.item_renderer": { bindings: "$texture_bindings" } }
);

const visibilityExpression =
  buttonFlagVisibility("$button_id")[1].source_property_name;
assert.equal(
  visibilityExpression,
  "(not ((#form_button_text - $button_id) = #form_button_text))"
);

const namespace = new NamespaceBuilder("self_check");
const base = panel("base").addToNamespace(namespace);
assert.equal(
  panel("derived").extendsFrom(base).getFullName(),
  "derived@self_check.base"
);
