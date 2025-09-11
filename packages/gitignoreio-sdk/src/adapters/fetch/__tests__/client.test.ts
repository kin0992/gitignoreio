import { err, ok } from 'neverthrow';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DefaultHttpClient } from '../client.js';
import { makeMockResponse } from './response';

// Mock fetch globally for all tests in this file
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('DefaultHttpClient', () => {
  const client = new DefaultHttpClient();
  const testUrl = new URL('https://api.example.com/test');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should return the payload', async () => {
      const mockResponse = makeMockResponse(
        200,
        vi.fn().mockResolvedValue('response body'),
      );
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await client.get(testUrl);

      expect(result).toStrictEqual(ok('response body'));
      expect(mockFetch).toHaveBeenCalledWith(testUrl);
      expect(mockResponse.text).toHaveBeenCalledTimes(1);
    });

    it('should return the error when response is not ok', async () => {
      const mockResponse = makeMockResponse(404, vi.fn());
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await client.get(testUrl);

      expect(result).toStrictEqual(err(new Error('HTTP error! status: 404')));
      expect(mockFetch).toHaveBeenCalledWith(testUrl);
      expect(mockResponse.text).not.toHaveBeenCalled();
    });

    it('should return error when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await client.get(testUrl);

      expect(result).toStrictEqual(
        err(
          new Error(
            'Failed to fetch data from https://api.example.com/test: Network error',
          ),
        ),
      );
      expect(mockFetch).toHaveBeenCalledWith(testUrl);
    });

    it('should return error when fails the promise to return the text', async () => {
      const mockResponse = makeMockResponse(
        200,
        vi.fn().mockRejectedValue(new Error('Text parsing error')),
      );
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await client.get(testUrl);

      expect(result).toStrictEqual(
        err(
          new Error(
            'Failed to read response text from https://api.example.com/test (status: 200)',
          ),
        ),
      );
      expect(mockFetch).toHaveBeenCalledWith(testUrl);
      expect(mockResponse.text).toHaveBeenCalledTimes(1);
    });
  });
});
