import { err, fromPromise, ok, type Result } from 'neverthrow';

import type { GitIgnoreInput, GitIgnoreResult, HttpClient } from './types.js';

import { DefaultHttpClient } from './http-client.js';

/**
 * GitIgnore SDK for generating .gitignore files
 */
export class GitIgnoreSDK {
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
  async generate(technologies: GitIgnoreInput): Promise<GitIgnoreResult> {
    const result = await this.generateResult(technologies);

    if (result.isErr()) {
      throw new Error(result.error);
    }

    return result.value;
  }

  private async generateResult(
    technologies: GitIgnoreInput,
  ): Promise<Result<GitIgnoreResult, string>> {
    if (technologies.length === 0) {
      return err('You must provide at least something to ignore');
    }

    const techString = technologies.join(',');
    const url = new URL(`${this.baseUrl}/${encodeURIComponent(techString)}`);

    const httpResult = await fromPromise(
      this.httpClient.get(url),
      (error) =>
        `Failed to generate gitignore: ${error instanceof Error ? error.message : String(error)}`,
    );

    if (httpResult.isErr()) {
      return err(httpResult.error);
    }

    return ok({ content: httpResult.value });
  }
}
