import express from 'express';
import { errorHandle } from './common/errorHandle';

const app = express();

app.use(express.json())

const PORT = 3636;

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
})