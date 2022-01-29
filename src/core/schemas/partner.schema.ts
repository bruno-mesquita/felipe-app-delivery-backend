import { Schema, Model, Types, model } from 'mongoose';

type IPartner = {
  name: string;
  password: string;
  email: string;
  cellphone: string;
  cpf: string;
  createdBy: Types.ObjectId;
  company: Types.ObjectId;
}

const partnerSchema = new Schema<IPartner, Model<IPartner>>({
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
  cellphone: {
    type: String,
    required: true
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'CityManager',
    required: true,
  },
  company: {
    type: Types.ObjectId,
    ref: 'Company',
    required: false,
  }
}, { timestamps: true });


export default model('Partner', partnerSchema);
