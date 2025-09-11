#!/usr/bin/env node

/**
 * Advanced usage example with custom configuration
 * Run with: node examples/advanced-usage.js
 */

import { GitIgnoreSDK } from '../dist/index.js';

// Custom HTTP client with logging
class LoggingHttpClient {
  async get(url) {
    console.log(`📡 Making request to: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const content = await response.text();
    console.log(`✅ Received ${content.length} characters`);
    return content;
  }
}

async function main() {
  try {
    console.log('🚀 Advanced SDK usage example...\n');
    
    // Example 1: Custom HTTP client
    console.log('1️⃣ Using custom HTTP client with logging:');
    const sdkWithLogging = new GitIgnoreSDK({}, new LoggingHttpClient());
    const result1 = await sdkWithLogging.generate(['python', 'django']);
    
    console.log(`Generated content preview: "${result1.content.slice(0, 100)}..."`);
    console.log('');
    
    // Example 2: Multiple technology stack
    console.log('2️⃣ Generating for full-stack web development:');
    const sdk = new GitIgnoreSDK();
    const webStack = await sdk.generate([
      'node',
      'react', 
      'typescript',
      'vscode',
      'macos'
    ]);
    
    // Count lines in the generated content
    const lines = webStack.content.split('\n').length;
    console.log(`📋 Generated .gitignore with ${lines} lines`);
    
    // Show section headers
    const sections = webStack.content.match(/^### .+$/gm) || [];
    console.log(`📂 Sections found: ${sections.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();