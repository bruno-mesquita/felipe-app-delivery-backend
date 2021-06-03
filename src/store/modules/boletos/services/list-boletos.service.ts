import { EstablishmentOwner } from "@core/establishment-owner";
import { Ticket } from "@core/ticket";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListBoletosService {
  static LIMIT = 15

  async execute(ownerId: number, page = 0): Promise<ServiceResponse<Ticket[]>> {
    try {
      const limit = ListBoletosService.LIMIT;
      const offset = ListBoletosService.LIMIT * page;

      const owner = await EstablishmentOwner.findOne({ where: { id: ownerId }, attributes: ['establishment_id'] });

      if(!owner) throw new Error('usuário não encontrado');

      const boletos = await Ticket.findAll({
        where: { establishment_id: owner.establishment_id },
        attributes: ['id', 'barcode', 'price', 'status', 'date_of_expiration', 'link'],
        limit,
        offset,
      });

      return { result: boletos, err: null }
    } catch (err) {
      return { err: 'Erro', result: [] }
    }
  }
};
