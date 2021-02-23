import { Repository, EntityRepository } from 'typeorm';

import ClientActivationCode from '@core/client-activation-code';
import Client from '@core/client';

@EntityRepository(ClientActivationCode)
class ClientActivationCodeRepository extends Repository<ClientActivationCode> {
  async findByClientId(clientId: string): Promise<ClientActivationCode | undefined> {
    try {
      return this.findOne({
        where: {
          client: clientId,
        },
      });
    } catch (err) {
      return undefined;
    }
  }

  createFromClient(client: Client) {
    return this.create({
      attempts: 0,
      client,
    });
  }
}

export default ClientActivationCodeRepository;
