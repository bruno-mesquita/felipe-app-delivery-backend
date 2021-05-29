import { EstablishmentOwner } from "@core/establishment-owner";
import { ServiceResponse } from "@shared/utils/service-response";

export class ExistsEstablishmentService {
  async execute(ownerId: number): Promise<ServiceResponse<boolean>> {
    try {
      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId },
        attributes: ['establishment_id'],
      });

      return { result: !!owner.establishment_id, err: null };
    } catch (err) {
      return { err: 'Erro ao buscar', result: false }
    }
  }
};
