
/** @type {import('stylelint').Config} */
export default { 
  
  extends: ["stylelint-config-standard"],
  plugins: [
    "./stylelint/plugins/stylelint-use-font-property",
    "./stylelint/plugins/stylelint-use-typography-tokens",
    "./stylelint/plugins/stylelint-no-undefined-custom-properties",

  ],
  rules: {
    "@lgtm-org/stylelint-use-font-property": true,
    "@lgtm-org/stylelint-use-typography-tokens": true,
    "@lgtm-org/stylelint-no-undefined-custom-properties": true,
  },  
}
