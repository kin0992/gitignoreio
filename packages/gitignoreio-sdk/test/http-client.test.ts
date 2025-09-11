import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DefaultHttpClient } from '../src/http-client.js';

// Mock fetch globally
global.fetch = vi.fn();

describe('DefaultHttpClient', () => {
  let httpClient: DefaultHttpClient;
  
  beforeEach(() => {
    httpClient = new DefaultHttpClient();
    vi.clearAllMocks();
  });

  it('should successfully fetch data', async () => {
    const mockResponse = 'mock gitignore content';
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await httpClient.get('https://example.com');
    
    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith('https://example.com');
  });

  it('should throw error on HTTP error status', async () => {
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(httpClient.get('https://example.com')).rejects.toThrow('HTTP error! status: 404');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(httpClient.get('https://example.com')).rejects.toThrow('Failed to fetch from https://example.com: Network error');
  });
});