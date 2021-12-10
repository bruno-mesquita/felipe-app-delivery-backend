 import { object, number, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import { ActiveClientDto } from '../dtos/active-client.dto';

export const activateClientValidate = yupWrapper<ActiveClientDto>(object({
  userId: number().integer().min(1).required(),
  code: string().trim().required(),
}))
