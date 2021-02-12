import '@config/env';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server started ON! ${process.env.API_PORT}`);
});
