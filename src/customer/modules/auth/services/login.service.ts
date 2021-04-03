/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */


import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<ServiceResponse<{ token: string } | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const tokenManager = new TokenManager();

      // Procurar pelo e-mail e pegar o avatar desse cliente

      const client = await clientRepository.findOne({
        where: { email: loginDto.email },
        select: ['id', 'password'],
      });

      if (!client) throw new Error('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!client.comparePassword(loginDto.password)) {
        throw new Error('Credenciais inválidas');
      }

      // Criando token
      const token = tokenManager.create(client.getId());

      return {
        result: {
          token,
        },
        err: null,
      };
    } catch (err) {
      return { result: null, err: 'Erro no login' };
    }
  }
}

export { LoginClientService };
