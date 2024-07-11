import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "@lgtm-org/stylelint-no-undefined-custom-properties";

const rejected = (value) => {
  return `"${value}" is not a known custom property`
}
const messages = ruleMessages(ruleName, {
  rejected,
});

const meta = {
  url: "https://github.com/foo-org/stylelint-selector-no-foo/blob/main/README.md"
};



const valid = [
  '--lgtm-color-warning',
  '--lgtm-color-success',
  '--lgtm-color-danger',
  '--lgtm-color-action',
  '--lgtm-color-neutral-900',
  '--lgtm-color-neutral-600',
  '--lgtm-color-neutral-500',
  '--lgtm-color-neutral-400',
  '--lgtm-color-neutral-100',
  '--lgtm-space-1000',
  '--lgtm-space-800',
  '--lgtm-space-600',
  '--lgtm-space-500',
  '--lgtm-space-400',
  '--lgtm-space-350',
  '--lgtm-space-300',
  '--lgtm-space-250',
  '--lgtm-space-200',
  '--lgtm-space-150',
  '--lgtm-space-100',
  '--lgtm-space-50',
  '--lgtm-space-25',
  '--lgtm-typography-p',
  '--lgtm-typography-h6',
  '--lgtm-typography-h5',
  '--lgtm-typography-h4',
  '--lgtm-typography-h3',
  '--lgtm-typography-h2',
  '--lgtm-typography-h1',
  '--lgtm-color-text-body',
  '--lgtm-color-text-heading',
  '--lgtm-color-background',
  '--lgtm-color-subtle',
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
      const value = decl.value

      if(!value.startsWith('var(')) {
        return
      }

      if(valid.includes(value.replace('var(', '').replace(')', ''))) {
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