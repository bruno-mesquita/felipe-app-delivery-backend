import { object, SchemaOf, string, number } from 'yup';
import { GenerateReportDto } from '../dtos/generate-report.dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<GenerateReportDto> = object({
  id: number().integer().required(REQUIRED),
  data_initial: string().required(REQUIRED),
  data_final: string().required(REQUIRED),
});

export { schema };
