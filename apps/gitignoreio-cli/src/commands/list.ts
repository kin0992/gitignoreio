import { Command } from 'commander';

export const listCommand = new Command('list')
  .description('List available gitignore templates')
  .action(async () => {
    try {
      console.log('Available gitignore templates:');
      console.log('');

      // Load elements from the SDK at runtime to avoid requiring a build step in dependent package during tests
      const { GITIGNORE_ELEMENTS } = await import('gitignoreio-sdk');

      GITIGNORE_ELEMENTS.forEach((template) => {
        console.log(`  ${template}`);
      });

      console.log('');
      console.log(`Total: ${GITIGNORE_ELEMENTS.length} templates`);
      console.log('');
      console.log('Usage: gitignoreio generate <template1> [template2] ...');
    } catch (error) {
      console.error(
        'Error listing templates:',
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  });
