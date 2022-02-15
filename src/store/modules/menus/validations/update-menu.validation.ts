import { object, string, number, boolean } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import type { UpdateMenuDto } from '../dtos/update-menu.dto';

export const updateMenuValidate = YupWrapper<UpdateMenuDto>(object({
  id: number().integer().min(1).required(),
  name: string().trim().required(),
  establishmentId: number().integer().min(1).required(),
  active: boolean(),
}));
