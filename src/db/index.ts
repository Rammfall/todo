import { createConnection } from 'typeorm';

export default (async function instance() {
  await createConnection();
})();
