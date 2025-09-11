# gitignoreio-sdk

A TypeScript SDK for the gitignore.io API with strong typing support.

## Features

- 🔥 **Strongly Typed**: Full TypeScript support with autocomplete for all available templates
- 🚀 **Simple API**: Easy-to-use methods for generating .gitignore files
- 🛡️ **Error Handling**: Comprehensive error handling with custom error types
- 📦 **Multiple Formats**: Supports both ESM and CJS
- 🧪 **Well Tested**: Comprehensive test suite
- 🔍 **Template Search**: Search and discover available templates

## Installation

```bash
npm install gitignoreio-sdk
# or
pnpm add gitignoreio-sdk
# or  
yarn add gitignoreio-sdk
```

## Quick Start

```typescript
import { generateGitIgnore } from 'gitignoreio-sdk';

// Generate a .gitignore file for Node.js and TypeScript
const result = await generateGitIgnore(['node', 'typescript', 'macos']);
console.log(result.content);
```

## Usage

### Using the convenience function

```typescript
import { generateGitIgnore } from 'gitignoreio-sdk';

const result = await generateGitIgnore(['node', 'python', 'visualstudiocode']);
console.log(result.content);
console.log(result.templates); // ['node', 'python', 'visualstudiocode']
```

### Using the client class

```typescript
import { GitIgnoreClient } from 'gitignoreio-sdk';

const client = new GitIgnoreClient();

// Generate gitignore content
const result = await client.generateGitIgnore(['react', 'node']);
console.log(result.content);

// Search for templates
const templates = client.searchTemplates('node');
console.log(templates); // ['node', 'cordova', 'nodejs', ...]

// Check if a template is available
if (client.isTemplateAvailable('python')) {
  console.log('Python template is available!');
}

// Get all available templates
const all = client.getAvailableTemplates();
console.log(`${all.length} templates available`);
```

### Configuration Options

```typescript
import { GitIgnoreClient } from 'gitignoreio-sdk';

const client = new GitIgnoreClient({
  baseUrl: 'https://custom-gitignore-api.com/api', // Custom API endpoint
  timeout: 5000, // Request timeout in milliseconds
  fetch: customFetch, // Custom fetch implementation
});
```

## Available Templates

The SDK includes strong typing for all available gitignore templates. Some popular ones include:

**Languages & Frameworks:**
- `node`, `python`, `java`, `csharp`, `go`, `rust`, `php`
- `react`, `angular`, `vue`, `django`, `rails`, `laravel`
- `typescript`, `javascript`, `kotlin`, `swift`, `dart`

**IDEs & Editors:**
- `visualstudiocode`, `intellij`, `eclipse`, `xcode`
- `vim`, `emacs`, `sublimetext`, `atom`

**Operating Systems:**
- `macos`, `windows`, `linux`

**Tools:**
- `git`, `svn`, `mercurial`, `terraform`, `ansible`
- `docker`, `vagrant`, `gradle`, `maven`

## API Reference

### `generateGitIgnore(templates, options?)`

Convenience function to generate a .gitignore file.

**Parameters:**
- `templates: GitIgnoreTemplate[]` - Array of template names
- `options?: GitIgnoreClientOptions` - Optional client configuration

**Returns:** `Promise<GitIgnoreResponse>`

### `GitIgnoreClient`

Main client class for interacting with the gitignore.io API.

#### Methods

##### `generateGitIgnore(templates: GitIgnoreTemplate[]): Promise<GitIgnoreResponse>`

Generate a .gitignore file for the specified templates.

##### `getAvailableTemplates(): readonly GitIgnoreTemplate[]`

Get all available template names.

##### `isTemplateAvailable(template: string): template is GitIgnoreTemplate`

Check if a template name is valid.

##### `searchTemplates(query: string): GitIgnoreTemplate[]`

Search for templates by name (case-insensitive partial match).

## Types

### `GitIgnoreTemplate`

Union type of all available template names with full IntelliSense support.

### `GitIgnoreResponse`

```typescript
interface GitIgnoreResponse {
  content: string; // The generated .gitignore content
  templates: GitIgnoreTemplate[]; // Templates used to generate the content
}
```

### `GitIgnoreError`

Custom error class for SDK-specific errors.

```typescript
class GitIgnoreError extends Error {
  constructor(message: string, public statusCode?: number);
}
```

## Error Handling

```typescript
import { GitIgnoreError, generateGitIgnore } from 'gitignoreio-sdk';

try {
  const result = await generateGitIgnore(['node', 'typescript']);
  console.log(result.content);
} catch (error) {
  if (error instanceof GitIgnoreError) {
    console.error('GitIgnore API Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.