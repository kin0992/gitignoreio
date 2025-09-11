import { errAsync } from 'neverthrow';

import type { GitIgnoreInput, GitIgnoreIoSDK, HttpClient } from './domain';

import { DefaultHttpClient } from './adapters/fetch/client';

/**
 * GitIgnore SDK for generating .gitignore files
 */
export class GitIgnoreSDK implements GitIgnoreIoSDK {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.httpClient = httpClient ?? new DefaultHttpClient();
    this.baseUrl = 'https://www.toptal.com/developers/gitignore/api';
  }

  /**
   * Generate gitignore content for the specified technologies/templates
   * @param technologies - Array of technology names (e.g., ['node', 'python', 'react'])
   * @returns Promise with the generated gitignore content
   */
  generate(technologies: GitIgnoreInput) {
    if (technologies.length === 0) {
      return errAsync(
        new Error('You must provide at least something to ignore'),
      );
    }

    const techString = technologies.join(',');
    const url = new URL(`${this.baseUrl}/${encodeURIComponent(techString)}`);
    return this.httpClient.get(url).map((content) => ({ content }));
  }
}
