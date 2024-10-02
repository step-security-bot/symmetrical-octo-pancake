import express from 'express';
import type { Server } from 'http';
import serveStatic from 'serve-static';

export const serve = async (location: string, port: string): Promise<Server> => {
  return new Promise((resolve) => {
    const app = express();

    app.use(serveStatic(location));
    const server = app.listen(port, () => {
      resolve(server);
    });
  });
};
