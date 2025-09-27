import type { GitIgnoreIoSDK } from '../domain';
import type { Technologies } from '../domain/technology';

import { DefaultHttpClient } from '../adapters/fetch/client';
import { type HttpClient } from '../domain/http-client';

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
   * @returns A Promise that resolves to the generated .gitignore content or rejects with an error.
   */
  async generate(technologies: Technologies) {
    const url = new URL(
      `${this.baseUrl}/${encodeURIComponent(technologies.join(','))}`,
    );
    const result = await this.httpClient.get(url);
    return result
      .map((content) => ({ content }))
      .match(
        (value) => value,
        () => {
          throw new Error('There was an error fetching data from gitignore.io');
        },
      );
  }

  async listTechnologies() {
    const url = new URL(`${this.baseUrl}/list`);
    const result = await this.httpClient
      .get(url)
      .map((res) => res.split('\n').flatMap((s) => s.split(',')))
      .match(
        (list) => list,
        () => {
          throw new Error('There was an error fetching data from gitignore.io');
        },
      );
    return result as unknown as Technologies[];
  }
}
