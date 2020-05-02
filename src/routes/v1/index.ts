import express, { Express } from 'express';

import user from './user';
import project from './project';
import task from './task';
import auth from '../../middlewares/user/auth';
import sanitize from '../../middlewares/sanitizers';

const router: Express = express();

router.use('/user', sanitize, user);
router.use('/project', auth, project);
router.use('/task', auth, task);

export default router;
