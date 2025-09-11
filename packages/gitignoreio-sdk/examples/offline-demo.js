#!/usr/bin/env node

/**
 * Offline demo using mock HTTP client
 * Run with: node examples/offline-demo.js
 */

import { GitIgnoreSDK } from '../dist/index.js';

// Mock HTTP client for offline demo
class MockHttpClient {
  async get(url) {
    console.log(`📡 Mock request to: ${url}`);
    
    // Simulate API response based on URL
    if (url.includes('node')) {
      return `# Created by https://www.toptal.com/developers/gitignore/api/node,vscode
# Edit at https://www.toptal.com/developers/gitignore?templates=node,vscode

### Node ###
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

### VisualStudioCode ###
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Local History for Visual Studio Code
.history/`;
    }
    
    return '# Default gitignore content\n*.log\n.DS_Store\nnode_modules/';
  }
}

async function main() {
  try {
    console.log('🎭 Offline SDK Demo\n');
    
    // Example 1: Basic usage with mock
    console.log('1️⃣ Basic usage:');
    const sdk = new GitIgnoreSDK({}, new MockHttpClient());
    const result = await sdk.generate(['node', 'vscode']);
    
    console.log('✅ Generated .gitignore content:');
    console.log('─'.repeat(60));
    console.log(result.content);
    console.log('─'.repeat(60));
    
    console.log(`📊 Stats: ${result.content.length} characters, ${result.content.split('\n').length} lines\n`);
    
    // Example 2: Error handling
    console.log('2️⃣ Error handling:');
    try {
      await sdk.generate([]);
    } catch (error) {
      console.log(`✅ Correctly caught error: ${error.message}`);
    }
    
    try {
      await sdk.generate([123]);
    } catch (error) {
      console.log(`✅ Correctly caught error: ${error.message}`);
    }
    
    console.log('\n🎉 Demo completed successfully!');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    process.exit(1);
  }
}

main();