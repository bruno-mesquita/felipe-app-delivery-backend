/**
 * @fileoverview Criação do serviço responsavel pela criação do cliente
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';

import SmsService from '@shared/utils/sms';

import { ServiceResponse } from '@shared/utils/service-response';
import { ClientActivationCodeRepository } from '../../../client-activation-code';
import { AddressClientRepository } from '../../../address-client';
import { AddressRepository } from '../../../address';
import { CityRepository } from '../../../city';
import UserRepository from '../../client.repository';
import { CreateClientDto } from '../../dtos/create-client-dto';
import createClientSchema from '../../validation/create-client.validation';

class CreateClientService {
  async execute(createClientDto: CreateClientDto): Promise<ServiceResponse<string | null>> {
    try {
      const smsService = new SmsService();
      const cityRepository = getCustomRepository(CityRepository);
      const userRepository = getCustomRepository(UserRepository);
      const addressRepository = getCustomRepository(AddressRepository);
      const addressClientRepository = getCustomRepository(AddressClientRepository);
      const clientActivationCodeRepository = getCustomRepository(ClientActivationCodeRepository);

      // Verificando se as senhas são iguais
      if (createClientDto.confirmPassword !== createClientDto.password) throw new Error('Senhas não são iguais');

      // Fazendo Validação do DTO
      const valid = createClientSchema.isValidSync(createClientDto);

      if (!valid) throw new Error('Por favor reveja seus dados');

      // Verificando se já existe um cliente com esse cpf
      const userCpfExists = await userRepository.findByCpf(createClientDto.cpf);

      if (userCpfExists) throw new Error('Já existe um cliente cadastrado com esse cpf');

      // Verificando se já existe um cliente com esse email
      const userEmailExists = await userRepository.findByEmail(createClientDto.email);

      if (userEmailExists) throw new Error('Já existe um cliente cadastrado com esse email');

      // Criando a classe
      const user = userRepository.create(createClientDto);

      // Salvando no db
      await userRepository.save(user);

      const city = await cityRepository.findById(createClientDto.city);

      if (!city) throw new Error('Cidade não encontrada');

      const address = addressRepository.create({ city });

      await addressRepository.save(address);

      const addressClient = addressClientRepository.create({
        address_id: address,
        client_id: user,
      });

      await addressClientRepository.save(addressClient);

      // Gerando codigo de ativação e Enviando sms de ativação
      const clientActivationCode = clientActivationCodeRepository.createFromClient(user);

      const sendResult = await smsService.send(user.cellphone, clientActivationCode.generateCode());

      if (!sendResult) {
        throw new Error('Houve um erro ao enviar o codigo, verifique o seu número de telefone e tente novamente');
      }

      // Salvando no db
      await clientActivationCodeRepository.save(clientActivationCode);

      return { result: user.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateClientService;
