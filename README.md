# gitignoreio

A TypeScript monorepo containing the gitignoreio-sdk - a strongly-typed SDK for the gitignore.io API.

## 📦 Packages

### `gitignoreio-sdk`

A TypeScript SDK for the [gitignore.io API](https://docs.gitignore.io/use/api) with full type safety and IntelliSense support.

**Features:**
- 🔥 **Strongly Typed**: Full TypeScript support with autocomplete for all available templates
- 🚀 **Simple API**: Easy-to-use methods for generating .gitignore files  
- 🛡️ **Error Handling**: Comprehensive error handling with custom error types
- 📦 **Multiple Formats**: Supports both ESM and CJS
- 🧪 **Well Tested**: Comprehensive test suite
- 🔍 **Template Search**: Search and discover available templates

## 🚀 Quick Start

```bash
# Install the SDK
npm install gitignoreio-sdk

# Use it in your project
import { generateGitIgnore } from 'gitignoreio-sdk';

const result = await generateGitIgnore(['node', 'typescript', 'macos']);
console.log(result.content);
```

## 🛠️ Development

This is a monorepo managed with [Turbo](https://turbo.build) and [pnpm](https://pnpm.io).

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/kin0992/gitignoreio.git
cd gitignoreio

# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Build all packages
pnpm run build

# Run all tests
pnpm run test

# Lint all packages
pnpm run lint

# Type check all packages
pnpm run type-check

# Run in development mode
pnpm run dev
```

## 📁 Project Structure

```
├── packages/
│   └── gitignoreio-sdk/         # The main SDK package
│       ├── src/
│       │   ├── client.ts        # Main client implementation
│       │   ├── templates.ts     # Strongly typed template definitions
│       │   ├── utils.ts         # Utility functions
│       │   └── index.ts         # Public API exports
│       ├── test/                # Test files
│       └── README.md            # Package documentation
├── examples/                    # Usage examples
├── turbo.json                   # Turbo configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

## 🔧 Architecture

- **Monorepo**: Managed with Turbo for efficient builds and caching
- **Package Manager**: pnpm for fast, efficient dependency management
- **Build System**: tsup for fast TypeScript compilation
- **Testing**: Vitest for unit testing
- **Linting**: ESLint with TypeScript support
- **Type Safety**: Full TypeScript with strict mode enabled

## 📚 Documentation

See the [gitignoreio-sdk README](packages/gitignoreio-sdk/README.md) for detailed API documentation and usage examples.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `pnpm run test`
5. Lint your code: `pnpm run lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [gitignore.io API Documentation](https://docs.gitignore.io/use/api)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/motivation)