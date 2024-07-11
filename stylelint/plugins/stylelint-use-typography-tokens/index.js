import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "@lgtm-org/stylelint-use-typography-tokens";

const rejected = (value) => {
  return `Unexpected "${value}". Please only reference one of: [--lgtm-typography-p, --lgtm-typography-h6, --lgtm-typography-h5, --lgtm-typography-h4, --lgtm-typography-h3, --lgtm-typography-h2, --lgtm-typography-h1]
  `
}
const messages = ruleMessages(ruleName, {
  rejected,
});

const meta = {
  url: "https://github.com/foo-org/stylelint-selector-no-foo/blob/main/README.md"
};


const valid = [
  // Tokens
  'var(--lgtm-typography-p)',
  'var(--lgtm-typography-h6)',
  'var(--lgtm-typography-h5)',
  'var(--lgtm-typography-h4)',
  'var(--lgtm-typography-h3)',
  'var(--lgtm-typography-h2)',
  'var(--lgtm-typography-h1)',

  // Global Values
  'initial',
  'inherit',
  'unset',
  'revert',
  'revert-layer',
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
      const value = decl.value.toString()

      
      if(property !== 'font') {
        return 
      }
      
      if(valid.includes(value)) {
        return 
      }
      
      report({
        result,
        ruleName,
        message: messages.rejected(decl.value),
        node: decl,
        word: decl.value
      });
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;
ruleFunction.res

export default createPlugin(ruleName, ruleFunction);