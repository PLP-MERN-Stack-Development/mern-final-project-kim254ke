module.exports = {
    root: true,
    env: { 
      browser: true, 
      es2020: true,
      jest: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'coverage'],
    parserOptions: { 
      ecmaVersion: 'latest', 
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: { 
      react: { 
        version: '19.2' 
      } 
    },
    plugins: ['react-refresh'],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  };