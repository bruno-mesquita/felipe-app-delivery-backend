import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import City from '@core/city';
import Category from '@core/category';
import EstablishmetCategory from '@core/establishment-category';
import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';
import createEstablishmentSchema from '../../validation/create-client.validation';
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';

export class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      // validação
      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new ApiError('Dados invalidos');

      const { address: addressDto, image: imageDto, categories, userId, ...rest } = createEstablishmentDto;

      // Verificando se o celular já existe
      const establishmentExists = await Establishment.findOne({
        where: { cellphone: rest.cellphone },
      });

      if (establishmentExists) throw new ApiError('Celular já cadastrado no sistema');

      const city = await City.findByPk(addressDto.city, {
        attributes: ['id'],
      });

      if (!city) throw new ApiError('Cidade não encontrada');

      const establishment = await Establishment.create(
        {
          ...rest,
          image: {
            encoded: imageDto,
            name: `${rest.name}-image`,
          },
          address: {
            ...addressDto,
            city_id: city.id,
          },
        },
        {
          include: [Establishment.associations.photo, Establishment.associations.address],
        }
      );

      // Criar categorias do estabelecimento
      for await (const categoryId of categories) { // eslint-disable-line
        const category = await Category.findOne({ where: { id: categoryId }, attributes: ['id'] });

        if (!category) throw new ApiError('Categoria não encontrada');

        await EstablishmetCategory.create({
          category_id: category.id,
          establishment_id: establishment.id,
        });
      }

      const owner = await EstablishmentOwner.findOne({
        where: { active: true, id: userId },
        attributes: ['id'],
      });

      if (!owner) throw new ApiError('Dono não encontrado');

      await owner.update({
        establishment_id: establishment.id,
      });
      return { result: establishment, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
