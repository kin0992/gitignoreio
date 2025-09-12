import { Command } from 'commander';

export const listCommand = new Command('list')
  .description('List available gitignore templates')
  .action(async () => {
    try {
      console.log('Available gitignore templates:');
      console.log('');

      // Common templates - in a real implementation, this would come from the API
      const commonTemplates = [
        'node',
        'python',
        'java',
        'react',
        'angular',
        'vue',
        'rust',
        'go',
        'dotnet',
        'macos',
        'windows',
        'linux',
        'visualstudiocode',
        'intellij',
        'eclipse',
        'xcode',
        'gradle',
        'maven',
        'docker',
        'terraform',
      ].sort();

      commonTemplates.forEach((template) => {
        console.log(`  ${template}`);
      });

      console.log('');
      console.log(`Total: ${commonTemplates.length} templates`);
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
