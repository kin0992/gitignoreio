/**
 * Interface for HTTP client dependency
 */
export interface HttpClient {
  get(url: string): Promise<string>;
}

/**
 * Configuration options for the GitIgnore SDK
 */
export interface GitIgnoreConfig {
  baseUrl?: string;
}

/**
 * Input for generating gitignore content
 */
export type GitIgnoreInput = string[];

/**
 * Result of gitignore generation
 */
export interface GitIgnoreResult {
  content: string;
}