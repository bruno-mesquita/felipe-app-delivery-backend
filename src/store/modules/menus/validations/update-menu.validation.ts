import { object, string, number, boolean } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import type { UpdateMenuDto } from '../dtos/update-menu.dto';

export const updateMenuValidate = YupWrapper<UpdateMenuDto>(object({
  id: number().integer().positive().required(),
  name: string().trim(),
  establishmentId: number().integer().positive().required(),
  active: boolean(),
}));
