import express from 'express';

import create from './create';
import all from './all';
import update from './update';
import remove from './remove';

const router = express();

router.use('/create', create);
router.use('/all', all);
router.use('/update', update);
router.use('/remove', remove);

export default router;
