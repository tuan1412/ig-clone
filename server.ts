import express, { Request, Response } from 'express';
import { errorHandle } from './common/errorHandle';
import { notFoundHandle } from './common/notFoundHandler';
import baseRouter from './modules';

const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 3636;

app.use('/', baseRouter);

app.get('/ping', (req: Request, res: Response) => {
  res.send({ success: 1, message: 'PONG' });
});

app.use([notFoundHandle, errorHandle]);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
