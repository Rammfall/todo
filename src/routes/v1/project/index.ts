import express from 'express';

import all from './all';
import create from './create';
import update from './update';
import remove from './remove';

const router = express();

router.use('/create', create);
router.use('/all', all);
router.use('/update', update);
router.use('/remove', remove);

export default router;
