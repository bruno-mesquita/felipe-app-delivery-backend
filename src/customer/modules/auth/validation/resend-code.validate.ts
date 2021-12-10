import { object, string } from 'yup';

import type { IResendCodeDto } from '../dtos/resend-code.dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const resendCodeValidate = yupWrapper<IResendCodeDto>(object().shape({
  cellphone: string().trim().required(),
  newCellphone: string().trim().nullable(true)
}));
