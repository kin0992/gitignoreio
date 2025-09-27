import { errAsync, okAsync } from 'neverthrow';
import { describe, expect, it } from 'vitest';

import { makeMockHttpClient } from '../../__tests__/data.js';
import { GitIgnoreSDK } from '../sdk.js';

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
      expect(result).toStrictEqual({ content: mockContent });
    });

    it('should throw an error when HTTP client fails', async () => {
      const mockHttpClient = makeMockHttpClient();
      mockHttpClient.get.mockReturnValueOnce(errAsync(new Error('anError')));
      const sdk = new GitIgnoreSDK(mockHttpClient);

      await expect(sdk.generate(['node', 'python'])).rejects.toStrictEqual(
        new Error('There was an error fetching data from gitignore.io'),
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        new URL(
          'https://www.toptal.com/developers/gitignore/api/node%2Cpython',
        ),
      );
    });
  });

  describe('list', () => {
    it('should return the list of technologies', async () => {
      const mockContent = 'a\nb,c';
      const mockHttpClient = makeMockHttpClient();
      mockHttpClient.get.mockReturnValueOnce(okAsync(mockContent));
      const sdk = new GitIgnoreSDK(mockHttpClient);

      const result = await sdk.listTechnologies();

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        new URL('https://www.toptal.com/developers/gitignore/api/list'),
      );
      expect(result).toStrictEqual(['a', 'b', 'c']);
    });

    it('should throw an error when HTTP client fails', async () => {
      const mockHttpClient = makeMockHttpClient();
      mockHttpClient.get.mockReturnValueOnce(errAsync(new Error('anError')));
      const sdk = new GitIgnoreSDK(mockHttpClient);

      await expect(sdk.listTechnologies()).rejects.toStrictEqual(
        new Error('There was an error fetching data from gitignore.io'),
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        new URL('https://www.toptal.com/developers/gitignore/api/list'),
      );
    });
  });
});
