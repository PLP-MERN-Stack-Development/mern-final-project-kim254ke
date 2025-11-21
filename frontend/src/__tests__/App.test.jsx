// src/__tests__/App.test.jsx

import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock window.matchMedia for this specific test file
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


test('renders without crashing', () => {
  render(<App />);
  // ... rest of your test
});