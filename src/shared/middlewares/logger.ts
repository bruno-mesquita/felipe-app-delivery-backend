/**

 * @fileoverview Middleware para armazenar os logs

 *

 * @author Bruno Mesquita

 */

import morgan from 'morgan';

import { resolve } from 'path';

import { existsSync, mkdirSync } from 'fs';

import { format } from 'date-fns';

import JsonHandler from '../utils/json-handler';

const getNow = () => format(new Date(), 'dd/mm/yyyy HH:mm:MM');

const getIp = (req: any) => {
  return req.ip || req.remoteAddress || (req.connection && req.connection.remoteAddress) || undefined;
};

const loggerMiddleware = () => {
  return morgan((tokens, req, res) => {
    const pathRoot = resolve(__dirname, '..', '..', '..', '..', 'logs');

    if (!existsSync(pathRoot)) mkdirSync(pathRoot);

    const jsonHandler = new JsonHandler(resolve(pathRoot, `requests-${tokens.status(req, res)}.json`));

    const result = {
      ip: getIp(req),

      method: tokens.method(req, res),

      url: tokens.url(req, res),

      status: tokens.status(req, res),

      contentLength: tokens.res(req, res, 'content-length'),

      responseTime: `${tokens['response-time'](req, res)} ms`,

      date: getNow(),
    };

    jsonHandler.add(result);

    return '';
  });
};

export default loggerMiddleware;
