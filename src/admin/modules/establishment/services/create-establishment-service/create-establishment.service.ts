/**
 * @fileoverview Casos de testes para a criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';
import createEstablishmentSchema from '../../validation/create-client.validation';
import Image from '@core/image';
import City from '@core/city';
import AddressEstablishment from '@core/address-establishment';
import Category from '@core/category';
import EstablishmetCategory from '@core/establishment-category';

export class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      // validação
      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new Error('Dados invalidos');

      // Verificando se o email existe
      const email = await Establishment.findOne({
        where: { email: createEstablishmentDto.email },
      });

      if (email) throw new Error('E-mail já cadastrado no sistema');

      // Verificando se o celular já existe
      const cellphone = await Establishment.findOne({
        where: { cellphone: createEstablishmentDto.cellphone },
      });

      if (cellphone) throw new Error('Celular já cadastrado no sistema');

      // Criar o endereço
      const city = await City.findByPk(createEstablishmentDto.address.city);

      if (!city) throw new Error('Cidade não encontrada');

      const address = await AddressEstablishment.create({
        ...createEstablishmentDto.address,
        city_id: city.id,
      });


      // Criar a imagem
      const image = await Image.create(createEstablishmentDto.image);

      // Criar o estabelecimento
      const { categories, ...establishmentDto } = createEstablishmentDto;



      delete establishmentDto.address;
      delete establishmentDto.image;

      const establishment = await Establishment.create({
        ...establishmentDto,
        address_id: address.id,
        image_id: image.id,
      });

      // Criar categorias do estabelecimento

      for await (const categoryId of categories) { // eslint-disable-line
        const category = await Category.findOne({ where: { id: categoryId } });

        if (!category) throw new Error('Categoria não encontrada');

        await EstablishmetCategory.create({
          category_id: category.id,
          establishment_id: establishment.id,
        });
      }

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
