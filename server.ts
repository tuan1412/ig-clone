import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandle } from './common/errorHandle';
import { notFoundHandle } from './common/notFoundHandler';
import morgan from 'morgan';
import baseRouter from './modules';
import { initRealtimeServer } from './modules/io';

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI as string,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log('⚡️[db] MongoDB connected');
  }
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

const PORT = process.env.PORT ?? 3636;

app.use('/api', baseRouter);

app.get('/ping', (req: Request, res: Response) => {
  res.send({ success: 1, message: 'PONG' });
});

app.use([notFoundHandle, errorHandle]);

initRealtimeServer(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
