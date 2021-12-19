import { EstablishmentOwner } from "@core/establishment-owner";
import Establishment from "@core/establishment";
import ApiError from "@shared/utils/ApiError";

export class ListOwnerService {
  async execute(): Promise<EstablishmentOwner[]> {
    try {
      return await EstablishmentOwner.findAll({
        attributes: ['id', 'first_name', 'last_name', 'cellphone', 'active', 'email'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id', 'name', 'active'],
          },
        ],
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    };
  };
};
