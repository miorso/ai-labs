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

    let stderrOutput = '';
    const nodeProcess = spawn('node', ['--experimental-strip-types', path], {
      stdio: ['inherit', 'inherit', 'pipe'],
      env: process.env,
    });

    nodeProcess.stderr?.on('data', (data) => {
      const chunk = data.toString();
      process.stderr.write(chunk);
      stderrOutput += chunk;
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
        const isTimeoutError =
          stderrOutput.includes('Connect Timeout Error') ||
          stderrOutput.includes('UND_ERR_CONNECT_TIMEOUT');

        if (isTimeoutError) {
          console.error(
            boxen(
              chalk.red(`❌ Connection timeout error\n\n`) +
                chalk.yellow('Possible causes:\n') +
                chalk.gray('  • VPN blocking API access\n') +
                chalk.gray('  • Corporate firewall\n') +
                chalk.gray('  • Network connectivity issues\n\n') +
                chalk.cyan(
                  'Try disconnecting from VPN or checking your network settings',
                ),
              {
                padding: 1,
                borderColor: 'red',
                borderStyle: 'round',
              },
            ),
          );
        } else {
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
        }
      } else console.log();
      resolve(code === 0);
    });
  });
}
