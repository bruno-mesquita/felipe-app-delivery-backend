import { object, SchemaOf, string } from 'yup';
import { CreateAvatarDto } from './create-image-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateAvatarDto> = object({
  name: string().required(REQUIRED),
  encoded: string().required(REQUIRED),
  id: string().uuid().required(REQUIRED),
});

export { schema };
