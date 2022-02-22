import { object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { IResendCodeDto } from '../dtos/resend-code.dto';

export const resendCodeValidate = yupWrapper<IResendCodeDto>(
  object().shape({
    cellphone: string().trim().required(),
    newCellphone: string().trim().nullable(true),
  })
);
