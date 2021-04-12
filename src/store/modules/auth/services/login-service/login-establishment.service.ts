/**
 * @fileoverview Service de login do app do cliente
 */
import Establishment from '@core/establishment';
import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { LoginEstablishmentDto } from '../../dtos/login-establishment';
import { IEstablishmentAuth } from '../../dtos/login-token-dto';
import loginValidation from '../../validation/login-establishment.validation';

export class LoginEstablishmentLoginService {
  async execute(loginEstablishment: LoginEstablishmentDto): Promise<ServiceResponse<IEstablishmentAuth | null>> {
    try {
      if (!loginValidation.isValidSync(loginEstablishment)) throw new Error('Dados inválidos.');


      const tokenManager = new TokenManager();

      const establishment = await Establishment.findOne({
        where: { email: loginEstablishment.email }
      });

      if (!establishment) throw new Error('Estabelecimento não encontrado.');

      if (!establishment.comparePassword(loginEstablishment.password)) throw new Error('Credenciais inválidas.');

      const token = tokenManager.create(establishment.id);

      return { result: { token, establishment }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
