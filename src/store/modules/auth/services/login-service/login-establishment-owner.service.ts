import { EstablishmentOwner } from '@core/establishment-owner';
import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { LoginEstablishmentOwnerDto } from '../../dtos/login-establishment';
import { IEstablishmentAuth } from '../../dtos/login-token-dto';
import loginValidation from '../../validation/login-establishment.validation';

export class LoginEstablishmentOwnerService {
  async execute(loginEstablishment: LoginEstablishmentOwnerDto): Promise<ServiceResponse<IEstablishmentAuth | null>> {
    try {
      if (!loginValidation.isValidSync(loginEstablishment)) throw new Error('Dados inválidos.');

      const tokenManager = new TokenManager();

      const owner = await EstablishmentOwner.findOne({
        where: { email: loginEstablishment.email },
        attributes: ['password', 'id']
      });

      if (!owner) throw new Error('usuário não encontrado.');

      if (!owner.comparePassword(loginEstablishment.password)) throw new Error('Credenciais inválidas.');

      const token = tokenManager.create(owner.getId());
      const refreshToken = tokenManager.createRefreshToken(owner.getId());

      return { result: { token, refreshToken }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
