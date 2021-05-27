import { EstablishmentOwner } from "@core/establishment-owner"

export class CreateOwnerService {
  async execute(model: any): Promise<any> {
    try {
      await EstablishmentOwner.create(model);

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: 'Erro ao criar dono' }
    }
  }
};
