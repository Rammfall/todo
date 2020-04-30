import { Router } from 'express';

import logout from '../../../actions/user/logout';

const router: Router = Router();

router.post('/', logout);

export default router;
