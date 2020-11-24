import http from 'http';
import express from 'express';

import { appInitLoader } from '../loaders';
import config from '../config';

const app = express();
const server = http.createServer(app);

export function startServer() {
  appInitLoader(app);
  server.listen(config.port, () => console.log(`👂 server started on port ${config.port} on (${config.env}) mode`));
}

startServer();

export default app;
