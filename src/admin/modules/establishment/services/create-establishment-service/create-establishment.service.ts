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

class CreateEstablishmentService {
  public async execute(establishmentProps: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const imageRepository = getCustomRepository(ImageRepository);
      const establishmentCategoryRepository = getCustomRepository(EstablishmentCategoryRepository);

      const emailExists = await establishmentRepository.findByEmail(establishmentProps.email);

      const cellphoneExists = await establishmentRepository.findByCellphone(establishmentProps.cellphone);

      // Fazendo Validação do DTO

      const valid = createEstablishmentSchema.isValidSync(establishmentProps);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Verificar se o email já existe

      if (emailExists) {
        throw new Error('Email já cadastrado.');
      }

      // Verificar se o contato já existe

      if (cellphoneExists) {
        throw new Error('Número de contato já cadastrado.');
      }

      // Verificando se as senhas são iguais

      if (establishmentProps.confirmPassword !== establishmentProps.password) {
        throw new Error('Senhas não são iguais.');
      }

      const category = await establishmentCategoryRepository.findOne(establishmentProps.category);

      if (!category) throw new Error('Categoria não encontrada');

      const image = imageRepository.create(establishmentProps.image);

      await imageRepository.save(image);

      // Criando a classe

      const establishment = establishmentRepository.create({ ...establishmentProps, image, category });

      // Salvando no db

      await establishmentRepository.save(establishment);

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateEstablishmentService;
