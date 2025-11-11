import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';
import boxen from 'boxen';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

// Configure marked to use terminal renderer
marked.use(
  markedTerminal({
    heading: chalk.bold.cyan,
    code: chalk.yellow,
    codespan: chalk.yellow,
    strong: chalk.bold,
    em: chalk.italic,
    link: chalk.blue.underline,
  }) as any,
);

export function displayReadme(labPath: string): void {
  const labDir = dirname(dirname(labPath));
  const readmePath = join(labDir, 'README.md');

  if (existsSync(readmePath)) {
    try {
      const content = readFileSync(readmePath, 'utf-8');
      const rendered = marked(content.trim());
      console.log(chalk.blue('📖 Lab Instructions:\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(rendered);
      console.log(chalk.gray('─'.repeat(60)));
      console.log();
    } catch (error) {
      console.warn(
        boxen(chalk.yellow('⚠️ Could not read README.md'), {
          padding: 1,
          borderColor: 'yellow',
          borderStyle: 'round',
        }),
      );
    }
  }
}
