import cluster from 'cluster';
import os from 'os';

import app from './application';
import { PORT } from './config/application';

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  for (let i = 0; i < cpusCount - 1; i += 1) {
    cluster.fork();
  }
}
if (cluster.isWorker) {
  app.listen(PORT, async () => {
    // eslint-disable-next-line no-console
    console.log(
      `${new Date().toLocaleString()}:    Server is running on ${PORT} port.`
    );
  });
}
