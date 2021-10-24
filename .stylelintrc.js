module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier',
  ],
  ignoreFiles: [
    'node_modules/**',
    'public/**',
    'src/assets/images/**',
    '**.json',
    '**.md',
    '**.ico',
  ],
  rules: {
    'block-no-empty': null,
    'no-empty-source': null,
    'no-duplicate-selectors': null, // styled-componentsの分岐で重複することがあるため
  },
};
