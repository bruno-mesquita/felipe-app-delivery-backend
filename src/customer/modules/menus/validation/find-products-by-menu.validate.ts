import { number, object } from 'yup';

import yupWrapper from "@shared/utils/yup-wrapper";

import { IFindProductsByMenuDto } from '../dtos';

export const findProductsByMenuValidate = yupWrapper<IFindProductsByMenuDto>(object({
  id: number().positive().integer().required(),
  page: number().default(0).required(),
}))
