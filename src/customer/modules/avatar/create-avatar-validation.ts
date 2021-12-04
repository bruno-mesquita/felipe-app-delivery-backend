import { object, SchemaOf, string, number } from 'yup';
import { CreateAvatarDto } from './create-avatar-dto';

const schema: SchemaOf<CreateAvatarDto> = object({
  name: string().trim().required(),
  encoded: string().trim().required(),
  client_id: number().required(),
});

export { schema };
