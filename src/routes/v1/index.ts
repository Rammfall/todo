import express from 'express';

import user from './user';
import project from './project';
import task from './task';
import auth from '../../middlewares/user/auth';

const router = express();

router.use('/user', user);
router.use('/project', auth, project);
router.use('/task', auth, task);

export default router;
