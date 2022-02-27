import { object, number } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import { IDeleteMenuDto } from '../dtos';

export const deleteMenuValidate = YupWrapper<IDeleteMenuDto>(
  object({
    id: number().integer().min(1).required(),
    establishmentId: number().integer().min(1).required(),
  })
);
