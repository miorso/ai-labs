import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import boxen from 'boxen';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '..', '.env');

export function loadEnvironment() {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(chalk.green('✅ Loaded environment variables from .env\n'));
  } else {
    console.log(
      boxen(
        chalk.yellow('⚠️  No .env file found\n\n') +
          'API keys may not be configured.\n' +
          chalk.gray('Copy .env.example to .env and add your API keys'),
        {
          padding: 1,
          borderColor: 'yellow',
          borderStyle: 'round',
        },
      ),
    );
    console.log();
  }
}
