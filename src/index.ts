import server from './shared/http/server';
import Database from '@shared/database';

const { API_PORT, NODE_ENV } = process.env;

(async () => {
  const database = new Database();

  await database.init();

  server.listen(process.env.API_PORT || 3030, () => {
    console.log(`Server started ON! ${process.env.API_PORT || 3030}`);
    console.log(`mode: ${NODE_ENV}`);
  });
})()
