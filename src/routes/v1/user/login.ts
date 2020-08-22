import { Router } from 'express';

import login from '../../../actions/user/login';

const router: Router = Router();

router.post('/', login);

export default router;
