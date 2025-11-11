import chalk from 'chalk';
import boxen from 'boxen';

/**
 * Display a prominent execution box before running a lab
 */
export function displayExecutionBox(
  path: string,
  type: 'exercise' | 'solution',
): void {
  const color = type === 'exercise' ? 'green' : 'blue';
  const label = type === 'exercise' ? 'RUNNING EXERCISE' : 'RUNNING SOLUTION';
  const chalkColor = type === 'exercise' ? chalk.green : chalk.blue;

  console.log(chalkColor('═'.repeat(70)));
  console.log(
    boxen(chalkColor.bold(`▶️  ${label}\n\n`) + chalk.gray(path), {
      padding: 1,
      borderColor: color,
      borderStyle: 'double',
      textAlignment: 'center',
    }),
  );
  console.log(chalkColor('═'.repeat(70)));
  console.log();
}
