/**
 * @fileoverview Criação do serviço responsavel pela criação do cliente
 *
 * @author Bruno Mesquita
 */

import { Op } from 'sequelize';

import SmsService from '@shared/utils/sms';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateClientDto } from '../../dtos/create-client-dto';
import createClientSchema from '../../validation/create-client.validation';
import Client from '@core/client';
import City from '@core/city';
import AddressClient from '@core/address-client';
import ClientActivationCode from '@core/client-activation-code';

const UNINFORMED = 'Não informado';

class CreateClientService {
  async execute(createClientDto: CreateClientDto): Promise<ServiceResponse<number | null>> {
    try {
      const smsService = new SmsService();

      // Fazendo Validação do DTO
      const valid = createClientSchema.isValidSync(createClientDto);

      if (!valid) throw new Error('Por favor reveja seus dados');

      // Verificando se as senhas são iguais
      if (createClientDto.confirmPassword !== createClientDto.password) throw new Error('Senhas não são iguais');

      // Verificando se já existe um cliente com esse cpf
      const userExists = await Client.findOne({
        where: {
          [Op.or]: [
            { cpf: createClientDto.cpf },
            { email: createClientDto.email },
            { cellphone: createClientDto.cellphone },
          ]
        },
        attributes: { exclude: ['password'] },
      });

      if(userExists) throw new Error('Já existe um usuário cadastrado com esses dados');

      // Criando a classe
      const user = await Client.create(createClientDto);

      const city = await City.findOne({ where: { id: createClientDto.city } });

      if (!city) throw new Error('Cidade não encontrada');

      await AddressClient.create({
        city_id: city.id,
        neighborhood: UNINFORMED,
        cep: UNINFORMED,
        street: UNINFORMED,
        number: UNINFORMED,
        nickname: 'Meu endereço',
        active: true,
        client_id: user.id
      });


      // Gerando codigo de ativação e Enviando sms de ativação
      const clientActivationCode = await ClientActivationCode.create({ client_id: user.id, attemps: 0, code: 'code1' });

      const sendResult = await smsService.send(user.cellphone, clientActivationCode.code);

      if (!sendResult) {
        throw new Error('Houve um erro ao enviar o codigo, verifique o seu número de telefone e tente novamente');
      }

      return { result: user.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateClientService;
