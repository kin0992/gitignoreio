const { GitIgnoreClient } = require('../packages/gitignoreio-sdk/dist/index.js');

async function testSDK() {
  console.log('🧪 Testing gitignoreio-sdk...\n');

  const client = new GitIgnoreClient();

  // Test template availability
  console.log('1. Template availability checks:');
  console.log('node is available:', client.isTemplateAvailable('node'));
  console.log('python is available:', client.isTemplateAvailable('python'));
  console.log('invalid-template is available:', client.isTemplateAvailable('invalid-template'));
  console.log();

  // Test template search
  console.log('2. Search for templates:');
  const nodeTemplates = client.searchTemplates('node');
  console.log('Templates containing "node":', nodeTemplates.slice(0, 5));
  
  const jsTemplates = client.searchTemplates('js');
  console.log('Templates containing "js":', jsTemplates);
  console.log();

  // Test getting all templates
  console.log('3. Available templates:');
  const allTemplates = client.getAvailableTemplates();
  console.log(`Total templates: ${allTemplates.length}`);
  console.log('First 10:', allTemplates.slice(0, 10));
  console.log();

  // Test error handling
  console.log('4. Error handling:');
  try {
    await client.generateGitIgnore([]);
  } catch (error) {
    console.log('Expected error for empty templates:', error.message);
  }

  try {
    // This would fail type checking in TypeScript, but we can test at runtime
    await client.generateGitIgnore(['invalid-template-name']);
  } catch (error) {
    console.log('Expected error for invalid template:', error.message);
  }

  console.log('\n✅ All tests completed successfully!');
  console.log('Note: HTTP requests would work in a real environment with internet access.');
}

testSDK().catch(console.error);