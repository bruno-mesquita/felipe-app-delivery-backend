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
  createFromClient(client: Client): ClientActivationCode {
    return this.create({ client_id: client, attempts: 0 });
  }

  async findOneByClientId(clientId: string) {
    return this.findOne({ where: { client_id: clientId } });
  }
}

export default ClientActivationCodeRepository;
