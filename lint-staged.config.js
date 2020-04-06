module.exports = {
  '*.js': 'eslint src',
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --list-different'
  ]
};
