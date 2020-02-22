import { Router } from 'express';

import login from '../../../actions/user/logout';

const router = Router();

router.post('/', login);

export default router;
