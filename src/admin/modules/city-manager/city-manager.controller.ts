import ApiError from '@shared/utils/ApiError';
import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import {
  CreateCityManagerService,
  ListCityManaganersService,
  DeleteCityManagerService,
  UpdateCityManagerService,
} from './services';

const validateString = (value: string) => {
  try {
    return Yup.string().isValidSync(value);
  } catch (err) {
    return false;
  }
}

export class CityManagerController extends Controller {
  private readonly createCityManagerService: CreateCityManagerService;
  private readonly listCityManaganersService: ListCityManaganersService;
  private readonly deleteCityManagerService: DeleteCityManagerService;
  private readonly updateCityManagerService: UpdateCityManagerService;

  constructor() {
    super();

    this.createCityManagerService = new CreateCityManagerService();
    this.listCityManaganersService = new ListCityManaganersService();
    this.deleteCityManagerService = new DeleteCityManagerService();
    this.updateCityManagerService = new UpdateCityManagerService();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }

  async list({ query }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = query;

      const convertedPage = Number(page);

      return res.json(await this.listCityManaganersService.execute(convertedPage));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      await this.createCityManagerService.execute(body);

      return res.status(201).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async destroy({ params }: Request, res: Response): Promise<Response> {
    try {
      const isValidId = validateString(params.id);

      if(!isValidId) throw new ApiError('Parametros incorretos');

      return res.json(await this.deleteCityManagerService.execute(params.id));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      const isValidId = validateString(params.id);

      if(!isValidId) throw new ApiError('Parametros incorretos');

      await this.updateCityManagerService.execute({ id: params.id, ...body });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  };
};
