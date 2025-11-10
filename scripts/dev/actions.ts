import type { Action } from './types.ts';
import prompts from 'prompts';
import chalk from 'chalk';

const ACTIONS = [
  { title: '🔄 Run this exercise again', value: 'reload' },
  { title: '📋 Select a different exercise', value: 'choose' },
  { title: '🚪 Exit', value: 'quit' },
] as const;

export async function showActionMenu(): Promise<Action> {
  const response = await prompts(
    {
      type: 'select',
      name: 'action',
      message: 'Exercise completed! What would you like to do next?',
      choices: [...ACTIONS],
      initial: 0,
    },
    {
      onCancel: () => {
        console.log(chalk.yellow('\n👋 Cancelled. Exiting.\n'));
        process.exit(0);
      },
    },
  );

  return response.action;
}
