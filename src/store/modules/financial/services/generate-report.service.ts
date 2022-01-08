import { Op } from "sequelize";

import { ServiceResponse } from "@shared/utils/service-response";
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { schema } from '../validation/generate-report.validation';
import Order from "@core/order";
import ApiError from "@shared/utils/ApiError";

export class GenerateReportService {
 async execute({ establishmentId, data_initial, data_final }: GenerateReportDto): Promise<ServiceResponse<any>> {
  try {
    const valid = schema.isValidSync({ establishmentId, data_initial, data_final });

    if (!valid) throw new ApiError('Dados Inválidos');

    // Formatar e Converter String para Date
    const dataI = data_initial.split('/');
    const dataF = data_final.split('/');

    const formatToStringI = dataI[1] + '-' + dataI[0] + '-' + dataI[2];
    const formatToStringF = dataF[1] + '-' + dataF[0] + '-' + dataF[2];

    const dataInit = new Date(formatToStringI);
    const dataFinal = new Date(formatToStringF);

    const report = await Order.findAll({
      where: {
        establishment_id: establishmentId,
        createdAt: { [Op.between]: [dataInit, dataFinal] },
        order_status: 'Finalizado',
      },
      attributes: ['id', 'payment', 'total', 'createdAt'],
    })

    return { result: report, err: null };
  } catch(err) {
    ApiError.verifyType(err);

    throw ApiError.generateErrorUnknown();
  }
 }
}
