import { Command } from 'commander';

import { generateCommand } from './commands/generate.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('gitignoreio')
  .description('CLI for gitignore.io API')
  .version(__CLI_VERSION__);

program.addCommand(listCommand);
program.addCommand(generateCommand);

program.parse();
