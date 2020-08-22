import { Router } from 'express';

import create from '../../../actions/task/create';

const router: Router = Router();

router.post('/', create);

export default router;
