import { describe, it, expect } from 'vitest';
import { version, GitIgnoreSDK, DefaultHttpClient, generate } from '../src/index.js';

describe('Package exports', () => {
  it('should export version', () => {
    expect(version).toBe('0.0.0');
  });

  it('should export GitIgnoreSDK class', () => {
    expect(GitIgnoreSDK).toBeDefined();
    expect(typeof GitIgnoreSDK).toBe('function');
  });

  it('should export DefaultHttpClient class', () => {
    expect(DefaultHttpClient).toBeDefined();
    expect(typeof DefaultHttpClient).toBe('function');
  });

  it('should export generate function', () => {
    expect(generate).toBeDefined();
    expect(typeof generate).toBe('function');
  });

  it('should instantiate GitIgnoreSDK', () => {
    const sdk = new GitIgnoreSDK();
    expect(sdk).toBeInstanceOf(GitIgnoreSDK);
  });

  it('should instantiate DefaultHttpClient', () => {
    const client = new DefaultHttpClient();
    expect(client).toBeInstanceOf(DefaultHttpClient);
  });
});