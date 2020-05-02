import express, { Express } from 'express';

import v1 from './v1';
import sanitize from '../middlewares/sanitizers';

const router: Express = express();

router.use('/v1', sanitize, v1);

export default router;
