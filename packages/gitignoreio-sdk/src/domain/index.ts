import type { ResultAsync } from 'neverthrow';

/**
 * Input for generating gitignore content.
 */
export type GitIgnoreInput = string[];

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
