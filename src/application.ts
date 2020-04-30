import { join } from 'path';
import express, { Request, Response, Router, Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';

import applicationRouter from './routes';
import './db';

const app: Express = express();
const rootRouter: Router = Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.get('/', express.static(join(__dirname, 'public')));

rootRouter.get('/', (req: Request, res: Response) => {
  res.sendFile(join(`${__dirname}/../public/index.html`));
});

app.use('/', rootRouter);
app.use('/', express.static('./public/'));
app.use('/api', applicationRouter);

export default app;
