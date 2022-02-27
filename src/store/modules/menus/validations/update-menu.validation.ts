import { object, string, number, boolean } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import type { IUpdateMenuDto } from '../dtos';

export const updateMenuValidate = YupWrapper<IUpdateMenuDto>(
  object({
    id: number().integer().positive().required(),
    name: string().trim(),
    establishmentId: number().integer().positive().required(),
    active: boolean(),
    priority: number().positive().integer().default(1),
  })
);
