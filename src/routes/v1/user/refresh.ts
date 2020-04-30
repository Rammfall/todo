import { Router } from 'express';

import refresh from '../../../actions/user/refresh';

const router: Router = Router();

router.post('/', refresh);

export default router;
