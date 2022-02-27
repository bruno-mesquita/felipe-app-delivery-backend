import { object, number } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import { IFindOneMenuDto } from '../dtos';

export const findOneMenuValidate = YupWrapper<IFindOneMenuDto>(
  object({
    id: number().integer().min(1).required(),
    establishmentId: number().integer().min(1).required(),
  })
);
