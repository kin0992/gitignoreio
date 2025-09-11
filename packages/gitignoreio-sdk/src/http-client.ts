import { err, fromPromise, ok, type Result } from 'neverthrow';

import type { HttpClient } from './types.js';

/**
 * Default HTTP client implementation using Node.js fetch
 */
export class DefaultHttpClient implements HttpClient {
  async get(url: URL): Promise<string> {
    const result = await this.getResult(url);

    if (result.isErr()) {
      throw new Error(result.error);
    }

    return result.value;
  }

  private async getResult(url: URL): Promise<Result<string, string>> {
    const fetchResult = await fromPromise(
      fetch(url),
      (error) =>
        `Failed to fetch from ${url}: ${error instanceof Error ? error.message : String(error)}`,
    );

    if (fetchResult.isErr()) {
      return err(fetchResult.error);
    }

    const response = fetchResult.value;

    if (!response.ok) {
      return err(`HTTP error! status: ${response.status}`);
    }

    const textResult = await fromPromise(
      response.text(),
      (error) =>
        `Failed to read response text: ${error instanceof Error ? error.message : String(error)}`,
    );

    if (textResult.isErr()) {
      return err(textResult.error);
    }

    return ok(textResult.value);
  }
}
