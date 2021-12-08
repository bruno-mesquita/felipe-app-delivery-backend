import { ServiceResponse } from "@shared/utils/service-response";
import { EstablishmentOwner } from "@core/establishment-owner";
import Establishment from "@core/establishment";
import ApiError from "@shared/utils/ApiError";

export class UpdateOwnerService {
  async execute({ ownerId, establishment }: any): Promise<void> {
    try {
      // const owner = await EstablishmentOwner.findOne({
      //   where: { id: ownerId },
      //   attributes: ['id', 'active'],
      //   include: [
      //     {
      //       model: Establishment,
      //       as: 'establishment',
      //       attributes: ['id', 'name', 'active'],
      //       where: { id: establishmentId },
      //     },
      //   ],
      // });

      const entity = await Establishment.findByPk(establishment.id);

      if(!entity) throw new ApiError('Estabelecimento não encontrado');

      if(entity.isActive()) entity.deactivate();
      else entity.activate();

      console.log(entity.isActive());
      await entity.save();

    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro desconhecido', 'unknown');
    };
  };
};
