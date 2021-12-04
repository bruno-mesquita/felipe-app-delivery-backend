import server from './shared/http/server';
import Database from '@shared/database';

(async () => {
  const database = new Database();

  await database.init();

  server.listen(process.env.API_PORT || 3030, () => {
    console.log(`Server started ON! ${process.env.API_PORT || 3030}`);
  });
})()
