import { createConnection } from 'typeorm';

import config from './ormconfig';

const connect = async () => {
  try {
    await createConnection(config);
  } catch (err) {
    console.log(`Erro ao se conectar ao database: ${err.message}`);
  }
};

connect();
