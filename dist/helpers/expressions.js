"use strict";
/**
 * String Expression Helpers
 *
 * Utility functions for building Bedrock UI Molang expressions.
 * These helpers generate expression strings for parsing/manipulating
 * bound string values using C printf-style format specifiers.
 *
 * Format specifier syntax: `%.Ns` where N is the max character count
 * - `%.Ns * string` - Get first N characters (truncate)
 * - `string - (%.Ns * string)` - Get characters after position N (skip N)
 * - String subtraction: `a - b` removes substring b from string a
 *
 * @module helpers/expressions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRGB = fromRGB;
exports.fromHex = fromHex;
exports.defineVar = defineVar;
exports.varRef = varRef;
exports.varKey = varKey;
exports.defineVars = defineVars;
exports.first = first;
exports.skip = skip;
exports.slice = slice;
exports.strip = strip;
exports.prefix = prefix;
exports.notPrefix = notPrefix;
exports.equals = equals;
exports.notEquals = notEquals;
exports.notEmpty = notEmpty;
exports.contains = contains;
exports.notContain = notContain;
exports.concat = concat;
exports.literal = literal;
exports.not = not;
exports.and = and;
exports.or = or;
exports.multiply = multiply;
exports.firstStripped = firstStripped;
exports.skipStripped = skipStripped;
exports.texturePath = texturePath;
// ============================================================================
// Color Conversion Functions
// ============================================================================
/**
 * Converts RGB values (0-255) to Minecraft's color format (0-1).
 *
 * Minecraft expects color values between 0 and 1, but most people
 * work with the standard 0-255 RGB format. This helper converts
 * between them.
 *
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Color array in Minecraft format [r, g, b] with values 0-1
 *
 * @example
 * ```typescript
 * image("bg")
 *   .color(fromRGB(191, 43, 54))  // Converts to [0.749, 0.168, 0.211]
 * ```
 *
 * @example Pure red
 * ```typescript
 * label("title").color(fromRGB(255, 0, 0))  // [1, 0, 0]
 * ```
 */
function fromRGB(r, g, b) {
    // Three decimals preserve existing JSON UI colors without float noise.
    const truncate = (n) => Math.trunc(n * 1000) / 1000;
    return [truncate(r / 255), truncate(g / 255), truncate(b / 255)];
}
/**
 * Converts a hex color string to Minecraft's color format (0-1).
 *
 * Accepts hex strings with or without the # prefix.
 * Supports both 3-character (#RGB) and 6-character (#RRGGBB) formats.
 *
 * @param hex - Hex color string (e.g., "#FF0000", "FF0000", "#F00", "F00")
 * @returns Color array in Minecraft format [r, g, b] with values 0-1
 *
 * @example 6-character hex
 * ```typescript
 * image("bg")
 *   .color(fromHex("#BF2B36"))  // Converts to [0.749, 0.168, 0.211]
 * ```
 *
 * @example 3-character hex (shorthand)
 * ```typescript
 * label("title").color(fromHex("#F00"))  // [1, 0, 0]
 * ```
 *
 * @example Without # prefix
 * ```typescript
 * panel("box").color(fromHex("1a1a1a"))
 * ```
 */
function fromHex(hex) {
    const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
    if (cleanHex.length === 3) {
        const r = parseInt(cleanHex[0] + cleanHex[0], 16);
        const g = parseInt(cleanHex[1] + cleanHex[1], 16);
        const b = parseInt(cleanHex[2] + cleanHex[2], 16);
        return fromRGB(r, g, b);
    }
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return fromRGB(r, g, b);
}
// ============================================================================
// Variable Helper Functions
// ============================================================================
/**
 * Creates a variable key with a default value for use in raw element definitions.
 *
 * Returns an object with the properly formatted `$name|default` key.
 * Use the spread operator to merge into your element definition.
 *
 * @param name - The variable name (with or without $ prefix)
 * @param defaultValue - The default value for the variable
 * @returns Object with the formatted variable key and value
 *
 * @example Basic usage
 * ```typescript
 * ns.addRaw("my_element", {
 *   type: "panel",
 *   ...defineVar("visible", true),
 *   ...defineVar("padding", 10),
 *   ...defineVar("color", [1, 0, 0]),
 * });
 * // Produces:
 * // {
 * //   type: "panel",
 * //   "$visible|default": true,
 * //   "$padding|default": 10,
 * //   "$color|default": [1, 0, 0]
 * // }
 * ```
 *
 * @example With string values
 * ```typescript
 * ...defineVar("texture_path", "textures/ui/default")
 * // "$texture_path|default": "textures/ui/default"
 * ```
 */
function defineVar(name, defaultValue) {
    const varName = name.startsWith("$") ? name.slice(1) : name;
    return { [`$${varName}|default`]: defaultValue };
}
/**
 * Creates a variable reference string.
 *
 * Ensures the variable name has the $ prefix.
 *
 * @param name - The variable name (with or without $ prefix)
 * @returns The variable reference string with $ prefix
 *
 * @example
 * ```typescript
 * varRef("button_text")  // "$button_text"
 * varRef("$color")       // "$color"
 * ```
 */
function varRef(name) {
    return name.startsWith("$") ? name : `$${name}`;
}
/**
 * Creates the raw key string for a variable with default.
 *
 * Unlike `defineVar`, this returns just the key string, not an object.
 * Useful when you need to construct the object yourself.
 *
 * @param name - The variable name (with or without $ prefix)
 * @returns The formatted key string (e.g., "$visible|default")
 *
 * @example
 * ```typescript
 * const key = varKey("visible");  // "$visible|default"
 *
 * const element = {
 *   [varKey("padding")]: 10,
 *   [varKey("color")]: [1, 1, 1]
 * };
 * ```
 */
function varKey(name) {
    const varName = name.startsWith("$") ? name.slice(1) : name;
    return `$${varName}|default`;
}
/**
 * Creates multiple variable definitions at once.
 *
 * Convenience function for defining several variables in one call.
 *
 * @param vars - Object mapping variable names to default values
 * @returns Object with all formatted variable keys and values
 *
 * @example
 * ```typescript
 * ns.addRaw("template", {
 *   type: "panel",
 *   ...defineVars({
 *     visible: true,
 *     padding: 10,
 *     color: [1, 0, 0],
 *     text: "Default"
 *   })
 * });
 * // Produces:
 * // {
 * //   type: "panel",
 * //   "$visible|default": true,
 * //   "$padding|default": 10,
 * //   "$color|default": [1, 0, 0],
 * //   "$text|default": "Default"
 * // }
 * ```
 */
function defineVars(vars) {
    const result = {};
    for (const [name, value] of Object.entries(vars)) {
        const varName = name.startsWith("$") ? name.slice(1) : name;
        result[`$${varName}|default`] = value;
    }
    return result;
}
// ============================================================================
// String Manipulation Functions
// ============================================================================
/**
 * Get the first N characters of a string property.
 *
 * Equivalent to: `string.substring(0, n)` or `string.slice(0, n)`
 *
 * @param length - Number of characters to take from the start
 * @param prop - The property reference (e.g., "#form_button_text")
 * @returns Expression string for first N characters
 *
 * @example
 * ```typescript
 * first(80, "#level_number")  // "(%.80s * #level_number)"
 * first(1, "#text")           // "(%.1s * #text)"
 * ```
 */
function first(length, prop) {
    return `(%.${length}s * ${prop})`;
}
/**
 * Skip the first N characters and get the rest.
 *
 * Equivalent to: `string.substring(n)` or `string.slice(n)`
 *
 * @param length - Number of characters to skip
 * @param prop - The property reference
 * @returns Expression string for characters after position N
 *
 * @example
 * ```typescript
 * skip(80, "#level_number")   // "(#level_number - (%.80s * #level_number))"
 * skip(4, "#text")            // "(#text - (%.4s * #text))"
 * ```
 */
function skip(length, prop) {
    return `(${prop} - (%.${length}s * ${prop}))`;
}
/**
 * Get a slice of characters: skip first `start` chars, then take `length` chars.
 *
 * Equivalent to: `string.substring(start, start + length)`
 *
 * @param start - Position to start from (characters to skip)
 * @param length - Number of characters to take
 * @param prop - The property reference
 * @returns Expression string for the substring
 *
 * @example
 * ```typescript
 * slice(4, 8, "#text")  // Get chars 4-12: "%.8s * (#text - (%.4s * #text))"
 * ```
 */
function slice(start, length, prop) {
    return `%.${length}s * ${skip(start, prop)}`;
}
/**
 * Strip a character/substring from the result (usually underscore separator).
 *
 * @param expr - The expression to strip from
 * @param char - The character to remove (default: "_")
 * @returns Expression with character removed
 *
 * @example
 * ```typescript
 * strip(first(80, "#level"))       // "((%.80s * #level) - '_')"
 * strip(skip(4, "#text"), ":")     // "((#text - (%.4s * #text)) - ':')"
 * ```
 */
function strip(expr, char = "_") {
    return `(${expr} - '${char}')`;
}
// ============================================================================
// Comparison Functions
// ============================================================================
/**
 * Check if the first N characters equal a specific value.
 *
 * @param length - Number of characters to check
 * @param prop - The property reference
 * @param value - The expected prefix value
 * @returns Expression string for prefix check (boolean result)
 *
 * @example
 * ```typescript
 * prefix(4, "#text", "cht:")     // "(('%.4s' * #text) = 'cht:')"
 * ```
 */
function prefix(length, prop, value) {
    return `((%.${length}s * ${prop}) = '${value}')`;
}
/**
 * Check if the first N characters do NOT equal a specific value.
 *
 * @param length - Number of characters to check
 * @param prop - The property reference
 * @param value - The value to check against
 * @returns Expression string for negative prefix check
 */
function notPrefix(length, prop, value) {
    return `(not(${prefix(length, prop, value)}))`;
}
/**
 * Check if a property equals a value.
 *
 * @param prop - The property reference
 * @param value - The value to compare against
 * @returns Expression for equality check
 */
function equals(prop, value) {
    return `(${prop} = '${value}')`;
}
/**
 * Check if a property does not equal a value.
 *
 * @param prop - The property reference
 * @param value - The value to compare against
 * @returns Expression for inequality check
 */
function notEquals(prop, value) {
    return `(not ${equals(prop, value)})`;
}
/**
 * Check if a property is not empty.
 *
 * @param prop - The property reference
 * @returns Expression that evaluates to true if not empty
 */
function notEmpty(prop) {
    return `(not (${prop} = ''))`;
}
/**
 * Check if string contains a substring (by checking if removing it changes the string).
 *
 * @param prop - The property reference
 * @param substring - The substring to search for
 * @returns Expression that evaluates to true if substring exists
 *
 * @example
 * ```typescript
 * contains("#text", "search")  // "(not ((#text - 'search') = #text))"
 * ```
 */
function contains(prop, substring, stringWrap = true) {
    return `(not ((${prop} - ${stringWrap ? `'${substring}'` : substring}) = ${prop}))`;
}
/**
 * Check if a property does not contain a substring.
 *
 * @param prop - The property reference
 * @param substring - The substring to search for
 * @returns Expression that evaluates to true if substring does not exist
 */
function notContain(prop, substring, stringWrap = true) {
    return `((${prop} - ${stringWrap ? `'${substring}'` : substring}) = ${prop})`;
}
// ============================================================================
// String Building Functions
// ============================================================================
/**
 * Concatenate strings together.
 *
 * @param parts - String parts to concatenate (literals should be quoted)
 * @returns Expression for concatenated string
 *
 * @example
 * ```typescript
 * concat("'textures/ui/'", skip(4, "#path"))
 * // "('textures/ui/' + (#path - (%.4s * #path)))"
 * ```
 */
function concat(...parts) {
    return `(${parts.join(" + ")})`;
}
/**
 * Wrap a value as a string literal for use in expressions.
 *
 * @param value - The string value
 * @returns Quoted string for use in expressions
 */
function literal(value) {
    return `'${value}'`;
}
// ============================================================================
// Logical Functions
// ============================================================================
/**
 * Negate an expression.
 *
 * @param expr - The expression to negate
 * @returns Negated expression
 */
function not(expr) {
    return `(not ${expr})`;
}
/**
 * Combine expressions with AND.
 *
 * @param exprs - Expressions to AND together
 * @returns Combined expression
 */
function and(...exprs) {
    return `(${exprs.join(" and ")})`;
}
/**
 * Combine expressions with OR.
 *
 * @param exprs - Expressions to OR together
 * @returns Combined expression
 */
function or(...exprs) {
    return `(${exprs.join(" or ")})`;
}
// ============================================================================
// Numeric Functions
// ============================================================================
/**
 * Multiply a numeric string by a number (for numeric parsing).
 *
 * @param prop - The property containing a numeric string
 * @param multiplier - The multiplier
 * @returns Expression for multiplication
 */
function multiply(prop, multiplier) {
    return `( ${prop} * ${multiplier} )`;
}
// ============================================================================
// Compound Helpers
// ============================================================================
/**
 * Get first N chars with underscore stripped (common pattern).
 *
 * @param length - Number of characters
 * @param prop - The property reference
 * @returns Expression for first N chars without underscore
 */
function firstStripped(length, prop) {
    return strip(first(length, prop));
}
/**
 * Skip first N chars with underscore stripped (common pattern).
 *
 * @param length - Number of characters to skip
 * @param prop - The property reference
 * @returns Expression for remainder without underscore
 */
function skipStripped(length, prop) {
    return strip(skip(length, prop));
}
/**
 * Build a texture path by concatenating a base path with a parsed property.
 *
 * @param basePath - The base texture path
 * @param prop - Property containing the texture name
 * @param skipChars - Optional chars to skip from prop (default: 0)
 * @returns Expression for full texture path
 *
 * @example
 * ```typescript
 * texturePath("textures/ui/sidebar/balls/", "#ball_type")
 * // "('textures/ui/sidebar/balls/' + #ball_type)"
 * ```
 */
function texturePath(basePath, prop, skipChars = 0) {
    const propExpr = skipChars > 0 ? skip(skipChars, prop) : prop;
    return concat(literal(basePath), propExpr);
}
//# sourceMappingURL=expressions.js.map