import { Repository, EntityRepository } from 'typeorm';

import ClientActivationCode from '@core/client-activation-code';

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
}

export default ClientActivationCodeRepository;
