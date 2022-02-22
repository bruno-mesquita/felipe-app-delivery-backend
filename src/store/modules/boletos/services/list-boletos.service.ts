import { Ticket } from '@core/ticket';
import { ServiceResponse } from '@shared/utils/service-response';
import { createPagination } from '@shared/utils/use-page';

export class ListBoletosService {
  async execute(
    establishmentId: number,
    page = 0
  ): Promise<ServiceResponse<Ticket[]>> {
    try {
      const { limit, offset } = createPagination(page);

      const boletos = await Ticket.findAll({
        where: { establishment_id: establishmentId },
        attributes: [
          'id',
          'barcode',
          'price',
          'status',
          'date_of_expiration',
          'link',
        ],
        limit,
        offset,
      });

      return { result: boletos, err: null };
    } catch (err) {
      return { err: 'Erro', result: [] };
    }
  }
}
