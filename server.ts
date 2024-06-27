import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';

const uri = "mongodb+srv://wbakilalakshan:FRT6Bl3xZZj9wfpK@ashop.xpar7za.mongodb.net/?retryWrites=true&w=majority&appName=Ashop";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function pingDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return "Pinged your deployment. You successfully connected to MongoDB!";
  } finally {
    await client.close();
  }
}

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(cors());
  server.use(express.json());

  // Example Express Rest API endpoints
  server.get('/api/ping', async (req, res) => {
    try {
      const message = await pingDatabase();
      res.send(message);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred.');
      }
    }
  });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
