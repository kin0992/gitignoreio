import type { Technologies } from './technology';

/**
 * Result of gitignore generation.
 */
export interface GitIgnoreContent {
  content: string;
}

export interface GitIgnoreIoSDK {
  generate(technologies: Technologies): Promise<GitIgnoreContent>;
  listTechnologies(): Promise<Technologies[]>;
}
