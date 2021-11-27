import { object, SchemaOf, string, number } from 'yup';
import { CreateAvatarDto } from './create-avatar-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateAvatarDto> = object({
  name: string().required(),
  encoded: string().required(),
  client_id: number().required(),
});

export { schema };
