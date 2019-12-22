import express from 'express';

import register from './register';
import login from './login';

const router = express();

router.use('/register', register);
router.use('/login', login);

export default router;
