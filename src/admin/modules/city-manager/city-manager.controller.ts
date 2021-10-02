import { Request, Response } from 'express';
import * as Yup from 'yup';

import {
  CreateCityManagerService,
  ListCityManaganersService,
  ShowCityManagerService,
  DeleteCityManagerService,
  UpdateCityManagerService,
} from './services';

const validateNumber = (value: number) => {
  try {
    return Yup.number().integer().isValidSync(value);
  } catch (err) {
    return false;
  }
}

export class CityManagerController {


  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } =req.params;

      const convertedPage = Number(page);

      const isValidPage = validateNumber(convertedPage);

      if(!isValidPage) throw new Error('Parametros incorretos');

      const listCityManaganersService = new ListCityManaganersService();

      const result = await listCityManaganersService.execute(convertedPage);

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(req.params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new Error('Parametros incorretos');

      const showCityManagerService = new ShowCityManagerService();

      const result = await showCityManagerService.execute(convertedId);

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createCityManagerService = new CreateCityManagerService();

      const result = await createCityManagerService.execute(req.body);

      if(result.err) throw new Error(result.err);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(req.params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new Error('Parametros incorretos');

      const deleteCityManagerService = new DeleteCityManagerService();

      const result = await deleteCityManagerService.execute(convertedId);

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(req.params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new Error('Parametros incorretos');

      const updateCityManagerService = new UpdateCityManagerService();

      const result = await updateCityManagerService.execute({ id: convertedId, ...req.body });

      if(result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  };
};
