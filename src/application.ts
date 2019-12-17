import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import { getRepository } from 'typeorm';

import db from './db';
import User from './db/entity/user';

const app = express();
const applicationRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());
db();

applicationRouter.get('/', (req: Request, res: Response) => {
  res.json({ status: 200 });
});
applicationRouter.get('/user', async (req: Request, res: Response) => {
  const user = await getRepository(User)
    .createQueryBuilder('users')
    .where('users.id = :id', { id: 1 })
    .getOne()
    .catch(err => console.log(err));

  res.json({ user });
});

app.use('/', applicationRouter);

export default app;
