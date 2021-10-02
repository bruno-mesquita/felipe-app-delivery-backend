import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

import { UpdateDeliverymanDto } from '../dtos';
import { updateDeliverymanValidate } from '../validation';

export class UpdateDeliverymanService {
  async execute(model: UpdateDeliverymanDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = updateDeliverymanValidate.isValidSync(model);

      if(!valid) throw new Error('Erro de validação')

      const deliveryman = await Deliveryman.findOne({ where: { id: model.id } });

      if(!deliveryman) throw new Error('Motoboy não encontrado');

      deliveryman.setName(model.name);
      deliveryman.setCellphone(model.cellphone);
      deliveryman.setEntryDate(model.entry_date);
      deliveryman.setDepartureDate(model.departure_date);

      await deliveryman.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
