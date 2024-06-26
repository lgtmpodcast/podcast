#!/usr/bin/env node

const StyleDictionary = require("style-dictionary");

/**
 * Utils
 */
const hasDefaultAndDarkValues = (token) =>
  token.original.value &&
  token.original.value.default &&
  token.original.value.dark;

/**
 * Transforms
 * https://amzn.github.io/style-dictionary/#/api?id=registertransform
 */
StyleDictionary.registerTransform({
  name: "value/default",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transformer: ({ value }) => {
    return value.default;
  },
});

StyleDictionary.registerTransform({
  name: "value/dark",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transformer: ({ value }) => {
    return value.dark;
  },
});

/**
 * Transform Groups
 * https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
 */
StyleDictionary.registerTransformGroup({
  name: "css/default",
  transforms: ["value/default", "name/cti/kebab", "size/pxToRem"],
});

StyleDictionary.registerTransformGroup({
  name: "css/dark",
  transforms: ["value/dark", "name/cti/kebab", "size/pxToRem"],
});

/**
 * Creates style-dictionary config
 * https://amzn.github.io/style-dictionary/#/config
 */
StyleDictionary.extend({
  include: ["tokens.json"],
  source: ["tokens.json"],
  platforms: {
    css: {
      prefix: "lgtm",
      buildPath: "dist/tokens/",
      transformGroup: "css/default",
      options: {
        outputReferences: true,
      },
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
      ],
    },
  },
}).buildAllPlatforms();

StyleDictionary.extend({
  include: ["tokens.json"],
  source: ["tokens.json"],
  platforms: {
    css: {
      prefix: "lgtm",
      buildPath: "dist/tokens/",
      transformGroup: "css/dark",
      options: {
        outputReferences: true,
      },
      files: [
        {
          destination: "tokens.dark.css",
          format: "css/variables",
        },
      ],
    },
  },
}).buildAllPlatforms();
