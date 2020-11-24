import http from 'http';
import express from 'express';

import { appInitLoader } from '../loaders';

const app = express();
const server = http.createServer(app);

export function startServer() {
  appInitLoader(app);
  server.listen(config.appkey.port, () =>
    console.log(`👂 server started on port ${config.appkey.port} on (${config.nodeEnv.env}) mode`),
  );
}

startServer();

export default app;
