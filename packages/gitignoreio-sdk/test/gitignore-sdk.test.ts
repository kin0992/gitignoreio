import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitIgnoreSDK } from '../src/gitignore-sdk.js';
import { HttpClient } from '../src/types.js';

describe('GitIgnoreSDK', () => {
  let mockHttpClient: HttpClient;
  let sdk: GitIgnoreSDK;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
    };
    sdk = new GitIgnoreSDK({}, mockHttpClient);
  });

  describe('constructor', () => {
    it('should use default configuration when no config provided', () => {
      const defaultSdk = new GitIgnoreSDK();
      expect(defaultSdk).toBeInstanceOf(GitIgnoreSDK);
    });

    it('should accept custom baseUrl', () => {
      const customSdk = new GitIgnoreSDK({ baseUrl: 'https://custom.api.com' });
      expect(customSdk).toBeInstanceOf(GitIgnoreSDK);
    });
  });

  describe('generate', () => {
    it('should generate gitignore content for single technology', async () => {
      const mockContent = '# Node.js\nnode_modules/\nnpm-debug.log';
      vi.mocked(mockHttpClient.get).mockResolvedValueOnce(mockContent);

      const result = await sdk.generate(['node']);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'https://www.toptal.com/developers/gitignore/api/node'
      );
      expect(result).toEqual({ content: mockContent });
    });

    it('should generate gitignore content for multiple technologies', async () => {
      const mockContent = '# Node.js\nnode_modules/\n\n# Python\n__pycache__/';
      vi.mocked(mockHttpClient.get).mockResolvedValueOnce(mockContent);

      const result = await sdk.generate(['node', 'python']);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'https://www.toptal.com/developers/gitignore/api/node%2Cpython'
      );
      expect(result).toEqual({ content: mockContent });
    });

    it('should handle special characters in technology names', async () => {
      const mockContent = '# Content';
      vi.mocked(mockHttpClient.get).mockResolvedValueOnce(mockContent);

      await sdk.generate(['react native']);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'https://www.toptal.com/developers/gitignore/api/react%20native'
      );
    });

    it('should throw error for empty technologies array', async () => {
      await expect(sdk.generate([])).rejects.toThrow('Technologies array cannot be empty');
    });

    it('should throw error for null/undefined input', async () => {
      await expect(sdk.generate(null as any)).rejects.toThrow('Technologies array cannot be empty');
      await expect(sdk.generate(undefined as any)).rejects.toThrow('Technologies array cannot be empty');
    });

    it('should throw error for non-string technologies', async () => {
      await expect(sdk.generate([123 as any])).rejects.toThrow('All technologies must be strings');
      await expect(sdk.generate(['node', null as any])).rejects.toThrow('All technologies must be strings');
    });

    it('should handle HTTP client errors', async () => {
      vi.mocked(mockHttpClient.get).mockRejectedValueOnce(new Error('Network error'));

      await expect(sdk.generate(['node'])).rejects.toThrow('Failed to generate gitignore: Network error');
    });
  });

  describe('with custom baseUrl', () => {
    it('should use custom baseUrl', async () => {
      const customSdk = new GitIgnoreSDK({ baseUrl: 'https://custom.api.com' }, mockHttpClient);
      const mockContent = '# Content';
      vi.mocked(mockHttpClient.get).mockResolvedValueOnce(mockContent);

      await customSdk.generate(['node']);

      expect(mockHttpClient.get).toHaveBeenCalledWith('https://custom.api.com/node');
    });
  });
});