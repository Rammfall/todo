import { Router } from 'express';

import remove from '../../../actions/project/remove';

const router = Router();

router.post('/', remove);

export default router;
