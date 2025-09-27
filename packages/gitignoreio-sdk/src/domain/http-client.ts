import type { ResultAsync } from 'neverthrow';

/**
 * Interface for HTTP client dependency.
 */
export interface HttpClient {
  get(url: URL): ResultAsync<string, Error>;
}
