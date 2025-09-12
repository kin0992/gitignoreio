import { ok, okAsync } from 'neverthrow';
import { describe, expect, it } from 'vitest';

import { GitIgnoreSDK } from '../gitignore-sdk.js';
import { makeMockHttpClient } from './data.js';

describe('GitIgnoreSDK', () => {
  describe('generate', () => {
    it('should return the .gitignore content', async () => {
      const mockContent = '# Node.js\nnode_modules/\nnpm-debug.log';
      const mockHttpClient = makeMockHttpClient();
      mockHttpClient.get.mockReturnValueOnce(okAsync(mockContent));
      const sdk = new GitIgnoreSDK(mockHttpClient);

      const result = await sdk.generate(['node', 'python']);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        new URL(
          'https://www.toptal.com/developers/gitignore/api/node%2Cpython',
        ),
      );
      expect(result).toStrictEqual(ok({ content: mockContent }));
    });
  });
});
