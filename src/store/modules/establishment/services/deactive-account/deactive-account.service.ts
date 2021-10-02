import Establishment from "@core/establishment";
import { ServiceResponse } from "@shared/utils/service-response";

export class DeactiveAccountService {
  async execute(id: number): Promise<ServiceResponse<boolean | null>> {
    try {
      const establishment = await Establishment.findOne({
        where: { id, active: true }
      });

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      establishment.deactivate();
      await establishment.save();

      return { result: true, err: null }
    } catch(err) {
      return { result: null, err: err.message };
    }
  }
}
