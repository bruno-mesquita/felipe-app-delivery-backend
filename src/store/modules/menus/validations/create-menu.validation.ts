import { object, string, number, boolean } from 'yup';

import YupWrapper from '@shared/utils/yup-wrapper';
import type { CreateMenuDto } from '../dtos/create-menu.dtos';

export const createMenuValidate = YupWrapper<CreateMenuDto>(object().shape({
  name: string().trim().required(),
  establishmentId: number().integer().min(1).required(),
  active: boolean().default(true),
}))
