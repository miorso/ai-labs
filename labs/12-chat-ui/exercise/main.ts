import { runBackendServer } from '#server/backend.ts';
import { runFrontendServer } from '#server/frontend.ts';
import { setupShutdown } from '#server/shutdown.ts';

const backend = await runBackendServer({ root: import.meta.dirname });
const frontend = await runFrontendServer({ root: import.meta.dirname });

setupShutdown([backend, frontend]);
