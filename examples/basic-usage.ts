/**
 * Basic usage example of the gitignoreio-sdk
 */

import { 
  GitIgnoreClient, 
  generateGitIgnore, 
  GITIGNORE_TEMPLATES 
} from '../packages/gitignoreio-sdk/src/index';

async function main() {
  console.log('🚀 GitIgnore.io SDK Demo\n');

  // Example 1: Using the convenience function
  console.log('1. Using convenience function:');
  try {
    // Note: This would normally make an HTTP request
    // For this demo, we'll just show the type safety
    console.log('Available templates include:', ['node', 'python', 'typescript', 'macos']);
    console.log('✅ Templates are strongly typed!\n');
  } catch (error) {
    console.error('Error:', error);
  }

  // Example 2: Using the client class
  console.log('2. Using GitIgnoreClient:');
  const client = new GitIgnoreClient();

  // Search for templates
  const nodeTemplates = client.searchTemplates('node');
  console.log('Templates containing "node":', nodeTemplates);

  // Check template availability
  console.log('Is "python" available?', client.isTemplateAvailable('python'));
  console.log('Is "invalid-template" available?', client.isTemplateAvailable('invalid-template'));

  // Get all templates
  const allTemplates = client.getAvailableTemplates();
  console.log(`Total templates available: ${allTemplates.length}`);

  // Show some examples of templates
  console.log('\n3. Sample templates by category:');
  
  const languages = allTemplates.filter(t => 
    ['node', 'python', 'java', 'csharp', 'go', 'rust', 'php', 'ruby'].includes(t)
  );
  console.log('Languages:', languages.slice(0, 5));

  const ides = allTemplates.filter(t => 
    ['visualstudiocode', 'intellij', 'eclipse', 'xcode', 'vim'].includes(t)
  );
  console.log('IDEs/Editors:', ides);

  const os = allTemplates.filter(t => 
    ['macos', 'windows', 'linux'].includes(t)
  );
  console.log('Operating Systems:', os);

  console.log('\n4. TypeScript IntelliSense Demo:');
  console.log('Try typing: generateGitIgnore([" and see the autocomplete!');
  
  // This demonstrates the strong typing - uncomment to test
  // const result = await generateGitIgnore(['node', 'typescript', 'macos']);
  
  console.log('\n✅ Demo completed successfully!');
  console.log('Note: Network requests are not made in this demo environment.');
}

if (require.main === module) {
  main().catch(console.error);
}

export { main };