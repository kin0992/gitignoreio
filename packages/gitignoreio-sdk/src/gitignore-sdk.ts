import { HttpClient, GitIgnoreConfig, GitIgnoreInput, GitIgnoreResult } from './types.js';
import { DefaultHttpClient } from './http-client.js';

/**
 * GitIgnore SDK for generating .gitignore files
 */
export class GitIgnoreSDK {
  private readonly httpClient: HttpClient;
  private readonly baseUrl: string;

  constructor(
    config: GitIgnoreConfig = {},
    httpClient?: HttpClient
  ) {
    this.httpClient = httpClient ?? new DefaultHttpClient();
    this.baseUrl = config.baseUrl ?? 'https://www.toptal.com/developers/gitignore/api';
  }

  /**
   * Generate gitignore content for the specified technologies/templates
   * @param technologies - Array of technology names (e.g., ['node', 'python', 'react'])
   * @returns Promise with the generated gitignore content
   */
  async generate(technologies: GitIgnoreInput): Promise<GitIgnoreResult> {
    if (!technologies || technologies.length === 0) {
      throw new Error('Technologies array cannot be empty');
    }

    // Validate input - ensure all items are strings
    if (!technologies.every(tech => typeof tech === 'string')) {
      throw new Error('All technologies must be strings');
    }

    // Join technologies with comma and create URL
    const techString = technologies.join(',');
    const url = `${this.baseUrl}/${encodeURIComponent(techString)}`;

    try {
      const content = await this.httpClient.get(url);
      return { content };
    } catch (error) {
      throw new Error(`Failed to generate gitignore: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}