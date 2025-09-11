import { errAsync, ResultAsync } from 'neverthrow';

import type { HttpClient } from '../../domain';

export class DefaultHttpClient implements HttpClient {
  get(url: URL) {
    return ResultAsync.fromPromise(
      fetch(url),
      () => new Error('Failed to fetch data'),
    ).andThen((response) => {
      if (!response.ok) {
        return errAsync(new Error(`HTTP error! status: ${response.status}`));
      }
      return ResultAsync.fromPromise(
        response.text(),
        () => new Error(`Failed to read response text from ${url} (status: ${response.status})`),
      );
    });
  }
}
