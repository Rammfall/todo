import { Router } from 'express';

import all from '../../../actions/task/all';

const router: Router = Router();

router.post('/', all);

export default router;
