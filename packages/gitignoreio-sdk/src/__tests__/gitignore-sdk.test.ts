import { describe, expect, it } from 'vitest';

import { GitIgnoreSDK } from '../gitignore-sdk';
import { makeMockHttpClient } from './data';

describe('GitIgnoreSDK', () => {
  describe('generate', () => {
    it('should generate gitignore content for multiple technologies', async () => {
      const mockContent = '# Node.js\nnode_modules/\nnpm-debug.log';
      const mockHttpClient = makeMockHttpClient();
      const sdk = new GitIgnoreSDK(mockHttpClient);
      mockHttpClient.get.mockResolvedValueOnce(mockContent);

      const result = await sdk.generate(['node', 'python']);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        new URL(
          'https://www.toptal.com/developers/gitignore/api/node%2Cpython',
        ),
      );
      expect(result).toStrictEqual({ content: mockContent });
    });

    it('should throw error for empty technologies array', async () => {
      const mockHttpClient = makeMockHttpClient();
      const sdk = new GitIgnoreSDK(mockHttpClient);
      await expect(sdk.generate([])).rejects.toThrow(
        'You must provide at least something to ignore',
      );
    });

    it('should handle HTTP client errors', async () => {
      const mockHttpClient = makeMockHttpClient();
      const sdk = new GitIgnoreSDK(mockHttpClient);
      mockHttpClient.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(sdk.generate(['node'])).rejects.toThrow(
        'Failed to generate gitignore: Network error',
      );
    });
  });
});
