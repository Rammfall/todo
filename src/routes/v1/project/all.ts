import { Router } from 'express';

import all from '../../../actions/project/all';

const router = Router();

router.post('/', all);

export default router;
