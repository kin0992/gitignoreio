import { describe, it, expect } from 'vitest';
import { GitIgnoreSDK, generate } from '../src/index.js';

// Integration tests - these will make real API calls
describe('Integration Tests', () => {
  // Skip these tests in CI or if no internet connection
  const shouldRunIntegrationTests = process.env.RUN_INTEGRATION_TESTS === 'true';

  describe.skipIf(!shouldRunIntegrationTests)('GitIgnoreSDK Integration', () => {
    it('should generate real gitignore content for Node.js', async () => {
      const sdk = new GitIgnoreSDK();
      const result = await sdk.generate(['node']);
      
      expect(result.content).toBeDefined();
      expect(result.content).toContain('node_modules');
      expect(typeof result.content).toBe('string');
      expect(result.content.length).toBeGreaterThan(0);
    }, 10000); // 10 second timeout for network request

    it('should generate real gitignore content for multiple technologies', async () => {
      const sdk = new GitIgnoreSDK();
      const result = await sdk.generate(['node', 'python']);
      
      expect(result.content).toBeDefined();
      expect(result.content).toContain('node_modules');
      expect(result.content).toContain('__pycache__');
      expect(typeof result.content).toBe('string');
      expect(result.content.length).toBeGreaterThan(0);
    }, 10000);

    it('should work with convenience function', async () => {
      const result = await generate(['react']);
      
      expect(result.content).toBeDefined();
      expect(typeof result.content).toBe('string');
      expect(result.content.length).toBeGreaterThan(0);
    }, 10000);
  });

  describe('Unit tests (always run)', () => {
    it('should export main classes and functions', () => {
      expect(GitIgnoreSDK).toBeDefined();
      expect(generate).toBeDefined();
      expect(typeof GitIgnoreSDK).toBe('function');
      expect(typeof generate).toBe('function');
    });
  });
});