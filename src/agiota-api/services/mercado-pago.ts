import { EstablishmentOwner } from '@core/establishment-owner';
import axios from 'axios';

import { PaymentResponse } from './mercado-pago.types';

const api = axios.create({
  baseURL: 'https://api.mercadopago.com',
  headers: {
    Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
  },
});

interface Payer {
  email: string;
  first_name: string;
  last_name?: string;
  phone?: {
    area_code: number;
    number: string;
  };
  identification?: {
    type: 'CPF';
    number: string;
  };
  address: {
    zip_code: string;
    street_name: string;
    street_number: string;
    neighborhood: string;
    city: string;
    federal_unit?: string;
  };
}

interface PaymentData {
  transaction_amount: number;
  description: string;
  payment_method_id: 'bolbradesco';
  payer: Payer;
}

interface GeneratePaymentData {
  owner: EstablishmentOwner;
  transaction_amount: number;
  description: string;
  date_of_expiration: Date;
}

export class MercadoPago {
  public async getPaymentMethods() {
    try {
      const { data } = await api.get('/v1/payment_methods');

      return data;
    } catch (err) {
      return [];
    }
  }

  generatePaymentData({ owner, ...rest }: GeneratePaymentData): PaymentData {
    const { address } = owner.establishment;

    return {
      ...rest,
      payment_method_id: 'bolbradesco',
      payer: {
        email: owner.email,
        first_name: owner.first_name,
        last_name: owner.last_name,
        identification: {
          type: 'CPF',
          number: owner.cpf,
        },
        address: {
          zip_code: address.cep,
          street_name: address.street,
          street_number: address.number,
          neighborhood: address.neighborhood,
          city: address.city.name,
        },
      },
    };
  }

  async generateTicket(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const { data } = await api.post('/v1/payments', paymentData);

      return data;
    } catch (err) {
      return err.response;
    }
  }

  async verifyTicket(id: number) {
    try {
      const { data } = await api.get(`/v1/payments/${id}`);

      return data;
    } catch (err) {
      return err.response;
    }
  }

  async cancelTicket(id: number) {
    try {
      const { data } = await api.put(`/v1/payments/${id}`, {
        status: 'cancelled',
      });

      return data;
    } catch (err) {
      return err.response;
    }
  }
}
