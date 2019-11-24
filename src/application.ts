import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();
const applicationRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

applicationRouter.get('/', (req: Request, res: Response) => {
  res.json({ status: 200 });
});

app.use('/', applicationRouter);

export default app;
