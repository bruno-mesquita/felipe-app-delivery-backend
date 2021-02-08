import 'reflect-metadata';
import '@config/env';

import Server from './server';
import Database from '../database';

const main = async () => {
  const server = new Server();

  await import('../services/tsyringe');

  /* const database = new Database();
  await database.connect(); */

  server.start(3030);
};

main();
