import express, { json, Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { useExpressServer } from 'routing-controllers';
import { resolve } from 'path';

class Server {
  private express: Express;

  constructor() {
    this.express = express();
    this.config();

    this.express = useExpressServer(this.express, {
      cors: true,
      routePrefix: '/api',
      controllers: [
        resolve(__dirname, 'controllers', '**', '*.controller.{js,ts}'),
      ],
    });
  }

  private config(): void {
    this.express.use(json());
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(compression());
  }

  public start(port: number): void {
    this.express.listen(port, () => console.log(`Server Up ${port}`));
  }
}

export default Server;
