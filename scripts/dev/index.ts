#!/usr/bin/env node

/**
 * Interactive lab runner
 *
 * This script provides an interactive CLI for selecting and running labs.
 */

import chalk from 'chalk';
import { loadEnvironment } from './config.ts';
import { main } from './main.ts';

console.clear();
loadEnvironment();

main().catch((error) => {
  console.error(chalk.red('\n❌ Unexpected error:'), error.message);
  if (error.stack) {
    console.error(chalk.gray('\nStack trace:'));
    console.error(chalk.gray(error.stack));
  }
  process.exit(1);
});
