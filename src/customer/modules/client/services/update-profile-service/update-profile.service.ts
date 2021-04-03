/**
 * @fileoverview Criação do serviço para atualização do perfil do usuário
 *
 * @author Bruno Mesquita
 */
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateClientDto } from '../../dtos/update-client-dto';
import updateClientValidation from '../../validation/update-client.validation';

class UpdateProfileService {
  async execute(updateClientDto: UpdateClientDto): Promise<ServiceResponse<boolean>> {
    try {
      const clientRepository = getCustomRepository(ClientRepository);

      // validando dto

      const valid = updateClientValidation.isValidSync(updateClientDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o usuário existe

      const user = await clientRepository.findById(updateClientDto.id);

      if (!user) throw new Error('Usuário não encontrado');

      if (!user.isActive()) throw new Error('Esse usuário não se encontra ativo');

      // Verificando se E-mail e Celular já existe no banco
      const userExists = await clientRepository.findOne({
        where: [
          { email: Not(In([user.getEmail()])) },
          { email: updateClientDto.email },
          { cellphone: Not(In([user.getCellphone()])) },
          { cellphone: updateClientDto.cellphone },
        ],
      });

      if (!userExists) throw new Error('Já existe uma conta com esse email/telefone ');

      /*  const userEmailExists = await clientRepository.findByEmail(updateClientDto.email);

      if (userEmailExists) throw new Error('Este email já está sendo usado.');

      const userCellphoneExists = await clientRepository.findByCellphone(updateClientDto.cellphone);

      if (userCellphoneExists) throw new Error('Este número de contato já está em uso'); */

      // Desestruturando
      const { cellphone, email, name } = updateClientDto;

      user.updateProfile(name, email, cellphone);

      await clientRepository.save(user);

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default UpdateProfileService;
