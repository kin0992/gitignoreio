import { Command } from 'commander';

import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('gitignoreio')
  .description('CLI for gitignore.io API')
  .version(__CLI_VERSION__);

program.addCommand(listCommand);

program.parse();
