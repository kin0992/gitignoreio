#!/usr/bin/env node

import { Command } from 'commander';

import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('gitignoreio')
  .description('CLI for gitignore.io API')
  .version('0.1.0');

program.addCommand(listCommand);

program.parse();
