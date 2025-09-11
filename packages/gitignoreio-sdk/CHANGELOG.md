# gitignoreio-sdk

## 0.1.1

### Patch Changes

- 76b8da8: Add missing repository information in package.json, required to attest provenance

## 0.1.0

### Minor Changes

- a31d54d: Create the first, simple, version of the SDK

  To start having fun with this SDK, you can use the `generate` method to create `.gitignore` files for your projects. Here's a quick example:

  ```typescript
  import { GitIgnoreSDK } from "gitignoreio-sdk";

  // Create SDK instance with default configuration
  const sdk = new GitIgnoreSDK();
  // Generate gitignore content
  const result = await sdk.generate(["typescript", "vscode"]);
  console.log(result.content);
  ```
