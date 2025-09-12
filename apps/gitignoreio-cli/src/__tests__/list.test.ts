import { describe, expect, it } from 'vitest';

import { listCommand } from '../commands/list.js';

describe('List Command', () => {
  it('should be defined', () => {
    expect(listCommand).toBeDefined();
    expect(listCommand.name()).toBe('list');
    expect(listCommand.description()).toBe(
      'List available gitignore templates',
    );
  });

  it('should have the correct command structure', () => {
    expect(listCommand.name()).toBe('list');
    expect(typeof listCommand.action).toBe('function');
  });
});
