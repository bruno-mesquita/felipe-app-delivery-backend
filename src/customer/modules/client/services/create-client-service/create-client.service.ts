/**
 * @fileoverview Criação do serviço responsavel pela criação do cliente
 *
 * @author Bruno Mesquita
 */

import { Op } from 'sequelize';

import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateClientDto } from '../../dtos/create-client-dto';
import Client from '@core/client';
import City from '@core/city';
import AddressClient from '@core/address-client';

const UNINFORMED = 'Não informado';

class CreateClientService {
  async execute(createClientDto: CreateClientDto): Promise<ServiceResponse<{ userId: number } | null>> {
    try {
      // Verificando se as senhas são iguais
      if (createClientDto.confirmPassword !== createClientDto.password) throw new ApiError('Senhas não são iguais', 'validate');

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

      if(userExists) throw new ApiError('Já existe um usuário cadastrado com esses dados');

      // Criando a classe
      const user = Client.build(createClientDto);

      user.hashPassword();

      await user.save();

      const city = await City.findOne({ where: { id: createClientDto.city } });

      if (!city) throw new ApiError('Cidade não encontrada');

      await AddressClient.create({
        city_id: city.getId(),
        client_id: user.getId(),
        neighborhood: UNINFORMED,
        cep: UNINFORMED,
        street: UNINFORMED,
        number: UNINFORMED,
        nickname: 'Meu endereço',
        active: true,
      });

      return { result: { userId: user.getId() }, err: null };
    } catch (err) {
      if(err instanceof ApiError) {
        throw err;
      }

      throw new ApiError('Erro desconhecido', 'unknown', 500);
    }
  }
}

export default CreateClientService;
