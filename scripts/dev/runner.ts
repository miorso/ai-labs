import { existsSync } from 'fs';
import chalk from 'chalk';
import boxen from 'boxen';
import { spawn } from 'child_process';

export async function runLab(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!existsSync(path)) {
      console.error(
        boxen(
          chalk.red('❌ Error: Selected file no longer exists\n\n') +
            chalk.gray(`Path: ${path}`),
          {
            padding: 1,
            borderColor: 'red',
            borderStyle: 'round',
          },
        ),
      );
      resolve(false);
      return;
    }

    const nodeProcess = spawn('node', ['--experimental-strip-types', path], {
      stdio: 'inherit',
      env: process.env,
    });

    nodeProcess.on('error', (error) => {
      console.error(
        boxen(
          chalk.red('❌ Failed to start Node.js process\n\n') +
            chalk.gray(`${error.message}\n\n`) +
            chalk.yellow('Make sure Node.js 24.11.0+ is installed'),
          {
            padding: 1,
            borderColor: 'red',
            borderStyle: 'round',
          },
        ),
      );
      resolve(false);
    });

    nodeProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(
          boxen(
            chalk.red(`❌ Process exited with code ${code}\n\n`) +
              chalk.gray('Check the error messages above for details'),
            {
              padding: 1,
              borderColor: 'red',
              borderStyle: 'round',
            },
          ),
        );
      } else console.log();
      resolve(code === 0);
    });
  });
}
