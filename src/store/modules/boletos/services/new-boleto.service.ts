import { EstablishmentOwner } from "@core/establishment-owner";
import { Ticket } from "@core/ticket";
import { ServiceResponse } from "@shared/utils/service-response";
import agiotaApi from '../../../services/agiota-api';

export class NewBoletoService {
  async execute(ownerId: number, boletoId: number): Promise<ServiceResponse<Ticket | null>> {
    try {
      const owner = await EstablishmentOwner.findOne({ where: { id: ownerId }, attributes: ['establishment_id'] });

      if(!owner) throw new Error('usuário não encontrado');

      const boleto = await Ticket.findOne({
        where: { id: boletoId, establishment_id: owner.establishment_id, status: 'cancelled' },
        attributes: ['id', 'price'],
      });

      if (!boleto) throw new Error ('Boleto não encontrado');

      const { data } = await agiotaApi.post(`/tickets/${boleto.id}/new`, {
        ownerId,
        total: boleto.price
      });

      return { result: data.result, err: null }
    } catch (err) {
      console.log(err);
      return { err: 'Erro', result: null }
    }
  }
};
