const SCSS_VARIABLE = '[a-z](?:(?:[a-z0-9]+-)*[a-z0-9]+|[a-z0-9]*)';
const SCSS_FUNCTION = `${SCSS_VARIABLE}`;
const SCSS_VARIABLE_INLINED = `#\\{\\$${SCSS_VARIABLE}\\}`;
const SCSS_NAME_CHUNK = `(?:${SCSS_VARIABLE_INLINED}|${SCSS_VARIABLE})`;
const BEM_NAME_CHUNK = `${SCSS_NAME_CHUNK}`;
const BEM_NAMESPACE = '[a-z]+';
const SCSS = `(?:${SCSS_NAME_CHUNK}-)*${SCSS_NAME_CHUNK}`;
const BEM = `(?:(?:${BEM_NAMESPACE}|${SCSS_VARIABLE_INLINED})-)?(?:${BEM_NAME_CHUNK}(?:__|--))?(?:${BEM_NAME_CHUNK}--)*${BEM_NAME_CHUNK}`;
const MAX_NESTING_DEPTH = 3;

module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-selector-bem-pattern',
  ],
  rules: {
    'declaration-property-value-blacklist': null, // border: 0 !== border: none
    'max-nesting-depth': MAX_NESTING_DEPTH,
    'plugin/no-unsupported-browser-features': [true, {
      severity: 'warning',
    }], // use .browserslist
    'no-missing-end-of-source-newline': null, // don't care - its all minified
    'order/properties-alphabetical-order': null, // don't care
    'scss/dollar-variable-pattern': `^_?(?:${BEM}|${SCSS})$`,
    'scss/percent-placeholder-pattern': `^(?:${BEM}|${SCSS})$`,
    'selector-class-pattern': [
      `^${BEM}$`,
      {
        message: 'Class names should match BEM convention, e.g. (namespace-)block__element--modifier',
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [`/#\\{(?:${SCSS_VARIABLE}|${SCSS_FUNCTION})/`], // ignore generated patterns
      },
    ],
  },
};
