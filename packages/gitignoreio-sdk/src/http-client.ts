import type { HttpClient } from './types.js';

/**
 * Default HTTP client implementation using Node.js fetch
 */
export class DefaultHttpClient implements HttpClient {
  async get(url: URL): Promise<string> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      throw new Error(
        `Failed to fetch from ${url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
