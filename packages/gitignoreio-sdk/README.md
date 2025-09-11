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

### Using the SDK class (advanced usage)

```javascript
import { GitIgnoreSDK } from 'gitignoreio-sdk';

// Create SDK instance with default configuration
const sdk = new GitIgnoreSDK();

// Generate gitignore content
const result = await sdk.generate(['typescript', 'vscode']);
console.log(result.content);
```

## Common Technology Names

Popular technology names you can use:

- **Languages:** `node`, `python`, `java`, `go`, `rust`, `csharp`, `php`  
- **Frameworks:** `react`, `angular`, `vue`, `django`, `flask`, `spring`
- **Tools:** `vscode`, `intellij`, `xcode`, `vim`, `emacs`
- **Platforms:** `windows`, `macos`, `linux`
- **Databases:** `mongodb`, `mysql`, `postgresql`, `redis`

For a complete list, visit [gitignore.io](https://www.toptal.com/developers/gitignore/).