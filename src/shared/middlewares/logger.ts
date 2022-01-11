/**
 * @fileoverview Middleware para armazenar os logs
 */

import morgan from 'morgan';
import { resolve,  } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { format } from 'date-fns';

import JsonHandler from '../utils/json-handler';

const getIp = (req: any) => {
  return req.ip || req.ips || (req.socket && req.socket.remoteAddress) || undefined;
};

const loggerMiddleware = () => {
  return morgan((tokens, req, res) => {
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
      date: format(new Date(), 'dd/mm/yyyy HH:mm:MM'),
    };

    jsonHandler.add(result);

    return '';
  });
};

export default loggerMiddleware;
