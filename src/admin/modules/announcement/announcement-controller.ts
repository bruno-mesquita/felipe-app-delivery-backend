import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';
import {
  CreateAnnouncementService,
  ShowAnnouncementService,
  ListAnnouncementService,
  UpdateProductService,
  DeleteAnnouncementService
} from './services';

export class AnnouncementController extends Controller {
  private readonly createAnnouncementService: CreateAnnouncementService;
  private readonly showAnnouncementService: ShowAnnouncementService;
  private readonly listAnnouncementService: ListAnnouncementService;
  private readonly updateProductService: UpdateProductService;
  private readonly deleteAnnouncementService: DeleteAnnouncementService;

  constructor() {
    super();

    this.createAnnouncementService = new CreateAnnouncementService();
    this.showAnnouncementService = new ShowAnnouncementService();
    this.listAnnouncementService = new ListAnnouncementService();
    this.updateProductService = new UpdateProductService();
    this.deleteAnnouncementService = new DeleteAnnouncementService();

    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(await this.createAnnouncementService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      return res.json(await this.showAnnouncementService.execute(Number(id)));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listAnnouncementService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const id = Number(params.id);

      await this.updateProductService.execute({ ...body, id });

      return res.json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async delete({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      return res.json(await this.deleteAnnouncementService.execute(Number(id)));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
