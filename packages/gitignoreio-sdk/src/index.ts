export const version = '0.0.0';

// Export main SDK class
export { GitIgnoreSDK } from './gitignore-sdk.js';

// Export types for consumers
export type { 
  HttpClient, 
  GitIgnoreConfig, 
  GitIgnoreInput, 
  GitIgnoreResult 
} from './types.js';

// Export HTTP client implementation
export { DefaultHttpClient } from './http-client.js';

// Convenience function for quick usage
export { generate } from './generate.js';