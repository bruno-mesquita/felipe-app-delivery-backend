/**
 * @fileoverview Criação do serviço para atualização do perfil do estabelecimento
 *
 * @author Jonatas Rosa Moura
 */
import { ServiceResponse } from '@shared/utils/service-response';
import Establishment from '@core/establishment';
import { UpdateEstablishmentDto } from '../../dtos/update-establishment-dto';
import updateEstablishmentValidation from '../../validation/update-establishment-validation';

class UpdateProfileEstablishmentService {
  async execute(updateEstablishmentDto: UpdateEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      // Validando dto
      const valid = updateEstablishmentValidation.isValidSync(updateEstablishmentDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o estabelecimento existe
      const establishment = await Establishment.findByPk(updateEstablishmentDto.id);

      if (!establishment) throw new Error('Estabelecimento não encontrado.');

      // Verificando Celular existente
      const cellphoneExists = await Establishment.findOne({
        where: { cellphone: updateEstablishmentDto.cellphone },
      });

      if (cellphoneExists) throw new Error('Celular/Telefone já cadastrado no sistema');

      // Verificando se ele está Ativo
      if (!establishment.isActive()) throw new Error('Esse estabelecimento não se encontra ativo');

      // Editando classe e salvando no DB
      const {
        name,
        cellphone,
        freightValue,
        openingTime,
        closingTime,
        active
      } = updateEstablishmentDto;

      establishment.updateProfile(
        name,
        cellphone,
        freightValue,
        openingTime,
        closingTime,
        active,
      );

      await establishment.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default UpdateProfileEstablishmentService;
