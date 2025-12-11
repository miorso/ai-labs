import readline from 'node:readline';
import type { Closeable } from '#server/types.ts';

export function setupShutdown(servers: Closeable | Closeable[]) {
  const serverList = Array.isArray(servers) ? servers : [servers];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const serverCount = serverList.length;
  const serverText = serverCount === 1 ? 'server' : `${serverCount} servers`;

  console.log(`\nType "exit" or "q" to stop the ${serverText}\n`);

  const shutdown = async () => {
    console.log('\nShutting down...');
    rl.close();

    await Promise.all(serverList.map((s) => s.close()));

    console.log('Server(s) stopped successfully.');
    process.exit(0);
  };

  rl.on('line', async (input) => {
    const cmd = input.trim().toLowerCase();
    if (cmd === 'exit' || cmd === 'q') {
      await shutdown();
    }
  });

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
