import 'dotenv/config';
import express, { json, Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import '@shared/database';

import routes from './routes';

class App {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.config();
    this.routes();
  }

  private middlewares() {
    this.express.use(json({ limit: '15mb' }));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(helmet());
  }

  private config() {
    this.express.disable('x-powered-by');
  }

  private routes() {
    this.express.use('/api', routes);
  }
}


new App().express.listen(process.env.PORT_AGIOTA || 80, () => {
  console.log(`Server started ON! ${process.env.PORT_AGIOTA || 80}`);
});
