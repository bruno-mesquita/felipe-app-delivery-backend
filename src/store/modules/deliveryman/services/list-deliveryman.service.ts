import AddressEstablishment from '@core/address-establishment';
import { Deliveryman } from '@core/deliveryman';
import Establishment from '@core/establishment';
import ApiError from '@shared/utils/ApiError';
import { createPagination } from '@shared/utils/use-page';

import { IListDeliverymanDto } from '../dtos';

export class ListDeliverymanService {
  async execute({
    page,
    establishmentId,
  }: IListDeliverymanDto): Promise<Deliveryman[]> {
    try {
      const { limit, offset } = createPagination(page);

      const cityId = (
        await Establishment.findOne({
          where: { id: establishmentId },
          attributes: ['address_id'],
          include: {
            model: AddressEstablishment,
            as: 'address',
            attributes: ['city_id'],
          },
        })
      )
        .getDataValue('address')
        .getCityId();

      const data = await Deliveryman.findAll({
        where: { city_id: cityId },
        limit,
        offset,
      });

      return data;
    } catch (err) {
      ApiError.verifyType(err);
      console.log(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
