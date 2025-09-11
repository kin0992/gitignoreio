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

## Common Technology Names

Popular technology names you can use:

- **Languages:** `node`, `python`, `java`, `go`, `rust`, `csharp`, `php`  
- **Frameworks:** `react`, `angular`, `vue`, `django`, `flask`, `spring`
- **Tools:** `vscode`, `intellij`, `xcode`, `vim`, `emacs`
- **Platforms:** `windows`, `macos`, `linux`
- **Databases:** `mongodb`, `mysql`, `postgresql`, `redis`

For a complete list, visit [gitignore.io](https://www.toptal.com/developers/gitignore/).