import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';

export function displayReadme(labPath: string): void {
  const labDir = dirname(dirname(labPath));
  const readmePath = join(labDir, 'README.md');

  if (existsSync(readmePath)) {
    try {
      const content = readFileSync(readmePath, 'utf-8');
      console.log(chalk.blue('📖 Lab Instructions:\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(content.trim());
      console.log(chalk.gray('─'.repeat(60)));
      console.log();
    } catch (error) {
      console.warn(chalk.yellow('⚠️ Could not read README.md'));
    }
  }
}
