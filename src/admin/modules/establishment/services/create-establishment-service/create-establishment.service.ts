/**
 * @fileoverview Casos de testes para a criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import Establishment from 'src/core/establishment';

import { ServiceResponse } from '@shared/utils/service-response';
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';
import createEstablishmentSchema from '../../validation/create-client.validation';
import Image from '@core/image';
import City from '@core/city';
import { AddressEstablishment } from '@core/address-establishment';
import Category from '@core/category';

export class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      // validação
      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new Error('Dados invalidos');

      // Criar a imagem
      const image = await Image.create(createEstablishmentDto.image);

      // Criar o endereço
      const city = await City.findByPk(createEstablishmentDto.address.city);

      if (!city) throw new Error('Cidade não encontrada');

      const address = await AddressEstablishment.create({
        ...createEstablishmentDto.address,
        city,
      });

      // Criar o estabelecimento
      const { categories, ...establishmentDto } = createEstablishmentDto;

      const establishment = await Establishment.create({
        ...establishmentDto,
        address,
        image,
      });

      // Criar categorias do estabelecimento

      for await (const categoryId of categories) { // eslint-disable-line
        const category = await Category.findOne({ where: { id: categoryId } });

        if (!category) throw new Error('Categoria não encontrada');

        await Category.create({
          category,
          establishment,
        });
      }

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
