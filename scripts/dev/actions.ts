import type { Action } from './types.ts';
import prompts from 'prompts';
import chalk from 'chalk';

const EXERCISE_ACTIONS = [
  { title: '🔄 Run this exercise again', value: 'reload' },
  { title: '📖 Read README again', value: 'readme' },
  { title: '📋 Select a different exercise', value: 'choose' },
  { title: '🚪 Exit', value: 'quit' },
] as const;

const SOLUTION_ACTIONS = [
  { title: '🔄 Run this solution again', value: 'reload' },
  { title: '📋 Select a different exercise', value: 'choose' },
  { title: '🚪 Exit', value: 'quit' },
] as const;

export async function showActionMenu(isExercise: boolean): Promise<Action> {
  const actions = isExercise ? EXERCISE_ACTIONS : SOLUTION_ACTIONS;
  const message = isExercise
    ? 'Exercise completed! What would you like to do next?'
    : 'Solution completed! What would you like to do next?';

  const response = await prompts(
    {
      type: 'select',
      name: 'action',
      message,
      choices: [...actions],
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
