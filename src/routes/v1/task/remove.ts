import { Router } from 'express';

import remove from '../../../actions/task/remove';

const router = Router();

router.post('/', remove);

export default router;
