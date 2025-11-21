// src/setupTests.js

// Polyfill for TextEncoder and TextDecoder, which are missing in Jest/Node.js
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Load environment variables from your .env file
import dotenv from "dotenv";
dotenv.config();

// Mock `import.meta.env` for Vite-based projects
global.import = {
  meta: {
    env: {
      VITE_API_BASE_URL: "http://localhost:5000/api",
    },
  },
};

// Mock `window.matchMedia` which is not available in Jest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});