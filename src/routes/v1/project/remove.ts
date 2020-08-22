import { Router } from 'express';

import remove from '../../../actions/project/remove';

const router: Router = Router();

router.post('/', remove);

export default router;
