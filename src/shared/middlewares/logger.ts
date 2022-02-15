import type { IncomingMessage } from 'http';
import type { Request } from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { format } from 'date-fns';

import JsonHandler from '../utils/json-handler';

const getIp = (req: IncomingMessage & Request) => {
  return req.ip || req.ips || (req.socket && req.socket.remoteAddress) || undefined;
};

const loggerMiddleware = () => {
  return morgan((tokens, req, res) => {
    const status = tokens.status(req, res);

    if(Number(status) >= 400) {
      const pathRoot = resolve(__dirname, '..', '..', '..', 'logs');

      if (!existsSync(pathRoot)) mkdirSync(pathRoot);
  
      const jsonHandler = new JsonHandler(resolve(pathRoot, `requests-${tokens.status(req, res)}.json`));
      const result = {
        ip: getIp(req as any),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        responseTime: `${tokens['response-time'](req, res)} ms`,
        date: format(new Date(), 'dd/MM/yyyy HH:mm'),
      };
  
      jsonHandler.add(result);
    }

    return '';
  });
};

export default loggerMiddleware;
