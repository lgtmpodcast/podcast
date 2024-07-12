import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "@lgtm-org/stylelint-use-font-property";

const rejected = (property) => {
  return `Unexpected "${property}". Please use "font" property instead, and only reference one of: [--lgtm-typography-p, --lgtm-typography-h6, --lgtm-typography-h5, --lgtm-typography-h4, --lgtm-typography-h3, --lgtm-typography-h2, --lgtm-typography-h1]
  `
}
const messages = ruleMessages(ruleName, {
  rejected,
});

const meta = {
  url: "https://github.com/foo-org/stylelint-selector-no-foo/blob/main/README.md"
};


const disallowedList = [
  'font-weight',
  'font-style',
  'font-family',
  'line-height',
  'font-size',
]

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary, secondaryOptions, context) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true]
    });

    if (!validOptions) {
      return
    };

    root.walkDecls((decl) => {
      const property = decl.prop.toString()
      
      if(!disallowedList.includes(property)) {
        return 
      }

      report({
        result,
        ruleName,
        message: messages.rejected(decl.prop),
        node: decl,
        word: decl.prop
      });
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;
ruleFunction.res

export default createPlugin(ruleName, ruleFunction);