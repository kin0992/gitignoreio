/**
 * TypeScript demonstration showing strong typing features of gitignoreio-sdk
 * 
 * This file demonstrates:
 * 1. Full IntelliSense support for template names
 * 2. Type safety at compile time
 * 3. Autocomplete for all available templates
 */

import { 
  generateGitIgnore, 
  GitIgnoreClient, 
  GitIgnoreTemplate,
  GITIGNORE_TEMPLATES 
} from '../packages/gitignoreio-sdk/src/index';

// ✅ Valid usage - these templates are strongly typed
const validTemplates: GitIgnoreTemplate[] = [
  'node',           // ✅ Valid - autocomplete available
  'python',         // ✅ Valid - autocomplete available
  'java',           // ✅ Valid - autocomplete available
  'macos',          // ✅ Valid - autocomplete available
  'visualstudiocode' // ✅ Valid - autocomplete available
];

// ❌ This would cause TypeScript compilation errors:
// const invalidTemplates: GitIgnoreTemplate[] = [
//   'invalid-template',  // ❌ TypeScript error - not assignable to GitIgnoreTemplate
//   'not-a-real-one',    // ❌ TypeScript error - not assignable to GitIgnoreTemplate  
// ];

async function demonstrateTypeScript() {
  console.log('🎯 TypeScript Strong Typing Demo\n');

  // Example 1: Type-safe template arrays
  console.log('1. Valid templates (autocompleted):');
  console.log('Valid templates:', validTemplates);

  // Example 2: Template validation at compile time
  const client = new GitIgnoreClient();
  
  // This will show IntelliSense with all available templates
  const webDevTemplates: GitIgnoreTemplate[] = [
    'node',
    'javascript',
    'visualstudiocode',
    'macos',
    'linux'
  ];

  console.log('\n2. Web development stack:', webDevTemplates);

  // Example 3: Type narrowing with isTemplateAvailable
  const userInput = 'python';
  if (client.isTemplateAvailable(userInput)) {
    // TypeScript now knows userInput is GitIgnoreTemplate
    const result = [userInput]; // This is type-safe
    console.log('\n3. Type-safe user input:', result);
  }

  // Example 4: Strongly typed return values
  console.log('\n4. Return types are also strongly typed:');
  
  // The return type is Promise<GitIgnoreResponse> which includes:
  // - content: string
  // - templates: GitIgnoreTemplate[]
  
  // Note: This would make an HTTP request in a real environment
  // const response = await generateGitIgnore(validTemplates);
  // console.log('Templates used:', response.templates); // Type: GitIgnoreTemplate[]
  // console.log('Content type:', typeof response.content); // Type: string

  // Example 5: Template searching with type safety
  const searchResults = client.searchTemplates('node');
  console.log('\n5. Search results (strongly typed):', searchResults);
  // searchResults is GitIgnoreTemplate[], not string[]

  console.log('\n✨ Benefits of strong typing:');
  console.log('• IntelliSense/autocomplete in your IDE');
  console.log('• Compile-time error checking');
  console.log('• No runtime errors from typos');  
  console.log('• Self-documenting API');
  console.log('• Refactoring safety');

  console.log('\n📊 Template statistics:');
  console.log(`Total available templates: ${GITIGNORE_TEMPLATES.length}`);
  
  // Group templates by category (this is type-safe)
  const languages = GITIGNORE_TEMPLATES.filter(t => 
    ['node', 'python', 'java', 'csharp', 'go', 'rust', 'php', 'ruby', 'kotlin', 'swift'].includes(t)
  );
  
  const ides = GITIGNORE_TEMPLATES.filter(t => 
    ['visualstudiocode', 'intellij', 'eclipse', 'xcode', 'vim', 'emacs'].includes(t)
  );
  
  console.log(`Language templates: ${languages.length}`);
  console.log(`IDE templates: ${ides.length}`);
}

// Run the demo
demonstrateTypeScript().catch(console.error);

export { demonstrateTypeScript, validTemplates };