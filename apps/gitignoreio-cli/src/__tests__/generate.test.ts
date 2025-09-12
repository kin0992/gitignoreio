import { describe, expect, it } from 'vitest';

import { filterTemplates, generateCommand } from '../commands/generate.js';

describe('Generate Command', () => {
  it('should be defined', () => {
    expect(generateCommand).toBeDefined();
    expect(generateCommand.name()).toBe('generate');
    expect(generateCommand.description()).toBe(
      'Interactively generate .gitignore file from templates',
    );
  });

  it('should have the correct command structure', () => {
    expect(generateCommand.name()).toBe('generate');
    expect(typeof generateCommand.action).toBe('function');
  });

  describe('filterTemplates', () => {
    const mockTemplates = [
      'node',
      'nodejs',
      'java',
      'javascript',
      'python',
      'android',
      'deno',
    ] as const;

    it('should return all templates when search term is empty', () => {
      expect(filterTemplates('', mockTemplates)).toEqual(mockTemplates);
      expect(filterTemplates('   ', mockTemplates)).toEqual(mockTemplates);
    });

    it('should filter templates case-insensitively', () => {
      expect(filterTemplates('no', mockTemplates)).toEqual([
        'node',
        'nodejs',
        'deno',
      ]);
      expect(filterTemplates('NO', mockTemplates)).toEqual([
        'node',
        'nodejs',
        'deno',
      ]);
      expect(filterTemplates('py', mockTemplates)).toEqual(['python']); // 'py' should match only 'python'
    });

    it('should handle case-insensitive partial matches correctly', () => {
      expect(filterTemplates('Node', mockTemplates)).toEqual([
        'node',
        'nodejs',
      ]);
      expect(filterTemplates('JAVA', mockTemplates)).toEqual([
        'java',
        'javascript',
      ]);
      expect(filterTemplates('Deno', mockTemplates)).toEqual(['deno']);
    });

    it('should filter templates with exact matches', () => {
      expect(filterTemplates('java', mockTemplates)).toEqual([
        'java',
        'javascript',
      ]);
      expect(filterTemplates('python', mockTemplates)).toEqual(['python']);
    });

    it('should return empty array when no matches found', () => {
      expect(filterTemplates('xyz', mockTemplates)).toEqual([]);
      expect(filterTemplates('nonexistent', mockTemplates)).toEqual([]);
    });

    it('should handle partial matches', () => {
      expect(filterTemplates('script', mockTemplates)).toEqual(['javascript']);
      expect(filterTemplates('and', mockTemplates)).toEqual(['android']);
      expect(filterTemplates('oid', mockTemplates)).toEqual(['android']);
    });
  });
});
