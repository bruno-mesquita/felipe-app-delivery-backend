import { SchemaOf, object, string, boolean, number } from 'yup';

import { UpdateAnnouncementDto } from '../dtos/update-announcement.dto';

export const updateAnnouncementValidate: SchemaOf<UpdateAnnouncementDto> =
  object({
    id: number().integer().required(),
    name: string().required(),
    active: boolean().required(),
    image: string().optional(),
  });
