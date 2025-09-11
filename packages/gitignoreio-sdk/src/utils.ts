import { GitIgnoreClient, GitIgnoreClientOptions, GitIgnoreResponse } from './client';
import { GitIgnoreTemplate } from './templates';

/**
 * Convenience function to generate a gitignore file without creating a client instance
 * 
 * @param templates - Array of gitignore templates to include
 * @param options - Optional client configuration
 * @returns Promise resolving to the gitignore content and metadata
 * 
 * @example
 * ```typescript
 * import { generateGitIgnore } from 'gitignoreio-sdk';
 * 
 * const result = await generateGitIgnore(['node', 'typescript', 'macos']);
 * console.log(result.content);
 * ```
 */
export async function generateGitIgnore(
  templates: GitIgnoreTemplate[],
  options?: GitIgnoreClientOptions
): Promise<GitIgnoreResponse> {
  const client = new GitIgnoreClient(options);
  return client.generateGitIgnore(templates);
}