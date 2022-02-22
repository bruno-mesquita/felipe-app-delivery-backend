import Database from '@shared/database';
import server from './shared/http/server';

const { API_PORT, NODE_ENV } = process.env;

(async () => {
  const database = new Database();

  await database.init();

  server.listen(API_PORT || 3030, () => {
    console.log(`Server started ON! ${API_PORT || 3030}`);
    console.log(`mode: ${NODE_ENV}`);
  });
})();
