import { Router } from 'express';

import create from '../../../actions/project/create';

const router = Router();

router.post('/', create);

export default router;
