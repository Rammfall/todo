import { Router } from 'express';

import create from '../../../actions/user/create';

const router = Router();

router.post('/', create);

export default router;
