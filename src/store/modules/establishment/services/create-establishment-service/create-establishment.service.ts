import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';
import createEstablishmentSchema from '../../validation/create-client.validation';
import Image from '@core/image';
import City from '@core/city';
import AddressEstablishment from '@core/address-establishment';
import Category from '@core/category';
import EstablishmetCategory from '@core/establishment-category';
import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';

export class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      // validação
      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new ApiError('Dados invalidos');

      // Verificando se o celular já existe
      const establishmentExists = await Establishment.findOne({
        where: { cellphone: createEstablishmentDto.cellphone },
      });

      if (establishmentExists) throw new ApiError('Celular já cadastrado no sistema');

      // Criar o endereço
      const city = await City.findByPk(createEstablishmentDto.address.city);

      if (!city) throw new ApiError('Cidade não encontrada');

      const address = await AddressEstablishment.create({
        ...createEstablishmentDto.address,
        city_id: city.getId(),
      });

      // Criar a imagem
      const image = await Image.create({ encoded: createEstablishmentDto.image, name: `${createEstablishmentDto.name}-image` });

      // Criar o estabelecimento
      const { categories, ...establishmentDto } = createEstablishmentDto;

      delete establishmentDto.address;
      delete establishmentDto.image;

      const establishment = await Establishment.create({
        ...establishmentDto,
        address_id: address.getId(),
        image_id: image.getId(),
      });

      // Criar categorias do estabelecimento
      for await (const categoryId of categories) { // eslint-disable-line
        const category = await Category.findOne({ where: { id: categoryId } });

        if (!category) throw new ApiError('Categoria não encontrada');

        await EstablishmetCategory.create({
          category_id: category.getId(),
          establishment_id: establishment.getId(),
        });
      }

      const owner = await EstablishmentOwner.findOne({ where: { active: true, id: createEstablishmentDto.userId } });

      if(!owner) throw new ApiError('Dono não encontrado');

      owner.setEstablishmentId(establishment.getId());

      await owner.save();

      return { result: establishment, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
