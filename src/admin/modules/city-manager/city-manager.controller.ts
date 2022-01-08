import ApiError from '@shared/utils/ApiError';
import Controller from '@shared/utils/controller';
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

export class CityManagerController extends Controller {
  private readonly createCityManagerService: CreateCityManagerService;
  private readonly listCityManaganersService: ListCityManaganersService;
  private readonly showCityManagerService: ShowCityManagerService;
  private readonly deleteCityManagerService: DeleteCityManagerService;
  private readonly updateCityManagerService: UpdateCityManagerService;

  constructor() {
    super();

    this.createCityManagerService = new CreateCityManagerService();
    this.listCityManaganersService = new ListCityManaganersService();
    this.showCityManagerService = new ShowCityManagerService();
    this.deleteCityManagerService = new DeleteCityManagerService();
    this.updateCityManagerService = new UpdateCityManagerService();

    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }

  async list({ params }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = params;

      const convertedPage = Number(page);

      const isValidPage = validateNumber(convertedPage);

      if(!isValidPage) throw new ApiError('Parametros incorretos');

      return res.json(await this.listCityManaganersService.execute(convertedPage));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new ApiError('Parametros incorretos');

      return res.json(await this.showCityManagerService.execute(convertedId));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createCityManagerService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async destroy({ params }: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new ApiError('Parametros incorretos');

      return res.json(await this.deleteCityManagerService.execute(convertedId));
    } catch (err) {
      return this.requestError(err, res);
    }
  };

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      const convertedId = Number(params.id);

      const isValidId = validateNumber(convertedId);

      if(!isValidId) throw new ApiError('Parametros incorretos');

      return res.json(await this.updateCityManagerService.execute({ id: convertedId, ...body }));
    } catch (err) {
      return this.requestError(err, res);
    }
  };
};
