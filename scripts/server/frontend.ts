import path from 'node:path';
import type { Closeable, ServerOptions } from '#server/types.ts';
import { createServer } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const indexHtmlTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>AI Labs</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/root.tsx"></script>
  </body>
</html>
`;

export async function runFrontendServer(
  ops: ServerOptions,
): Promise<Closeable> {
  const viteServer = await createServer({
    configFile: false,
    server: {
      port: 3001,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
    plugins: [
      tailwindcss(),
      {
        name: 'virtual-index-html',
        configureServer(server) {
          server.middlewares.use('/', (req, res, next) => {
            if (req.url === '/' || req.url === '/index.html') {
              res.setHeader('Content-Type', 'text/html');
              res.end(indexHtmlTemplate);
              return;
            }
            next();
          });
        },
      },
    ],
    root: path.join(ops.root, 'client'),
  });

  await viteServer.listen();
  viteServer.printUrls();

  return {
    close: () => {
      viteServer.close();
    },
  };
}
