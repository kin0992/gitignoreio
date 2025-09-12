import type { GitIgnoreInput, GitIgnoreIoSDK, HttpClient } from './domain';

import { DefaultHttpClient } from './adapters/fetch/client';

/**
 * GitIgnore SDK for generating .gitignore files
 */
export class GitIgnoreSDK implements GitIgnoreIoSDK {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  /**
   * Creates an instance of GitIgnoreSDK.
   * @param httpClient Optional HTTP client that implements the {@link HttpClient} interface.
   * If not provided, a default implementation using the fetch API will be used.
   *
   * @constructor
   */
  constructor(httpClient?: HttpClient) {
    this.httpClient = httpClient ?? new DefaultHttpClient();
    this.baseUrl = 'https://www.toptal.com/developers/gitignore/api';
  }

  /**
   * Generates .gitignore content for the given technologies by calling the {@link https://docs.gitignore.io/use/api} API.
   *
   * @param technologies Array of technology identifiers to include in the .gitignore.
   * @returns A ResultAsync, either containing the generated .gitignore content or an error.
   */
  generate(technologies: GitIgnoreInput) {
    const url = new URL(
      `${this.baseUrl}/${encodeURIComponent(technologies.join(','))}`,
    );
    return this.httpClient.get(url).map((content) => ({ content }));
  }
}
