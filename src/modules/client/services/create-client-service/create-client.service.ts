/**
 * @fileoverview Criação do serviço responsavel pela criação do cliente
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';

import SmsService from '@modules/sms';

import ClientActivationCodeRepository from '@modules/client-activation-code/typeorm/repository';

import UserRepository from '../../typeorm/repository';

import { CreateClientDto } from '../../dtos/create-client-dto';

import createClientSchema from '../../validation/create-client.validation';

class CreateClientService {
  async execute(createClientDto: CreateClientDto): Promise<{ result: string; err: string | null }> {
    try {
      const smsService = new SmsService();

      const userRepository = getCustomRepository(UserRepository);

      const clientActivationCodeRepository = getCustomRepository(ClientActivationCodeRepository);

      // Verificando se as senhas são iguais

      if (createClientDto.confirmPassword !== createClientDto.password) throw new Error('Senhas não são iguais');

      // Fazendo Validação do DTO

      const valid = createClientSchema.isValidSync(createClientDto);

      if (!valid) throw new Error('Por favor reveja seus dados');

      // Verificando se já existe um cliente com esse cpf ou email

      const userExists = await userRepository.findOneByEmailOrCpf(createClientDto.email, createClientDto.cpf);

      if (userExists) throw new Error('Já existe um cliente cadastrado com esse email ou cpf');

      // Criando a classe
      const user = userRepository.create(createClientDto);

      // Salvando no db
      await userRepository.save(user);

      // Gerando codigo de ativação e Enviando sms de ativação
      const clientActivationCode = clientActivationCodeRepository.createFromClient(user);

      const sendResult = await smsService.send(user.cellphone, clientActivationCode.generateCode());

      if (!sendResult) {
        throw new Error('Houve um erro ao enviar o codigo, verifique o seu número de telefone e tente novamente');
      }

      // Salvando no db
      await clientActivationCodeRepository.save(clientActivationCode);

      return { result: user.getId(), err: null };
    } catch (err) {
      return { result: '', err: err.message };
    }
  }
}

export default CreateClientService;
