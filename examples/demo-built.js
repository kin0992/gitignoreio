/**
 * Demonstration of the built SDK
 */

const { GitIgnoreClient, GITIGNORE_TEMPLATES } = require('../packages/gitignoreio-sdk/dist/index.js');

async function demonstrateTypedSDK() {
  console.log('🎯 gitignoreio-sdk Strong Typing Demo\n');

  const client = new GitIgnoreClient();

  // Example 1: Valid templates (would have autocomplete in TypeScript)
  const validTemplates = ['node', 'python', 'java', 'macos', 'visualstudiocode'];
  console.log('1. Valid templates:', validTemplates);
  
  // Verify all are valid
  const allValid = validTemplates.every(template => client.isTemplateAvailable(template));
  console.log('   All templates are valid:', allValid);

  // Example 2: Template validation 
  console.log('\n2. Template validation:');
  console.log('   node is valid:', client.isTemplateAvailable('node'));
  console.log('   invalid-template is valid:', client.isTemplateAvailable('invalid-template'));

  // Example 3: Search functionality
  console.log('\n3. Search functionality:');
  const nodeRelated = client.searchTemplates('node');
  console.log('   Templates containing "node":', nodeRelated.slice(0, 5));
  
  const ideTemplates = client.searchTemplates('studio');
  console.log('   Templates containing "studio":', ideTemplates);

  // Example 4: Template categories  
  console.log('\n4. Template categories:');
  
  const allTemplates = client.getAvailableTemplates();
  console.log(`   Total templates: ${allTemplates.length}`);
  
  // Popular languages
  const languages = ['node', 'python', 'java', 'csharp', 'go', 'rust', 'php', 'ruby'];
  const availableLanguages = languages.filter(lang => client.isTemplateAvailable(lang));
  console.log('   Available language templates:', availableLanguages);
  
  // IDEs
  const ides = ['visualstudiocode', 'intellij', 'eclipse', 'xcode', 'vim', 'emacs'];
  const availableIdes = ides.filter(ide => client.isTemplateAvailable(ide));
  console.log('   Available IDE templates:', availableIdes);
  
  // OS
  const os = ['macos', 'windows', 'linux'];
  const availableOS = os.filter(o => client.isTemplateAvailable(o));
  console.log('   Available OS templates:', availableOS);

  // Example 5: Error handling demonstration
  console.log('\n5. Error handling:');
  
  try {
    await client.generateGitIgnore([]);
  } catch (error) {
    console.log('   Empty array error:', error.message);
  }
  
  try {
    await client.generateGitIgnore(['nonexistent-template']);
  } catch (error) {
    console.log('   Invalid template error:', error.message);
  }

  console.log('\n✨ TypeScript Benefits:');
  console.log('   • IntelliSense shows all 200+ available templates');
  console.log('   • Compile-time checking prevents typos');
  console.log('   • Type safety ensures valid template combinations');
  console.log('   • Self-documenting API with type definitions');
  console.log('   • Refactoring safety across the codebase');

  console.log('\n📊 Quick stats:');
  console.log(`   Templates starting with 'a': ${allTemplates.filter(t => t.startsWith('a')).length}`);
  console.log(`   Templates containing 'script': ${client.searchTemplates('script').length}`);
  console.log(`   Templates containing 'js': ${client.searchTemplates('js').length}`);

  console.log('\n✅ Demo completed successfully!');
  console.log('🔗 In a real app, you would call client.generateGitIgnore(templates) to fetch content.');
}

demonstrateTypedSDK().catch(console.error);