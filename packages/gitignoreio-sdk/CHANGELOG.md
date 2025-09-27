# gitignoreio-sdk

## 0.3.0

### Minor Changes

- 9e5e5b2: Change the `generate` return type to a Promise.
  With this change the user of the SDK do not have to know or use `neverthrow`.
  It is enough to properly handle the Promise instead.

  > [!NOTE]
  > Even though this would be a major update since the contract has changed,
  > I decided to bump a minor instead, following the [SemVer specification](https://semver.org)
  > which allows to change the contract when the major is under `1`.

- 5a448cc: Enforce type of generate function

  Now it does not accept an empty array as input, which would lead to an invalid request to the API.
  Moreover, the input array values are now strictly typed to match the available templates.

## 0.2.0

### Minor Changes

- 209f171: Update signature to use neverthrow

## 0.1.2

### Patch Changes

- 631ccd3: Install missing vitest dependency used to calculate coverage

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
