import type { Technologies } from './technology';

export interface GitIgnoreIoSDK {
  generate(technologies: Technologies): Promise<GitIgnoreResult>;
}

/**
 * Result of gitignore generation.
 */
export interface GitIgnoreResult {
  content: string;
}
