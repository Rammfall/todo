import express from 'express';

import user from './user';

const router = express();

router.use('/user', user);

export default router;
