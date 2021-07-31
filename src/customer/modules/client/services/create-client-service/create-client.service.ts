/**
 * @fileoverview Criação do serviço responsavel pela criação do cliente
 *
 * @author Bruno Mesquita
 */

import { Op } from 'sequelize';

import { ServiceResponse } from '@shared/utils/service-response';
import { CreateClientDto } from '../../dtos/create-client-dto';
import createClientSchema from '../../validation/create-client.validation';
import Client from '@core/client';
import City from '@core/city';

const UNINFORMED = 'Não informado';

class CreateClientService {
  async execute(createClientDto: CreateClientDto): Promise<ServiceResponse<number | null>> {
    try {
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
      const user = new Client(createClientDto);

      user.hashPassword();

      await user.save();

      const city = await City.findOne({ where: { id: createClientDto.city } });

      if (!city) throw new Error('Cidade não encontrada');

      await user.createAdress({
        city_id: city.id,
        neighborhood: UNINFORMED,
        cep: UNINFORMED,
        street: UNINFORMED,
        number: UNINFORMED,
        nickname: 'Meu endereço',
        active: true,
      });

      return { result: user.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateClientService;
