import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import City from '@core/city';
import { EstablishmentOwner } from '@core/establishment-owner';
import State from '@core/state';
import EstablishmentCategory from '@core/establishment-category';
import ApiError from '@shared/utils/ApiError';

export class ProfileEstablishmentService {
  static FULL = [
    'name',
    'cellphone',
    'active',
    'openingTime',
    'closingTime',
    'freightValue',
    'address',
    'image',
    'categories',
  ];

  async execute(
    selects: string[],
    ownerId: number
  ): Promise<ServiceResponse<any>> {
    try {
      if (selects[0].toLowerCase() === 'full')
        selects = ProfileEstablishmentService.FULL;

      const defaultFieldExclude = ['createdAt', 'updatedAt'];

      const include = [];

      const includeAvatar = selects.find((item) => item === 'image');
      const includeAddress = selects.find((item) => item === 'address');
      const includeCategories = selects.find((item) => item === 'categories');

      if (includeAvatar) {
        include.push({
          model: Image,
          as: 'image',
          attributes: ['encoded'],
        });
        selects = selects.filter((item) => item !== 'image');
      }

      if (includeAddress) {
        include.push({
          model: AddressEstablishment,
          as: 'address',
          attributes: { exclude: defaultFieldExclude.concat('city_id') },
          include: [
            {
              model: City,
              as: 'city',
              attributes: ['id', 'name'],
              include: [
                {
                  model: State,
                  as: 'state',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        });
        selects = selects.filter((item) => item !== 'address');
      }

      if (includeCategories) {
        include.push({
          model: EstablishmentCategory,
          as: 'categories',
          attributes: ['category_id'],
        });

        selects = selects.filter((item) => item !== 'categories');
      }

      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId, active: true },
        include: [
          {
            model: Establishment,
            as: 'establishment',
            where: { active: true },
            attributes: ['id', ...selects],
            include,
          },
        ],
      });

      if (!owner) throw new ApiError('Estabelecimento não encontrado');

      const result: any = owner.get('establishment').toJSON();

      if (includeAvatar) result.image = result?.image?.encoded || null;
      if (includeCategories)
        result.categories = result.categories.map((e) => e.category_id);

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
