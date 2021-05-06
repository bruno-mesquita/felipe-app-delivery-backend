import { Op } from "sequelize";

import Establishment from "@core/establishment";
import ItemOrder from "@core/item-order";
import { ServiceResponse } from "@shared/utils/service-response";
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { schema } from '../validation/generate-report.validation';

export class GenerateReportService {
 async execute({ id, data_initial, data_final }: GenerateReportDto): Promise<ServiceResponse<any[]>> {
  try {
    console.log({ id, data_initial, data_final })
    const valid = schema.isValidSync({ id, data_initial, data_final });

    if (!valid) throw new Error('Dados Inválidos');

    const establishment = await Establishment.findByPk(id);

    if (!establishment) throw new Error('Estabelecimento não encontrado');

    const convert = new Date();
    convert.setDate(convert.getDate());

    const init = convert.toLocaleDateString();
    const final = convert.toLocaleDateString();

    console.log({ init, final });

    // pegar data de inicio e data final
    const renatorio = await ItemOrder.findAll({
      where: { createdAt: { data_initial, data_final } },
      attributes: ['id', 'quantity', 'total', 'product_id', 'order_id', 'createdAt'],
    });

    return { result: renatorio, err: null };
  } catch(err) {
    return { result: [], err: err.message };
  }
 }
}
