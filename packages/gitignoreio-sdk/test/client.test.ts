import { describe, it, expect, vi } from 'vitest';
import { GitIgnoreClient, GitIgnoreError, GITIGNORE_TEMPLATES } from '../src';

describe('GitIgnoreClient', () => {
  describe('constructor', () => {
    it('should create a client with default options', () => {
      const client = new GitIgnoreClient();
      expect(client).toBeInstanceOf(GitIgnoreClient);
    });

    it('should create a client with custom options', () => {
      const client = new GitIgnoreClient({
        baseUrl: 'https://custom.api.com',
        timeout: 5000,
      });
      expect(client).toBeInstanceOf(GitIgnoreClient);
    });
  });

  describe('getAvailableTemplates', () => {
    it('should return all available templates', () => {
      const client = new GitIgnoreClient();
      const templates = client.getAvailableTemplates();
      expect(templates).toBe(GITIGNORE_TEMPLATES);
      expect(templates.length).toBeGreaterThan(0);
      expect(templates).toContain('node');
      expect(templates).toContain('python');
      expect(templates).toContain('java');
    });
  });

  describe('isTemplateAvailable', () => {
    it('should return true for valid templates', () => {
      const client = new GitIgnoreClient();
      expect(client.isTemplateAvailable('node')).toBe(true);
      expect(client.isTemplateAvailable('python')).toBe(true);
      expect(client.isTemplateAvailable('java')).toBe(true);
    });

    it('should return false for invalid templates', () => {
      const client = new GitIgnoreClient();
      expect(client.isTemplateAvailable('invalid-template')).toBe(false);
      expect(client.isTemplateAvailable('nonexistent')).toBe(false);
    });
  });

  describe('searchTemplates', () => {
    it('should find templates by partial name match', () => {
      const client = new GitIgnoreClient();
      const results = client.searchTemplates('node');
      expect(results).toContain('node');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const client = new GitIgnoreClient();
      const results1 = client.searchTemplates('NODE');
      const results2 = client.searchTemplates('node');
      expect(results1).toEqual(results2);
    });

    it('should return empty array for no matches', () => {
      const client = new GitIgnoreClient();
      const results = client.searchTemplates('xyz-nonexistent');
      expect(results).toEqual([]);
    });
  });

  describe('generateGitIgnore', () => {
    it('should throw error for empty templates array', async () => {
      const client = new GitIgnoreClient();
      await expect(client.generateGitIgnore([])).rejects.toThrow(GitIgnoreError);
    });

    it('should throw error for invalid templates', async () => {
      const client = new GitIgnoreClient();
      // @ts-expect-error - testing invalid input
      await expect(client.generateGitIgnore(['invalid-template'])).rejects.toThrow(GitIgnoreError);
    });

    it('should make API request with valid templates', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('# Node.js\nnode_modules/\n'),
      });

      const client = new GitIgnoreClient({
        fetch: mockFetch as any,
      });

      const result = await client.generateGitIgnore(['node']);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.toptal.com/developers/gitignore/api/node',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'User-Agent': 'gitignoreio-sdk/1.0.0',
          },
        })
      );

      expect(result.content).toBe('# Node.js\nnode_modules/\n');
      expect(result.templates).toEqual(['node']);
    });

    it('should handle multiple templates', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('# Combined gitignore\nnode_modules/\n*.pyc\n'),
      });

      const client = new GitIgnoreClient({
        fetch: mockFetch as any,
      });

      const result = await client.generateGitIgnore(['node', 'python']);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.toptal.com/developers/gitignore/api/node,python',
        expect.anything()
      );

      expect(result.templates).toEqual(['node', 'python']);
    });

    it('should handle API errors', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const client = new GitIgnoreClient({
        fetch: mockFetch as any,
      });

      await expect(client.generateGitIgnore(['node'])).rejects.toThrow(GitIgnoreError);
    });

    it('should handle network errors', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const client = new GitIgnoreClient({
        fetch: mockFetch as any,
      });

      await expect(client.generateGitIgnore(['node'])).rejects.toThrow(GitIgnoreError);
    });
  });
});