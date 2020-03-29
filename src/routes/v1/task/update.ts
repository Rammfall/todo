import { Router } from 'express';

import update from '../../../actions/task/update';

const router = Router();

router.post('/', update);

export default router;
