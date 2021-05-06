import { object, SchemaOf, string, number } from 'yup';
import { GenerateRenatorioDto } from '../dtos/generate-renatorio.dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<GenerateRenatorioDto> = object({
  id: number().integer().required(REQUIRED),
  data_initial: string().required(REQUIRED),
  data_final: string().required(REQUIRED),
});

export { schema };
