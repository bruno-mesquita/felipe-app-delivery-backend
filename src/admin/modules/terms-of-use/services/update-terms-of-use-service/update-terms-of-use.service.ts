import TermsOfUse from "@core/terms-of-use";
import ApiError from "@shared/utils/ApiError";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateTermsOfUseDto } from '../../dtos/update-terms-of-use.dto';
import { schema } from '../../validations/update-state.validation';

export class UpdateTermsOfUseService {
  async execute(updateTermsOfUseDto: UpdateTermsOfUseDto): Promise<ServiceResponse<any>> {
    try {
      const valid = schema.isValidSync(updateTermsOfUseDto);

      if (!valid) throw new ApiError('Dados inválidos');

      const termsOfUse = await TermsOfUse.findOne({
        where: { id: updateTermsOfUseDto.id }
      });

      if (!termsOfUse) throw new ApiError('Termos de uso não encontrado');

      const { description } = updateTermsOfUseDto;

      termsOfUse.setDescription(description);

      await termsOfUse.save();

      return{ result: termsOfUse.id, err: null };
    } catch(err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
