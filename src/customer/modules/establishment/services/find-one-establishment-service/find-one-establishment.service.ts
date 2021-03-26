import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import EstablishmentRepository from '../../establishment.repository';

export class FindOneEstablishmentService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      const establishment = await establishmentRepository.findOne({
        where: { id, active: true },
        select: ['menus', 'image', 'id', 'name', 'freightValue'],
        relations: ['menus', 'image'],
      });

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const result = {
        id: establishment.getId(),
        name: establishment.getName(),
        freightValue: establishment.getFreightValue(),
        image: establishment.getImage().getEncoded(),
        menus: establishment.getMenus().map((menu) => ({ id: menu.getId(), name: menu.getName() })),
        isOpen: establishment.isOpen(),
      };

      return { result, err: null };
    } catch (err) {
      return { result: [null], err: err.message };
    }
  }
}
