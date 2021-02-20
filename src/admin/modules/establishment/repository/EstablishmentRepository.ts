/**
 * @fileoverview Criação dos repositorios customizados do estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { EntityRepository, Repository } from 'typeorm';
import { EstablishmentToken } from '@core/establishment/establishment.token';

@EntityRepository(EstablishmentToken)
export class EstablishmentTokenRepository extends Repository<EstablishmentToken> {
  async findByToken(token: string): Promise<EstablishmentToken | undefined> {
    const establishmentToken = await this.findOne({
      where: {
        token,
      },
    });

    return establishmentToken;
  }

  async generate(establishment_id: string): Promise<EstablishmentToken> {
    const establishmentToken = await this.create({
      establishment_id,
    });

    await this.save(establishmentToken);

    return establishmentToken;
  }
}
