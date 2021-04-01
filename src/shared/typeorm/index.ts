import { createConnection } from 'typeorm';

const connect = async () => {
  try {
    await createConnection();
  } catch (err) {
    console.log(`Erro ao se conectar ao database: ${err.message}`);
  }
};

connect();
