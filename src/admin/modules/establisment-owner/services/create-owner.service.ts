import { EstablishmentOwner } from "@core/establishment-owner"

export class CreateOwnerService {
  async execute(model: any): Promise<any> {
    try {
      const owner = new EstablishmentOwner(model);

      owner.hashPassword();

      await owner.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: 'Erro ao criar dono' }
    }
  }
};
