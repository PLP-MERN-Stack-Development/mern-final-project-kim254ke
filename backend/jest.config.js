// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest', // <-- Use Babel to transform JS
    },
    testMatch: ['**/tests/**/*.test.js'],
    // If you need to transform node_modules too (rare), uncomment:
    // transformIgnorePatterns: [],
  };
  