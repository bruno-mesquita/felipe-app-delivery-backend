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

export class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      // validação
      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new Error('Dados invalidos');

      // Criar a imagem
      const image = imageRepository.create(createEstablishmentDto.image);

      await imageRepository.save(image);

      // Criar o endereço
      const city = await cityRepository.findById(createEstablishmentDto.address.city);

      if (!city) throw new Error('Cidade não encontrada');

      const address = addressRepository.create({
        ...createEstablishmentDto.address,
        city,
      });

      await addressRepository.save(address);

      // Criar o estabelecimento
      const { categories, ...establishmentDto } = createEstablishmentDto;

      const establishment = establishmentRepository.create({
        ...establishmentDto,
        address,
        image,
      });

      await establishmentRepository.save(establishment);

      // Criar categorias do estabelecimento
      for await (const categoryId of categories) { // eslint-disable-line
        const category = await categoryRepository.findOne({ where: { id: categoryId } });

        if (!category) throw new Error('Categoria não encontrada');

        const establishmentCategory = establishmentCategoryRepository.create({
          category,
          establishment,
        });

        await establishmentCategoryRepository.save(establishmentCategory);
      }

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
