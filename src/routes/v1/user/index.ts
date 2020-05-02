import express, { Express } from 'express';

import create from './create';
import login from './login';
import refresh from './refresh';
import logout from './logout';

const router: Express = express();

router.use('/create', create);
router.use('/login', login);
router.use('/refresh', refresh);
router.use('/logout', logout);

export default router;
