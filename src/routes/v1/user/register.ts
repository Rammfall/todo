import { Router } from 'express';

import register from '../../../actions/user/register';

const router = Router();

router.post('/', register);

export default router;
