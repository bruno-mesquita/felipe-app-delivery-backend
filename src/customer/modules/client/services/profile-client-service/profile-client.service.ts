import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import Image from '@core/image';

import ApiError from '@shared/utils/ApiError';
import type { IProfileClientDto } from '../../dtos';

export default class ProfileClientService {
  async execute({
    selects,
    id,
  }: IProfileClientDto): Promise<ServiceResponse<any>> {
    try {
      const include = [];

      const includeAvatar = selects.find((item) => item === 'avatar');

      if (includeAvatar) {
        include.push({
          model: Image,
          as: 'avatar',
          attributes: ['name', 'encoded'],
        });
        selects = selects.filter((item) => item !== 'avatar');
      }

      const client = await Client.findOne({
        where: { id, active: true },
        attributes: selects,
        include,
      });

      if (!client) throw new ApiError('Cliente não encontrado');

      const result = client.toJSON();

      if (includeAvatar) {
        result.avatar = result?.avatar?.encoded || null;
      }

      return {
        result,
        err: null,
      };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
