/**
 * GitIgnore.io SDK - TypeScript SDK for gitignore.io API with strong typing
 * 
 * @packageDocumentation
 */

export {
  GitIgnoreClient,
  GitIgnoreError,
  type GitIgnoreClientOptions,
  type GitIgnoreResponse,
} from './client';

export {
  GITIGNORE_TEMPLATES,
  type GitIgnoreTemplate,
} from './templates';

// Convenience function for quick usage
export { generateGitIgnore } from './utils';