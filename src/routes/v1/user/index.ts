import express from 'express';

import register from './register';
import login from './login';
import refresh from './refresh';
import logout from './logout';

const router = express();

router.use('/register', register);
router.use('/login', login);
router.use('/refresh', refresh);
router.use('/logout', logout);

export default router;
