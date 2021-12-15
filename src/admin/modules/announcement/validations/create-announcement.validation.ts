import { SchemaOf, object, string, boolean, number } from 'yup';

import { CreateAnnouncementDto } from '../dtos/create-announcement.dto';

export const createAnnouncementValidate: SchemaOf<CreateAnnouncementDto> = object({
  name: string().required(),
  active: boolean().required(),
  image: string().required(),
});
