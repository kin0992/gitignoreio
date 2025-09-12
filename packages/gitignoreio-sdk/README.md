# gitignoreio-sdk

A comprehensive gitignore.io SDK and tools ecosystem.

## Installation

```bash
npm install gitignoreio-sdk
# or
yarn add gitignoreio-sdk  
# or
pnpm add gitignoreio-sdk
```

## Quick Start

### Using the SDK class (advanced usage)

```javascript
import { GitIgnoreSDK } from 'gitignoreio-sdk';

// Create SDK instance with default configuration
const sdk = new GitIgnoreSDK();

// Generate gitignore content
const result = await sdk.generate(['typescript', 'vscode']);
if (result.isErr()) {
    // Handle the error
} else {
    // Do whatever you want with the content
    console.log(result.value.content);
}
```

For a complete list of available templates, see https://www.toptal.com/developers/gitignore/api/list or visit https://www.toptal.com/developers/gitignore/.
