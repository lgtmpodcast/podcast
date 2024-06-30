import StyleDictionary from "style-dictionary"


/**
 * Build Light Theme
 */
StyleDictionary.registerTransform({
  name: `tokens/light`,
  type: "value",
  transitive: true,
  matcher: (token) => {
    return !!token.themeable
  },
  transformer: (token) => {
    return token.value.light
  }
})

StyleDictionary.registerTransformGroup({
  name: `css/light`,
  transforms: ["attribute/cti", "name/cti/kebab", "tokens/light"],
});

StyleDictionary.extend({
  source: [
    "./style-dictionary/tokens/tokens.json",
    "./style-dictionary/tokens/light.json",
  ],
  platforms: {
    css: {
      transformGroup: `css/light`,
      options: {
        outputReferences: true,
      },
      prefix: "lgtm",
      buildPath: "assets/css/",
      files: [
        {
          destination: `tokens.light.css`,
          format: "css/variables"
        }
      ]
    }
  }
}).buildAllPlatforms()


/**
 * Build Dark Theme
 */
StyleDictionary.registerTransform({
  name: `tokens/dark`,
  type: "value",
  transitive: true,
  matcher: (token) => {
    return !!token.themeable
  },
  transformer: (token) => {
    return token.value.dark
  }
})

StyleDictionary.registerTransformGroup({
  name: `css/dark`,
  transforms: ["attribute/cti", "name/cti/kebab", "tokens/dark"],
});

StyleDictionary.extend({
  source: [
    "./style-dictionary/tokens/tokens.json",
    "./style-dictionary/tokens/dark.json",
  ],
  platforms: {
    css: {
      transformGroup: `css/dark`,
      options: {
        outputReferences: true,
      },      
      prefix: "lgtm",
      buildPath: "assets/css/",
      files: [
        {
          destination: `tokens.dark.css`,
          format: "css/variables"
        }
      ]
    }
  }
}).buildAllPlatforms()
