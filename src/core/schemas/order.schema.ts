import { Schema, Model, Types, model } from 'mongoose';

import {  } from './menu.schema';

export type PaymentOptionsType = 'Dinheiro' | 'Cartão de crédito' | 'Cartão de débidto';

export type IStatus = 'Novo' | 'Aceito' | 'Em preparo' | 'Saiu para entrega' | 'Entregue' | 'Cancelado';

type IItem = {
  name: string;
  price: number;
  quantity: number;
  total: number;
  productId: Types.ObjectId;
}

type IRate = {
  value: number;
  message: string;
}

type IOrder = {
  payment: PaymentOptionsType;
  total: number;
  discount: number;
  status: IStatus;
  freightValue: number;
  transshipment: number;
  note: string;
  address: string;
  commission: boolean;
  company: Types.ObjectId;
  client: Types.ObjectId;
  rate: Types.Subdocument<IRate>;
  items: Types.DocumentArray<IItem>;
}

const rateSchema = new Schema<IRate, Model<IRate>>({
  message: String,
  value: Number,
});

const orderSchema = new Schema<IOrder, Model<IOrder>>({
  payment: {
    type: String,
    required: true,
    enum: ['Dinheiro', 'Cartão de crédito', 'Cartão de débidto'],
  },
  total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ['Novo','Aceito','Em preparo','Saiu para entrega','Entregue','Cancelado']
  },
  freightValue: {
    type: Number,
    required: true,
  },
  transshipment: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  commission: {
    type: Boolean,
    default: false,
  },
  company: {
    type: Types.ObjectId,
    required: true,
    ref: 'Company',
  },
  client: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  rate: rateSchema,
  items: [
    { name: { type: String, required: true } },
    { price: { type: Number, required: true } },
    { quantity: { type: Number, required: true } },
    { total: { type: Number, required: true } },
    { productId: { type: Types.ObjectId, required: true } },
  ]
}, { timestamps: true });


export default model('Order', orderSchema);
