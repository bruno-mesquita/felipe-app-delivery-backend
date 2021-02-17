/**

 * @fileoverview Criação de repositorio customizado para a entidade clientActivationCode

 *

 * @author Bruno Mesquita

 */

import { Client } from '@modules/client';

import { EntityRepository, Repository } from 'typeorm';

import ClientActivationCode from '../entity';

@EntityRepository(ClientActivationCode)
class ClientActivationCodeRepository extends Repository<ClientActivationCode> {
  createFromClient(clientt: Client): ClientActivationCode {
    return this.create({ client: clientt, attempts: 0 });
  }

  async findOneByClientId(clientId: string) {
    return this.findOne({ where: { client: clientId } });
  }
}

export default ClientActivationCodeRepository;
