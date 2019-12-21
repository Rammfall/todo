import app from './application';
import { PORT } from './config/application';

app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(
    `${new Date().toLocaleString()}:    Server is running on ${PORT} port.`
  );
});
