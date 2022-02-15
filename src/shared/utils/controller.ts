import { Response } from 'express';

import ApiError from './ApiError';

abstract class Controller {
  constructor(binds = []) {
    this.requestError = this.requestError.bind(this);

    binds.forEach(bind => this[bind] = this[bind].bind(this));
  }

  requestError(err: any, res: Response) {
    if(err instanceof ApiError) return res.status(err.statusCode).json(err);

      const error = ApiError.generateErrorUnknown();

      return res.status(error.statusCode).json(error);
  }
}

export default Controller;
