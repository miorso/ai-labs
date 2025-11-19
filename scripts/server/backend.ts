import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import path from 'node:path';
import { once } from 'node:events';
import type { Closeable, ServerOptions } from '#server/types.ts';

export async function runBackendServer(ops: ServerOptions): Promise<Closeable> {
  const app = new Hono();

  app.all('/api/*', async (c) => {
    const url = new URL(c.req.url);

    try {
      const modulePath = path.join(ops.root, url.pathname.slice(1) + '.ts');

      const mod = await import(modulePath);
      const handler = mod[c.req.method.toUpperCase()];

      if (!handler) {
        return c.text('404 Not found', 404);
      }

      return await handler(c.req.raw);
    } catch (e) {
      console.error('Error:', e);
      if (e instanceof Error && e.message.includes("Cannot find module '")) {
        return c.text('404 Not found', 404);
      } else {
        return c.text('500 Internal server error', 500);
      }
    }
  });

  const server = serve({
    fetch: app.fetch,
    port: 3000,
  });

  await once(server, 'listening');

  console.log('🚀 API running at http://localhost:3000');

  return {
    close: () => {
      server.close();
    },
  };
}
