import type { LabChoice } from './types.ts';
import prompts from 'prompts';
import chalk from 'chalk';

export async function showLabSelection(choices: LabChoice[]): Promise<string> {
  const response = await prompts(
    {
      type: 'autocomplete',
      name: 'lab',
      message: 'Select a lab to run (type to search):',
      choices: choices.map((choice) => ({
        title: choice.title,
        value: choice.value,
      })),
    },
    {
      onCancel: () => {
        console.log(chalk.yellow('\n👋 Cancelled. Exiting.'));
        process.exit(0);
      },
    },
  );

  return response.lab;
}
