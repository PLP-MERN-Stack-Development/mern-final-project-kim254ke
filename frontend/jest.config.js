// jest.config.js

export default {
  // The environment to run your tests in (jsdom simulates a browser)
  testEnvironment: "jsdom",

  // Tells Jest how to process your JavaScript and JSX files
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  // The file extensions Jest will look for
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  // The file to run before each test file to set up the environment
  // ** This is the corrected line **
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  // Mocks for different file types so Jest can import them
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};