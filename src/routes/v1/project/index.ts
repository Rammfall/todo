import express from 'express';

import all from './all';
import create from './create';

const router = express();

router.use('/all', all);
router.use('/create', create);

export default router;
