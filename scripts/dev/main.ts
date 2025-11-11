import { scanLabs } from './scanner.ts';
import chalk from 'chalk';
import boxen from 'boxen';
import { showLabSelection } from './menu.ts';
import { existsSync } from 'fs';
import { displayReadme } from './readme.ts';
import { runLab } from './runner.ts';
import { showActionMenu } from './actions.ts';
import { displayExecutionBox } from './header.ts';
import { confirmReadyToRun } from './confirm.ts';
import type { LabChoice } from './types.ts';

export async function main(): Promise<void> {
  const choices = scanLabs();

  if (choices.length === 0) {
    console.log(
      boxen(
        chalk.yellow('📭 No labs found in the labs/ directory\n\n') +
          'To create a lab, add a folder like:\n' +
          chalk.gray('  labs/01-my-lab/exercise/main.ts\n') +
          chalk.gray('  labs/01-my-lab/solution/main.ts'),
        {
          padding: 1,
          borderColor: 'yellow',
          borderStyle: 'round',
        },
      ),
    );
    process.exit(0);
  }

  let selectedPath = '';
  let showSelection = true;
  let showReadme = true;

  while (true) {
    selectedPath = showSelection
      ? await showLabSelection(choices)
      : selectedPath;

    validatePath(selectedPath);
    console.clear();

    const isExercisePath = isExercise(choices, selectedPath);

    if (isExercisePath && showReadme) {
      displayReadme(selectedPath);

      const ready = await confirmReadyToRun();

      if (!ready) {
        showSelection = true;
        continue;
      }

      console.clear();
      displayExecutionBox(selectedPath, 'exercise');
    } else if (!isExercisePath || !showReadme) {
      const type = isExercisePath ? 'exercise' : 'solution';
      displayExecutionBox(selectedPath, type);
    }

    await runLab(selectedPath);

    const action = await showActionMenu(isExercisePath);
    switch (action) {
      case 'reload':
        console.clear();
        showSelection = false;
        showReadme = false;
        break;
      case 'readme':
        console.clear();
        showSelection = false;
        showReadme = true;
        break;
      case 'choose':
        console.clear();
        showSelection = true;
        showReadme = true;
        break;
      default:
        console.log(
          boxen(chalk.cyan('👋 Goodbye!\n\nHappy learning!'), {
            padding: 1,
            borderColor: 'cyan',
            borderStyle: 'round',
          }),
        );
        process.exit(0);
    }
  }
}

function validatePath(path: string): void {
  if (!path) {
    console.error(
      boxen(chalk.red('❌ Invalid lab path'), {
        padding: 1,
        borderColor: 'red',
        borderStyle: 'round',
      }),
    );
    process.exit(1);
  }

  if (!existsSync(path)) {
    console.error(
      boxen(
        chalk.red('❌ Selected file does not exist:\n\n') + chalk.gray(path),
        {
          padding: 1,
          borderColor: 'red',
          borderStyle: 'round',
        },
      ),
    );
    process.exit(1);
  }
}

function isExercise(choices: LabChoice[], path: string) {
  return choices.find((c) => c.value === path)?.type === 'exercise';
}
