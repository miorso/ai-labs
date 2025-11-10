import { existsSync } from 'fs';
import chalk from 'chalk';
import { spawn } from 'child_process';

export async function runLab(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!existsSync(path)) {
      console.error(chalk.red('❌ Error: Selected file no longer exists'));
      console.error(chalk.gray(`Path: ${path}`));
      resolve(false);
      return;
    }

    console.log(chalk.cyan(`▶️ Running: ${path}\n`));

    const nodeProcess = spawn('node', ['--experimental-strip-types', path], {
      stdio: 'inherit',
      env: process.env,
    });

    nodeProcess.on('error', (error) => {
      console.error(chalk.red('\n❌ Failed to start Node.js process'));
      console.error(chalk.gray(`   ${error.message}`));
      console.error(chalk.gray('\nMake sure Node.js 24.11.0+ is installed'));
      resolve(false);
    });

    nodeProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(chalk.red(`\n❌ Process exited with code ${code}`));
        console.error(
          chalk.gray('Check the error messages above for details\n'),
        );
      } else console.log();
      resolve(code === 0);
    });
  });
}
