import { EstablishmentOwner } from "@core/establishment-owner";
import { Ticket } from "@core/ticket";
import ApiError from "@shared/utils/ApiError";
import { ServiceResponse } from "@shared/utils/service-response";
import agiotaApi from '../../../services/agiota-api';

export class NewBoletoService {
  async execute(owner: EstablishmentOwner, boletoId: number): Promise<ServiceResponse<Ticket | null>> {
    try {
      const boleto = await Ticket.findOne({
        where: { id: boletoId, establishment_id: owner.establishment_id, status: 'cancelled' },
        attributes: ['id', 'price'],
      });

      if (!boleto) throw new ApiError ('Boleto não encontrado');

      const { data } = await agiotaApi.post(`/tickets/${boleto.getId()}/new`, {
        ownerId: owner.getId(),
        total: boleto.get('price')
      });

      return { result: data.result, err: null }
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
};
