import { Request, Response } from "express";
import { UpdateAdressService } from "./services/update-address.service";

export class AddressEstablishmentController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateAdressService = new UpdateAdressService();

      const addressEstablishment = await updateAdressService.execute({ ...req.body, id });

      if (addressEstablishment.err) throw new Error(addressEstablishment.err);

      return res.status(200).json(addressEstablishment);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
