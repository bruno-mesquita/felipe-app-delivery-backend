/**
 * @fileoverview Casos de testes para a criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import Establishment from 'src/core/establishment';

import { ServiceResponse } from '@shared/utils/service-response';
import { EstablishmentRepository } from '../../repository';
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';
import createEstablishmentSchema from '../../validation/create-client.validation';
import ImageRepository from '../../../image/image.repository';
import EstablishmentCategoryRepository from '../../../establishment-category/establishment-category.repository';
import { AddressCityRepository } from '../../../address/repository/CityRepository';

class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const imageRepository = getCustomRepository(ImageRepository);
      const establishmentCategoryRepository = getCustomRepository(EstablishmentCategoryRepository);
      const addressCityRepository = getCustomRepository(AddressCityRepository);

      // Fazendo Validação do DTO

      const valid = createEstablishmentSchema.isValidSync(createEstablishmentDto);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificar se o email já existe

      const emailExists = await establishmentRepository.findByEmail(createEstablishmentDto.email);

      if (emailExists) {
        throw new Error('Email já cadastrado.');
      }

      // Verificando se as senhas são iguais

      if (createEstablishmentDto.confirmPassword !== createEstablishmentDto.password) {
        throw new Error('Senhas não são iguais.');
      }

      // Verificar se o contato já existe

      const cellphoneExists = await establishmentRepository.findByCellphone(createEstablishmentDto.cellphone);

      if (cellphoneExists) {
        throw new Error('Número de contato já cadastrado.');
      }

      // Verificando se a cidade existe

      const city = await addressCityRepository.findById(createEstablishmentDto.city);

      if (!city) throw new Error('Cidade não existe');

      // Verificando se a categoria existe

      const category = await establishmentCategoryRepository.findOne(createEstablishmentDto.category);

      if (!category) throw new Error('Categoria não encontrada');

      // Image do Perfil do Estabelecimento

      const image = imageRepository.create(createEstablishmentDto.image);

      await imageRepository.save(image);

      // Criando a classe

      const establishment = establishmentRepository.create({
        ...createEstablishmentDto,
        address: city,
        category,
        image,
      });

      // Salvando no db

      await establishmentRepository.save(establishment);

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateEstablishmentService;
