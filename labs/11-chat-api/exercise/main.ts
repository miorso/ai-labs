import { runBackendServer } from '#server/backend.ts';
import { setupShutdown } from '#server/shutdown.ts';

const server = await runBackendServer({ root: import.meta.dirname });
setupShutdown(server);
