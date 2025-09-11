#!/usr/bin/env node

/**
 * Basic usage example of gitignoreio-sdk
 * Run with: node examples/basic-usage.js
 */

import { generate } from '../dist/index.js';

async function main() {
  try {
    console.log('🚀 Generating .gitignore for Node.js project...');
    
    const result = await generate(['node', 'vscode']);
    
    console.log('✅ Generated .gitignore content:');
    console.log('─'.repeat(50));
    console.log(result.content);
    console.log('─'.repeat(50));
    
    console.log(`📊 Content length: ${result.content.length} characters`);
    
  } catch (error) {
    console.error('❌ Error generating .gitignore:', error.message);
    process.exit(1);
  }
}

main();