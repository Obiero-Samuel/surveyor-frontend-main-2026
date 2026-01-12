module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: '18.2'
    }
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
};