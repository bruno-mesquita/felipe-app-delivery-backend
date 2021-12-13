import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import { IListOrdersClient } from '../dtos';

export const listOrdersClientValidate = yupWrapper<IListOrdersClient>(object({
  clientId: number().integer().positive().required(),
  page: number().integer().positive().required(),
}))

