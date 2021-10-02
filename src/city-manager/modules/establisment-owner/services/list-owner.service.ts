import { ServiceResponse } from "@shared/utils/service-response";
import { EstablishmentOwner } from "@core/establishment-owner";
import Establishment from "@core/establishment";
import AddressEstablishment from "@core/address-establishment";

export class ListOwnerService {
  async execute(): Promise<ServiceResponse<EstablishmentOwner[]>> {
    try {
      const owner = await EstablishmentOwner.findAll({
        attributes: ['id', 'first_name', 'last_name', 'cellphone', 'active'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id', 'name', 'active'],
          },
        ],
      });

      return { result: owner, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    };
  };
};
