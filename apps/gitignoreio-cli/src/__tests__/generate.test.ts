import { describe, expect, it } from 'vitest';

import { generateCommand } from '../commands/generate.js';

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
});
