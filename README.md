# gitignoreio

A comprehensive gitignore.io SDK and tools ecosystem.

## Packages

- **[gitignoreio-sdk](./packages/gitignoreio-sdk)** - Official SDK for gitignore.io API

## Development

This project uses pnpm workspaces to manage multiple packages.

### Prerequisites

- Node.js 22.19.0 or higher (see `.node-version`)
- pnpm 9.0.0 or higher

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Run linting
pnpm run lint
```

### Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

1. Make your changes
2. Run `pnpm changeset` to add a changeset describing your changes
3. Commit your changes and the changeset
4. Create a pull request
5. When merged to main, the GitHub Actions workflow will create a release PR or publish packages automatically

## Contributing

Please ensure you follow the development guidelines and add appropriate changesets for any changes that should be published.