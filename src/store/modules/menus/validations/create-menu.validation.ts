import { object, string, number, boolean } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import type { ICreateMenuDto } from '../dtos';

export const createMenuValidate = YupWrapper<ICreateMenuDto>(
  object().shape({
    name: string().trim().required(),
    establishmentId: number().integer().min(1).required(),
    active: boolean().default(true),
    priority: number().positive().integer().default(1),
  })
);
