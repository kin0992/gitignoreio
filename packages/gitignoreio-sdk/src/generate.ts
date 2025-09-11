import { GitIgnoreSDK } from './gitignore-sdk.js';
import { GitIgnoreInput, GitIgnoreResult, GitIgnoreConfig } from './types.js';

/**
 * Convenience function to generate gitignore content
 * @param technologies - Array of technology names
 * @param config - Optional configuration
 * @returns Promise with the generated gitignore content
 */
export async function generate(
  technologies: GitIgnoreInput, 
  config?: GitIgnoreConfig
): Promise<GitIgnoreResult> {
  const sdk = new GitIgnoreSDK(config);
  return await sdk.generate(technologies);
}