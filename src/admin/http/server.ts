import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import '../database';
import routes from './routes';

const app = express();
app.use(json({ limit: '10mb' }));
app.use(cors());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use('/api', routes);

app.listen(process.env.PORT || 3232, () => {
  console.log(`Server started ON! ${process.env.PORT || 3232}`);
});
