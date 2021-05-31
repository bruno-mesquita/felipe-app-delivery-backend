import { EstablishmentOwner } from "@core/establishment-owner";
import { ServiceResponse } from "@shared/utils/service-response";

interface UpdateOwnerDto {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
}

export class UpdateOwnerProfileService {
  async execute(model: UpdateOwnerDto, id: number): Promise<ServiceResponse<boolean>> {
    try {
      const owner = await EstablishmentOwner.findOne({
        where: { id },
        attributes: ['id', 'first_name', 'last_name', 'email', 'cellphone', 'cpf']
      });

      if(!owner) throw new Error('Dono não encontrado');

      const { cpf, first_name, last_name, email } = model;

      owner.setFirstName(first_name);
      owner.setFirstName(last_name);
      owner.setEmail(email);
      owner.setCpf(cpf);

      return { err: null, result: true }
    } catch (err) {
      return { err: 'Erro ao atualizar', result: false }
    }
  }
}
