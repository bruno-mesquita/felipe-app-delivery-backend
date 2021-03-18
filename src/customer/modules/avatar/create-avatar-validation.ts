import { object, SchemaOf, string } from 'yup';
import { CreateAvatarDto } from './create-avatar-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateAvatarDto> = object({
  name: string().required(REQUIRED),
  encoded: string().required(REQUIRED),
});

export { schema };
