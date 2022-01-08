import Establishment from "@core/establishment";
import EstablishmentCategory from "@core/establishment-category";
import { EstablishmentOwner } from "@core/establishment-owner";
import ApiError from "@shared/utils/ApiError";
import { ServiceResponse } from "@shared/utils/service-response";

export class AddEstablishmentCategoryService {
  async execute(ownerId: number, categoryId: number): Promise<ServiceResponse<boolean>> {
    try {
      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId },
        attributes: ['id', 'establishment_id'],
        include: [{
          model: Establishment,
          as: 'establishment',
          where: { active: true },
          attributes: ['id'],
        }]
      });

      if(!owner) throw new ApiError('Erro ao adicionar');

      const establishmentCategory = await EstablishmentCategory.findOne({
        where: {
          category_id: categoryId,
          establishment_id: owner.getEstablishmentId(),
        }
      });

      if(establishmentCategory) throw new ApiError('Erro ao adicionar');

      await EstablishmentCategory.create({
        category_id: categoryId,
        establishment_id: owner.getEstablishmentId(),
      });

      return { result: true, err: null }
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
};
