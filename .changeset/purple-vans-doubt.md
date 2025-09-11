---
"gitignoreio-sdk": minor
---

Create the first, simple, version of the SDK

To start having fun with this SDK, you can use the `generate` method to create `.gitignore` files for your projects. Here's a quick example:

```typescript
import { GitIgnoreSDK } from 'gitignoreio-sdk';

// Create SDK instance with default configuration
const sdk = new GitIgnoreSDK();
// Generate gitignore content
const result = await sdk.generate(['typescript', 'vscode']);
console.log(result.content);
```

