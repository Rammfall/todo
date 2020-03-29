import { Router } from 'express';

import all from '../../../actions/task/all';

const router = Router();

router.post('/', all);

export default router;
