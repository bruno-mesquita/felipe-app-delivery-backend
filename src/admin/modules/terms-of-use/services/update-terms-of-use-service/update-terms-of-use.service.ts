import TermsOfUse from "@core/terms-of-use";
import { ServiceResponse } from "@utils/service-response";
import { UpdateTermsOfUseDto } from '../../dtos/update-terms-of-use.dto';
import { schema } from '../../validations/update-state.validation';

export class UpdateTermsOfUseService {
  async execute(updateTermsOfUseDto: UpdateTermsOfUseDto): Promise<ServiceResponse<any>> {
    try {
      const valid = schema.isValidSync(updateTermsOfUseDto);

      if (!valid) throw new  Error('Dados inválidos');

      const termsOfUse = await TermsOfUse.findOne({
        where: { id: updateTermsOfUseDto.id }
      });

      if (!termsOfUse) throw new Error('Termos de uso não encontrado');

      const { description } = updateTermsOfUseDto;

      termsOfUse.setDescription(description);

      await termsOfUse.save();

      return{ result: termsOfUse.id, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  }
}
