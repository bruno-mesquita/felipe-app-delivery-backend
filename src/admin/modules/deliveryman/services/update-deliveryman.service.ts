import Admin from "@core/admin";
import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

import { UpdateDeliverymanDto } from '../dtos';
import { updateDeliverymanValidate } from '../validation';

export class UpdateDeliverymanService {
  async execute(adminId: number, model: UpdateDeliverymanDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = updateDeliverymanValidate.isValidSync(model);

      if(!valid) throw new Error('Erro de validação')

      const admin = Admin.findOne({ where: { id: adminId }, attributes: ['id'] });

      if(!admin) throw new Error('usuário não encontrado');

      const deliveryman = await Deliveryman.findOne({ where: { id: model.id } });

      if(!deliveryman) throw new Error('Motoboy não encontrado');

      deliveryman.name = model.name;
      deliveryman.cellphone = model.cellphone;
      deliveryman.entry_date = model.entry_date;
      deliveryman.departure_date = model.departure_date;

      await deliveryman.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
