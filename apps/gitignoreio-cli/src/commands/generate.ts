import { checkbox, confirm, input } from '@inquirer/prompts';
import { Command } from 'commander';
import { promises as fs } from 'fs';
import { join } from 'path';

export function filterTemplates(
  searchTerm: string,
  templates: readonly string[],
): readonly string[] {
  return searchTerm.trim()
    ? templates.filter((template) =>
        template.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : templates;
}

export const generateCommand = new Command('generate')
  .description('Interactively generate .gitignore file from templates')
  .action(async () => {
    try {
      console.log('🔥 GitIgnore Generator');
      console.log('');

      // Load elements from the SDK at runtime
      const { GITIGNORE_ELEMENTS, GitIgnoreSDK } = await import(
        'gitignoreio-sdk/dist/index.js'
      );

      // Ask for search term to filter templates
      const searchTerm = await input({
        default: '',
        message: 'Search templates (press Enter to see all):',
      });

      // Filter templates based on search term
      const filteredElements = filterTemplates(searchTerm, GITIGNORE_ELEMENTS);

      if (filteredElements.length === 0) {
        console.log(`❌ No templates found matching "${searchTerm}"`);
        process.exit(1);
      }

      console.log('');
      if (searchTerm.trim()) {
        console.log(
          `🔍 Found ${filteredElements.length} template${filteredElements.length === 1 ? '' : 's'} matching "${searchTerm}"`,
        );
      } else {
        console.log(`📋 Showing all ${filteredElements.length} templates`);
      }
      console.log('');

      // Show template selection
      const selectedTemplates = await checkbox({
        choices: filteredElements.map((template) => ({
          name: template,
          value: template,
        })),
        instructions: false,
        message: 'Select one or more templates to include:',
        pageSize: 15,
        required: true,
      });

      if (selectedTemplates.length === 0) {
        console.log('❌ At least one template must be selected.');
        process.exit(1);
      }

      console.log('');
      console.log(`✅ Selected templates: ${selectedTemplates.join(', ')}`);
      console.log('');

      // Ask if user wants to save to file or print to console
      const saveToFile = await confirm({
        default: true,
        message: 'Do you want to save to a .gitignore file?',
      });

      let outputPath: string | undefined;
      if (saveToFile) {
        // Ask for directory path
        outputPath = await input({
          default: '.',
          message:
            'Enter the directory path (leave empty for current directory):',
        });
      }

      // Generate the gitignore content
      console.log('🚀 Generating .gitignore content...');
      const sdk = new GitIgnoreSDK();
      const result = await sdk.generate(
        selectedTemplates as [string, ...string[]],
      );

      if (result.isErr()) {
        console.error('❌ Error generating .gitignore:', result.error.message);
        process.exit(1);
      }

      const content = result.value.content;

      if (saveToFile && outputPath) {
        // Save to file
        const filePath = join(outputPath, '.gitignore');

        try {
          await fs.writeFile(filePath, content, 'utf8');
          console.log('');
          console.log(`✅ .gitignore file created at: ${filePath}`);
        } catch (error) {
          console.error(
            '❌ Error writing file:',
            error instanceof Error ? error.message : String(error),
          );
          process.exit(1);
        }
      } else {
        // Print to console
        console.log('');
        console.log('📄 Generated .gitignore content:');
        console.log('');
        console.log('─'.repeat(50));
        console.log(content);
        console.log('─'.repeat(50));
      }

      console.log('');
      console.log('🎉 Done!');
    } catch (error) {
      console.error(
        '❌ Error:',
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  });
