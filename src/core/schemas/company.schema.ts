import { Schema, Model, Types, model } from 'mongoose';

import { PaymentOptionsType } from './order.schema';

type IFreight = {
  price: number;
  neighborhood: string;
}

type IAddress = {
  street: string;
  number: string;
  neighborhood: string;
  zipCode: string;
  city: string;
}

type ICompany = {
  name: string;
  cnpj?: string;
  cellphone: string;
  active: boolean;
  schedules: {
    monday: { open: number; close: number; },
    tuesday: { open: number; close: number; },
    wednesday: { open: number; close: number; },
    thursday: { open: number; close: number; },
    friday: { open: number; close: number; },
    saturday: { open: number; close: number; },
    sunday: { open: number; close: number; },
  }
  evaluation: number;
  photo: string;
  paymentOptions: Types.Array<PaymentOptionsType>;
  freight: Types.Array<IFreight>;
  address: IAddress;
  categories: Types.Array<Types.ObjectId>;
}

const companySchema = new Schema<ICompany, Model<ICompany>>({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  cellphone: {
    type: String,
    required: true
  },
  evaluation: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
    required: true,
  },
  schedules: {
    monday: { open: Number, close: Number, },
    tuesday: { open: Number, close: Number, },
    wednesday: { open: Number, close: Number, },
    thursday: { open: Number, close: Number, },
    friday: { open: Number, close: Number, },
    saturday: { open: Number, close: Number, },
    sunday: { open: Number, close: Number, },
  },
  paymentOptions: {
    type: [String],
    enum: ['Dinheiro', 'Cartão de crédito', 'Cartão de débidto'],
  },
  categories: {
    type: [Types.ObjectId],
    required: true,
    ref: 'categories',
  },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
  },
  freight: [{
    price: {
      type: Number,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true
    }
  }],
}, { timestamps: true });


export default model('Company', companySchema);
