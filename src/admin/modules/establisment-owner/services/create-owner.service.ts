import { Op } from "sequelize";

import { EstablishmentOwner } from "@core/establishment-owner";
import { ServiceResponse } from "@shared/utils/service-response";
import { CreateOwnerDto } from '../dtos/create-owner-dtos';
import { schema } from '../validations/create-owner.validation';
import Admin from "@core/admin";

export class CreateOwnerService {
  async execute(adminId: number, createOwnerDto: CreateOwnerDto): Promise<ServiceResponse<boolean>> {
    try {
      const validation = schema.isValidSync(createOwnerDto);

      if (!validation) throw new Error('Dados inválidos');

      const admin = await Admin.findOne({
        where: {
          id: adminId,
        },
      });

      if (!admin) throw new Error('Administrador não encontrado');

      const ownerExist = await EstablishmentOwner.findOne({
        where: {
          [Op.or]: [
            { email: createOwnerDto.email },
            { cpf: createOwnerDto.cpf },
          ],
        },
      });

      if (ownerExist) throw new Error('Usuário já existente no sistema');

      const owner = new EstablishmentOwner({
        ...createOwnerDto,
        first_name: createOwnerDto.firstName,
        last_name: createOwnerDto.lastName,
      });


      owner.hashPassword();

      await owner.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    };
  };
};
