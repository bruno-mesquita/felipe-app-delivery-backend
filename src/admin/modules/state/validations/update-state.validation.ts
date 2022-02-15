import { object, SchemaOf, string, boolean, number } from 'yup';
import { UpdateStateDto } from '../dtos/update-state-dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<UpdateStateDto> = object({
  id: number().required(REQUIRED),
  name: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

