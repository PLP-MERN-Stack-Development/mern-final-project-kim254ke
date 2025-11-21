// src/__tests__/App.test.jsx
import { API_BASE_URL, SOCKET_URL } from '../config/api';

describe('Application Configuration', () => {
  it('should have API_BASE_URL defined', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  it('should have SOCKET_URL defined', () => {
    expect(SOCKET_URL).toBeDefined();
    expect(typeof SOCKET_URL).toBe('string');
  });

  it('should have valid API URL format', () => {
    expect(API_BASE_URL).toMatch(/^https?:\/\//);
  });
});