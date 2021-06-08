import Admin from "@core/admin";
import { Deliveryman } from "@core/deliveryman";
import { ServiceResponse } from "@shared/utils/service-response";

import { CreateDeliverymanDto } from '../dtos';
import { createDeliverymanValidate } from '../validation';

export class CreateDeliverymanService {
  async execute(adminId: number, model: CreateDeliverymanDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = createDeliverymanValidate.isValidSync(model);

      if(!valid) throw new Error('Erro de validação')

      const admin = Admin.findOne({ where: { id:  adminId }, attributes: ['id'] });

      if(!admin) throw new Error('usuário não encontrado');

      await Deliveryman.create(model);

      return { err: null, result: true };
    } catch (err) {
      return { err: err.messagee, result: false };
    }
  }
}
