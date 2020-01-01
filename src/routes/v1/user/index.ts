import express from 'express';

import register from './register';
import login from './login';
import refresh from './refresh';

const router = express();

router.use('/register', register);
router.use('/login', login);
router.use('/refresh', refresh);

export default router;
