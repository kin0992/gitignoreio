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

### Using the SDK class

```javascript
import { GitIgnoreSDK } from "gitignoreio-sdk";

// Create SDK instance with default configuration
const sdk = new GitIgnoreSDK();

// Generate gitignore content
try {
  const result = await sdk.generate(["typescript", "vscode"]);
  console.log(result.content);
} catch (error) {
  console.error("Failed to generate gitignore:", error.message);
}
```

or, using `Promise` methods:

```javascript
sdk.generate(["node", "python"])
  .then((result) => console.log(result.content))
  .catch(() => console.error("Failed to generate gitignore"));
```

#### Using a custom HTTP Client

The GitIgnoreSDK constructor accepts a custom HttpClient; if not passed, it will use a default one.
You can use a custom HTTP client, but it must implement the `HttpClient` interface provided.

### Known limitations

**Hardcoded Technology Values**: The technology values are currently hardcoded in the SDK. If you notice any misalignment between the available technologies in this SDK and the official gitignore.io portal, please [open an issue](https://github.com/kin0992/gitignoreio/issues) to report the discrepancy.

For a complete list of available templates, see https://www.toptal.com/developers/gitignore/api/list or visit https://www.toptal.com/developers/gitignore/.

