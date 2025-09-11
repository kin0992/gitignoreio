import fetch from 'cross-fetch';
import { GitIgnoreTemplate, GITIGNORE_TEMPLATES } from './templates';

/**
 * Configuration options for the GitIgnore.io API client
 */
export interface GitIgnoreClientOptions {
  /**
   * Base URL for the gitignore.io API
   * @default 'https://www.toptal.com/developers/gitignore/api'
   */
  baseUrl?: string;

  /**
   * Timeout for API requests in milliseconds
   * @default 10000
   */
  timeout?: number;

  /**
   * Custom fetch implementation
   */
  fetch?: typeof fetch;
}

/**
 * Response from the gitignore.io API
 */
export interface GitIgnoreResponse {
  /**
   * The generated .gitignore content
   */
  content: string;
  
  /**
   * The templates that were used to generate the content
   */
  templates: GitIgnoreTemplate[];
}

/**
 * Error thrown by the GitIgnore.io API client
 */
export class GitIgnoreError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'GitIgnoreError';
  }
}

/**
 * Client for interacting with the GitIgnore.io API
 * 
 * @example
 * ```typescript
 * const client = new GitIgnoreClient();
 * const result = await client.generateGitIgnore(['node', 'typescript', 'macos']);
 * console.log(result.content);
 * ```
 */
export class GitIgnoreClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: GitIgnoreClientOptions = {}) {
    this.baseUrl = options.baseUrl || 'https://www.toptal.com/developers/gitignore/api';
    this.timeout = options.timeout || 10000;
    this.fetchImpl = options.fetch || fetch;
  }

  /**
   * Generate a .gitignore file for the specified templates
   * 
   * @param templates - Array of gitignore templates to include
   * @returns Promise resolving to the gitignore content and metadata
   * 
   * @example
   * ```typescript
   * const result = await client.generateGitIgnore(['node', 'typescript']);
   * console.log(result.content);
   * ```
   */
  async generateGitIgnore(templates: GitIgnoreTemplate[]): Promise<GitIgnoreResponse> {
    if (!templates || templates.length === 0) {
      throw new GitIgnoreError('At least one template must be specified');
    }

    // Validate that all templates are known
    const invalidTemplates = templates.filter(template => !GITIGNORE_TEMPLATES.includes(template));
    if (invalidTemplates.length > 0) {
      throw new GitIgnoreError(`Invalid templates: ${invalidTemplates.join(', ')}`);
    }

    const url = `${this.baseUrl}/${templates.join(',')}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await this.fetchImpl(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'gitignoreio-sdk/1.0.0',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new GitIgnoreError(
          `API request failed with status ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      const content = await response.text();

      return {
        content,
        templates,
      };
    } catch (error) {
      if (error instanceof GitIgnoreError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new GitIgnoreError(`Request timeout after ${this.timeout}ms`);
        }
        throw new GitIgnoreError(`Request failed: ${error.message}`);
      }
      
      throw new GitIgnoreError('Unknown error occurred');
    }
  }

  /**
   * Get the list of available templates
   * 
   * @returns Array of all available gitignore templates
   */
  getAvailableTemplates(): readonly GitIgnoreTemplate[] {
    return GITIGNORE_TEMPLATES;
  }

  /**
   * Check if a template is available
   * 
   * @param template - The template name to check
   * @returns True if the template is available
   */
  isTemplateAvailable(template: string): template is GitIgnoreTemplate {
    return GITIGNORE_TEMPLATES.includes(template as GitIgnoreTemplate);
  }

  /**
   * Search for templates by name (case-insensitive partial match)
   * 
   * @param query - Search query
   * @returns Array of matching templates
   */
  searchTemplates(query: string): GitIgnoreTemplate[] {
    const lowerQuery = query.toLowerCase();
    return GITIGNORE_TEMPLATES.filter(template => 
      template.toLowerCase().includes(lowerQuery)
    );
  }
}