import prompts from 'prompts';
import chalk from 'chalk';

/**
 * Ask user if they're ready to run the exercise
 * Returns true if ready, false if cancelled or declined
 */
export async function confirmReadyToRun(): Promise<boolean> {
  const response = await prompts(
    {
      type: 'confirm',
      name: 'ready',
      message: chalk.cyan('Ready to run the exercise?'),
      initial: true,
    },
    {
      onCancel: () => {
        console.log(chalk.yellow('\n👋 Cancelled. Returning to menu.\n'));
        return false;
      },
    },
  );

  return response.ready ?? false;
}
