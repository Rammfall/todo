import app from './application';
import { PORT } from './config/application';

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${new Date()}:    Server is running on ${PORT} port.`);
});
