import { Op } from "sequelize";

import Establishment from "@core/establishment";
import ItemOrder from "@core/item-order";
import { ServiceResponse } from "@shared/utils/service-response";
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { schema } from '../validation/generate-report.validation';
import Order from "@core/order";
import Evaluation from "@core/evaluation";

export class GenerateReportService {
 async execute({ id, data_initial, data_final }: GenerateReportDto): Promise<ServiceResponse<any>> {
  try {
    const valid = schema.isValidSync({ id, data_initial, data_final });

    if (!valid) throw new Error('Dados Inválidos');

    const establishment = await Establishment.findByPk(id);

    if (!establishment) throw new Error('Estabelecimento não encontrado');

    // Formatar e Converter String para Date

    const dataI = data_initial.split('/');
    const dataF = data_final.split('/');

    const formatToStringI = dataI[1] + '-' + dataI[0] + '-' + dataI[2];
    const formatToStringF = dataF[1] + '-' + dataF[0] + '-' + dataF[2];

    const dataInit = new Date(formatToStringI);
    const dataFinal = new Date(formatToStringF);

    const report = await ItemOrder.findAll({
      where: { createdAt: { [Op.between]: [dataInit, dataFinal] } },
      attributes: ['id', 'quantity', 'total'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'payment',
            'total',
            'discount',
            'client_order_status',
            'order_status',
            'freight_value',
            'createdAt'
          ],
          include: [
            {
              model: Evaluation,
              as: 'evaluation',
              attributes: ['value', 'message'],
            }
          ]
        },
      ]
    });

    return { result: report, err: null };
  } catch(err) {
    return { result: [], err: err.message };
  }
 }
}
