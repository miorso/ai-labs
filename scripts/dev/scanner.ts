import type { LabChoice } from './types.ts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labsDir = join(__dirname, '..', '..', 'labs');

export function scanLabs(): LabChoice[] {
  const choices: LabChoice[] = [];
  validateDir();

  try {
    const entries = readdirSync(labsDir).sort();

    for (const entry of entries) {
      const entryPath = join(labsDir, entry);

      if (!isDirectory(entryPath)) continue;

      const exercisePath = join(entryPath, 'exercise', 'main.ts');
      const solutionPath = join(entryPath, 'solution', 'main.ts');

      const labNumber = entry.split('-')[0] || '';
      const labName = entry.substring(entry.indexOf('-') + 1) || entry;

      if (existsSync(exercisePath)) {
        choices.push({
          title: `${labNumber} - ${labName} ${chalk.gray('[exercise]')}`,
          value: exercisePath,
          type: 'exercise',
        });
      }

      if (existsSync(solutionPath)) {
        choices.push({
          title: `${labNumber} - ${labName} ${chalk.gray('[solution]')}`,
          value: solutionPath,
          type: 'solution',
        });
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(chalk.red('❌ Error scanning labs directory:'), message);
    console.error(
      chalk.gray('Make sure the labs/ directory exists and is readable'),
    );
    process.exit(1);
  }

  return choices;
}

function validateDir(): void {
  if (!existsSync(labsDir)) {
    console.error(chalk.red('❌ Error: labs/ directory not found'));
    console.error(
      chalk.gray('The labs directory should be at the root of the project'),
    );
    process.exit(1);
  }
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Warning: Cannot access ${path}, skipping`));
    return false;
  }
}
