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
import { CategoryRepository } from '../../../establishment-category/establishment-category.repository';
import { AddressRepository } from '../../../address/repository/address-repository';

class CreateEstablishmentService {
  public async execute(createEstablishmentDto: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const imageRepository = getCustomRepository(ImageRepository);
      const categoryRepository = getCustomRepository(CategoryRepository);
      const addressRepository = getCustomRepository(AddressRepository);

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

      const cityAddress = await addressRepository.findById(createEstablishmentDto.address.city);

      if (!cityAddress) throw new Error('Endereço/Cidade não encontrado.');

      const image = await imageRepository.findOne(createEstablishmentDto.image);

      // Verificando se a categoria existe

      const category = await categoryRepository.findOne({
        where: { id: createEstablishmentDto.category },
        relations: ['category_id'],
      });

      if (!category) throw new Error('Categoria não encontrada');

      const establishment = establishmentRepository.create({
        ...createEstablishmentDto,
        category, // só para não da erro, parei aqui
        image,
        address: cityAddress,
      });

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateEstablishmentService;
