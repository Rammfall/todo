import express from 'express';

import user from './user';
import project from './project';
import auth from '../../middlewares/user/auth';

const router = express();

router.use('/user', user);
router.use('/project', auth, project);

export default router;
