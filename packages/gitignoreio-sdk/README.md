# gitignoreio-sdk

Official SDK for gitignore.io API - Generate .gitignore files programmatically.

## Installation

```bash
npm install gitignoreio-sdk
# or
yarn add gitignoreio-sdk  
# or
pnpm add gitignoreio-sdk
```

## Quick Start

### Using the convenience function (recommended)

```javascript
import { generate } from 'gitignoreio-sdk';

// Generate gitignore for Node.js
const result = await generate(['node']);
console.log(result.content);

// Generate gitignore for multiple technologies
const multiResult = await generate(['node', 'python', 'react']);
console.log(multiResult.content);
```

### Using the SDK class (advanced usage)

```javascript
import { GitIgnoreSDK } from 'gitignoreio-sdk';

// Create SDK instance with default configuration
const sdk = new GitIgnoreSDK();

// Generate gitignore content
const result = await sdk.generate(['typescript', 'vscode']);
console.log(result.content);
```

## Advanced Usage

### Custom Configuration

```javascript
import { GitIgnoreSDK } from 'gitignoreio-sdk';

// Use custom API endpoint
const sdk = new GitIgnoreSDK({
  baseUrl: 'https://my-custom-gitignore-api.com'
});

const result = await sdk.generate(['node']);
```

### Dependency Injection

```javascript
import { GitIgnoreSDK, HttpClient } from 'gitignoreio-sdk';

// Custom HTTP client implementation
class CustomHttpClient implements HttpClient {
  async get(url: string): Promise<string> {
    // Your custom HTTP logic here
    const response = await fetch(url, {
      headers: { 'User-Agent': 'MyApp/1.0' }
    });
    return await response.text();
  }
}

// Inject custom HTTP client
const sdk = new GitIgnoreSDK({}, new CustomHttpClient());
const result = await sdk.generate(['node']);
```

## API Reference

### `generate(technologies, config?)`

Convenience function to generate gitignore content.

**Parameters:**
- `technologies: string[]` - Array of technology names (e.g., `['node', 'python', 'react']`)
- `config?: GitIgnoreConfig` - Optional configuration object

**Returns:** `Promise<GitIgnoreResult>`

### `GitIgnoreSDK`

Main SDK class for generating gitignore files.

#### Constructor

```javascript
new GitIgnoreSDK(config?, httpClient?)
```

**Parameters:**
- `config?: GitIgnoreConfig` - Configuration object
- `httpClient?: HttpClient` - Custom HTTP client implementation

#### Methods

##### `generate(technologies): Promise<GitIgnoreResult>`

Generate gitignore content for specified technologies.

**Parameters:**
- `technologies: string[]` - Array of technology names

**Returns:** `Promise<GitIgnoreResult>`

## Types

### `GitIgnoreConfig`

```typescript
interface GitIgnoreConfig {
  baseUrl?: string; // Custom API base URL (default: 'https://www.toptal.com/developers/gitignore/api')
}
```

### `GitIgnoreResult`

```typescript
interface GitIgnoreResult {
  content: string; // Generated gitignore content
}
```

### `HttpClient`

```typescript
interface HttpClient {
  get(url: string): Promise<string>;
}
```

## Error Handling

```javascript
import { generate } from 'gitignoreio-sdk';

try {
  const result = await generate(['node']);
  console.log(result.content);
} catch (error) {
  console.error('Failed to generate gitignore:', error.message);
}
```

## Common Technology Names

Popular technology names you can use:

- **Languages:** `node`, `python`, `java`, `go`, `rust`, `csharp`, `php`  
- **Frameworks:** `react`, `angular`, `vue`, `django`, `flask`, `spring`
- **Tools:** `vscode`, `intellij`, `xcode`, `vim`, `emacs`
- **Platforms:** `windows`, `macos`, `linux`
- **Databases:** `mongodb`, `mysql`, `postgresql`, `redis`

For a complete list, visit [gitignore.io](https://www.toptal.com/developers/gitignore/).

## Examples

### Basic Web Development Stack

```javascript
import { generate } from 'gitignoreio-sdk';

const webStack = await generate([
  'node', 
  'react', 
  'typescript', 
  'vscode'
]);

console.log(webStack.content);
```

### Python Data Science Project

```javascript
import { generate } from 'gitignoreio-sdk';

const dataScience = await generate([
  'python',
  'jupyternotebooks', 
  'pycharm',
  'macos'
]);

console.log(dataScience.content);
```

### Mobile Development

```javascript
import { generate } from 'gitignoreio-sdk';

const mobile = await generate([
  'swift',
  'kotlin', 
  'xcode',
  'androidstudio'
]);

console.log(mobile.content);
```

## Development

This package is part of the gitignoreio monorepo. Please refer to the main repository for contribution guidelines.

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Linting

```bash
pnpm lint
```

## License

ISC

## Author

Marco Comi