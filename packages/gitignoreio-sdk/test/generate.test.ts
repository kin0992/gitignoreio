import { describe, it, expect, vi } from 'vitest';
import { generate } from '../src/generate.js';

// Mock fetch globally
global.fetch = vi.fn();

describe('generate convenience function', () => {
  it('should generate gitignore content using default configuration', async () => {
    const mockContent = '# Node.js\nnode_modules/\nnpm-debug.log';
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockContent),
    } as Response);

    const result = await generate(['node']);

    expect(result).toEqual({ content: mockContent });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.toptal.com/developers/gitignore/api/node'
    );
  });

  it('should use custom configuration', async () => {
    const mockContent = '# Custom content';
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockContent),
    } as Response);

    const result = await generate(['node'], { baseUrl: 'https://custom.api.com' });

    expect(result).toEqual({ content: mockContent });
    expect(mockFetch).toHaveBeenCalledWith('https://custom.api.com/node');
  });

  it('should handle multiple technologies', async () => {
    const mockContent = '# Multi-tech content';
    const mockFetch = vi.mocked(fetch);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockContent),
    } as Response);

    const result = await generate(['node', 'python', 'react']);

    expect(result).toEqual({ content: mockContent });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.toptal.com/developers/gitignore/api/node%2Cpython%2Creact'
    );
  });
});