import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import 'reflect-metadata';
import { getRepository } from 'typeorm';

import applicationRouter from './routes';
import './db';
import User from './db/entity/user';

const app = express();
const rootRouter = Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());

rootRouter.get('/', (req: Request, res: Response) => {
  res.json({ status: 200 });
});
rootRouter.get('/user', async (req: Request, res: Response) => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .getMany();

  res.json({ user });
});

app.use('/', rootRouter);
app.use('/api', applicationRouter);

export default app;
