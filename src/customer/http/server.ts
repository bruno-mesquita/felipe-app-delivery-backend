/**
 * @fileoverview Instanciando o server e configurando
 *
 * @author Bruno, Jonatas
 */

import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import '@shared/typeorm';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

app.use('/api', routes);

app.listen(process.env.API_CLIENT_PORT, () => {
  console.log(`Server started ON! ${process.env.API_CLIENT_PORT}`);
});
