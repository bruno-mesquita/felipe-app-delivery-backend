import { Schema, Model, Types, model } from 'mongoose';

type IAddress = {
  _id: Types.ObjectId;
  street: string;
  number: string;
  neighborhood: string;
  zipCode: string;
  city: Types.ObjectId;
  active: boolean;
  nickname: string;
}

type IClient = {
  name: string;
  email: string;
  cpf: string;
  avatar: string;
  password: string;
  active: boolean;
  cellphone: string;
  adresses: Types.DocumentArray<IAddress>;
}

const addressSchema = new Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  neighborhood: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: Types.ObjectId, required: true },
  active: { type: Boolean, default: false },
  nickname: { type: String, required: true },
})

const clientSchema = new Schema<IClient, Model<IClient>>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  cellphone: {
    type: String,
    required: true
  },
  adresses: [addressSchema]
}, { timestamps: true });


export default model('Client', clientSchema);
