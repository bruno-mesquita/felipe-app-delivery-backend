/**
 * @fileoverview Criação de repositorio customizado para a entidade clientActivationCode
 *
 * @author Bruno Mesquita
 */

import { EntityRepository, Repository } from 'typeorm';

import ClientActivationCode from '../entity';

@EntityRepository(ClientActivationCode)
class ClientActivationCodeRepository extends Repository<ClientActivationCode> {
  createFromClientId(clientId: string): ClientActivationCode {
    return (this.create({ client_id: clientId } as any) as unknown) as ClientActivationCode;
  }

  async findOneByClientId(clientId: string) {
    return this.findOne({ where: { client_id: clientId } });
  }
}

export default ClientActivationCodeRepository;
