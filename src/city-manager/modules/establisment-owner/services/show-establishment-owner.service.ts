import { ServiceResponse } from "@shared/utils/service-response";
import { EstablishmentOwner } from "@core/establishment-owner";
import Establishment from "@core/establishment";
import AddressEstablishment from "@core/address-establishment";
import City from "@core/city";
import State from "@core/state";

export class ShowOwnerEstablishmentService {
  async execute(establishmentId: number): Promise<ServiceResponse<EstablishmentOwner>> {
    try {
      const ownerEstablishment = await EstablishmentOwner.findOne({
        attributes: ['id', 'first_name', 'last_name'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            where: { id: establishmentId },
            attributes: ['id', 'name', 'cellphone', 'active', 'evaluation'],
            include: [
              {
                model: AddressEstablishment,
                as: 'address',
                attributes: ['id', 'neighborhood', 'cep'],
                include: [
                  {
                    model: City,
                    as: 'city',
                    attributes: ['id', 'name'],
                    include: [
                      {
                        model: State,
                        as: 'state',
                        attributes: ['id', 'name'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!ownerEstablishment) throw new Error('Estabelecimento não encontrado');

      return { result: ownerEstablishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    };
  };
};
