import { createConnection } from 'typeorm';

class Database {
  async connect(): Promise<boolean> {
    try {
      await createConnection();

      return true;
    } catch (err) {
      return false;
    }
  }
}

export default Database;
