import Establishment from '@core/establishment';

import { ServiceResponse } from '@shared/utils/service-response';

export class ListEstablishmentService {
  async execute(): Promise<ServiceResponse<Establishment[]>> {
    try {
      const establishments = await Establishment.findAll({
        attributes: ['name', 'email', 'cellphone', 'openingTime', 'closingTime','freightValue', 'active'],
      });

      return { result: establishments, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

