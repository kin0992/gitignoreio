import type { ResultAsync } from 'neverthrow';

import type { GitIgnoreElement } from './gitignore-element';

/**
 * Input for generating gitignore content.
 * A non-empty array of technology names.
 */
export type GitIgnoreInput = [GitIgnoreElement, ...GitIgnoreElement[]];

export interface GitIgnoreIoSDK {
  generate(technologies: GitIgnoreInput): ResultAsync<GitIgnoreResult, Error>;
}

/**
 * Result of gitignore generation.
 */
export interface GitIgnoreResult {
  content: string;
}

/**
 * Interface for HTTP client dependency.
 */
export interface HttpClient {
  get(url: URL): ResultAsync<string, Error>;
}
